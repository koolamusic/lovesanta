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
import { Participant, User, Event } from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next-nprogress-bar";


type CombinedParticipantWithUserAndEvent = Participant & { user?: User, event?: Event };


type PreferenceDrawerConfig = {
  participants: {
    giver: CombinedParticipantWithUserAndEvent;
    receiver: CombinedParticipantWithUserAndEvent;
  };
  event: Event;
};

export default function PairPreferenceDrawer({
  participants,
  event,
}: PreferenceDrawerConfig) {
  const [open, setOpen] = useState(false);

    const utils = api.useUtils();
    const router = useRouter();
  
    const regeneratePairMutation = api.post.regenerateGiverPair.useMutation({
      onSuccess: async () => {
        await utils.post.invalidate();
        router.refresh();
      },

      onError: (error) => {
        console.error(error);
        alert(error.message);
        utils.post.invalidate();

      }
    });

  const giverName = participants.giver.user?.name || "Bukola Santa";
  const receiverName = participants.receiver.user?.name || "Elena Doe";

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
            name={giverName}
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
                name={receiverName}
              >
                <span>.</span>
              </Avatar>
            </Float>
          </Avatar>
        </Center>

        <DrawerHeader
          maxW={"md"}
          mx={"auto"}
          textTransform={"capitalize"}
          fontFamily={"Blimone"}
        >
          <DrawerTitle fontSize={"lg"}>{giverName} & {receiverName}</DrawerTitle>
        </DrawerHeader>

        <DrawerBody
          textAlign={"center"}
          mb={0}
          pb={0}
          fontSize={"sm"}
          maxW={"4xl"}
          mx={"auto"}
        >
          <Text maxW={"xs"}>
            Hi, {giverName}, you have been paired with{" "}
            <strong>{receiverName} 😆 </strong> while this is not permanent, if you do not like <span>{receiverName}{' '}</span>
  and would like to randomly pair with another person, click the button below to try your luck.
          </Text>

          <Stack mt={10}>
            <Button
              mt={4}
              ring={"1px"}
              ringColor={"bg.subtle"}
              boxShadow={"lg"}
              variant="subtle"
              size="md"
              rounded={'l3'}
              loading={regeneratePairMutation.isPending}
              onClick={async () => {
                void regeneratePairMutation.mutate({ 
                  eventId: event.id, 
                  participantId: participants.giver.id, 
                });
              }}
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
