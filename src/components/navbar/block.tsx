import { Container, Flex, Grid, HStack } from "@chakra-ui/react";
import { staticSecondaryNavItems } from "./data";
import { SecondaryNavigation } from "./secondary-navigation";

export const NavbarComponent = ({ activeMenuKey = 0 }) => {
  // This is just for demo purposes. Use the router to get the current route and manage state
  // const [selected, setSelected] = useState<string>(selectedRoute);
  // const secondaryNav = items.find((item) => item.value === selected)?.secondary;

  return (
    <Container
      position={"fixed"}
      zIndex={100}
      left={0}
      right={0}
      bottom={2}
      py={{ base: "4", md: "6", lg: "8" }}
    >
      <Flex justify="center">
        <SecondaryNavigation activeKey={activeMenuKey}  items={staticSecondaryNavItems} />
      </Flex>
    </Container>
  );
};
