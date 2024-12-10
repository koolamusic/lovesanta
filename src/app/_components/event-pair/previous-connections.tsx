import {
  Badge,
  Box,
  Card,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { type MatchHistory, type User } from "@prisma/client";
import { LuConstruction } from "react-icons/lu";
import { Avatar } from "~/components/ui/avatar";

type ReceiverHistory = MatchHistory & {
  receiver: Pick<User, "name" | "id" | "image" | "username" | "region" | "bio">;
};

interface HistoryProps {
  history: ReceiverHistory[];
}

export const PreviousConnections = ({ history }: HistoryProps) => {
  if (history.length === 0) {
    return (
      <Card.Root variant="elevated" boxShadow="lg">
        <Card.Header>
          <Card.Title display={"flex"}>
            <HStack spaceX={2} align={"center"}>
              <LuConstruction />
              You have no previous pair
            </HStack>
          </Card.Title>
        </Card.Header>
        <Card.Body px={6} color={"fg.muted"}>
          If you have been paired with someone before, you would see them as
          previous connections here
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root variant="elevated" boxShadow="lg">
      <Card.Header>
        <Card.Title>Your previous connections</Card.Title>
        <Card.Description>
          You previously got paired with the following individuals
        </Card.Description>
      </Card.Header>
      <Card.Body gap="4">
        <Separator />
        <Text textStyle="sm" fontWeight="medium">
          It could have been
        </Text>
        {history.map((member) => (
          <Member key={member.id} {...member} />
        ))}
      </Card.Body>
    </Card.Root>
  );
};

const Member = (props: ReceiverHistory) => {
  // const { name, avatar, email } = props;
  const {
    receiver: { name, username, bio, image, region },
    matchedAt,
    attemptNo,
  } = props;

  return (
    <Stack
      borderRadius={"xl"}
      direction="row"
      gap="8"
      justify="space-between"
      align="center"
    >
      <Stack direction="row" gap="3">
        <Avatar
          bg="linear-gradient(40deg, blue, purple, #81f242)"
          src={image ?? ""}
          name={name ?? "John Doe"}
        />
        <Box>
          <Text textStyle="sm" fontWeight="medium">
            {name}
          </Text>
          <HStack>
            <Text textStyle="sm" color="fg.muted">
              <span>@</span>
              {username}
            </Text>

            <Badge
              bg="linear-gradient(40deg, #730b0b, #0d0d02, #a7ff77)"
              color={"gray.50"}
              ml="1"
            >
              {region}
            </Badge>
          </HStack>
        </Box>
      </Stack>
    </Stack>
  );
};
