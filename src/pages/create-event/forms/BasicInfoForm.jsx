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

  //(Timmi) New event Types
  const eventTypes = [
    { value: "Concert / Music Show", label: "Concert / Music Show" },
    { value: "Comedy Show", label: "Comedy Show" },
    { value: "Dance Performance", label: "Dance Performance" },
    { value: "Open Mic / Talent Night", label: "Open Mic / Talent Night" },
    { value: "Theatre / Stage Play", label: "Theatre / Stage Play" },
    {
      value: "Spoken Word / Poetry Night",
      label: "Spoken Word / Poetry Night",
    },
    { value: "Cultural Festival", label: "Cultural Festival" },
    { value: "Movie Screening", label: "Movie Screening" },
    { value: "Conference", label: "Conference" },
    { value: "Panel Discussion", label: "Panel Discussion" },
    { value: "Fireside Chat", label: "Fireside Chat" },
    { value: "Workshop / Masterclass", label: "Workshop / Masterclass" },
    { value: "Product Launch", label: "Product Launch" },
    { value: "Startup Pitch Event", label: "Startup Pitch Event" },
    { value: "Job Fair / Career Fair", label: "Job Fair / Career Fair" },
    { value: "Corporate Retreat", label: "Corporate Retreat" },
    { value: "Bootcamp", label: "Bootcamp" },
    { value: "Training Program", label: "Training Program" },
    { value: "Webinar", label: "Webinar" },
    { value: "Seminar / Lecture", label: "Seminar / Lecture" },
    { value: "Hackathon", label: "Hackathon" },
    { value: "Study Group", label: "Study Group" },
    { value: "Language Class", label: "Language Class" },
    { value: "Academic Symposium", label: "Academic Symposium" },
    {
      value: "Art Exhibition / Gallery Opening",
      label: "Art Exhibition / Gallery Opening",
    },
    { value: "Pop-Up Market", label: "Pop-Up Market" },
    { value: "Fashion Show", label: "Fashion Show" },
    { value: "Photography Walk", label: "Photography Walk" },
    {
      value: "Food Tasting / Culinary Experience",
      label: "Food Tasting / Culinary Experience",
    },
    { value: "DIY / Craft Workshop", label: "DIY / Craft Workshop" },
    { value: "Design Meetup", label: "Design Meetup" },
    { value: "Yoga / Meditation Session", label: "Yoga / Meditation Session" },
    { value: "Fitness Bootcamp", label: "Fitness Bootcamp" },
    {
      value: "Therapy Circle / Safe Space",
      label: "Therapy Circle / Safe Space",
    },
    { value: "Wellness Retreat", label: "Wellness Retreat" },
    { value: "Mental Health Meetup", label: "Mental Health Meetup" },
    {
      value: "Vision Board / Goal-Setting Event",
      label: "Vision Board / Goal-Setting Event",
    },
    { value: "House Party", label: "House Party" },
    { value: "Games Night", label: "Games Night" },
    { value: "Speed Friending / Dating", label: "Speed Friending / Dating" },
    { value: "Community Hangout", label: "Community Hangout" },
    {
      value: "City Tour / Local Exploration",
      label: "City Tour / Local Exploration",
    },
    { value: "Volunteer Event", label: "Volunteer Event" },
    {
      value: "Religious or Faith-Based Gathering",
      label: "Religious or Faith-Based Gathering",
    },
    { value: "Singles-Only Events", label: "Singles-Only Events" },
    { value: "Creator Meetup", label: "Creator Meetup" },
    { value: "Virtual Concert", label: "Virtual Concert" },
    { value: "Online Class", label: "Online Class" },
    {
      value: "Instagram/TikTok Live Performance",
      label: "Instagram/TikTok Live Performance",
    },
    { value: "Zoom Networking Event", label: "Zoom Networking Event" },
    { value: "Twitter Space Talk", label: "Twitter Space Talk" },
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
      {/* Basic Information */}
      <Box maxW="600px" w="100%">
        <Stack spacing={4}>
          <FormField
            name="eventTitle"
            label="Event title"
            type={FormFieldType.Text}
            placeholder="Give a clear title for the event you are creating"
            maxLength={100}
            showCharacterCount={true}
            isRequired={true}
          />

          <FormField
            name="eventOrganizer"
            label="Organizer"
            type={FormFieldType.Text}
            placeholder="Who is organizing this event?"
            isRequired={true}
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
              options={eventTypes}
              isRequired={true}
            />

            <FormField
              name="eventIndustry"
              label="Industry"
              type={FormFieldType.Select}
              placeholder="Choose an industry e.g. Anime"
              options={eventOptions}
              isRequired={true}
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
              isRequired={true}
            />

            <FormField
              name="eventStartTime"
              label="Start time"
              type={FormFieldType.Time}
              isRequired={true}
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
              isRequired={true}
            />

            <FormField
              name="eventEndTime"
              label="End time"
              type={FormFieldType.Time}
              isRequired={true}
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
