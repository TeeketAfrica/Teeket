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

const EmailInput = ({ formik, label, inputName }) => {
  const isInvalid = formik.touched[inputName] && formik.errors[inputName];

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="lg">
        <InputRightElement pointerEvents="none">
          {isInvalid ? (
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
          onFocus={() => formik.setFieldTouched(inputName, false)}
        />
      </InputGroup>
      <FormErrorMessage>
        {isInvalid && <div>{formik.errors[inputName]}</div>}
      </FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
