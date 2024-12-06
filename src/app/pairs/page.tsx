import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { NavbarComponent } from "~/components/navbar/block";
import {
  AlertDescription,
  AlertRoot,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { PreviousConnections } from "~/app/_components/previous-connections";
import { ConfettiComponent } from "~/components/display/confetti";
import { PairPreviewBox } from "~/components/display/pair-preview";
import PairPreferenceDrawer from "~/components/display/preference-drawer";
import { Button } from "~/components/ui/button";

export default async function PairingInfo() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Container pb={24}>
        <Container height="100vh">
          <Flex mt={8} pt={8} />
          <Heading as="h6" textAlign="center" fontSize="2rem">
            You currently don&apos;t have an pair yet
          </Heading>

          {/* //////////////////If we have a pair lets preview this box ////////////// */}
          {/* {user.pairId && ( */}
          <PairPreviewBox
            count={2}
            isAccessing={true}
            name={"bukola rite"}
            pairName={"santa bukola"}
          />
          {/* )} */}
          <Button mb={6} mt={2} minH={"32px"} size={"sm"} boxShadow={"none"}>
            Check what your pair wants
          </Button>
          {/* //////////////////If we have a pair lets preview this box ////////////// */}

          <Button minH={"48px"} w={"full"} mt="8">
            Generate New Pair
          </Button>

          <AlertRoot>
            <AlertDescription fontSize={"md"} mb={2} mt={1}>
              1. You can only generate a new pair thrice (3 times)
            </AlertDescription>

            <AlertDescription fontSize={"md"} maxW="30rem" mb={1}>
              2. If you don&apos;t like your pair, you have {3} Tries remaining
              to generate a new one
            </AlertDescription>
            <AlertDescription fontSize={"md"} mb={1} pb={6}>
              3. Viewing your pair&apos;s preference might cost you one count,
              so use wisely, lol
            </AlertDescription>
          </AlertRoot>

          {/*  --------------------- Instruction set ---------------------  */}

          {/* ----- Hack to add space between the fixed bottom navbar  ----- */}
          <Flex minH={{ base: "42px", md: "8px" }} pb={12} />

          {/* -------  Show the users preferences in a drawer ------ */}
          <PairPreferenceDrawer wishlist={"we want to buy a lot of sneakers"} />
          {/* -------  Show the users preferences in a drawer ------ */}
          <ConfettiComponent show={true} />
        </Container>

        <PreviousConnections />
        <NavbarComponent />
      </Container>
    </HydrateClient>
  );
}
