import { Image } from "@chakra-ui/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

// Importing icons
import MailIcon from "../../../assets/icon/MailIcon";
import CloseIcon from "../../../assets/icon/CloseIcon.svg";

const EmailInput = ({ formik, label, inputName, errors, handleError }) => {
  const isInvalid =
    (formik.touched[inputName] && formik.errors[inputName]) || errors.email;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="lg">
        <InputRightElement pointerEvents="none">
          {isInvalid || errors.email ? (
            <Image src={CloseIcon} alt="close" />
          ) : (
            <MailIcon fillColor="#5E665E" />
          )}
        </InputRightElement>
        <Input
          id={inputName}
          name={inputName}
          type="text"
          value={formik.values[inputName]}
          onChange={formik.handleChange}
          onFocus={() => {
            formik.setFieldTouched(inputName, false),
              handleError({ email: "", password: "" });
          }}
        />
      </InputGroup>
      <FormErrorMessage>
        {isInvalid && !errors.email && <div>{formik.errors[inputName]}</div>}
        {errors.email && <div>{errors.email}</div>}
      </FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
