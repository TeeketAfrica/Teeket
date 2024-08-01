import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name cannot be empty" })
      .min(3, { message: "First name is too short" })
      .max(50, { message: "First name is too long" }),
    lastName: z
      .string({ required_error: "Last name cannot be empty" })
      .min(3, { message: "Last name is too short" })
      .max(50, { message: "Last name is too long" }),
    email: z.string().email({ message: "Invalid email" }),
    confirmEmail: z.string().email({ message: "Invalid email" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });

export const YourDetailsStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <VStack justifyContent="start" alignItems="start" spacing={4}>
        <Text color="gray.800" fontWeight={700} fontSize={36} maxW="700px">
          Your details
        </Text>
        <HStack>
          <Link to="/login">
            <Text fontWeight={600} color="textSuccess">
              Log in
            </Text>
          </Link>
          <Text fontSize={14} color="gray.600">
            for a better experience. Save your ticket to your profile
          </Text>
        </HStack>
      </VStack>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
        <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
          <GridItem colSpan={3}>
            <Input
              placeholder="First Name"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
              errorBorderColor="red.300"
            />
            {errors.firstName && (
              <Text color="red.500" fontSize="sm">
                {errors.firstName.message}
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              placeholder="Last Name"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorBorderColor="red.300"
            />
            {errors.lastName && (
              <Text color="red.500" fontSize="sm">
                {errors.lastName.message}
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              placeholder="Email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorBorderColor="red.300"
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message}
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              placeholder="Confirm Email"
              {...register("confirmEmail")}
              isInvalid={!!errors.confirmEmail}
              errorBorderColor="red.300"
            />
            {errors.confirmEmail && (
              <Text color="red.500" fontSize="sm">
                {errors.confirmEmail.message}
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={5}>
            <Button type="submit" bg="gray.800" width="full" variant="primary">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
