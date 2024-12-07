import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { NavbarComponent } from "~/components/navbar/block";
import { Container } from "@chakra-ui/react";
import { ProfileSettingComponent } from "~/app/_components/profile-settings";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  const profileSettings = await ProfileSettingComponent();

  return (
    <HydrateClient>
      <NavbarComponent activeMenuKey={1} />
      <Container pb={16}>{profileSettings}</Container>
    </HydrateClient>
  );
}
