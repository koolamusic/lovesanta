"use client";
import { Container, Flex, Grid, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { items } from "./data";
import { SecondaryNavigation } from "./secondary-navigation";

export const NavbarComponent = ({ selectedRoute = "dashboard" }) => {
  // This is just for demo purposes. Use the router to get the current route and manage state
  const [selected, setSelected] = useState<string>(selectedRoute);
  const secondaryNav = items.find((item) => item.value === selected)?.secondary;

  return (
    <Container
      position={"fixed"}
      left={0}
      bottom={2}
      py={{ base: "4", md: "6", lg: "8" }}
    >
      <Flex justify="center">
        <SecondaryNavigation items={secondaryNav} />
      </Flex>
    </Container>
  );
};
