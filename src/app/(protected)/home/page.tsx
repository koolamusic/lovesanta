import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { EventFeedComponent } from "~/components/event-feed";
import { NavbarComponent } from "~/components/navbar/block";
import { Container } from "@chakra-ui/react";
import { db } from "~/server/db";
import { events, Event } from "~/components/event-feed/_data";

export default async function Home() {
  /**
   *
   * @operation
   * Merge the events from the database and the static events
   * and sort them by date in descending order
   *
   * This is a temp solution, as we are also ready from the db directly
   * Ideally would move this over to a trpc query to handle all the heavy lifting
   *
   * And in the future only show events the user already joined instead of pulling
   * all events from the db
   */
  const dbEvents = await db.event.findMany({});

  const feed = [...events, ...dbEvents].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }) as Event[];

  return (
    <HydrateClient>
      <Container pb={24}>
        <EventFeedComponent events={feed} />
        <NavbarComponent activeMenuKey={0} />
      </Container>
    </HydrateClient>
  );
}
