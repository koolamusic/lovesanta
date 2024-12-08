import { EventPairInfo } from "~/app/_components/event-pair";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

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
  const eventId = params.event_id;
  const session = await auth();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const participant = await enrollOrGet({
    eventId,
    userId: session.user.id,
  });

  console.log({ eventId, participant, session });

  return (
    <div className="container mx-auto py-8">
      <h1>Event {eventId}</h1>
      <EventPairInfo />
    </div>
  );
}
