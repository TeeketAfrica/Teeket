import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First name cannot be empty" })
    .min(3, { message: "First name is too short" })
    .max(50, { message: "First name is too long" }),
  lastName: z
    .string({ required_error: "Last name cannot be empty" })
    .min(3, { message: "Last name is too short" })
    .max(50, { message: "Last name is too long" }),
});

export const AccountName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { isDirty } = useFormState({ control: control });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <VStack w="100%" alignItems="start" justifyContent="start">
      <Text fontSize="2xl" fontWeight={600}>
        Account Name
      </Text>
      <HStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        justifyContent="space-between"
        w="100%"
        alignItems="center"
      >
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  w="375px"
                  isInvalid={!!errors.firstName}
                  errorBorderColor="red.300"
                />
              </InputGroup>
              {errors.firstName && (
                <FormErrorMessage color="red.500" fontSize="sm">
                  {errors.firstName.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Last Name"
                  {...register("lastName")}
                  w="375px"
                  isInvalid={!!errors.lastName}
                  errorBorderColor="red.300"
                />
              </InputGroup>
              {errors.lastName && (
                <FormErrorMessage color="red.500" fontSize="sm">
                  {errors.lastName.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
        </Grid>
        <Button
          type="submit"
          backgroundColor="#06CC06"
          variant="primary"
          fontSize={14}
          color="#fff"
          fontWeight={600}
          lineHeight={0}
          disabled={!isDirty}
        >
          Save Change
        </Button>
      </HStack>
    </VStack>
  );
};
