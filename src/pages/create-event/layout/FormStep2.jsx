import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import {
  Stack,
  Box,
  Button,
  Image,
  Text,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  InputLeftElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";

import FormLayout from "../components/FormLayout";
import ImageUpload from "../components/ImageUpload";
import Refresh from "../../../assets/icon/Refresh.svg";
import Map from "../../../assets/icon/Map.svg";

const FormStep2 = () => {
  // const { control, register } = useFormContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = () => {
    console.log("formTwo");
  };

  return (
    <>
      <FormLayout
        title="Nigeria Anime Festival"
        description="Provide additional context about what this event is about."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maxW="600px" flexDirection="column" gap="8">
          {image ? (
            <Box>
              <Box
                h="264px"
                w="600px"
                borderRadius="12px"
                overflow="hidden"
                mb="2"
              >
                <Image
                  src={image}
                  alt="event banner"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <Button
                onClick={() => setImage(null)}
                leftIcon={<Image src={Refresh} alt="icon" />}
                variant="secondary"
                size="sm"
              >
                Change Image
              </Button>
            </Box>
          ) : (
            <ImageUpload handleSetImage={setImage} />
          )}
          <Stack flexDirection="column" gap="8">
            <FormControl isInvalid={errors.eventDescription}>
              <FormLabel
                htmlFor="eventDescription"
                fontWeight="semibold"
                color="black"
                margin="0"
              >
                About the event
              </FormLabel>
              <Text fontWeight="normal" color="gray.500">
                Give a detailed description on what this event is about
              </Text>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                {...register("eventDescription", {
                  required: "Please input a description for the event",
                })}
                placeholder="Tell us about the event"
                size="sm"
                rows="7"
                marginTop="4"
              />
              <FormErrorMessage>
                {errors.eventDescription && errors.eventDescription.message}
              </FormErrorMessage>
            </FormControl>

            <Box>
              <FormControl isInvalid={errors.eventHost}>
                <FormLabel fontWeight="semibold" color="black">
                  How will this event be hosted
                </FormLabel>
                <Controller
                  name="eventHost"
                  defaultValue=""
                  control={control}
                  rules={{
                    required:
                      "Please specify if the event will be hosted online or physical",
                  }}
                  render={({ field }) => (
                    <>
                      <RadioGroup {...field} marginTop="4">
                        <Stack
                          direction="row"
                          color="gray.800"
                          fontWeight="medium"
                          flexWrap="wrap"
                        >
                          <Radio value="online" size="lg" variant="border">
                            Online event
                          </Radio>
                          <Radio value="physical" size="lg" variant="border">
                            Physical event
                          </Radio>
                        </Stack>
                      </RadioGroup>

                      <Box marginTop="4">
                        {field.value === "online" && (
                          <FormControl isInvalid={errors.eventLocation}>
                            <FormLabel
                              htmlFor="eventLocation"
                              fontSize="sm"
                              fontWeight="medium"
                              color="gray.800"
                            >
                              Online event link
                            </FormLabel>

                            <Input
                              name="eventLocation"
                              id="eventLocation"
                              type="text"
                              {...register("eventLocation", {
                                required:
                                  "Please input a valid event link, such as a Zoom link.",
                              })}
                              placeholder="Event url"
                              size="lg"
                            />
                            <FormErrorMessage>
                              {errors.eventLocation &&
                                errors.eventLocation.message}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                        {field.value === "physical" && (
                          <FormControl isInvalid={errors.eventLocation}>
                            <FormLabel
                              htmlFor="eventLocation"
                              fontSize="sm"
                              fontWeight="medium"
                              color="gray.800"
                            >
                              Event location
                            </FormLabel>

                            <InputGroup size="lg">
                              <InputLeftElement pointerEvents="none">
                                <Image src={Map} alt="icon" />
                              </InputLeftElement>

                              <Input
                                id="eventLocation"
                                name="eventLocation"
                                type="text"
                                {...register("eventLocation", {
                                  required:
                                    "Please input an address for the event",
                                })}
                                placeholder="address"
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.eventLocation &&
                                errors.eventLocation.message}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Box>
                    </>
                  )}
                />
                <FormErrorMessage>
                  {errors.eventHost && errors.eventHost.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default FormStep2;
