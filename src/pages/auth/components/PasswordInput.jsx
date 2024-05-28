import { useCallback, useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Stack, Box } from "@chakra-ui/layout";
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";

import CloseIcon from "../../../assets/icon/CloseIcon.svg";
import EyeIcon from "../../../assets/icon/eye.svg";
import EyeSlashIcon from "../../../assets/icon/EyeSlashIcon.svg";

const PasswordInput = ({
  formik,
  label,
  inputName,
  error,
  handleError,
  isCriteriaVisible,
}) => {
  const isInvalid =
    (formik.touched[inputName] && formik.errors[inputName]) || error;
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasMinLength: false,
    hasSpecialChar: false,
  });

  const updatePasswordCriteria = useCallback(() => {
    const password = formik.values[inputName];
    const isMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordCriteria({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasMinLength: isMinLength,
      hasSpecialChar: hasSpecialChar,
    });
  }, [formik.values, inputName]);

  useEffect(() => {
    updatePasswordCriteria();
  }, [updatePasswordCriteria]);

  const [viewPassword, setViewPassword] = useState(false);

  const getPasswordIcon = () => {
    if ((formik.touched[inputName] && formik.errors[inputName]) || error) {
      return <Image src={CloseIcon} alt="close" pointerEvents="none" />;
    }
    return (
      <Image
        src={viewPassword ? EyeSlashIcon : EyeIcon}
        alt={viewPassword ? "eye-slash" : "eye"}
        cursor="pointer"
        onClick={() => setViewPassword(!viewPassword)}
      />
    );
  };

  const checkboxLabels = {
    hasMinLength: "More than 8 characters",
    hasSpecialChar: "Special character (e.g. /,<>@#$%)",
  };

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="lg">
        <InputRightElement>{getPasswordIcon()}</InputRightElement>
        <Input
          id={inputName}
          name={inputName}
          type={viewPassword ? "text" : "password"}
          value={formik.values[inputName]}
          onChange={formik.handleChange}
          onFocus={() => {
            formik.setFieldTouched(inputName, false),
              handleError && handleError("");
          }}
        />
      </InputGroup>
      <FormErrorMessage>
        {isInvalid && !error && <div>{formik.errors[inputName]}</div>}
        {error && <div>{error}</div>}
      </FormErrorMessage>

      {isCriteriaVisible && (
        <Box mt="4">
          <Stack spacing={2} direction="row" flexWrap="wrap">
            {Object.entries(passwordCriteria).map(([key, value]) => (
              <Checkbox key={key} id={key} name={key} isChecked={value}>
                {checkboxLabels[key] || key.replace("has", "")}
              </Checkbox>
            ))}
          </Stack>
        </Box>
      )}
    </FormControl>
  );
};

export default PasswordInput;
