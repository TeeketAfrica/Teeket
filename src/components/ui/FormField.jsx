// FormFieldProps = {
//   name: string
//   label: string
//   type: FormFieldTypeValues
//   placeholder?: string
//   helperText?: string
//   options?: SelectOption[]
//   isDisabled?: boolean
//   isReadOnly?: boolean
//   maxLength?: number
//   rows?: number
//   showCharacterCount?: boolean
// }

import React, { memo, useMemo } from "react";
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
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import MultiSelect from "./MultiSelect";

export const FormFieldType = {
  TextArea: "textarea",
  Text: "text",
  Email: "email",
  Time: "time",
  Date: "date",
  Password: "password",
  Select: "select",
  MultiSelect: "multiselect",
};

const FormField = memo(
  ({
    name,
    label,
    type,
    placeholder,
    helperText,
    options = [],
    isDisabled,
    isReadOnly,
    maxLength,
    rows = 3,
    showCharacterCount = false,
  }) => {
    const [field, meta, helpers] = useField(name);
    const [showPassword, setShowPassword] = React.useState(false);
    const hasError = meta.touched && meta.error;

    // Get the current character count
    const currentLength = field.value ? String(field.value).length : 0;
    const shouldShowCharacterCount =
      showCharacterCount &&
      maxLength &&
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
              maxLength={maxLength}
              rows={rows}
              resize="vertical"
              {...field}
            />
          );

        case FormFieldType.Password:
          return (
            <InputGroup>
              <Field
                as={Input}
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                maxLength={maxLength}
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
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
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
              maxTags={5}
            />
          );

        default:
          return (
            <Field
              as={Input}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              maxLength={maxLength}
              {...field}
            />
          );
      }
    }, [
      type,
      name,
      placeholder,
      isDisabled,
      isReadOnly,
      maxLength,
      rows,
      field,
      options,
      showPassword,
      helpers,
      hasError,
    ]);

    return (
      <FormControl id={name} isInvalid={!!hasError} mb={4}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        {fieldComponent}
        {shouldShowCharacterCount && (
          <FormHelperText textAlign="left">
            {currentLength}/{maxLength} characters
          </FormHelperText>
        )}
        {hasError ? (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        ) : helperText && !shouldShowCharacterCount ? (
          <FormHelperText>{helperText}</FormHelperText>
        ) : null}
      </FormControl>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
