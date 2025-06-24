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

const visitorsFormSchema = z
  .object({
    firstName: z.string().min(3, "First name is too short").max(50),
    lastName: z.string().min(3, "Last name is too short").max(50),
    email: z.string().email("Invalid email"),
    confirmEmail: z.string().email("Invalid email"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });

const userFormSchema = z.object({
  firstName: z.string().min(3, "First name is too short").max(50),
  lastName: z.string().min(3, "Last name is too short").max(50),
  email: z.string().email("Invalid email").optional(),
});

export const YourDetailsStep = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();

  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = token || activeUser?.is_creator !== null;

  const eventDetails = useSelector(selectEventDetails);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailBox, setShowEmailBox] = useState(false);
  const { isSetDetails, ticketUserDetails } = useSelector(selectEventDetails);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isAuthenticated ? userFormSchema : visitorsFormSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      setFirstName(activeUser?.first_name || "");
      setLastName(activeUser?.last_name || "");
      setEmail(activeUser?.email || "");

      setValue("firstName", activeUser?.first_name || "");
      setValue("lastName", activeUser?.last_name || "");
      setValue("email", activeUser?.email || "");
    } else {
      setFirstName(eventDetails?.ticketUserDetails?.firstName || "");
      setLastName(eventDetails?.ticketUserDetails?.lastName || "");
      setEmail(eventDetails?.ticketUserDetails?.email || "");

      setValue("firstName", eventDetails?.ticketUserDetails?.firstName || "");
      setValue("lastName", eventDetails?.ticketUserDetails?.lastName || "");
      setValue("email", eventDetails?.ticketUserDetails?.email || "");
      setValue("confirmEmail", eventDetails?.ticketUserDetails?.email || "");
    }
  }, [activeUser, eventDetails]);

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        setTicketUserDetails({
          firstName,
          lastName,
          email,
        })
      );
      dispatch(setIsSetDetails(true));

      toast({
        title: "Names Set.",
        description:
          "You have successfully set your first and last name. You can proceed to checkout.",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <VStack justifyContent="start" alignItems="start" spacing={4}>
        <Text color="gray.800" fontWeight={700} fontSize={36} maxW="700px">
          Your details
        </Text>

        {isAuthenticated ? (
          <HStack>
            <Text fontSize={14} color="gray.600">
              You are logged in as {activeUser?.email}
            </Text>
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

      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
        <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
          {isAuthenticated && showEmailBox && (
            <GridItem colSpan={6}>
              <Input
                placeholder={activeUser?.email}
                {...register("email")}
                name="email"
                isInvalid={!!errors.email}
                errorBorderColor="red.300"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValue("email", e.target.value);
                  dispatch(setIsSetDetails(false));
                }}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </GridItem>
          )}

          {!isAuthenticated && (
            <>
              <GridItem colSpan={3}>
                <Input
                  placeholder="Email"
                  {...register("email")}
                  name="email"
                  isInvalid={!!errors.email}
                  errorBorderColor="red.300"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValue("email", e.target.value);
                    dispatch(setIsSetDetails(false));
                  }}
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
                  name="confirmEmail"
                  isInvalid={!!errors.confirmEmail}
                  errorBorderColor="red.300"
                  onChange={(e) => {
                    setValue("confirmEmail", e.target.value)
                    dispatch(setIsSetDetails(false));
                  }}
                />
                {errors.confirmEmail && (
                  <Text color="red.500" fontSize="sm">
                    {errors.confirmEmail.message}
                  </Text>
                )}
              </GridItem>
            </>
          )}

          <GridItem colSpan={3}>
            <Input
              placeholder="First Name"
              {...register("firstName")}
              name="firstName"
              isInvalid={!!errors.firstName}
              errorBorderColor="red.300"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setValue("firstName", e.target.value);
                dispatch(setIsSetDetails(false));
              }}
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
              isInvalid={!!errors.lastName}
              errorBorderColor="red.300"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setValue("lastName", e.target.value);
                dispatch(setIsSetDetails(false));
              }}
            />
            {errors.lastName && (
              <Text color="red.500" fontSize="sm">
                {errors.lastName.message}
              </Text>
            )}
          </GridItem>

          <GridItem colSpan={6}>
            <Button
              type="submit"
              bg="gray.800"
              width="full"
              variant="primary"
              disabled={isSetDetails}
            >
              Submit
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
