"use client";

import { useState, useEffect } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";
import ImageUpload from "../components/ImageUpload";
import RefreshIcon from "../../../assets/icon/Refresh.svg";
import MapIcon from "../../../assets/icon/Map.svg";

const EventDetailsForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const [imageData, setImageData] = useState(values.eventBannerImage || "");

  // Update Formik when image changes
  useEffect(() => {
    setFieldValue("eventBannerImage", imageData);
  }, [imageData, setFieldValue]);

  const hostingOptions = [
    { value: "online", label: "Online event" },
    { value: "physical", label: "Physical event" },
  ];

  return (
    <VStack maxW="600px" alignItems="flex-start" gap="8">
      {/* Banner Image */}
      {imageData?.secure_url || imageData ? (
        <Box>
          <Box
            h="400px"
            maxW="600px"
            borderRadius="12px"
            overflow="hidden"
            mb="2"
            backgroundImage={`url(${imageData.secure_url || imageData})`}
            backgroundSize="cover"
            backgroundPosition="top"
          />
          <Button
            onClick={() => setImageData("")}
            leftIcon={<RefreshIcon />}
            variant="secondary"
            size="sm"
          >
            Change Image
          </Button>
        </Box>
      ) : (
        <ImageUpload handleSetImage={setImageData} />
      )}

      {/* About Event */}
      <FormField
        name="eventAbout"
        label="About the event"
        type={FormFieldType.TextArea}
        placeholder="Tell us about the event"
        helperText="Give a detailed description of what this event is about"
        rows={7}
        isRequired={true}
      />

      {/* Event Hosting */}
      <Box w="100%">
        <FormField
          name="eventHosting"
          label="How will this event be hosted"
          type={FormFieldType.Radio}
          options={hostingOptions}
          isRequired={true}
        />

        {/* Event Location - Conditional rendering based on hosting type */}
        {values.eventHosting && (
          <Box mt="4">
            <FormField
              name="eventLocation"
              label={
                values.eventHosting === "online"
                  ? "Online event link"
                  : "Event location"
              }
              type={FormFieldType.Text}
              placeholder={
                values.eventHosting === "online" ? "Event url" : "Address"
              }
              leftIcon={values.eventHosting === "physical" ? <MapIcon /> : null}
              isRequired={true}
            />
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default EventDetailsForm;
