import {
  Container,
  HStack,
  Spacer,
  Span,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Fragment, Suspense } from "react";
import { PreviousConnections } from "~/app/_components/event-pair/previous-connections";
import { ConfettiComponent } from "~/components/display/confetti";
import PairPreferenceDrawer from "~/components/display/preference-drawer";
import { PairProfileHeader } from "./pair-profile";

import { api } from "~/trpc/server";
// import {api  } from "~/trpc/react";

interface EventPairInfoProps {
  eventId: string;
}

export async function EventPairInfo({ eventId }: EventPairInfoProps) {
  const data = await api.post.fetchGiverEnrollment({ eventId });

  console.log({ data });

  return (
    <Fragment>
      {!data.isNewPair && <ConfettiComponent show={true} />}
      {/*  --------------------- Show current connected pair  --------------------- */}
      <PairProfileHeader
        triesRemaining={data.attemptsCount}
        participants={data.participants}
      />
      {/*  --------------------- Show current connected pair  --------------------- */}
      <Container pb={12} pt={8} overflowX={"hidden"}>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}
        <Stack
          gap={3}
          bg="bg.muted"
          rounded={"xl"}
          px={2}
          pt={3}
          minH={"284px"}
          justify={"space-between"}
          ring={"1px"}
          ringColor={"fg.subtle"}
          boxShadow={"lg"}
        >
          <VStack
            divideY={"1px"}
            gap="2"
            align={"flex-start"}
            textAlign="left"
            fontSize={"lg"}
          >
            <HStack
              fontWeight="medium"
              w={"full"}
              bg="bg.muted"
              gap="0"
              rounded="lg"
              px="3"
              py="1"
              spaceX={3}
              align={"flex-start"}
            >
              <Span color="fg.muted">1/</Span>
              <Span>You can only generate a new pair thrice (3 times)</Span>
            </HStack>
            <HStack
              fontWeight="medium"
              w={"full"}
              bg="bg.muted"
              gap="0"
              rounded="lg"
              px="3"
              py="1"
              spaceX={3}
              align={"flex-start"}
            >
              <Span color="fg.muted">2/</Span>
              <Span>If you don&apos;t like your match, generate a new one</Span>
            </HStack>
            <HStack
              fontWeight="medium"
              bg="bg.muted"
              gap="0"
              rounded="lg"
              px="3"
              py="1"
              spaceX={3}
              align={"flex-start"}
            >
              <Span color="fg.muted">3/</Span>
              <Span>Viewing your match might cost you a count</Span>
            </HStack>
          </VStack>

          <Stack pb={0}>
            {/* -------  Allow user to manage re-match and change pairs ------ */}
            <Suspense fallback={<div>Loading...</div>}>
              <PairPreferenceDrawer
                attemptsCount={data.attemptsCount}
                participants={data.participants}
                event={data.metadata.event}
              />
            </Suspense>
            {/* -------  Allow user to manage re-match and change pairs ------ */}
          </Stack>
        </Stack>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}

        {/* ----- Hack to add space between the fixed bottom navbar  ----- */}
        <Spacer minH={{ base: "42px", md: "8px" }} pb={12} />

        <Stack my={4} gap={10}>
          {/*  --------------------- Show previous connections  --------------------- */}
          <Suspense fallback={<div>Loading...</div>}>
            <PreviousConnections history={data.metadata.history} />
          </Suspense>
          {/*  --------------------- Show previous connections  --------------------- */}
        </Stack>
      </Container>
    </Fragment>
  );
}
