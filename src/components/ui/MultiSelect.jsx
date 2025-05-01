import { useRef, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  InputGroup,
  List,
  ListItem,
} from "@chakra-ui/react";

// option takes in {
//   value: string
//   label: string
// }

const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Type a tag and press enter",
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  maxTags = 0,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Filter options based on input value
  const filteredOptions = options.filter(
    (option) =>
      !value.includes(option.value) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Find if the input matches any available option
      const matchingOption = options.find(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchingOption && !value.includes(matchingOption.value)) {
        const newValue = [...value, matchingOption.value];
        onChange(newValue);
      }

      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove the last tag when pressing backspace in an empty input
      const newValue = value.slice(0, -1);
      onChange(newValue);
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
      setIsFocused(false);
    } else if (e.key === "ArrowDown" && filteredOptions.length > 0) {
      // Handle keyboard navigation
      e.preventDefault();
      document.getElementById(`option-${filteredOptions[0].value}`)?.focus();
    }
  };

  const handleOptionKeyDown = (e, optionValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelectOption(optionValue);
    } else if (e.key === "Escape") {
      inputRef.current?.focus();
      setIsFocused(true);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = filteredOptions.findIndex(
        (option) => option.value === optionValue
      );
      const nextIndex = (currentIndex + 1) % filteredOptions.length;
      document
        .getElementById(`option-${filteredOptions[nextIndex].value}`)
        ?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = filteredOptions.findIndex(
        (option) => option.value === optionValue
      );
      const prevIndex =
        (currentIndex - 1 + filteredOptions.length) % filteredOptions.length;
      document
        .getElementById(`option-${filteredOptions[prevIndex].value}`)
        ?.focus();
    }
  };

  const handleSelectOption = (optionValue) => {
    if (isDisabled || isReadOnly) return;
    if (!value.includes(optionValue)) {
      const newValue = [...value, optionValue];
      onChange(newValue);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveValue = (optionValue) => {
    if (isDisabled || isReadOnly) return;

    const newValue = value.filter((val) => val !== optionValue);
    onChange(newValue);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabels = options.filter((option) =>
    value.includes(option.value)
  );
  const isMaxTagsReached = maxTags > 0 && value.length >= maxTags;

  return (
    <Box width="100%" position="relative" ref={containerRef}>
      <Box
        border="1px solid"
        borderColor={isInvalid ? "red.500" : "gray.400"}
        boxShadow={isFocused ? "0px 0px 1px 4px #CBD1CB" : ""}
        borderRadius="md"
        p={2}
        minHeight="40px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        bg={isDisabled ? "gray.100" : "white"}
        opacity={isDisabled ? 0.6 : 1}
        onClick={() => {
          inputRef.current?.focus();
          setIsFocused(true);
        }}
      >
        <Flex flexWrap="wrap" gap={2}>
          {selectedLabels.map((option) => (
            <Tag
              key={option.value}
              size="md"
              border="1px solid"
              borderColor={"gray.300"}
              borderRadius="md"
              variant="subtle"
              colorScheme="gray"
            >
              <TagLabel>{option.label}</TagLabel>
              {!isReadOnly && !isDisabled && (
                <TagCloseButton
                  onClick={() => handleRemoveValue(option.value)}
                />
              )}
            </Tag>
          ))}
          <InputGroup size="md" flex="1" minWidth="120px">
            <Input
              ref={inputRef}
              placeholder={isMaxTagsReached ? "" : placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              border="none"
              _focus={{ boxShadow: "none" }}
              disabled={isDisabled || isReadOnly || isMaxTagsReached}
              size="md"
            />
          </InputGroup>
        </Flex>
      </Box>

      {/* Tag count */}
      <Text fontSize="sm" color="gray.500" mt={1}>
        {value.length}/{maxTags > 0 ? maxTags : value.length} tags
      </Text>

      {/* Suggestions dropdown */}
      {isFocused &&
        filteredOptions.length > 0 &&
        !isDisabled &&
        !isReadOnly &&
        !isMaxTagsReached && (
          <Box
            position="absolute"
            top="calc(100% + 4px)"
            left={0}
            right={0}
            zIndex={10}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            border="1px solid"
            borderColor="gray.200"
            maxHeight="200px"
            overflowY="auto"
          >
            <List spacing={0}>
              {filteredOptions.map((option) => (
                <ListItem
                  key={option.value}
                  id={`option-${option.value}`}
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  _focus={{ bg: "gray.100", outline: "none" }}
                  onClick={() => handleSelectOption(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                  tabIndex={0}
                >
                  {option.label}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
    </Box>
  );
};

export default MultiSelect;
