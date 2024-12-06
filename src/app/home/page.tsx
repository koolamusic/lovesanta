import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { FeedComponent } from "~/components/feed";
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
        <FeedComponent />

        <NavbarComponent />
      </Container>
    </HydrateClient>
  );
}
