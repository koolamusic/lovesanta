"use client";

import { Stack, Textarea } from "@chakra-ui/react";
import { Field } from "~/components/ui/field";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

import { Box, Card, HStack } from "@chakra-ui/react";

interface WishlistCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  placeholder: string;
  children?: React.ReactNode;
}

const defaultBio =
  "I want the new iphone 16 with caramel crust cupcakes and ...";

export const WishlistCard = (props: WishlistCardProps) => {
  const { title, description, placeholder, children } = props;
  return (
    <Card.Root size="sm">
      <Card.Body>
        <HStack gap="4">
          <Box flex="1">
            <Card.Title>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
          </Box>
        </HStack>
        <FormStack placeholder={placeholder} />
      </Card.Body>
      {children && <Card.Footer>{children}</Card.Footer>}
    </Card.Root>
  );
};

interface FormValues {
  username: string;
  bio: string;
}

const FormStack = ({ placeholder = defaultBio }) => {
  const utils = api.useUtils();
  const updateWishlist = api.post.updateWishlist.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },

    onError: async (error) => {
      alert(error.message);
      await utils.post.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    updateWishlist.mutate({ bio: data.bio });
  });

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
            placeholder={placeholder}
            defaultValue={placeholder}
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
          loading={updateWishlist.isPending}
          bg="bg"
        >
          Update your wishlist
        </Button>
      </Stack>
    </form>
  );
};
