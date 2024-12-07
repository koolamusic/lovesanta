import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { EventFeedComponent } from "~/components/event";
import { NavbarComponent } from "~/components/navbar/block";
import { Container } from "@chakra-ui/react";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Container pb={24}>
        <EventFeedComponent />

        <NavbarComponent activeMenuKey={0} />
      </Container>
    </HydrateClient>
  );
}
