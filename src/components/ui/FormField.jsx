import { memo, useMemo, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  RadioGroup,
  HStack,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { FormFieldType } from "./form-field-types";
import MultiSelect from "./MultiSelect";
import DownIcon from "../../assets/icon/DownIcon.svg";
import UpArrowIcon from "../../assets/icon/UpArrow.svg";
import DownArrowIcon from "../../assets/icon/DownArrow.svg";

const FormField = memo(
  ({
    name,
    label,
    type = FormFieldType.Text,
    placeholder,
    isRequired = false,
    helperText,
    options = [],
    isDisabled = false,
    isReadOnly = false,
    maxLength,
    rows = 3,
    showCharacterCount = false,
    leftIcon,
    rightIcon,
    min,
    max,
    step,
    // Radio specific props
    radioDirection = "row",
    radioSpacing = "10px",
    radioVariant = "border",
    radioSize = "lg",
    radioMaxWidth = "100%",
    // Custom props for backward compatibility
    description,
    characterLimit,
    size = "lg",
  }) => {
    const [field, meta, helpers] = useField(name);
    const [showPassword, setShowPassword] = useState(false);
    const hasError = meta.touched && meta.error;

    // Backward compatibility - use characterLimit if provided
    const effectiveMaxLength = characterLimit || maxLength;
    const effectiveHelperText = description || helperText;
    const shouldShowCharacterCount =
      showCharacterCount || (characterLimit && effectiveMaxLength);

    // Get the current character count
    const currentLength = field.value ? String(field.value).length : 0;
    const showCharCount =
      shouldShowCharacterCount &&
      effectiveMaxLength &&
      [
        FormFieldType.Text,
        FormFieldType.Email,
        FormFieldType.Password,
        FormFieldType.TextArea,
      ].includes(type);

    const fieldComponent = useMemo(() => {
      switch (type) {
        case FormFieldType.TextArea:
          return (
            <Field
              as={Textarea}
              id={name}
              name={name}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              maxLength={effectiveMaxLength}
              rows={rows}
              resize="vertical"
              size={size}
              {...field}
            />
          );

        case FormFieldType.Password:
          return (
            <InputGroup size={size}>
              {leftIcon && (
                <InputRightElement pointerEvents="none">
                  {leftIcon}
                </InputRightElement>
              )}
              <Field
                as={Input}
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                maxLength={effectiveMaxLength}
                {...field}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.5rem"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </Button>
              </InputRightElement>
            </InputGroup>
          );

        case FormFieldType.Select:
          return (
            <Field
              as={Select}
              id={name}
              name={name}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              size={size}
              icon={<DownIcon />}
              {...field}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
          );

        case FormFieldType.MultiSelect:
          return (
            <MultiSelect
              options={options}
              value={Array.isArray(field.value) ? field.value : []}
              onChange={(values) => {
                helpers.setValue(values);
              }}
              placeholder={placeholder || "Type a tag and press enter"}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              isInvalid={!!hasError}
              maxTags={10}
            />
          );

        case FormFieldType.Radio:
          return (
            <RadioGroup
              name={name}
              value={field.value}
              onChange={(value) => helpers.setValue(value)}
              marginTop="4"
            >
              <HStack
                spacing={radioSpacing}
                color="gray.800"
                fontWeight="medium"
                flexWrap="wrap"
                direction={radioDirection}
              >
                {options.map((option) => (
                  <Radio
                    flex={1}
                    maxW={radioMaxWidth}
                    key={option.value}
                    value={option.value}
                    size={radioSize}
                    variant={radioVariant}
                    isDisabled={isDisabled}
                  >
                    {option.label}
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
          );

        case FormFieldType.Number:
          return (
            <NumberInput
              min={min}
              max={max}
              step={step}
              value={field.value}
              onChange={(_, valueNumber) => helpers.setValue(valueNumber)}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              size={size}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper>
                  <UpArrowIcon />
                </NumberIncrementStepper>
                <NumberDecrementStepper>
                  <DownArrowIcon />
                </NumberDecrementStepper>
              </NumberInputStepper>
            </NumberInput>
          );

        default:
          return (
            <InputGroup size={size}>
              {leftIcon && (
                <InputRightElement pointerEvents="none">
                  {leftIcon}
                </InputRightElement>
              )}
              <Field
                as={Input}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                maxLength={effectiveMaxLength}
                {...field}
              />
              {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
            </InputGroup>
          );
      }
    }, [
      type,
      name,
      placeholder,
      isDisabled,
      isReadOnly,
      effectiveMaxLength,
      rows,
      field,
      options,
      showPassword,
      helpers,
      hasError,
      leftIcon,
      rightIcon,
      size,
      min,
      max,
      step,
      radioDirection,
      radioSpacing,
      radioVariant,
      radioSize,
    ]);

    return (
      <FormControl
        id={name}
        isRequired={isRequired}
        isInvalid={!!hasError}
        mb={4}
      >
        <FormLabel htmlFor={name}>{label}</FormLabel>
        {fieldComponent}
        <HStack justifyContent="space-between">
          {hasError ? (
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          ) : effectiveHelperText && !showCharCount ? (
            <FormHelperText>{effectiveHelperText}</FormHelperText>
          ) : null}
          {showCharCount && (
            <FormHelperText ml="auto">
              {currentLength}/{effectiveMaxLength} characters
            </FormHelperText>
          )}
        </HStack>
      </FormControl>
    );
  }
);

export default FormField;
