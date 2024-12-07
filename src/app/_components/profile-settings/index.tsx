import { Button, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { LuAtSign } from "react-icons/lu";
import { SiApple, SiGoogle } from "react-icons/si";
import { AuthCard } from "./auth-card";
import { WishlistCard } from "./profile-wishlist-card";

export const ProfileSettingComponent = () => {
  return (
    <Container maxW="xl" py="20">
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
            title="username"
            description="Use this to sign in"
            connected
          >
            <Flex gap="4" align="center" width="full">
              <Text textStyle="sm" color={"fg.muted"} flex="1">
                BUKOLA SANTA
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
            description="What gifts would you like from Secret Santa "
          />
          {/* <AuthCard icon={<SiApple />} title="Apple" description="Connect your Apple account" /> */}
        </Stack>
      </Stack>
    </Container>
  );
};
