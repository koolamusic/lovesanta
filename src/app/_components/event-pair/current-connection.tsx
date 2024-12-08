import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuGlobe, LuLinkedin, LuPlus, LuTwitter } from "react-icons/lu";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export const CurrentConnection = () => {
  return (
    <Container
    bg={{ base: "bg.subtle", _dark: "transparent" }}
    py="20"
    maxW="sm"
    // ring={"1px"}
    // boxShadow="lg"
      // ringColor={{ base: "gray.200", _dark: "bg.muted" }}
      borderRadius={"lg"}
    >
      <Stack gap="4">
        <Avatar
          alignSelf="left"
          name={data.name}
          src={data.image}
          css={{
            "--avatar-size": "sizes.20",
            "--avatar-font-size": "fontSizes.2xl",
          }}
        />

        <Box textAlign="left" w="full">
          <Heading size="lg">{data.name}</Heading>
          <Text color="fg.muted">{data.title}</Text>
        </Box>

        <Button alignSelf="stretch" size="sm" mb="2">
          <LuPlus />
          Follow
        </Button>

        <Stack gap="2">
          <Text fontWeight="medium">Their Wishlist</Text>
          <Box color="fg.muted">{data.description}</Box>
        </Stack>

        <Stack gap="2">
          <Text fontWeight="medium">Socials</Text>
          <Stack>
            {data.social.map((item) => (
              <HStack key={item.label} color="fg.muted">
                {item.icon}
                <Link href={item.url} color="inherit">
                  {item.label}
                </Link>
              </HStack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

const data = {
  name: "Elena Doe",
  image: "https://i.pravatar.cc/300?u=90",
  title: "Product Designer & Developer",
  description:
    "Leading design systems at Ipsum Technologies. Passionate about creating user-friendly and accessible products.",
  social: [
    {
      label: "LinkedIn",
      icon: <LuLinkedin />,
      url: "#",
    },
    {
      label: "Twitter",
      icon: <LuTwitter />,
      url: "#",
    },
    {
      label: "Website",
      icon: <LuGlobe />,
      url: "#",
    },
  ],
};
