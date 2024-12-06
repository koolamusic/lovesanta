import React, { Fragment } from "react";
import { Heading, Text, Flex, Box, VStack } from "@chakra-ui/react";

type PreviewBoxProps = {
  isAccessing: boolean;
  pairName: string;
  count: number;
  name: string;
};

export const PairPreviewBox: React.FC<PreviewBoxProps> = ({
  isAccessing,
  count,
  pairName,
  name,
}) => {
  if (isAccessing) {
    return (
      <VStack textAlign="center" align="center" spaceY={4}>
        <Text textAlign="center" maxW="30rem" mb={0}>
          Loading your pair
        </Text>

        <Box
          w={"100%"}
          border={"1px"}
          bg={"blue.700"}
          px={8}
          borderRadius={"lg"}
        >
          <Heading
            fontSize="2rem"
            my="6"
            color={"yellow.200"}
            textAlign="center"
            textTransform="capitalize"
          >
            Loading...
          </Heading>
        </Box>

        <Box pt={4}>
          <Text display="block" pb="3">
            Long time ago in Bethlehem So the Holy Bible says Mary boy child,
            Jesus Christ Was born on Christmas day Listen hear the angels sing A
            new king is born today And man will live forever more Because of
            Christmas day
          </Text>
        </Box>
      </VStack>
    );
  }

  return (
    <Fragment>
      {/* ----------- show the count metadata with pair subtitle -------------- */}
      <Flex
        w={"100%"}
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
          {3 - count} Tries left
        </Text>
      </Flex>
      {/* ----------- show the count metadata with pair subtitle -------------- */}

      <VStack textAlign="center" align="center" spaceY={4}>
        <Box
          w={"100%"}
          border={"1px"}
          bg={"blue.700"}
          px={8}
          borderRadius={"lg"}
        >
          <Heading
            fontSize="2rem"
            my="6"
            color={"yellow.200"}
            textAlign="center"
            textTransform="capitalize"
          >
            {pairName}
          </Heading>
        </Box>

        <Box pt={4}>
          <Text display="block" pb="3">
            Hey,{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {name.charAt(0).toUpperCase() + name.slice(1)},{" "}
            </strong>
            {pairName.charAt(0).toUpperCase() + pairName.slice(1)} will be
            expecting a gift from you this Christmas, they dont have to know
            that you&apos;ve been paired to buy them a gift. do well to buy them
            something lovely or click the button below to see what they&apos;ll
            like
          </Text>
        </Box>
      </VStack>
    </Fragment>
  );
};
