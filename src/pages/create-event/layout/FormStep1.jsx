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
    Tag,
    TagLabel,
    TagCloseButton,
    ListItem,
    List,
    useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Stack, Text } from "@chakra-ui/layout";
import FormLayout from "../components/FormLayout";
import DownIcon from "../../../assets/icon/DownIcon.svg";
import { useEffect, useRef, useState } from "react";
import { teeketApi } from "../../../utils/api";
import { setEventDetail } from "../../../features/eventSlice";

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
        console.log(data);

        // dispatch(setEventDetail(data));
    };

    const toast = useToast();

    const renderFormControl = (
        name,
        label,
        type,
        placeholder,
        options = null,
        characterLength = false,
        isMultiSelect = false,
        tags = [],
        setTags,
        inputTag,
        setInputTag,
        description
    ) => {
        const isSelect = type === "select";
        const wrapperRef = useRef(null);
        const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);

        const [filteredTags, setFilteredTags] = useState(options);

        const handleAddValue = (fieldName, newValue) => {
            const tagToAdd = newValue;
            if (tagToAdd && !tags.includes(tagToAdd)) {
                const updatedTags = [...tags, tagToAdd];
                setTags(updatedTags);
                const data = {
                    fieldName: fieldName,
                    value: updatedTags, // send only id
                };
                // dispatch(setEventDetail(data));
            }
            setInputTag("");
        };

        const handleRemoveValue = (fieldName, valueToRemove) => {
            const updatedTags = tags.filter(
                (tag) => tag.id !== valueToRemove.id
            );
            setTags(updatedTags);
            const data = { fieldName: fieldName, value: updatedTags };
            // dispatch(setEventDetail(data));
        };

        const handleTagInputChange = (e) => {
            const value = e.target.value;
            setInputTag(value);
            const filtered = options.filter((tag) =>
                tag?.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredTags(filtered);
        };
        const handleFocus = () => {
            setFilteredTags(options);
            setSuggestionsVisible(true);
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    wrapperRef.current &&
                    !wrapperRef.current.contains(event.target)
                ) {
                    setSuggestionsVisible(false); // Close suggestions
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [wrapperRef]);

        return (
            <FormControl
                isInvalid={formik.touched[name] && formik.errors[name]}
                key={name}
            >
                <FormLabel htmlFor={name}>{label}</FormLabel>
                {isMultiSelect && <Text color="gray.600">{description}</Text>}
                <InputGroup size="lg">
                    {isMultiSelect ? (
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            alignItems="center"
                            gap={2}
                            borderWidth="1px"
                            borderRadius="md"
                            borderColor={"#CBD1CB"}
                            width="100%"
                            p={2}
                            ref={wrapperRef}
                        >
                            {tags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    size="sm"
                                    borderRadius="md"
                                    variant="outline"
                                >
                                    <TagLabel>{tag?.label}</TagLabel>
                                    <TagCloseButton
                                        onClick={() =>
                                            handleRemoveValue(name, tag)
                                        }
                                    />
                                </Tag>
                            ))}

                            <Input
                                id={name}
                                name={name}
                                type="text"
                                placeholder={placeholder}
                                value={inputTag}
                                size="md"
                                border="none"
                                outline="none"
                                _focusVisible="none"
                                onChange={handleTagInputChange}
                                onFocus={handleFocus}
                            ></Input>
                            {isSuggestionsVisible && (
                                <List
                                    border="1px solid"
                                    borderColor="gray.300"
                                    borderRadius="md"
                                    width="100%"
                                    maxHeight="150px"
                                    overflowY="auto"
                                >
                                    {filteredTags.length > 0 ? (
                                        filteredTags.map((tag, index) => (
                                            <ListItem
                                                key={index}
                                                px={3}
                                                py={2}
                                                _hover={{
                                                    backgroundColor: "gray.100",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleAddValue(name, tag)
                                                }
                                            >
                                                <Text>
                                                    {tag?.label}
                                                    {tags.includes(tag) && (
                                                        <span color="green.500">
                                                            ✔️
                                                        </span>
                                                    )}
                                                </Text>
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Text px={3} py={2} color="gray.500">
                                            No suggestions found
                                        </Text>
                                    )}
                                </List>
                            )}
                        </Box>
                    ) : isSelect ? (
                        <Select
                            size="lg"
                            icon={<DownIcon />}
                            placeholder={placeholder}
                            id={name}
                            name={name}
                            value={formik.values[name]}
                            onChange={(e) => handleInputChange(name, e)}
                            onFocus={() => formik.setFieldTouched(name, false)}
                            onBlur={() => formik.setFieldTouched(name, true)}
                        >
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
                    {formik.touched[name] &&
                        formik.errors[name] &&
                        formik.errors[name]}
                </FormErrorMessage>
            </FormControl>
        );
    };

    const [tags, setTags] = useState(formik.values.eventTags || []); // Track tags
    const [inputTag, setInputTag] = useState(""); // Track current input value for tags
    console.log(tags);

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
                            ({
                                name,
                                label,
                                type,
                                placeholder,
                                options,
                                characterLength,
                            }) =>
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
                            gap={4}
                        >
                            {[
                                {
                                    name: "eventType",
                                    label: "Type of event",
                                    type: "select",
                                    options: eventOptions,
                                    placeholder:
                                        "Choose a type e.g. Celebration",
                                },
                                {
                                    name: "eventIndustry",
                                    label: "Industry",
                                    type: "select",
                                    options: eventOptions,
                                    placeholder:
                                        "Choose an industry e.g. Anime",
                                },
                            ].map(
                                ({ name, label, type, placeholder, options }) =>
                                    renderFormControl(
                                        name,
                                        label,
                                        type,
                                        placeholder,
                                        options
                                    )
                            )}
                        </Box>
                    </Stack>
                </Box>

                <Divider border="1px solid" borderColor="gray.300" />

                {/* Tags */}
                <Box maxW="600px" w="100%">
                    <Stack spacing={4}>
                        {renderFormControl(
                            "eventTags",
                            "Tags",
                            "text",
                            "Type a tag and press enter",
                            tagOptions,
                            false,
                            true,
                            tags,
                            setTags,
                            inputTag,
                            setInputTag,
                            "Tags will help make it much easier to find your event."
                        )}
                    </Stack>
                </Box>

                <Divider border="1px solid" borderColor="gray.300" />

                {/* Date and Time */}
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

                        {/* Start Date and Tine */}
                        <Box
                            display="flex"
                            flexDirection={{ base: "column", md: "row" }}
                            gap={4}
                        >
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
                            mb={1}
                        >
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
                        <Text
                            color="blue.400"
                            fontWeight="semibold"
                            fontSize="sm"
                        >
                            Event start date and time will be displayed
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </FormLayout>
    );
};

export default FormStep1;
