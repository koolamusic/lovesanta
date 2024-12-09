import {
  AlertDescription,
  AlertRoot,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Span,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { PreviousConnections } from "~/app/_components/event-pair/previous-connections";
import { ConfettiComponent } from "~/components/display/confetti";
import PairPreferenceDrawer from "~/components/display/preference-drawer";
import { Button } from "~/components/ui/button";
import { CurrentConnection } from "~/components/display/current-connection";
import { PairProfileHeader } from "./pair-profile";
import { Fragment } from "react";

interface EventPairInfoProps {
  eventId: string;
}

export function EventPairInfo({ eventId }: EventPairInfoProps) {
  return (
    <Fragment>
          {/*  --------------------- Show current connected pair  --------------------- */}
      <PairProfileHeader />
          {/*  --------------------- Show current connected pair  --------------------- */} 
      <ConfettiComponent show={true} />
      <Container pb={12} pt={8} overflowX={"hidden"}>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}
        <Stack gap={3}
        bg="bg.muted"
        rounded={"xl"}
        px={2}
        pt={3}
        minH={"284px"}
        justify={"space-between"}
        ring={'1px'}
        ringColor={'fg.subtle'}
        boxShadow={'lg'}
        
        >
          {/* {user.pairId && ( */}


          
                <VStack divideY={'1px'} gap="2" align={"flex-start"} textAlign="left" fontSize={"lg"}>
                  <HStack
                    fontWeight="medium"
                    w={"full"}
                    bg="bg.muted"
                    gap="0"
                    rounded="lg"
                    px="3"
                    py="1"
                    spaceX={3}
                    align={'flex-start'}
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
                    align={'flex-start'}
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
                    align={'flex-start'}
                  >
                    <Span color="fg.muted">3/</Span>
                    <Span>Viewing your match might cost you a count</Span>
                  </HStack>
                </VStack>

          <Stack pb={0}>
          {/* -------  Allow user to manage re-match and change pairs ------ */}
          <PairPreferenceDrawer wishlist={"we want to buy a lot of sneakers"} />
          {/* -------  Allow user to manage re-match and change pairs ------ */}
          </Stack>

        </Stack>
        {/* //////////////////If we have a pair lets preview this box ////////////// */}

        <h1>Event {eventId}</h1>


        {/* ----- Hack to add space between the fixed bottom navbar  ----- */}
        <Spacer minH={{ base: "42px", md: "8px" }} pb={12} />

        <Stack my={4} gap={10}>


          {/*  --------------------- Show previous connections  --------------------- */}
          <PreviousConnections />
          {/*  --------------------- Show previous connections  --------------------- */}
        </Stack>
      </Container>
    </Fragment>
  );
}
