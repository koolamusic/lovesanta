import { PrismaClient } from '@prisma/client'
import { getRandomNode } from '~/app/common/helpers'

async function createEvent(prisma: PrismaClient, data: {
  name: string
  year: number
  date: Date
  description: string
}) {
  return prisma.event.create({
    data: {
      ...data,
      status: 'ACTIVE',
    }
  })
}

async function addParticipant(prisma: PrismaClient, data: {
  userId: string
  eventId: string
  wishlist?: string
  budget?: number
}) {
  return prisma.participant.create({
    data: {
      userId: data.userId,
      eventId: data.eventId,
      wishlist: data.wishlist,
      budget: data.budget,
      hasJoined: true,
    }
  })
}

async function createMatch(prisma: PrismaClient, eventId: string, giverId: string) {
  // Get all participants except the giver
  const participants = await prisma.participant.findMany({
    where: {
      eventId,
      NOT: { id: giverId },
    },
    include: {
      receivingFrom: true, // Get existing matches where they're receiving
    }
  })

  // Filter out participants who already have a gift giver
  const availableReceivers = participants.filter(p => 
    p.receivingFrom.length === 0
  )

  if (availableReceivers.length === 0) {
    throw new Error('No available receivers')
  }

  // Randomly select a receiver
  const receiver = getRandomNode(availableReceivers) as { id: string }

  return prisma.match.create({
    data: {
      eventId,
      giverId,
      receiverId: receiver.id,
      status: 'PENDING'
    }
  })
}

async function rematchParticipant(prisma: PrismaClient, eventId: string, giverId: string) {
  // Get match history count
  const matchAttempts = await prisma.matchHistory.count({
    where: {
      eventId,
      giverId
    }
  });

  if (matchAttempts >= 3) {
    throw new Error('Maximum rematch attempts reached');
  }

  // Get previous receivers from history
  const previousMatches = await prisma.matchHistory.findMany({
    where: {
      eventId,
      giverId
    },
    select: {
      receiverId: true
    }
  });

  const previousReceivers = previousMatches.map(m => m.receiverId);

  // Get current match
  const currentMatch = await prisma.match.findFirst({
    where: {
      eventId,
      giverId,
      status: 'PENDING'
    }
  });

  // Find new available receiver
  const availableReceivers = await prisma.participant.findMany({
    where: {
      eventId,
      NOT: {
        OR: [
          { id: giverId },
          { id: { in: previousReceivers } }
        ]
      },
      receivingFrom: {
        none: {}
      }
    }
  });

  if (availableReceivers.length === 0) {
    throw new Error('No available receivers for rematch');
  }

  // Store current match in history before deletion
  if (currentMatch) {
    await prisma.matchHistory.create({
      data: {
        eventId,
        giverId: currentMatch.giverId,
        receiverId: currentMatch.receiverId,
        attemptNo: matchAttempts + 1
      }
    });

    // Delete current match
    await prisma.match.delete({
      where: {
        id: currentMatch.id
      }
    });
  }

  const receiver = getRandomNode(availableReceivers) as { id: string }


  // Create new match
  return prisma.match.create({
    data: {
      eventId,
      giverId,
      receiverId: receiver.id,
      status: 'PENDING'
    }
  });
}
