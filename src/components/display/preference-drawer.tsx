"use client";

import { Box, Text } from "@chakra-ui/react";
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
import { Button } from "../ui/button";

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
        <Button variant="outline" size="sm">
          Don't like this pair? Generate a new pair
        </Button>
      </DrawerTrigger>
      <DrawerTrigger />
      <DrawerContent minH={"60%"} borderTopRadius={"10px"}>
        <DrawerCloseTrigger />
        <DrawerHeader maxW={"4xl"} mx={"auto"} fontFamily={"heading"}>
          <DrawerTitle>Gift bag preferences</DrawerTitle>
        </DrawerHeader>
        <DrawerBody fontSize={"sm"} maxW={"4xl"} mx={"auto"}>
          We asked you all what you would like to receive for christmas, I know
          you are not <strong>Father Christmas 😆 </strong>
          but just in case you know the guy, here are a few things your pair
          would like:
          <Box
            p={8}
            bg={{ base: "gray.50", _dark: "gray.800" }}
            mt={2}
            borderRadius={"md"}
          >
            <Text mt={2} fontSize={"md"} fontFamily={"heading"}>
              {wishlist}
            </Text>
          </Box>
        </DrawerBody>
        <DrawerFooter />
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
