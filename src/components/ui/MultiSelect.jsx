import { useRef, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  InputGroup,
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
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      const matchingOption = options.find(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchingOption && !value.includes(matchingOption.value)) {
        const newValue = [...value, matchingOption.value];
        onChange(newValue);
      }

      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove the last tag when u press backspace in an empty input
      const newValue = value.slice(0, -1);
      onChange(newValue);
    }
  };

  const handleRemoveValue = (optionValue) => {
    if (isDisabled || isReadOnly) return;

    const newValue = value.filter((val) => val !== optionValue);
    onChange(newValue);
  };

  const selectedLabels = options.filter((option) =>
    value.includes(option.value)
  );
  const isMaxTagsReached = maxTags > 0 && value.length >= maxTags;

  return (
    <Box width="100%">
      <Box
        border="1px solid"
        borderColor={isInvalid ? "red.500" : "gray.400"}
        borderRadius="md"
        p={2}
        minHeight="40px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        bg={isDisabled ? "gray.100" : "white"}
        opacity={isDisabled ? 0.6 : 1}
        onClick={() => inputRef.current?.focus()}
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
              border="none"
              _focus={{ boxShadow: "none" }}
              disabled={isDisabled || isReadOnly || isMaxTagsReached}
              size="md"
            />
          </InputGroup>
        </Flex>
      </Box>
      <Text fontSize="sm" color="gray.500" mt={1}>
        {value.length}/{maxTags > 0 ? maxTags : value.length} tags
      </Text>
    </Box>
  );
};

export default MultiSelect;
