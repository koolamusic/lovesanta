import { Box, Card, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { MatchHistory, User } from "@prisma/client";
import { LuConstruction, LuInfo } from "react-icons/lu";
import { Avatar } from "~/components/ui/avatar";


type ReceiverHistory = MatchHistory & {receiver: User};

interface HistoryProps {
  history: ReceiverHistory[];
}

export const PreviousConnections = ({ history }: HistoryProps) => {

  if (history.length === 0) {
    return (
      <Card.Root variant="elevated" boxShadow="lg">
      <Card.Header>
        <Card.Title display={'flex'}>
          <HStack spaceX={2} align={'center'}>
            <LuConstruction /> 
            You have no previous pair
            </HStack>
            </Card.Title>
      </Card.Header>
        <Card.Body px={6} color={'fg.muted'}>
          If you have been paired with someone before, you would see them as previous connections here
      </Card.Body>
    </Card.Root>
    )
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

type MemberProps = {
  name: string;
  avatar: string;
  email: string;
};

const Member = (props: MemberProps) => {
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
