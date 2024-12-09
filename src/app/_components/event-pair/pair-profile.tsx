import {
  Container,
  Stack,
  Heading,
  HStack,
  Icon,
  Box,
  Image,
  Badge,
  IconButton,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiHeart, FiMessageCircle, FiRefreshCcw } from "react-icons/fi";
import {
  LuBadgeCheck,
  LuBriefcase,
  LuCircleCheck,
  LuCircleDot,
  LuGlobe,
  LuLinkedin,
  LuMapPin,
  LuRecycle,
  LuRefreshCw,
  LuTwitter,
} from "react-icons/lu";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { RetryIndicator } from "./retry-indicator";

const triesRemaining = 2;

export const PairProfile = () => {
  return (
    <VStack gap="6" textAlign="center">
      {/* ----------- show the count metadata with pair subtitle -------------- */}
      <HStack
        w={"full"}
        alignSelf={"flex-start"}
        align={"center"}
        justifyContent={"space-between"}
      >
        <Text fontFamily={"heading"} textAlign={"left"} mb={0}>
          Your Pair:
        </Text>

        <Text
          color={"teal.500"}
          alignSelf={"flex-end"}
          textAlign={"right"}
          fontFamily={"heading"}
        >
          {3} Tries left
        </Text>
      </HStack>
      {/* ----------- show the count metadata with pair subtitle -------------- */}

      <VStack gap="2" align={"flex-start"} textAlign="left" fontSize={"sm"}>
        <HStack
          fontWeight="medium"
          w={"full"}
          bg="bg.muted"
          gap="0"
          rounded="lg"
          px="3"
          py="1"
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
        >
          <Span color="fg.muted">3/</Span>
          <Span>Viewing your match might cost you a count</Span>
        </HStack>
      </VStack>
    </VStack>
  );
};

const pairName = "Elena Doe";

export const ProfileCard = () => (
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
          Peggie Andrew
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
        <Text>🎉 You have been matched</Text>
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
        <Badge color={"gray.100"} ml="1" bg={"black"}>
          You will buy this person a gift
        </Badge>
      </Stack>

      <Stack pt={10}>
        {/* Tags or Wishlist */}
        {/* Also we can also model tags to show relationship like: */}
        {/* cousin, brother, inlaw etc */}
        {/* <HStack spaceX={2}>
        {["Modelling", "Hiking", "Drawing", "Photo", "Design"].map((tag) => (
          <Badge
            key={tag}
            px={2}
            py={1}
            borderRadius="full"
            bg="gray.100"
            color="gray.800"
          >
            {tag}
          </Badge>
        ))}
      </HStack> */}

        {/* Bio */}
        <Text fontSize="sm" color="gray.100">
          {pairName.charAt(0).toUpperCase() + pairName.slice(1)} will be
          expecting a gift from you this Christmas, they dont have to know that
          you&apos;ve been paired to buy them a gift. do well to buy them
          something lovely or click the button below to see what they&apos;ll
          like
        </Text>
      </Stack>
    </VStack>

    {/* Action Buttons */}
    <HStack position={"relative"} justify="space-between" px={6} py={2}>
      <RetryIndicator number={triesRemaining} />

      <Text
        fontSize={"sm"}
        color={"gray.100"}
        alignSelf={"flex-end"}
        textAlign={"right"}
      >
        You have {triesRemaining} remaining tries
      </Text>
    </HStack>
  </Box>
);
