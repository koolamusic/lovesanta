import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { NavbarComponent } from "~/components/navbar/block";
import { Container } from "@chakra-ui/react";
import { AuthenticateStack } from "./_components/authenticate";

export default async function Home() {
  const session = await auth();
  console.log({ session, from: "[home]" });

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Container pb={20}>
        <AuthenticateStack />
      </Container>
      <NavbarComponent />
    </HydrateClient>
  );
}
