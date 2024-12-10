"use client";

import { Box, Stack, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface RequestPairProps {
  participantId: string;
  eventId: string;
}

const RequestPair = ({ participantId, eventId }: RequestPairProps) => {
  const utils = api.useUtils();
  const router = useRouter();

  if (!participantId || !eventId) {
    return null;
  }

  const generatePairMutation = api.post.generateNewPair.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      router.push(`/event/${eventId}`);
    },
    onError: async (error) => {
      await utils.post.invalidate();
      console.error(error);
      alert(error.message);
    },
  });

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      color="white"
      textAlign="center"
    >
      <VStack spaceY={6}>
        <Stack maxW={"xs"} py={12} textAlign={"center"}>
          <Heading fontFamily={"Blimone"}>
            You don&apos;t have any pair. Click the button below to generate one
          </Heading>
        </Stack>

        <Box animation={"pulse 6s infinite"}>
          <Button
            w="100px"
            h="100px"
            loading={generatePairMutation.isPending}
            borderRadius="full"
            data-state="open"
            bg="green.700"
            boxShadow="0 0 100px #008f0050, 0 0 20px #008f0010, 0 0 30px #20802040, 0 0 40px #008f00, 0 0 50px #208020, 0 0 60px #008f00, 0 0 70px #208020"
            color="white"
            _hover={{ bg: "green.600" }}
            onClick={async () => {
              void generatePairMutation.mutate({ participantId, eventId });
            }}
          >
            GENERATE
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default RequestPair;
