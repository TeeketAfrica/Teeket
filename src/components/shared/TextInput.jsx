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

const TextInput = ({
  formik,
  label,
  inputName,
  error,
  handleError,
  type = "text",
}) => {
  const { touched, errors, values, handleChange, setFieldTouched } = formik;

  const isTouched = touched[inputName];
  const hasFormikError = errors[inputName];
  const isInvalid = (isTouched && hasFormikError) || error;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={inputName}>{label}</FormLabel>
      <InputGroup size="lg">
        {type === "email" && (
          <InputRightElement pointerEvents="none">
            {isInvalid ? <X size={20} /> : <Mail size={20} fill="#fff" />}
          </InputRightElement>
        )}
        {type === "textarea" ? (
          <Textarea
            id={inputName}
            name={inputName}
            rows={6}
            value={values[inputName]}
            onChange={handleChange}
            onBlur={() => setFieldTouched(inputName, true)}
          />
        ) : (
          <Input
            id={inputName}
            name={inputName}
            type={type}
            value={values[inputName]}
            onChange={handleChange}
            onBlur={() => setFieldTouched(inputName, true)}
          />
        )}
      </InputGroup>
      <FormErrorMessage>
        {isTouched && hasFormikError && !error && errors[inputName]}
        {error && error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
