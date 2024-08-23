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

import { useDispatch } from "react-redux";
import { setEventDetail } from "../../../features/eventSlice";

import { Stack, Text } from "@chakra-ui/layout";
import FormLayout from "../components/FormLayout";

import DownIcon from "../../../assets/icon/DownIcon.jsx";

const FormStep1 = ({ formik }) => {
  const dispatch = useDispatch();

  // Event Options
  const eventOptions = [
    { value: "celebration", label: "Celebration" },
    { value: "party", label: "Party" },
    { value: "naming", label: "Naming" },
  ];

  const handleInputChange = (fieldName, e) => {
    formik.handleChange(e);
    const data = { fieldName: fieldName, value: e.target.value };

    dispatch(setEventDetail(data));
  };

  const renderFormControl = (
    name,
    label,
    type,
    placeholder,
    options = null,
    characterLength = false
  ) => {
    const isSelect = type === "select";

    return (
      <FormControl
        isInvalid={formik.touched[name] && formik.errors[name]}
        key={name}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <InputGroup size="lg">
          {isSelect ? (
            <Select
              size="lg"
              icon={<DownIcon />}
              placeholder={placeholder}
              id={name}
              name={name}
              value={formik.values[name]}
              onChange={(e) => handleInputChange(name, e)}
              onFocus={() => formik.setFieldTouched(name, false)}
              onBlur={() => formik.setFieldTouched(name, true)}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={(e) => handleInputChange(name, e)}
              onFocus={() => formik.setFieldTouched(name, false)}
              onBlur={() => formik.setFieldTouched(name, true)}
            />
          )}
        </InputGroup>
        {characterLength && (
          <Text mt={2} as="span" fontSize="sm" color="gray.600">
            {formik.values[name].length}/100 characters
          </Text>
        )}
        <FormErrorMessage>
          {formik.touched[name] && formik.errors[name] && formik.errors[name]}
        </FormErrorMessage>
      </FormControl>
    );
  };

  return (
    <FormLayout
      title="Basic Info"
      description="Give your event a name and also add other basic information that will help your attendees know what this event is about">
      <Stack spacing={4}>
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            {[
              {
                name: "eventTitle",
                label: "Event title",
                type: "text",
                placeholder:
                  "Give a clear title for the event you are creating",
                characterLength: true,
              },
              {
                name: "eventOrganizer",
                label: "Organizer",
                type: "text",
                placeholder: "Who is organizing this event?",
              },
            ].map(
              ({ name, label, type, placeholder, options, characterLength }) =>
                renderFormControl(
                  name,
                  label,
                  type,
                  placeholder,
                  options,
                  characterLength
                )
            )}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}>
              {[
                {
                  name: "eventType",
                  label: "Type of event",
                  type: "select",
                  options: eventOptions,
                  placeholder: "Choose a type e.g. Celebration",
                },
                {
                  name: "eventIndustry",
                  label: "Industry",
                  type: "select",
                  options: eventOptions,
                  placeholder: "Choose an industry e.g. Anime",
                },
              ].map(({ name, label, type, placeholder, options }) =>
                renderFormControl(name, label, type, placeholder, options)
              )}
            </Box>
          </Stack>
        </Box>

        <Divider border="1px solid" borderColor="gray.300" />

        {/* Tags */}
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            <Heading as="h3" color="black" fontSize="lg" fontWeight="semibold">
              Tags
            </Heading>

            {renderFormControl(
              "eventTag",
              "Tags",
              "text",
              "Type a tag and press enter"
            )}
          </Stack>
        </Box>

        <Divider border="1px solid" borderColor="gray.300" />

        {/* Date and Time */}
        <Box maxW="600px" w="100%">
          <Stack spacing={4}>
            <Heading as="h3" color="black" fontSize="lg" fontWeight="semibold">
              Date and time
            </Heading>
            <Text color="gray.600">
              Tags will help make it much easier to find your event.
            </Text>

            {/* Start Date and Tine */}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}>
              {[
                {
                  name: "eventStartDate",
                  label: "Start date",
                  type: "date",
                },
                {
                  name: "eventStartTime",
                  label: "Start time",
                  type: "time",
                },
              ].map(({ name, label, type }) =>
                renderFormControl(name, label, type)
              )}
            </Box>

            {/* End Date and Time */}
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
              mb={1}>
              {[
                {
                  name: "eventEndDate",
                  label: "End date",
                  type: "date",
                },
                {
                  name: "eventEndTime",
                  label: "End time",
                  type: "time",
                },
              ].map(({ name, label, type }) =>
                renderFormControl(name, label, type)
              )}
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
