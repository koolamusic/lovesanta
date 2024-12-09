"use client";

import { Box, Card, Separator, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "~/components/ui/avatar";

export const PreviousConnections = () => {
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
        {members.map((member) => (
          <Member key={member.name} {...member} />
        ))}
      </Card.Body>
    </Card.Root>
  );
};

const members = [
  {
    name: "Segun Adebayo",
    avatar: "https://avatars.githubusercontent.com/u/6916170?v=4",
    email: "segun@chakra-ui.com",
  },
  {
    name: "Christian Schröter",
    avatar: "https://avatars.githubusercontent.com/u/1846056?v=4",
    email: "chris@chakra-ui.com",
  },
  {
    name: "Philipp Körner",
    avatar: "https://avatars.githubusercontent.com/u/153984143?v=4",
    email: "phil@chakra-ui.com",
  },
];

type Props = {
  name: string;
  avatar: string;
  email: string;
};

const Member = (props: Props) => {
  const { name, avatar, email } = props;

  return (
    <Stack
      borderRadius={"xl"}
      direction="row"
      gap="8"
      justify="space-between"
      align="center"
    >
      <Stack direction="row" gap="3">
        <Avatar src={avatar} name={name} />
        <Box>
          <Text textStyle="sm" fontWeight="medium">
            {name}
          </Text>
          <Text textStyle="sm" color="fg.muted">
            {email}
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
};
