import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as z from "zod";
import {
  selectActiveUser,
  setUserFirstName,
  setUserLastName,
} from "../../../../features/activeUserSlice";
import {
  selectEventDetails,
  setIsSetDetails,
  setTicketUserDetails,
} from "../../../../features/eventSlice";
import useStorage from "../../../../utils/storage";
import { teeketApi } from "../../../../utils/api";

const visitorsFormSchema = z
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

const userFormSchema = z.object({
  firstName: z
    .string({ required_error: "First name cannot be empty" })
    .min(3, { message: "First name is too short" })
    .max(50, { message: "First name is too long" }),
  lastName: z
    .string({ required_error: "Last name cannot be empty" })
    .min(3, { message: "Last name is too short" })
    .max(50, { message: "Last name is too long" }),
  email: z.string().email({ message: "Invalid email" }).optional(),
});

export const YourDetailsStep = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const activeUser = useSelector(selectActiveUser);
  const eventDetails = useSelector(selectEventDetails);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setFirstName(activeUser?.first_name);
      setValue("firstName", firstName);
      setLastName(activeUser?.last_name);
      setValue("lastName", lastName);
      setEmail(activeUser?.email);
    } else {
      setFirstName(eventDetails?.ticketUserDetails?.firstName);
      setValue("firstName", firstName);
      setLastName(eventDetails?.ticketUserDetails?.lastName);
      setValue("lastName", lastName);
      setEmail(eventDetails?.ticketUserDetails?.email);
      setValue("email", email);
    }
  }, [activeUser]);

  useEffect(() => {
    setIsSubmited(false);
  }, [firstName, lastName, email]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activeUser ? userFormSchema : visitorsFormSchema),
  });

  const userTicketDetailSubmit = async () => {
    const { getAccessToken } = useStorage();
    const token = getAccessToken();

    if (Object.keys(errors).length === 0) {
      if (activeUser && firstName && lastName) {
        try {
          dispatch(
            setTicketUserDetails({
              firstName: firstName,
              lastName: lastName,
              email: email,
            })
          );
          setIsSubmited(true);
          dispatch(setIsSetDetails(true));
          toast({
            title: "Names Set.",
            description:
              "You have successfully set your first and last name. You can proceed to checkout",
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "top",
          });
        } catch (error) {
          console.error("Error updating profile:", error?.message);
        }
      } else {
        if (email) {
          dispatch(
            setTicketUserDetails({
              firstName: firstName,
              lastName: lastName,
              email: email,
            })
          );
        } else {
          dispatch(
            setTicketUserDetails({ firstName: firstName, lastName: lastName })
          );
        }
        dispatch(setIsSetDetails(true));
        setIsSubmited(true);
        toast({
          title: "Names Set.",
          description:
            "You have successfully set your first and last name. You can proceed to checkout",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  const handleFirstInputChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastInputChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <VStack justifyContent="start" alignItems="start" spacing={4}>
        <Text color="gray.800" fontWeight={700} fontSize={36} maxW="700px">
          Your details
        </Text>
        {activeUser ? (
          <HStack>
            <Text fontSize={14} color="gray.600">
              You are logged in as {activeUser.email}
            </Text>{" "}
            <Text
              fontWeight={600}
              color="textSuccess"
              cursor="pointer"
              onClick={() => setShowEmailBox(true)}
            >
              Not you?
            </Text>
          </HStack>
        ) : (
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
        )}
      </VStack>
      {activeUser ? (
        <Box
          as="form"
          onSubmit={handleSubmit(userTicketDetailSubmit)}
          width="100%"
        >
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
            {showEmailBox && (
              <GridItem colSpan={6}>
                <Input
                  placeholder={activeUser.email}
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorBorderColor="red.300"
                  onChange={handleInputChange}
                  name="email"
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {errors.email.message}
                  </Text>
                )}
              </GridItem>
            )}
            <GridItem colSpan={6}>
              <Text color="gray.600" fontSize="sm">
                These name below will appear on your profile. You can customize
                it if you want so.
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Input
                placeholder="First Name"
                {...register("firstName")}
                isInvalid={!!errors.firstName}
                errorBorderColor="red.300"
                value={firstName}
                name="firstName"
                onChange={handleFirstInputChange}
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
                name="lastName"
                value={lastName}
                onChange={handleLastInputChange}
                isInvalid={!!errors.lastName}
                errorBorderColor="red.300"
              />
              {errors.lastName && (
                <Text color="red.500" fontSize="sm">
                  {errors.lastName.message}
                </Text>
              )}
            </GridItem>
            <GridItem colSpan={5}>
              <Button
                type="submit"
                bg="gray.800"
                width="full"
                variant="primary"
                disabled={isSubmited}
              >
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box as="form" onSubmit={userTicketDetailSubmit} width="100%">
          <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
            <GridItem colSpan={3}>
              <Input
                placeholder="First Name"
                {...register("firstName")}
                isInvalid={!!errors.firstName}
                errorBorderColor="red.300"
                name="firstName"
                value={firstName}
                onChange={handleFirstInputChange}
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
                name="lastName"
                value={lastName}
                onChange={handleLastInputChange}
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
                value={email}
                name="lastName"
                onChange={handleEmailInputChange}
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
                name="lastName"
                onChange={handleInputChange}
              />
              {errors.confirmEmail && (
                <Text color="red.500" fontSize="sm">
                  {errors.confirmEmail.message}
                </Text>
              )}
            </GridItem>
            {/* <GridItem colSpan={5}>
                            <Button
                                type="submit"
                                bg="gray.800"
                                width="full"
                                variant="primary"
                            >
                                Submit
                            </Button>
                        </GridItem> */}
          </Grid>
        </Box>
      )}
    </>
  );
};
