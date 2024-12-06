import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";


import { Button } from "~/components/ui/button"
import { HStack } from "@chakra-ui/react"
import { FeedComponent } from "~/components/feed";
import { ColorModeButton } from "~/components/ui/color-mode";
import { NavbarComponent } from "~/components/navbar/block";

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
  <FeedComponent />

  <NavbarComponent />


      </main>
    </HydrateClient>
  );
}


