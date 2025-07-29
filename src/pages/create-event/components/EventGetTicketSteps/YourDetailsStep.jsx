import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import InfoIcon from "@/assets/icon/info-icon.svg";
import { teeketApi } from "../../../../utils/api";
import { TickCircle } from "iconsax-react";

export const visitorsFormSchema = z
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

export const userFormSchema = z.object({
  firstName: z.string().min(3, "First name is too short").max(50),
  lastName: z.string().min(3, "Last name is too short").max(50),
  email: z.string().email("Invalid email").optional(),
});

export const YourDetailsStep = ({
  isAuthenticated,
  activeUser,
  selectedOption,
  setSelectedOption,
  fName,
  lName,
  getValuesSelf,
  getValuesOthers,
  setValueSelf,
  setValueOthers,
  register,
  registerOthers,
  errorsSelf,
  errorsOthers,
  errors
}) => {
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <VStack w="100%" alignItems="start" spacing={4}>
        <Text color="gray.800" fontWeight={700} fontSize={36}>
          Your details
        </Text>

        {isAuthenticated ? (
          <HStack flexWrap="wrap">
            <Text fontSize={14} color="gray.600">
              You are logged in as {activeUser?.email}.
            </Text>
          </HStack>
        ) : (
          <HStack>
            <Text fontSize={14} color="gray.600">
              <Link to="/login">
                <span
                  onClick={() => navigate("/auth/login")}
                  style={{ fontWeight: 600, color: "#1BD01B", cursor: "pointer" }}
                >
                  Login {" "}
                </span>
              </Link>
              to save your ticket in your profile, or provide your details below and we'll create one for you.
            </Text>
          </HStack>
        )}
      </VStack>

      <Box as="form" width="100%">
        {
          isAuthenticated ? (
            <RadioGroup
              value={selectedOption}
              onChange={setSelectedOption}
            >
              <HStack
                spacing={"10px"}
                color="gray.800"
                fontWeight="medium"
                borderRadius={"12px"}
                border={"2px"}
                borderColor={"#E7ECE7"}
                flexWrap="wrap"
                flexDirection={"column"}
                backgroundColor={selectedOption === "self" ? "#F7FAF7" : "#FFFF"}
                paddingX={"10px"}
                paddingY={"1rem"}
              >
                <Radio
                  value="self"
                  borderColor={"#CBD1CB"}
                  w="100%"
                  display="flex"
                  flexDir={"row-reverse"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>
                    I am buying for myself
                  </Text>
                </Radio>
                {
                  selectedOption === "self" && (
                    <>
                      {/* <form onSubmit={handleSubmitSelf(onSubmitSelf)} style={{ width: "100%" }}> */}
                      <Grid
                        backgroundColor={"#FFFFFF"}
                        border={"1px"}
                        borderColor={"#E7ECE7"}
                        borderRadius={"7px"}
                        paddingX={"10px"}
                        paddingY={"1.5rem"}
                        w={"100%"}
                        gap={2}
                        gridTemplateColumns={[
                          "1fr",
                          null,
                          "repeat(2, 1fr)",
                          null,
                          "repeat(2, 1fr)",
                        ]}
                      >
                        <GridItem>
                          <FormControl isInvalid={!!errorsSelf.firstName}>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <Input
                              id="firstName"
                              placeholder="First Name"
                              {...register("firstName")}
                              // name="firstName"
                              onChange={(e) => {
                                setValueSelf("firstName", e.target.value);
                                dispatch(setIsSetDetails(false));
                              }}
                              errorBorderColor="red.300"
                            />
                            {errorsSelf.firstName && (
                              <Text color="red.500" fontSize="sm">
                                {errorsSelf.firstName.message}
                              </Text>
                            )}
                          </FormControl>

                        </GridItem>
                        <GridItem >
                          <FormControl isInvalid={!!errorsSelf.lastName}>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input
                              id="lastName"
                              placeholder="Last Name"
                              {...register("lastName")}
                              // name="lastName"
                              onChange={(e) => {
                                setValueSelf("lastName", e.target.value);
                                dispatch(setIsSetDetails(false));
                              }}
                              errorBorderColor="red.300"
                            />
                            {errorsSelf.lastName && (
                              <Text color="red.500" fontSize="sm">
                                {errorsSelf.lastName.message}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                      </Grid>
                      {/* </form> */}

                      <HStack spacing={2} w={"100%"}>
                        <InfoIcon size="24" variant="Bold" />
                        <Text fontSize={{ base: 12, md: 14 }} color="gray.600">
                          These name above will appear on your profile. You can customize it if you want so.
                        </Text>
                      </HStack>
                    </>
                  )
                }
              </HStack>

              <HStack
                spacing={"10px"}
                color="gray.800"
                fontWeight="medium"
                borderRadius={"12px"}
                border={"2px"}
                borderColor={"#E7ECE7"}
                flexWrap="wrap"
                flexDirection={"column"}
                backgroundColor={selectedOption === "others" ? "#F7FAF7" : "#FFFF"}
                paddingX={"10px"}
                paddingY={"1rem"}
                marginTop={5}
              >
                <Radio
                  value="others"
                  borderColor={"#CBD1CB"}
                  w="100%"
                  display="flex"
                  flexDir={"row-reverse"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>
                    I want to buy for someone else
                  </Text>
                </Radio>
                {
                  selectedOption === "others" && (
                    <>
                      <Grid
                        backgroundColor={"#FFFFFF"}
                        border={"1px"}
                        borderColor={"#E7ECE7"}
                        borderRadius={"7px"}
                        paddingX={"10px"}
                        paddingY={"1.5rem"}
                        w={"100%"}
                        gap={2}
                        gridTemplateColumns={[
                          "1fr",
                          null,
                          "repeat(2, 1fr)",
                          null,
                          "repeat(2, 1fr)",
                        ]}
                      >
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                          <FormControl isInvalid={!!errorsOthers.email}>
                            <FormLabel htmlFor="firstName">Email Address</FormLabel>
                            <Input
                              placeholder="Email"
                              {...registerOthers("email")}
                              // name="email"
                              isInvalid={!!errorsOthers.email}
                              errorBorderColor="red.300"
                              onChange={(e) => {
                                setValueOthers("email", e.target.value);
                                dispatch(setIsSetDetails(false));
                              }}
                            />
                            {errorsOthers.email && (
                              <Text color="red.500" fontSize="sm">
                                {errorsOthers.email.message}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                        <GridItem>
                          <FormControl isInvalid={!!errorsOthers.firstName}>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <Input
                              id="firstName"
                              placeholder="First Name"
                              {...registerOthers("firstName")}
                              // name="firstName"
                              onChange={(e) => {
                                // setFirstName(e.target.value);
                                setValueOthers("firstName", e.target.value);
                                dispatch(setIsSetDetails(false));
                              }}
                              errorBorderColor="red.300"
                            />
                            {errorsOthers.firstName && (
                              <Text color="red.500" fontSize="sm">
                                {errorsOthers.firstName.message}
                              </Text>
                            )}
                          </FormControl>

                        </GridItem>
                        <GridItem >
                          <FormControl isInvalid={!!errorsOthers.lastName}>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input
                              id="lastName"
                              placeholder="Last Name"
                              {...registerOthers("lastName")}
                              // name="lastName"
                              onChange={(e) => {
                                // setLastName(e.target.value);
                                setValueOthers("lastName", e.target.value);
                                dispatch(setIsSetDetails(false));
                              }}
                              errorBorderColor="red.300"
                            />
                            {errorsOthers.lastName && (
                              <Text color="red.500" fontSize="sm">
                                {errorsOthers.lastName.message}
                              </Text>
                            )}
                          </FormControl>
                        </GridItem>
                      </Grid>
                      {
                        errors && (
                          <HStack>
                            <Box
                              bg="#FBEAE9"
                              padding="6px"
                              borderRadius="16px"
                              borderWidth="1px"
                              borderStyle="solid"
                              borderColor="#F2BCBA"
                            >
                              <TickCircle size="18" color="#CB1A14" variant="Bold" />
                            </Box>
                            <Text fontSize={{ base: 12, md: 14 }} color="gray.600">
                              You have to enter details or remove the additional guest before checking out
                            </Text>
                          </HStack>
                        )
                      }
                    </>
                  )
                }
              </HStack>


            </RadioGroup>
          ) : (
            <>
              <HStack
                spacing={"10px"}
                color="gray.800"
                fontWeight="medium"
                borderRadius={"12px"}
                border={"2px"}
                borderColor={"#E7ECE7"}
                flexWrap="wrap"
                flexDirection={"column"}
                backgroundColor={"#F7FAF7"}
                paddingX={"10px"}
                paddingY={"1rem"}
                marginTop={5}
              >
                <Grid
                  backgroundColor={"#FFFFFF"}
                  border={"1px"}
                  borderColor={"#E7ECE7"}
                  borderRadius={"7px"}
                  paddingX={"10px"}
                  paddingY={"1.5rem"}
                  w={"100%"}
                  gap={2}
                  gridTemplateColumns={[
                    "1fr",
                    null,
                    "repeat(2, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ]}
                >
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControl isInvalid={!!errorsOthers.email}>
                      <FormLabel htmlFor="firstName">Email Address</FormLabel>
                      <Input
                        placeholder="Email"
                        {...registerOthers("email")}
                        // name="email"
                        isInvalid={!!errorsOthers.email}
                        errorBorderColor="red.300"
                        onChange={(e) => {
                          setValueOthers("email", e.target.value);
                          dispatch(setIsSetDetails(false));
                        }}
                      />
                      {errorsOthers.email && (
                        <Text color="red.500" fontSize="sm">
                          {errorsOthers.email.message}
                        </Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isInvalid={!!errorsOthers.firstName}>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        {...registerOthers("firstName")}
                        // name="firstName"
                        onChange={(e) => {
                          // setFirstName(e.target.value);
                          setValueOthers("firstName", e.target.value);
                          dispatch(setIsSetDetails(false));
                        }}
                        errorBorderColor="red.300"
                      />
                      {errorsOthers.firstName && (
                        <Text color="red.500" fontSize="sm">
                          {errorsOthers.firstName.message}
                        </Text>
                      )}
                    </FormControl>

                  </GridItem>
                  <GridItem >
                    <FormControl isInvalid={!!errorsOthers.lastName}>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        {...registerOthers("lastName")}
                        // name="lastName"
                        onChange={(e) => {
                          // setLastName(e.target.value);
                          setValueOthers("lastName", e.target.value);
                          dispatch(setIsSetDetails(false));
                        }}
                        errorBorderColor="red.300"
                      />
                      {errorsOthers.lastName && (
                        <Text color="red.500" fontSize="sm">
                          {errorsOthers.lastName.message}
                        </Text>
                      )}
                    </FormControl>
                  </GridItem>
                </Grid>
                <HStack spacing={2} w={"100%"}>
                  <InfoIcon size="24" variant="Bold" />
                  <Text fontSize={{ base: 12, md: 14 }} color="gray.600">
                    These name above will appear on your profile. You can customize it if you want so.
                  </Text>
                </HStack>
              </HStack>
            </>
          )
        }
      </Box>
    </>
  );
}