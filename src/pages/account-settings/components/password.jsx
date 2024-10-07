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
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";
import EyeOpen from "../../../assets/icon/EyeOpen.svg";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Password cannot be empty" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z.string({
      required_error: "Confirm Password cannot be empty",
    }),
  })
  .refine((val, ctx) => val === ctx.parent.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Password = () => {
  const [show, setShow] = useState(false);
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
    <VStack w="100%" alignItems="flex-start">
      <Text fontSize="2xl" fontWeight={600}>
        Change Password
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
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  {...register("password")}
                  isInvalid={!!errors.password}
                  w="375px"
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? <EyeOpen /> : <EyeOpen />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage color="red.500" fontSize="sm">
                  {errors.password.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  w="375px"
                  type={show ? "text" : "confirmPassword"}
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? <EyeOpen /> : <EyeOpen />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <FormErrorMessage color="red.500" fontSize="sm">
                  {errors.confirmPassword.message}
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
