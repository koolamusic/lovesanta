import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuAtSign } from "react-icons/lu";
import { SiApple, SiGoogle } from "react-icons/si";
import { AuthCard } from "./auth-card";
import { WishlistCard } from "./profile-wishlist-card";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { Avatar } from "~/components/ui/avatar";

export const ProfileSettingComponent = async () => {
  const session = await auth();

  const profile = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return (
    <Container maxW="xl" py="12">
      <Stack pb={2}>
        <Avatar size="lg" name={profile.name as string} />
      </Stack>

      <Stack gap="6">
        <Stack gap="1">
          <Text fontWeight="semibold" textStyle="lg">
            Your profile
          </Text>
          <Text color="fg.muted">Manage your settings</Text>
        </Stack>
        <Stack gap="4">
          <AuthCard
            icon={<LuAtSign />}
            title={profile.username ?? "username"}
            description="Use username to login"
            connected
          >
            <Flex gap="4" align="center" width="full">
              <Text
                textTransform={"uppercase"}
                textStyle="sm"
                color={"fg.muted"}
                flex="1"
              >
                {profile.name}
              </Text>
              <HStack colorPalette="gray">
                {/* <Button size="xs" variant="outline">
                  Change email
                </Button> */}
                <Button size="xs" variant="outline">
                  Change passcode
                </Button>
              </HStack>
            </Flex>
          </AuthCard>
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
