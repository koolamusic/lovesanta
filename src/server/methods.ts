import { Participant, type PrismaClient } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { getRandomNode } from "~/app/common/helpers";



interface MatchParticipantOptions {
  prisma: PrismaClient;
  eventId: string;
  participant: Participant;
} 


export async function createYearlyEvent(
  prisma: PrismaClient,
  data: {
    name: string;
    year: number;
    date: Date;
    description: string;
  },
) {
  return prisma.event.create({
    data: {
      ...data,
      status: "ACTIVE",
    },
  });
}

export async function addParticipant(
  prisma: PrismaClient,
  data: {
    userId: string;
    eventId: string;
    wishlist?: string;
    budget?: number;
  },
) {
  return prisma.participant.create({
    data: {
      userId: data.userId,
      eventId: data.eventId,
      wishlist: data.wishlist,
      budget: data.budget,
      hasJoined: true,
    },
  });
}


/**
 * 
 * @function matchParticipant
 * 
 * 
 * @description
 * This function matches a participant with another participant in an event
 * factors like region, wishlist, and budget are considered when matching
 * 
 */
export async function matchParticipant({
  prisma,
  eventId,
  participant,
}: MatchParticipantOptions) {
  try {
    // Get all participants except the giver
    const participants = await prisma.participant.findMany({
      where: {
        eventId,
        region: participant.region,
        NOT: { id: participant.id },
      },
      include: {
        receivingFrom: true, // Get existing matches where they're receiving
      },
    });
  
    // Filter out participants who already have a gift giver
    const availableReceivers = participants.filter(
      (p) => p.receivingFrom.length === 0,
    );
  
    if (availableReceivers.length === 0) {
      throw new Error("No available receivers");
    }
  
    // Randomly select a receiver
    const receiver = getRandomNode(availableReceivers) as { id: string };
  
    return prisma.match.create({
      data: {
        eventId,
        giverId: participant.id,
        receiverId: receiver.id,
        status: "ACCEPTED",
      },
    });
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "CONFLICT",
      message: "Failed to match participant",
    });
    
  }
}

export async function rematchParticipant({
  prisma,
  eventId,
  participant,
}: MatchParticipantOptions) {
  // Get match history count
  const matchAttempts = await prisma.matchHistory.count({
    where: {
      eventId,
      giverId: participant.id,
    },
  });

  if (matchAttempts >= 3) {
    throw new Error("Maximum rematch attempts reached");
  }

  // Get previous receivers from history
  const previousMatches = await prisma.matchHistory.findMany({
    where: {
      eventId,
      giverId: participant.id,
    },
    select: {
      receiverId: true,
    },
  });

  const previousReceivers = previousMatches.map((m) => m.receiverId);

  // Get current match
  const currentMatch = await prisma.match.findFirst({
    where: {
      eventId,
      giverId: participant.id,
      NOT: { status: 'COMPLETED' },
    },
  });

  if (!currentMatch) {
    throw new Error("You can no longer perform this operation");
  }

  // Find new available receiver
  const availableReceivers = await prisma.participant.findMany({
    where: {
      eventId,
      region: participant.region,
      NOT: {
        OR: [{ id: participant.id }, { id: { in: previousReceivers } }],
      },
      receivingFrom: {
        none: {},
      },
    },
  });

  if (availableReceivers.length === 0) {
    throw new Error("No available receivers for rematch");
  }

  // Store current match in history before deletion
  if (currentMatch) {
    await prisma.matchHistory.create({
      data: {
        eventId,
        giverId: currentMatch.giverId,
        receiverId: currentMatch.receiverId,
        attemptNo: matchAttempts + 1,
      },
    });

    // Delete current match
    await prisma.match.delete({
      where: {
        id: currentMatch.id,
      },
    });
  }

  const receiver = getRandomNode(availableReceivers) as { id: string };

  // Create new match
  return prisma.match.create({
    data: {
      eventId,
      giverId: participant.id,
      receiverId: receiver.id,
      status: "ACCEPTED",
    },
  });
}
