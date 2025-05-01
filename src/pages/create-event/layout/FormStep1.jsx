import { Box, Divider, Heading, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Stack, Text } from "@chakra-ui/layout";
import FormLayout from "../components/FormLayout";
import { useEffect, useState } from "react";
import { teeketApi } from "../../../utils/api";
import { setEventDetail } from "../../../features/eventSlice";
import FormField, { FormFieldType } from "../../../components/ui/FormField";

const FormStep1 = ({ formik }) => {
  const dispatch = useDispatch();

  // Event Options
  const eventOptions = [
    { value: "celebration", label: "Celebration" },
    { value: "party", label: "Party" },
    { value: "naming", label: "Naming" },
  ];
  8;
  const handleInputChange = (fieldName, e) => {
    const data = { fieldName: fieldName, value: e.target.value };
    console.log(data);

    // this dispatch can be called only when the save and continue button is click
    dispatch(setEventDetail(data));
  };

  const toast = useToast();

  const [tagOptions, setTagOptions] = useState([]);
  useEffect(() => {
    const handleFetchTags = async () => {
      try {
        let url = "/tags?page_size=100";
        const response = await teeketApi.get(url);
        const res = response.data;
        setTagOptions(res.data);
        console.log(tagOptions);
      } catch (error) {
        console.log(error);

        const errorMessage =
          error?.response?.data?.message || "An error occured";
        toast({
          title: "Events failed to fetch.",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    };
    handleFetchTags();
  }, []);

  return (
    <FormLayout
      title="Basic Info"
      description="Give your event a name and also add other basic information that will help your attendees know what this event is about"
    >
      <Stack spacing={4}>
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            <FormField
              name="eventTitle"
              label="Event title"
              type={FormFieldType.Text}
              placeholder="Give a clear title for the event you are creating"
              maxLength={100}
              showCharacterCount
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
                options={eventOptions}
                placeholder="Choose a type e.g. Celebration"
              />
              <FormField
                name="eventIndustry"
                label="Industry"
                type={FormFieldType.Select}
                options={eventOptions}
                placeholder="Choose an industry e.g. Anime"
              />
            </Box>
          </Stack>
        </Box>

        <Divider border="1px solid" borderColor="gray.300" />

        {/* Tags */}
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            <FormField
              name="eventTags"
              label="Tags"
              type={FormFieldType.MultiSelect}
              options={eventOptions}
              helperText="Tags will help make it much easier to find your event"
            />
          </Stack>
        </Box>

        <Divider border="1px solid" borderColor="gray.300" />

        {/* Date and Time */}
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            <Heading as="h3" color="black" fontSize="lg" fontWeight="semibold">
              Date and time
            </Heading>

            {/* Start Date and Tine */}
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

            {/* End Date and Time */}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
              mb={1}
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
    </FormLayout>
  );
};

export default FormStep1;
