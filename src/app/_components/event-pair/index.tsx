import { HydrateClient } from "~/trpc/server";

import { NavbarComponent } from "~/components/navbar/block";
import {
  AlertDescription,
  AlertRoot,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { PreviousConnections } from "~/app/_components/event-pair/previous-connections";
import { ConfettiComponent } from "~/components/display/confetti";
import { PairPreviewBox } from "~/components/display/pair-preview";
import PairPreferenceDrawer from "~/components/display/preference-drawer";
import { Button } from "~/components/ui/button";
import { CurrentConnection } from "~/app/_components/event-pair/current-connection";
import { PairProfile } from "./pair-profile";

export function EventPairInfo() {
  return (
    <HydrateClient>
      <NavbarComponent activeMenuKey={1} />

      <ConfettiComponent show={true} />

      <Container pb={24} overflowX={"hidden"}>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}
        <Stack gap={3}>
          {/* {user.pairId && ( */}

          <PairProfile />

          {/* -------  Allow user to manage re-match and change pairs ------ */}
          <PairPreferenceDrawer wishlist={"we want to buy a lot of sneakers"} />
          {/* -------  Allow user to manage re-match and change pairs ------ */}

          {/* )} */}
        </Stack>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}

        {/*  --------------------- Instruction set ---------------------  */}

        {/* ----- Hack to add space between the fixed bottom navbar  ----- */}
        <Spacer minH={{ base: "42px", md: "8px" }} pb={12} />

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
