import { Stack, Heading, Box, Badge, Text, VStack, Span } from "@chakra-ui/react";
import { RetryIndicator } from "./retry-indicator";
import { Participant, User, Event } from "@prisma/client";



type CombinedParticipantWithUserAndEvent = Participant & { user?: User, event?: Event };

interface PairProfileHeaderProps {
  participants: {
    giver: CombinedParticipantWithUserAndEvent;
    receiver: CombinedParticipantWithUserAndEvent;
  };
  triesRemaining: number;
}

export const PairProfileHeader = ({ participants, triesRemaining }: PairProfileHeaderProps) => {

  const pairName = participants.receiver.user?.name || "Elena Doe";
  const eventName = participants.giver.event?.name || "Christmas Party";
  const wishlist = participants.receiver.wishlist || "No wishlist yet";

  return (

    <Box
    maxW="100%"
    w={"full"}
    overflow="hidden"
    // bg={'teal.700'}
    bg="linear-gradient(90deg, #114240 0%, #032726 100%)"
    position="relative"
    >
    {/* Image Section */}
    <Box height={"400px"} position="relative">
      <Box position="absolute" left="0px" bottom={16} w="300px">
        <Heading
          fontFamily={"Blimone"}
          px={6}
          textWrap={"wrap"}
          as="h1"
          size="6xl"
          color="gray.100"
          >
         {pairName}
        </Heading>
      </Box>
      <Box
        position="absolute"
        top="10px"
        right="10px"
        display="flex"
        flexDirection="column"
        gap="8px"
        >
        <Text><span>🎉</span> {eventName}</Text>
      </Box>
    </Box>

    {/* A gradient edge before the next block about 30px height */}
    <Box
      maxH={"4px"}
      bg="linear-gradient(180deg, rgba(20,0,0,0.15) 270%, rgba(0,0,0,0.7) 120%)"
      backdropFilter="blur(10px)"
      boxShadow="-13px 20px 200px 300px rgb(0 0 0 / 47%)"
      w="full"
      position="absolute"
      bottom={10}
      />

    {/* Content Section */}
    <VStack
      bg={"transparent"}
      boxShadow="170px -105px 99px 10px rgb(0 0 0 / 5%)"
      mt={-20}
      position={"relative"}
      align="start"
      spaceY={2}
      py={4}
      px={6}
      >
      {/* Name and Distance */}
      <Stack>
        <Badge color={"gray.50"} ml="1" bg={"black"}>
          You will buy this person a gift
        </Badge>
      </Stack>

      <Stack pt={10}>
        {/* Bio */}
        <Box fontSize="sm" color="gray.300">
          {/* <Text fontSize={'xs'}>
          {pairName.charAt(0).toUpperCase() + pairName.slice(1)} will be
          expecting a gift from you this Christmas, they dont have to know that
          you&apos;ve been paired to buy them a gift, however, read their wishlist
          </Text> */}
          <Text color="gray.50" pt={4}>
          {wishlist}
             </Text>
        </Box>
      </Stack>
    </VStack>

    {/* ----------- show the count metadata with pair subtitle -------------- */}

    <RetryIndicator count={triesRemaining} />
    {/* ----------- show the count metadata with pair subtitle -------------- */}
  </Box>
)
};