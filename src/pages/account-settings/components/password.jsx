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
  Stack,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useSelector } from "react-redux";
import * as z from "zod";
import EyeOpen from "../../../assets/icon/EyeOpen.svg";
import { authApi, teeketApi } from "../../../utils/api";
import useStorage from "../../../utils/storage";

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
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Password = () => {
  const [md] = useMediaQuery("(min-width: 768px)");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const { getAccessToken } = useStorage();
  const access_token = getAccessToken();
  const user = useSelector((state) => state.activeUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isDirty } = useFormState({ control: control });

  const onSubmit = async (data) => {
    const { password } = data;

    try {
      const response = await authApi.post("/reset_password", {
        uidb64: user?.id,
        new_password: JSON.stringify({ password }),
        token: access_token,
      });

      if (!response.ok) {
        throw new Error("Failed to update password.");
      }
      reset();
      toast({
        title: "Password Updated.",
        description: "You have successfully updated your password.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <VStack w="100%" alignItems="flex-start">
      <Text fontSize={md ? "2xl" : "xl"} fontWeight={600}>
        Change Password
      </Text>
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        justifyContent="space-between"
        w="100%"
        alignItems={md ? "center" : "start"}
        flexDir={md ? "row" : "column"}
      >
        <Grid
          templateColumns={md ? "repeat(6, 1fr)" : "repeat(1, 1fr)"}
          gap={6}
        >
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
                  type={show ? "text" : "password"}
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
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                className="animate-spin"
              />
              Saving Change...
            </>
          ) : (
            "Save Change"
          )}
        </Button>
      </Stack>
    </VStack>
  );
};
