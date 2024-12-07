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
import { events } from "./_data";
import { LuChevronRight, LuUser } from "react-icons/lu";

export const calculateDaysAgo = (dateString: string): string => {
  const eventDate = new Date(dateString);
  const today = new Date();

  if (eventDate > today) {
    const daysToGo = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `${daysToGo} days to go`;
  }
  const diffTime = Math.abs(today.getTime() - eventDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export const EventFeedComponent = () => {
  return (
    <Container maxW="3xl" py={{ base: "12", md: "24" }}>
      <Stack gap="6">
        {events.map((event) => (
          <Flex
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
                <Text textStyle="sm" fontWeight="semibold" color={"fg.muted"}>
                  {event.name}
                </Text>
              </HStack>
              {/* <Text textStyle="lg" fontWeight="semibold" mt="2">
                {event.name}
              </Text>
              <Text color="fg.muted" lineClamp={2}>
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
                      {event.participants} participants
                    </Text>
                  </HStack>
                  <Status hideBelow="sm">{event.year}</Status>
                </HStack>
              </HStack>
            </Stack>
            <VStack px="4" justify="center" flexShrink="0">
              <LuChevronRight />
              {/* <Text textStyle="sm" fontWeight="semibold">
              {feed.upvotes}
            </Text> */}
            </VStack>
          </Flex>
        ))}
      </Stack>
    </Container>
  );
};
