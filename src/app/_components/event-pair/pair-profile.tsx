import {
  Container,
  Stack,
  Heading,
  Box,
  Badge,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RetryIndicator } from "./retry-indicator";

const triesRemaining = 2;
const pairName = "Elena Doe";



export const PairProfileHeader = () => (
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

      {/* ----------- show the count metadata with pair subtitle -------------- */}

      <RetryIndicator count={triesRemaining} />
      {/* ----------- show the count metadata with pair subtitle -------------- */}
 
  </Box>
);
