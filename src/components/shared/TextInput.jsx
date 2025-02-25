import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Mail, X } from "lucide-react";

const TextInput = ({ formik, label, inputName, error, handleError, type }) => {
  const isInvalid =
    (formik.touched[inputName] && formik.errors[inputName]) || error;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="lg">
        {type === "email" && (
          <InputRightElement pointerEvents="none">
            {isInvalid || error ? (
              <X size={20} />
            ) : (
              <Mail size={20} fillColor="#5E665E" />
            )}
          </InputRightElement>
        )}
        {type === "textarea" ? (
          <Textarea
            id={inputName}
            name={inputName}
            type="text"
            rows={6}
            value={formik.values[inputName]}
            onChange={formik.handleChange}
            onFocus={() => {
              formik.setFieldTouched(inputName, false),
                handleError && handleError("");
            }}
          />
        ) : (
          <Input
            id={inputName}
            name={inputName}
            type={type === "email" ? "email" : "text"}
            value={formik.values[inputName]}
            onChange={formik.handleChange}
            onFocus={() => {
              formik.setFieldTouched(inputName, false),
                handleError && handleError("");
            }}
          />
        )}
      </InputGroup>
      <FormErrorMessage>
        {isInvalid && !error && <div>{formik.errors[inputName]}</div>}
        {error && <div>{error}</div>}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
