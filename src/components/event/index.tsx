import {
  Badge,
  Container,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Status } from "~/components/ui/status";
import { Event } from "./_data";
import { LuChevronRight, LuUser } from "react-icons/lu";
import { calculateDaysAgo } from "~/app/common/helpers";
import Link from "next/link";

type EventFeedComponentProps = {
  events: Event[];
};

export const EventFeedComponent = ({ events }: EventFeedComponentProps) => {
  return (
    <Container maxW="3xl" py={{ base: "12", md: "24" }}>
      <Stack gap="6">
        {events.map((event) => (
          <Link
            href={event.status != "ended" ? `/event/${event.id}` : "#"}
            key={event.id}
          >
            <Flex
              _hover={{
                bg: "bg.subtle",
                opacity: 0.9,
                color: "lime.600",
              }}
              key={event.id}
              borderWidth="1px"
              borderRadius="l3"
              divideX="1px"
              bg="bg"
              _disabled={{ bg: "bg.subtle", cursor: "not-allowed" }}
              aria-disabled={event.status === "ended"}
            >
              <Stack p="6" flex="1">
                <HStack>
                  <Badge variant="surface" alignSelf="flex-start">
                    {event.status}
                  </Badge>
                  <Text
                    textStyle="sm"
                    textTransform={"uppercase"}
                    fontWeight="semibold"
                    color={"fg.muted"}
                  >
                    {event.name}
                  </Text>
                </HStack>
                {/* <Text color="fg.muted" lineClamp={2}>
                  {event.description}
                </Text> */}

                <HStack fontWeight="medium" mt="4">
                  <Text textStyle="sm" color="fg.muted">
                    {calculateDaysAgo(event.date)}
                  </Text>
                  <Spacer />

                  <HStack gap="4">
                    <HStack gap="1">
                      <LuUser />

                      <Text textStyle="sm" color="fg.muted">
                        {Number(event.participants ?? 0)} participants
                      </Text>
                    </HStack>
                    <Status hideBelow="sm">{event.year}</Status>
                  </HStack>
                </HStack>
              </Stack>
              <VStack
                color={event.status == "ended" ? "fg.subtle" : "fg"}
                px="4"
                justify="center"
                flexShrink="0"
              >
                <LuChevronRight />
                <Text textStyle="sm" fontWeight="semibold">
                  {"view"}
                </Text>
              </VStack>
            </Flex>
          </Link>
        ))}
      </Stack>
    </Container>
  );
};
