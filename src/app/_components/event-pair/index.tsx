import { HydrateClient } from "~/trpc/server";

import { NavbarComponent } from "~/components/navbar/block";
import {
  AlertDescription,
  AlertRoot,
  Container,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { PreviousConnections } from "~/app/_components/event-pair/previous-connections";
import { ConfettiComponent } from "~/components/display/confetti";
import { PairPreviewBox } from "~/components/display/pair-preview";
import PairPreferenceDrawer from "~/components/display/preference-drawer";
import { Button } from "~/components/ui/button";
import { CurrentConnection } from "~/app/_components/event-pair/current-connection";

export function EventPairInfo() {
  return (
    <HydrateClient>
      <NavbarComponent activeMenuKey={1} />

      <Container pb={24} overflowX={"hidden"}>
        <ConfettiComponent show={true} />
        <Flex pt={20} />
        <Heading as="h6" textAlign="center" fontSize="2rem">
          You currently don&apos;t have an pair yet
        </Heading>

        {/* //////////////////If we have a pair lets preview this box ////////////// */}
        {/* {user.pairId && ( */}
        <PairPreviewBox
          count={2}
          isAccessing={false}
          name={"bukola rite"}
          pairName={"santa bukola"}
        />
        {/* )} */}
        {/* //////////////////If we have a pair lets preview this box ////////////// */}

        <Button minH={"48px"} w={"full"} mt="8">
          Generate New Pair
        </Button>

        <AlertRoot>
          <AlertDescription fontSize={"md"} mb={2} mt={1}>
            1. You can only generate a new pair thrice (3 times)
          </AlertDescription>

          <AlertDescription fontSize={"md"} maxW="30rem" mb={1}>
            2. If you don&apos;t like your pair, you have {3} Tries remaining to
            generate a new one
          </AlertDescription>
          <AlertDescription fontSize={"md"} mb={1} pb={6}>
            3. Viewing your pair&apos;s preference might cost you one count, so
            use wisely, lol
          </AlertDescription>
        </AlertRoot>

        {/*  --------------------- Instruction set ---------------------  */}

        {/* ----- Hack to add space between the fixed bottom navbar  ----- */}
        <Flex minH={{ base: "42px", md: "8px" }} pb={12} />

        {/* -------  Show the users preferences in a drawer ------ */}
        <PairPreferenceDrawer wishlist={"we want to buy a lot of sneakers"} />
        {/* -------  Show the users preferences in a drawer ------ */}

        <Stack my={4} gap={10}>
          {/*  --------------------- Show current connected pair  --------------------- */}

          <CurrentConnection />

          {/*  --------------------- Show previous connections  --------------------- */}
          <PreviousConnections />
          {/*  --------------------- Show previous connections  --------------------- */}
        </Stack>
      </Container>
    </HydrateClient>
  );
}