import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image } from '@chakra-ui/image';
import { Stack, Box, Text } from '@chakra-ui/layout';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Button,
} from '@chakra-ui/react';

import MailIcon from '../../../../assets/icon/MailIcon.svg';
import CloseIcon from '../../../../assets/icon/CloseIcon.svg';
import EyeSlashIcon from '../../../../assets/icon/EyeSlashIcon.svg';

const CreateAccountForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasMinLength: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    if (password) {
      setPasswordCriteria({
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasMinLength: password.length >= 8,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    } else {
      // Reset criteria if password is empty
      setPasswordCriteria({
        hasUppercase: false,
        hasLowercase: false,
        hasMinLength: false,
        hasSpecialChar: false,
      });
    }
  }, [password]);

  const [viewPassword, setViewPassword] = useState(false);
  const [formError] = useState({
    invalidEmail: false,
    incorrectPassword: false,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={errors.email || formError.invalidEmail}>
          <FormLabel
            htmlFor="email"
            fontSize="sm"
            fontWeight="medium"
            color="gray.800"
          >
            Email Address
          </FormLabel>
          <InputGroup size="lg">
            <InputRightElement pointerEvents="none">
              {formError.invalidEmail || errors.email ? (
                <Image src={CloseIcon} alt="close icon" />
              ) : (
                <Image src={MailIcon} alt="mail icon" />
              )}
            </InputRightElement>
            <Input
              id="email"
              type="text"
              {...register('email', {
                required: 'This is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage color="red.500">
            {errors.email && errors.email.message}
            {formError.invalidEmail && !errors.email && (
              <Text as="span">This email account already exists</Text>
            )}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password || formError.incorrectPassword}>
          <FormLabel
            htmlFor="password"
            fontSize="sm"
            fontWeight="medium"
            color="gray.800"
          >
            Password
          </FormLabel>
          <InputGroup size="lg">
            <InputRightElement
              cursor="pointer"
              onClick={() => setViewPassword((prev) => !prev)}
            >
              {formError.incorrectPassword || errors.password ? (
                <Image src={CloseIcon} alt="close icon" />
              ) : (
                <Image src={EyeSlashIcon} alt="eye icon" />
              )}
            </InputRightElement>
            <Input
              id="password"
              type={`${viewPassword ? 'text' : 'password'}`}
              {...register('password', {
                required: 'This is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/i,
                  message: 'You have not met all the password requirments',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage color="red.500">
            {errors.password && errors.password.message}
            {formError.incorrectPassword && !errors.password && (
              <Text as="span">Incorrect password. Please try again</Text>
            )}
          </FormErrorMessage>
          <Box mt="4">
            <Stack
              spacing={2}
              direction="row"
              flexWrap="wrap"
              pointerEvents="none"
            >
              <Checkbox
                id="hasUppercase"
                name="hasUppercase"
                isChecked={passwordCriteria?.hasUppercase}
              >
                Uppercase
              </Checkbox>
              <Checkbox
                id="hasLowercase"
                name="hasLowercase"
                isChecked={passwordCriteria?.hasLowercase}
              >
                Lowercase
              </Checkbox>
              <Checkbox
                id="hasMinLength"
                name="hasMinLength"
                isChecked={passwordCriteria?.hasMinLength}
              >
                More than 8 characters
              </Checkbox>
              <Checkbox
                name="hasSpecialChar"
                isChecked={passwordCriteria?.hasSpecialChar}
              >{`Special character(e.g. /,<>@#$%)`}</Checkbox>
            </Stack>
          </Box>
        </FormControl>
        <Button type="submit" mt="4" size="lg">
          Sign up
        </Button>
      </Stack>
    </form>
  );
};

export default CreateAccountForm;
