import {
  Button,
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuAtSign, LuUserCog } from "react-icons/lu";
import { SiGoogle } from "react-icons/si";
import { AuthCard, ConfigPanel } from "./auth-card";
import { WishlistCard } from "./profile-wishlist-card";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { Avatar } from "~/components/ui/avatar";
import { PinInput } from "~/components/ui/pin-input";

export const ProfileSettingComponent = async () => {
  const session = await auth();

  const profile = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  if (!profile) {
    return <div>You are not logged in</div>;
  }

  return (
    <Container maxW="xl" py="12">
      <Stack pb={2}>
        <Avatar
          bg="linear-gradient(40deg, blue, purple, #81f242)"
          size="lg"
          name={profile.name ?? "Santa Clause"}
        />
      </Stack>

      <Stack gap="6">
        <Stack gap="0" mt={2}>
          <Text textTransform={"uppercase"} textStyle="md">
            {profile.name}
          </Text>
          <Text fontWeight={"medium"} color="fg.muted">
            Manage your settings
          </Text>
        </Stack>
        <Stack gap="4">
          <AuthCard
            icon={<LuAtSign />}
            title={profile.username ?? "username"}
            description="Use username to login"
            connected
          />

          <ConfigPanel>
            <Stack gap="4" w="full">
              <HStack justify={"flex-start"}>
                <Icon>
                  <LuUserCog />
                </Icon>
                <Text
                  textAlign={"left"}
                  fontWeight={"semibold"}
                  letterSpacing={"1.2px"}
                  textStyle="md"
                  color="fg.muted"
                >
                  Change your passcode
                </Text>
              </HStack>
              <VStack
                pt={3}
                px={1}
                w={"full"}
                colorPalette="gray"
                borderColor={"fg.subtle"}
              >
                <PinInput
                  w={"full"}
                  count={6}
                  size="md"
                  spaceX={0.5}
                  fontSize={"16px"}
                  placeholder=""
                />
                <Button w={"full"} size="xs" variant="outline">
                  Change passcode
                </Button>
              </VStack>
            </Stack>
          </ConfigPanel>

          <WishlistCard
            icon={<SiGoogle />}
            title="Wishlist"
            // @ts-expect-error type mismatch
            placeholder={profile.bio}
            description="What gifts would you like from Secret Santa "
          />
          {/* <AuthCard icon={<SiApple />} title="Apple" description="Connect your Apple account" /> */}
        </Stack>
      </Stack>
    </Container>
  );
};
