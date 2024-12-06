import {
  Container,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Field } from "~/components/ui/field";
import { PinInput } from "~/components/ui/pin-input";
import { LuArrowRight } from "react-icons/lu";

export const CredentialForm = () => (
  <Stack gap="6">
    <VStack gap="6">
      <Field label="Your username">
        <Input type="username" />
      </Field>

      <Field label="Your Passcode">
        <PinInput count={6} size="xl" placeholder="" />
      </Field>
    </VStack>

    <Stack gap="4">
      <HStack justify="space-between">
        <Checkbox defaultChecked>Remember me</Checkbox>
        <Button variant="plain" size="sm">
          Forgot password
        </Button>
      </HStack>
      <Button>
        Sign in <LuArrowRight />
      </Button>
      {/* <Button variant="outline">
            <BsGoogle />
            Sign in with Google
          </Button> */}
    </Stack>
  </Stack>
);

export const AuthenticateStack = () => {
  return (
    <Container maxW="sm" py={{ base: "12", md: "24" }}>
      <Stack gap="8">
        <Stack gap={{ base: "2", md: "3" }} textAlign="center">
          <Heading fontFamily={"Alliance"} size={{ base: "3xl", md: "4xl" }}>
            Welcome back
          </Heading>
          <Text color="fg.muted">Sign in with your username to begin</Text>
        </Stack>

        <CredentialForm />

        <Text textStyle="sm" color="fg.muted" textAlign="center">
          Not sure if you have a profile?{" "}
          <Link variant="underline" href="#">
            Send a message
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};
