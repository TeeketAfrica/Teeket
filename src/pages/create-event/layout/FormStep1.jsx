import FormLayout from "../components/FormLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, Text } from "@chakra-ui/layout";
import DownIcon from "../../../assets/icon/DownIcon.jsx";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Box,
  Select,
  Divider,
  Heading,
} from "@chakra-ui/react";

const FormStep1 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventTitle: "",
      eventOrganizer: "",
      eventType: "",
      eventTag: [],
      invalidEventStartDate: "",
      invalidEventStartTime: "",
      invalidEventEndDate: "",
      invalidEventEndTime: "",
    },
  });
  // const [tag, setTag] = useState("");
  // const [eventTag, setEventTag] = useState([]);

  const [formError] = useState({
    invalidEventTitle: false,
    invalidEventOrganizer: false,
    invalidEventType: false,
    invalidTag: false,
    invalidEventStartDate: false,
    invalidEventStartTime: false,
    invalidEventEndDate: false,
    invalidEventEndTime: false,
  });

  const eventTitle = watch("eventTitle");
  // const eventOrganizer = watch('eventOrganizer');
  // const eventType = watch('eventType');
  // const eventIndustry = watch('eventOrganizer');
  const eventTag = watch("eventTag", []);
  // const eventStartDate = watch('eventStartDate');
  // const eventStartTime = watch('eventStartTime');
  // const eventEndDate = watch('eventEndDate');
  // const eventEndTime = watch('eventEndTime');

  const eventOptions = [
    { value: "celebration", label: "Celebration" },
    { value: "party", label: "Party" },
    { value: "naming", label: "Naming" },
  ];

  const onSubmit = (data) => console.log(data);

  // const handleKeyDown = (event) => {
  //   console.log("tag:", tag);
  //   console.log("eventTag:", eventTag);
  //   if (event.key === "Enter" && tag.trim() !== "") {
  //     setEventTag((prevTags) => [...prevTags, tag]);
  //     setTag("");
  //   }
  // };

  return (
    <FormLayout
      title="Basic Info"
      description="Give your event a name and also add other basic information that will help your attendees know what this event is about"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Box maxW="600px" w="100%">
            <Stack spacing={4}>
              {/* EVENT TITLE */}
              <FormControl
                isInvalid={errors.eventTitle || formError.invalidEventTitle}
              >
                <FormLabel
                  htmlFor="eventTitle"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.800"
                >
                  Event title
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    id="eventTitle"
                    placeholder="Give a clear title for the event you are creating"
                    type="text"
                    maxLength={100}
                    {...register("eventTitle", {
                      required: "This is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage color="red.500">
                  {errors.eventTitle && errors.eventTitle.message}
                  {formError.invalidEventTitle && !errors.eventTitle && (
                    <Text as="span">Event title is not valid</Text>
                  )}
                </FormErrorMessage>
                <Text mt={2} as="span" fontSize="sm" color="gray.600">
                  {eventTitle.length}/100 characters
                </Text>
              </FormControl>

              {/* ORGANIZERS */}
              <FormControl
                isInvalid={
                  errors.eventOrganizer || formError.invalidEventOrganizer
                }
              >
                <FormLabel
                  htmlFor="eventOrganizer"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.800"
                >
                  Organizer
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    placeholder="Who is organizing this event?"
                    id="eventOrganizer"
                    type="text"
                    {...register("eventOrganizer", {
                      required: "This is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage color="red.500">
                  {errors.eventOrganizer && errors.eventOrganizer.message}
                  {formError.invalidEventOrganizer &&
                    !errors.eventOrganizer && (
                      <Text as="span">Input an event organizer</Text>
                    )}
                </FormErrorMessage>
              </FormControl>

              {/* TYPE OF EVENT AND INDUSTRY */}
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
              >
                <FormControl
                  isInvalid={errors.eventType || formError.invalidEventType}
                >
                  <FormLabel
                    htmlFor="eventType"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Type of event
                  </FormLabel>
                  <InputGroup size="lg">
                    <Select
                      size="lg"
                      icon={<DownIcon />}
                      placeholder="Choose a type e.g. Celebration"
                      id="eventType"
                      {...register("eventType", {
                        required: "This is required",
                      })}
                    >
                      {eventOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventType && errors.eventType.message}
                    {formError.invalidEventType && !errors.eventType && (
                      <Text as="span">Input an event organizer</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.eventOrganizer || formError.invalidEventOrganizer
                  }
                >
                  <FormLabel
                    htmlFor="eventOrganizer"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Organizer
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      placeholder="Who is organizing this event?"
                      id="eventOrganizer"
                      type="text"
                      {...register("eventOrganizer", {
                        required: "This is required",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventOrganizer && errors.eventOrganizer.message}
                    {formError.invalidEventOrganizer &&
                      !errors.eventOrganizer && (
                        <Text as="span">Input an event organizer</Text>
                      )}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <Divider border="1px solid" borderColor="gray.300" />

          {/* TAGS */}
          <Box maxW="600px" w="100%">
            <Stack spacing={4}>
              <Heading
                as="h3"
                color="black"
                fontSize="lg"
                fontWeight="semibold"
              >
                Tags
              </Heading>

              <FormControl isInvalid={errors.eventTag || formError.invalidTag}>
                <FormLabel htmlFor="eventTag" color="gray.600">
                  Tags will help make it much easier to find your event.
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    placeholder="Type a tag and press enter"
                    id="eventTag"
                    type="text"
                    {...register("eventTag", {
                      required: "This is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage color="red.500">
                  {errors.eventTag && errors.eventTag.message}
                  {formError.invalidTag && !errors.eventTag && (
                    <Text as="span">Input an event tag</Text>
                  )}
                </FormErrorMessage>
                <Text mt={2} as="span" fontSize="sm" color="gray.600">
                  {eventTag.length}/5 tags
                </Text>
              </FormControl>
            </Stack>
          </Box>

          <Divider border="1px solid" borderColor="gray.300" />

          {/* DATE AND TIME */}
          <Box maxW="600px" w="100%">
            <Stack spacing={4}>
              <Heading
                as="h3"
                color="black"
                fontSize="lg"
                fontWeight="semibold"
              >
                Date and time
              </Heading>
              <Text color="gray.600">
                Tags will help make it much easier to find your event.
              </Text>

              {/* START DATE AND TIME */}
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
              >
                <FormControl
                  isInvalid={
                    errors.eventStartDate || formError.invalidEventStartDate
                  }
                >
                  <FormLabel
                    htmlFor="eventStartDate"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Start date
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      id="eventStartDate"
                      type="date"
                      {...register("eventStartDate", {
                        required: "This is required",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventStartDate && errors.eventStartDate.message}
                    {formError.invalidEventStartDate &&
                      !errors.eventStartDate && (
                        <Text as="span">Insert a start date</Text>
                      )}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.eventStartTime || formError.invalidEventStartTime
                  }
                >
                  <FormLabel
                    htmlFor="eventStartTime"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Start time
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      placeholder="Who is organizing this event?"
                      id="eventStartTime"
                      type="time"
                      {...register("eventStartTime", {
                        required: "This is required",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventStartTime && errors.eventStartTime.message}
                    {formError.invalidEventStartTime &&
                      !errors.eventStartTime && (
                        <Text as="span">Input a start time</Text>
                      )}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              {/* END DATE AND TIME */}
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
                mb={1}
              >
                <FormControl
                  isInvalid={
                    errors.eventEndDate || formError.invalidEventEndDate
                  }
                >
                  <FormLabel
                    htmlFor="eventEndDate"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    End date
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      id="eventEndDate"
                      type="date"
                      {...register("eventEndDate", {
                        required: "This is required",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventEndDate && errors.eventEndDate.message}
                    {formError.invalidEventEndDate && !errors.eventEndDate && (
                      <Text as="span">Insert an end date</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.eventEndTime || formError.invalidEventEndTime
                  }
                >
                  <FormLabel
                    htmlFor="eventEndTime"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    End time
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      placeholder="Who is organizing this event?"
                      id="eventEndTime"
                      type="time"
                      {...register("eventEndTime", {
                        required: "This is required",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.eventEndTime && errors.eventEndTime.message}
                    {formError.invalidEventEndTime && !errors.eventEndTime && (
                      <Text as="span">Input end time</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Text color="blue.400" fontWeight="semibold" fontSize="sm">
                Event start date and time will be displayed
              </Text>
            </Stack>
          </Box>
        </Stack>
      </form>
    </FormLayout>
  );
};

export default FormStep1;
