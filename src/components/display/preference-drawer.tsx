"use client";

import { Center, Float, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { Avatar } from "~/components/ui/avatar";
import { FiChevronRight } from "react-icons/fi";

import { api } from "~/trpc/react";

type PreferenceDrawerConfig = {
  wishlist: string;
};

export default function PairPreferenceDrawer({
  wishlist,
}: PreferenceDrawerConfig) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot
      placement={"bottom"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xl"}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          _hover={{ opacity: 0.8 }}
          bg="teal.800"
          color={"gray.50"}
          size="xl"
          fontFamily={"Sole Sans"}
          rounded={"lg"}
        >
          Don&apos;t like this pair? Generate a new pair
        </Button>
      </DrawerTrigger>
      <DrawerTrigger />
      <DrawerContent minH={"50vh"} pt={12} borderTopRadius={"3xl"}>
        <DrawerCloseTrigger />

        <Center rotate={"8"} ml={"-24"} py={8} fontFamily={"Pixeboy"}>
          <Avatar
            name={"Bukola Santa"}
            borderRadius={"xl"}
            rotate={"-16"}
            w={"32"}
            h={"32"}
            size={"full"}
            bg="linear-gradient(40deg, #81f242, red, black)"
            borderColor="blackAlpha.50"
            css={{
              "--avatar-size": "sizes.32",
              "--avatar-font-size": "fontSizes.3xl",
            }}
          >
            <span>.</span>
            <Float offset="-8" placement="middle-end" boxSize="24" top={20}>
              <Avatar
                rotate={"28"}
                borderRadius={"xl"}
                bg="linear-gradient(40deg, black, purple, #81f242)"
                w={"32"}
                h={"32"}
                size={"full"}
                name={"Elena Doe"}
              >
                <span>.</span>
              </Avatar>
            </Float>
          </Avatar>
        </Center>

        <DrawerHeader
          maxW={"md"}
          mx={"auto"}
          textTransform={"uppercase"}
          fontFamily={"Blimone"}
        >
          <DrawerTitle fontSize={"2xl"}>Bukola & Elena</DrawerTitle>
        </DrawerHeader>

        <DrawerBody
          textAlign={"center"}
          mb={0}
          pb={0}
          fontSize={"sm"}
          maxW={"4xl"}
          mx={"auto"}
        >
          <Text maxW={"sm"}>
            Hi, Elena, you have been paired with{" "}
            <strong>Father Christmas 😆 </strong>
            click the button below to match yourself with a new pair
          </Text>

          <Stack mt={16}>
            <Button
              mt={4}
              ring={"1px"}
              ringColor={"bg.subtle"}
              boxShadow={"lg"}
              variant="subtle"
              size="md"
            >
              Generate a new pair <FiChevronRight />
            </Button>
          </Stack>
        </DrawerBody>
        <DrawerFooter />
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
