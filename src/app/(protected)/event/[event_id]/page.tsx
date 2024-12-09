import { EventPairInfo } from "~/app/_components/event-pair";
import RequestPair from "~/app/_components/request-pair";
import { NavbarComponent } from "~/components/navbar/block";
import { Suspense } from "react";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { HydrateClient } from "~/trpc/server";

interface EventParams {
  params: {
    event_id: string;
  };
}

interface EnrollOrGetArgs {
  eventId: string;
  userId: string;
}

/**
 *
 * @method enrollOrGet
 *
 * @param {EnrollOrGetArgs} args
 * @description
 * This is an optimistic function that tries to enroll a user into an event
 * if the user is not already enrolled. If the user is already enrolled, it
 * returns the user's enrollment details.
 *
 */
const enrollOrGet = async ({ eventId, userId }: EnrollOrGetArgs) => {
  const event = await db.participant.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!event) {
    return await db.participant.create({
      data: {
        eventId,
        userId,
        hasJoined: true,
        wishlist: user?.bio,
        budget: 100,
      },
    });
  }

  return event;
};

export default async function EventPair({ params }: EventParams) {
  const { event_id: eventId } = await params;
  const session = await auth();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const participant = await enrollOrGet({
    eventId,
    userId: session.user.id,
  });

  const alreadyHasMatch = await db.match.findFirst({
    where: {
      eventId,
      giverId: participant.id,
    },
  });

  if (!alreadyHasMatch) {
    return <RequestPair participantId={participant.id} eventId={eventId} />;
  }

  // console.log({ eventId, participant, session });

  const eventPairInfo = await EventPairInfo({ eventId });

  return (
    <HydrateClient>
      <NavbarComponent activeMenuKey={0} />
      <Suspense fallback={<div>Loading...</div>}>{eventPairInfo}</Suspense>
    </HydrateClient>
  );
}
