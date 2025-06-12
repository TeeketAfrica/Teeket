import { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  List,
  ListItem,
  Text,
  Flex,
} from "@chakra-ui/react";

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Type to search...",
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  maxTags = 10,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.some((selected) => selected.id === option.id)
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    if (value.length < maxTags) {
      const newValue = [...value, option];
      onChange(newValue);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const newValue = value.filter((tag) => tag.id !== tagToRemove.id);
    onChange(newValue);
  };

  const borderColor = isInvalid ? "red.300" : "gray.300";

  return (
    <Box ref={containerRef} position="relative">
      <Flex
        h="56px"
        p={2}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        bg={isDisabled ? "gray.50" : "white"}
        cursor={isDisabled ? "not-allowed" : "text"}
        _hover={!isDisabled ? { borderColor: "gray.400" } : {}}
        _focusWithin={{
          borderColor: "gray.500",
          boxShadow: "0px 0px 1px 4px #CBD1CB",
        }}
      >
        {value.map((tag) => (
          <Tag key={tag.id} size="md" colorScheme="blue" variant="solid">
            <TagLabel>{tag.label}</TagLabel>
            {!isReadOnly && !isDisabled && (
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            )}
          </Tag>
        ))}

        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={value.length === 0 ? placeholder : ""}
          border="none"
          outline="none"
          p={0}
          h="auto"
          minW="120px"
          flex={1}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          _focus={{ boxShadow: "none" }}
        />
      </Flex>

      {isOpen && !isDisabled && !isReadOnly && (
        <List
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={10}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          mt={1}
          boxShadow="md"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ListItem
                key={option.id}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleOptionSelect(option)}
              >
                <Text>{option.label}</Text>
              </ListItem>
            ))
          ) : (
            <ListItem px={3} py={2}>
              <Text color="gray.500">No options found</Text>
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default MultiSelect;
