import { useEffect, useState } from "react";

import {
  Stack,
  HStack,
  VStack,
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

import { useDispatch, useSelector } from "react-redux";
import {
  selectEventDetails,
  setEventDetail,
} from "../../../features/eventSlice";

import FormLayout from "../components/FormLayout";
import ImageUpload from "../components/ImageUpload";

import Refresh from "../../../assets/icon/Refresh.svg";
import Map from "../../../assets/icon/Map.svg";

const FormStep2 = ({ formik }) => {
  const dispatch = useDispatch();
  const { eventBannerImage, id, eventLocation } =
    useSelector(selectEventDetails);

  const [imageData, setImageData] = useState(eventBannerImage);

  useEffect(() => {
    const data = {
      fieldName: "eventBannerImage",
      value: imageData,
    };
    dispatch(setEventDetail(data));
  }, [imageData]);

  const handleInputChange = (fieldName, e) => {
    let data;
    if (typeof e !== "string") {
      formik.handleChange(e);
      data = { fieldName: fieldName, value: e.target.value };
    } else {
      data = { fieldName: fieldName, value: e };
    }

    dispatch(setEventDetail(data));
  };

  return (
    <FormLayout
      title="Nigeria Anime Festival"
      description="Provide additional context about what this event is about.">
      <Stack maxW="600px" flexDirection="column" gap="8">
        {/* Banner Image */}
        {imageData?.secure_url || eventBannerImage ? (
          <Box>
            <Box
              key={imageData.public_id || id}
              h="400px"
              maxW="600px"
              borderRadius="12px"
              overflow="hidden"
              mb="2">
              <Image
                src={imageData.secure_url || eventBannerImage}
                alt={`event-banner ${imageData.public_id || id}`}
                objectFit="cover"
                h="100%"
                w="100%"
                objectPosition="top"
              />
            </Box>
            <Button
              onClick={() => setImageData("")}
              leftIcon={<Image src={Refresh} alt="icon" />}
              variant="secondary"
              size="sm">
              Change Image
            </Button>
          </Box>
        ) : (
          <ImageUpload handleSetImage={setImageData} />
        )}

        <VStack alignItems="flex-start" gap="8">
          {/* About Event */}
          <FormControl
            isInvalid={formik.touched.eventAbout && !!formik.errors.eventAbout}>
            <FormLabel htmlFor="eventAbout">About the event</FormLabel>
            <Text fontWeight="normal" color="gray.500">
              Give a detailed description of what this event is about
            </Text>
            <Textarea
              id="eventAbout"
              name="eventAbout"
              placeholder="Tell us about the event"
              size="sm"
              rows="7"
              marginTop="4"
              value={formik.values.eventAbout}
              onChange={(value) => handleInputChange("eventAbout", value)}
              onBlur={() => formik.setFieldTouched("eventAbout", true)}
            />
            <FormErrorMessage>
              {formik.touched.eventAbout && formik.errors.eventAbout}
            </FormErrorMessage>
          </FormControl>

          {/* Event Hosting */}
          <FormControl
            isInvalid={
              formik.touched.eventHosting && !!formik.errors.eventHosting
            }>
            <FormLabel>How will this event be hosted</FormLabel>

            <RadioGroup
              name="eventHosting"
              value={formik.values.eventHosting}
              onChange={(value) => {
                formik.setFieldValue("eventHosting", value),
                  handleInputChange("eventHosting", value);
              }}
              onBlur={() => formik.setFieldTouched("eventHosting", true)}
              marginTop="4">
              <HStack spacing="24px">
                <Radio value="online" size="lg" variant="border">
                  Online event
                </Radio>
                <Radio value="physical" size="lg" variant="border">
                  Physical event
                </Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>
              {formik.touched.eventHosting && formik.errors.eventHosting}
            </FormErrorMessage>

            {/* Event Location */}
            <Box marginTop="4">
              {formik.values.eventHosting === "online" && (
                <FormControl
                  isInvalid={
                    formik.touched.eventLocation &&
                    !!formik.errors.eventLocation
                  }>
                  <FormLabel
                    htmlFor="eventLocation"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800">
                    Online event link
                  </FormLabel>
                  <Input
                    name="eventLocation"
                    id="eventLocation"
                    type="text"
                    placeholder="Event url"
                    size="lg"
                    value={formik.values.eventLocation}
                    onChange={(value) =>
                      handleInputChange("eventLocation", value)
                    }
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>
                    {formik.touched.eventLocation &&
                      formik.errors.eventLocation}
                  </FormErrorMessage>
                </FormControl>
              )}
              {formik.values.eventHosting === "physical" && (
                <FormControl
                  isInvalid={
                    formik.touched.eventLocation &&
                    !!formik.errors.eventLocation
                  }>
                  <FormLabel
                    htmlFor="eventLocation"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800">
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
                      placeholder="Address"
                      value={formik.values.eventLocation}
                      onChange={(value) =>
                        handleInputChange("eventLocation", value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formik.touched.eventLocation &&
                      formik.errors.eventLocation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Box>
          </FormControl>
        </VStack>
      </Stack>
    </FormLayout>
  );
};

export default FormStep2;
