import { HStack, Icon, Text } from "@chakra-ui/react";
import { LuCircleDot, LuCircleCheck } from "react-icons/lu";

export const RetryIndicator = ({ count = 3 }) => {
  return (
    <HStack position={"relative"} justify="space-between" px={6} py={2}>
      <HStack position={"relative"} flexFlow={"row-reverse"}>
        {[...Array(3)].map((_, index) => (
          <Icon key={index} color={index < 3 - count ? "white" : "red.500"}>
            {index < 3 - count ? <LuCircleDot /> : <LuCircleCheck />}
          </Icon>
        ))}
      </HStack>
      <Text
        fontSize={"sm"}
        color={"gray.100"}
        alignSelf={"flex-end"}
        textAlign={"right"}
      >
        You have {Number(3 - count)} remaining tries
      </Text>
    </HStack>
  );
};
