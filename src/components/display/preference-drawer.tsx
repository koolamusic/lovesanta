"use client";

import { Box, Center, Float, Text } from "@chakra-ui/react";
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
import {Avatar} from '~/components/ui/avatar'
import { data } from "tailwindcss/defaultTheme";

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
          Don&apos;t like this pair? Generate a new pair
        </Button>
      </DrawerTrigger>
      <DrawerTrigger />
      <DrawerContent minH={"50vh"} borderTopRadius={"3xl"}>
        <DrawerCloseTrigger />


<Center rotate={'8'} ml={'-24'} py={8} fontFamily={'Pixeboy'}>


              <Avatar
                    name={"Bukola Santa"}
                    borderWidth="1px"
                    borderRadius={'xl'}
                    rotate={'-16'}
                    w={'32'}
                    h={'32'}
                    size={'full'}
                    bg={'yellow.700'}


                    borderColor="blackAlpha.50"
                    css={{ '--avatar-size': 'sizes.32', '--avatar-font-size': 'fontSizes.3xl' }}
                    >
                      <span>.</span>
                    <Float
                      offset="-8"
                      placement="middle-end"
                      boxSize="24"
                      top={20}
                      >
                      <Avatar 
                      rotate={'28'}
                        borderRadius={'xl'}
                        w={'32'}
                        h={'32'}
                        size={'full'}
                         name={'Elena Doe'} 
                         bg={'teal.700'}>
                          <span>.</span>
                         </Avatar>
                    </Float>
                  </Avatar>

                      </Center>

                      <DrawerHeader maxW={"md"} mx={"auto"} textTransform={'uppercase'} fontFamily={"Blimone"}>

          <DrawerTitle fontSize={'2xl'}>Bukola & Elena</DrawerTitle>
        </DrawerHeader>

                  
        <DrawerBody textAlign={'center'} fontSize={"sm"} maxW={"4xl"} mx={"auto"}>
          <Text maxW={'sm'}>

          Hi, Elena, you have been paired with <strong>Father Christmas 😆 </strong>
         click the button below to match yourself with a new pair
          </Text>


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
