"use client";

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
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Field } from "~/components/ui/field";
import { PinInput } from "~/components/ui/pin-input";
import { LuArrowRight } from "react-icons/lu";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { routes } from "../common/routes";

interface FormValues {
  username: string;
  passcode: string;
}

export const AuthenticateStack = () => {
  /**
   * @operation
   * When we already have a user session, we can redirect the user to the home page
   * or do a conditional render of the root app page, however in this case, we are
   * redirecting the user to the home page.
   */
  const session = useSession();
  if (session?.data && session?.data.user) {
    redirect(routes.home);
  }

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

export const CredentialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  console.error(errors);

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials", {
      redirectTo: "/home",
      username: data.username,
      passcode: data.passcode,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="6">
        <VStack gap="6">
          <Field errorText={errors.username?.message} label="Your username">
            <Input
              type="text"
              autoComplete="username"
              {...register("username", { required: "you need a username" })}
            />
          </Field>

          <Field errorText={errors.passcode?.message} label="Your Passcode">
            <PinInput
              count={6}
              size="xl"
              placeholder=""
              {...register("passcode", { required: "passcode is required" })}
            />
          </Field>
        </VStack>

        <Stack gap="4">
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="plain" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Button type="submit" loading={isSubmitting}>
            Sign in <LuArrowRight />
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
