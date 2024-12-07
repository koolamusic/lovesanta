"use client";

import { Stack, Textarea } from "@chakra-ui/react";
import { Field } from "~/components/ui/field";
import { useForm } from "react-hook-form";

import { Box, Button, Card, HStack, Icon } from "@chakra-ui/react";

interface WishlistCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  connected?: boolean;
  children?: React.ReactNode;
}

export const WishlistCard = (props: WishlistCardProps) => {
  const { icon, title, description, connected, children } = props;
  return (
    <Card.Root size="sm">
      <Card.Body>
        <HStack gap="4">
          <Box flex="1">
            <Card.Title>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
          </Box>
        </HStack>
        <FormStack />
      </Card.Body>
      {children && <Card.Footer>{children}</Card.Footer>}
    </Card.Root>
  );
};

interface FormValues {
  username: string;
  bio: string;
}

const FormStack = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="6" mt={6} align="flex-start" maxW="lg">
        <Field
          //   label="Profile bio"
          invalid={!!errors.bio}
          helperText="A short description of yourself"
          errorText={errors.bio?.message}
        >
          <Textarea
            borderRadius={"lg"}
            rows={8}
            minH={"124px"}
            fontSize={"16px"}
            resize={"none"}
            placeholder="I want the new iphone 16 with caramel crust cupcakes and ..."
            {...register("bio", { required: "Bio is required" })}
          />
        </Field>

        <Button
          borderRadius="lg"
          type="submit"
          size="sm"
          w="full"
          variant="outline"
          colorPalette="gray"
          bg="bg"
        >
          Update your wishlist
        </Button>
      </Stack>
    </form>
  );
};
