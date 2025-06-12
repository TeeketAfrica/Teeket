"use client";

import { useState, useEffect } from "react";
import { Stack, Box, Divider, Heading, Text, useToast } from "@chakra-ui/react";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";
import { teeketApi } from "../../../utils/api";

const BasicInfoForm = () => {
  const toast = useToast();
  const [tagOptions, setTagOptions] = useState([]);

  // Event options
  const eventOptions = [
    { value: "celebration", label: "Celebration" },
    { value: "party", label: "Party" },
    { value: "naming", label: "Naming" },
  ];

  // Fetch tags on mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await teeketApi.get("/tags?page_size=100");
        setTagOptions(response.data.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "An error occurred";
        toast({
          title: "Failed to fetch tags.",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    };
    fetchTags();
  }, [toast]);

  return (
    <Stack spacing={4}>
      <Box maxW={{ base: "100%", lg: "600px" }} w="100%">
        <Stack spacing={4}>
          <FormField
            name="eventTitle"
            label="Event title"
            type={FormFieldType.Text}
            placeholder="Give a clear title for the event you are creating"
            maxLength={100}
            showCharacterCount={true}
          />

          <FormField
            name="eventOrganizer"
            label="Organizer"
            type={FormFieldType.Text}
            placeholder="Who is organizing this event?"
          />

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <FormField
              name="eventType"
              label="Type of event"
              type={FormFieldType.Select}
              placeholder="Choose a type e.g. Celebration"
              options={eventOptions}
            />

            <FormField
              name="eventIndustry"
              label="Industry"
              type={FormFieldType.Select}
              placeholder="Choose an industry e.g. Anime"
              options={eventOptions}
            />
          </Box>
        </Stack>
      </Box>

      <Divider border="1px solid" borderColor="gray.300" />

      {/* Tags */}
      <Box maxW="600px" w="100%">
        <FormField
          name="eventTags"
          label="Tags"
          type={FormFieldType.MultiSelect}
          placeholder="Type a tag and press enter"
          helperText="Tags will help make it much easier to find your event."
          options={tagOptions}
        />
      </Box>

      <Divider border="1px solid" borderColor="gray.300" />

      {/* Date and Time */}
      <Box maxW="600px" w="100%">
        <Stack spacing={4}>
          <Heading as="h3" color="black" fontSize="lg" fontWeight="semibold">
            Date and time
          </Heading>

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <FormField
              name="eventStartDate"
              label="Start date"
              type={FormFieldType.Date}
            />

            <FormField
              name="eventStartTime"
              label="Start time"
              type={FormFieldType.Time}
            />
          </Box>

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <FormField
              name="eventEndDate"
              label="End date"
              type={FormFieldType.Date}
            />

            <FormField
              name="eventEndTime"
              label="End time"
              type={FormFieldType.Time}
            />
          </Box>

          <Text color="blue.400" fontWeight="semibold" fontSize="sm">
            Event start date and time will be displayed
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BasicInfoForm;
