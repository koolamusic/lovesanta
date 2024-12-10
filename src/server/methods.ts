import { type Participant, type PrismaClient } from "@prisma/client";
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

/**
 *
 * @function rematchParticipant
 *
 * @description
 *
 * This function allows a participant to rematch with a new participant
 *
 * @param {MatchParticipantOptions} options
 *
 * The logic is a combination of the matchParticipant effect with a couple
 * of additional steps to ensure that the participant is not matched with
 * the same person they were previously matched or any individual who
 * already has a match
 *
 * We also keep track of the number of times a participant has attempted
 * to rematch and also keep a record of the previous matches
 *
 * @returns {Promise<Match>}
 *
 * @throws {Error}
 *
 */
export async function rematchParticipant({
  prisma,
  eventId,
  participant,
}: MatchParticipantOptions) {
  // Get match history count
  const matchAttempts = await prisma.matchHistory.count({
    where: {
      eventId,
      giverUserId: participant.userId,
    },
  });

  if (matchAttempts >= 3) {
    throw new Error("Maximum rematch attempts reached");
  }

  // Get previous receivers from history
  const previousMatches = await prisma.matchHistory.findMany({
    where: {
      eventId,
      giverUserId: participant.userId,
    },
    select: {
      receiverUserId: true,
    },
  });

  const previousReceivers = previousMatches.map((m) => m.receiverUserId);

  /**
   * @operation
   *
   * Get the current pair that our particpant
   * has been matched with
   */
  const currentMatch = await prisma.match.findFirst({
    where: {
      eventId,
      giverId: participant.id,
      NOT: { status: "COMPLETED" },
    },
    include: {
      receiver: true,
    },
  });

  if (!currentMatch) {
    throw new Error("You can no longer perform this operation");
  }

  /**
   * @operation
   *
   * Search for new pairs
   * We rely on the database to filter out participants who
   * have not been paired or have been paired with the current giver
   */
  const availableReceivers = await prisma.participant.findMany({
    where: {
      eventId,
      region: participant.region,
      NOT: {
        OR: [{ id: participant.id }, { userId: { in: previousReceivers } }],
      },
      receivingFrom: {
        none: {},
      },
    },
  });

  if (availableReceivers.length === 0) {
    throw new Error("No available receivers for rematch");
  }

  /**
   * @operation
   *
   *
   * We create a new history record of the
   * individual who has been matched with out participant
   *
   * This is important for tracking purposes
   * !!!We also delete the current match record
   */
  if (currentMatch) {
    await prisma.matchHistory.create({
      data: {
        eventId,
        giverUserId: participant.userId,
        receiverUserId: currentMatch.receiver.userId,
        attemptNo: matchAttempts + 1,
        matchedAt: currentMatch.createdAt,
      },
    });

    // Delete current match
    await prisma.match.delete({
      where: {
        id: currentMatch.id,
      },
    });
  }

  const receiver = getRandomNode(availableReceivers) as Participant;

  /**
   *
   * @operation
   *
   * We don't update our current match record.
   * We essentially create an entirely new entry with the updated
   *
   * records, however in the future, it might be better to simply update
   * the "receiverId" field in the current match record
   */
  return prisma.match.create({
    data: {
      eventId,
      giverId: participant.id,
      receiverId: receiver.id,
      status: "ACCEPTED",
    },
  });
}
