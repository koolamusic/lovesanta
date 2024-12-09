import { HStack, Icon } from "@chakra-ui/react";
import { LuCircleDot, LuCircleCheck } from "react-icons/lu";

export const RetryIndicator = ({ number = 3 }) => {
  return (
    <HStack position={"relative"} flexFlow={"row-reverse"}>
      {[...Array(3)].map((_, index) => (
        <Icon key={index} color={index < 3 - number ? "white" : "red.500"}>
          {index < 3 - number ? <LuCircleDot /> : <LuCircleCheck />}
        </Icon>
      ))}
    </HStack>
  );
};
