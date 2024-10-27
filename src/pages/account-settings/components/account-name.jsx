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

  Stack,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { setActiveUser } from "../../../features/activeUserSlice";
import { teeketApi } from "../../../utils/api";
import EmailInput from "../../auth/components/EmailInput";

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
  const user = useSelector((state) => state.activeUser);
  const [md] = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();


  const defaultVaules = user
    ? {
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
      }
    : {
        firstName: "",
        lastName: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultVaules,
  });

  const { isDirty } = useFormState({ control: control });

  const onSubmit = async (values) => {
    try {
      const response = await teeketApi.patch("/user/profile", {
        first_name: values.firstName,
        last_name: values.lastName,
        profile_image: user?.profile_image ?? "",
      });

      dispatch(setActiveUser(response));
      reset();
      toast({
        title: "Account Updated.",
        description: "You have successfully updated your account.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      if (!response) {
        throw new Error("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <VStack w="100%" alignItems="start" justifyContent="start">
      <Text fontSize={md ? "2xl" : "xl"} fontWeight={600}>
        Account Name
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
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder={user?.first_name ?? "First Name"}
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
                  placeholder={user?.first_name ?? "Last Name"}
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

        
      </Stack>
    </VStack>
  );
};
