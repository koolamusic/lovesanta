'use client';
import { HStack, IconButton, Tabs, type TabsRootProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { SecondaryNavItem } from "./data";
import { ColorModeButton } from "../ui/color-mode";
// import { UserMenu } from './user-menu'
import { LuLogOut } from "react-icons/lu";

interface Props extends TabsRootProps {
  items?: SecondaryNavItem[];
  activeKey: number;
}

export const SecondaryNavigation = (props: Props) => {
  const { items = [], activeKey,  ...rest } = props;
  const [activeTab, setActiveTab] = useState(items[activeKey]?.value);
  useEffect(() => {
    setActiveTab(items[activeKey]?.value);
  }, [items]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(e) => setActiveTab(e.value)}
      variant="plain"
      size="md"
      colorPalette="gray"
      {...rest}
    >
      <Tabs.List
        alignItems="center"
        borderWidth="1px"
        p="1"
        h="10"
        borderRadius="lg"
        bg={{ base: "bg.muted", _dark: "gray.900" }}
      >
        {items.map(({ value, label }) => (
          <Tabs.Trigger key={value} value={value} h="8">
            {label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator
          borderRadius="l2"
          bg={{ base: "white", _dark: "bg.subtle" }}
        />

        <HStack ml={"3"} mr="0" spaceX={-2}>
          <IconButton
            size={"xs"}
            css={{
              _icon: {
                width: "5",
                height: "5",
              },
            }}
            aria-label="Logout"
            variant="ghost"
          >
            <LuLogOut />
          </IconButton>

          <ColorModeButton />
        </HStack>
      </Tabs.List>
    </Tabs.Root>
  );
};
