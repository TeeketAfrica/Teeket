import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image } from '@chakra-ui/image';
import { Stack, Box } from '@chakra-ui/layout';
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

import CloseIcon from '../../../../assets/icon/CloseIcon.svg';
import EyeSlashIcon from '../../../../assets/icon/EyeSlashIcon.svg';

const PasswordResetForm = ({ onSubmitData }) => {
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
  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <Stack spacing={4}>
        <FormControl isInvalid={errors.password}>
          <FormLabel
            htmlFor="password"
            fontSize="sm"
            fontWeight="medium"
            color="gray.800"
          >
            New password
          </FormLabel>
          <InputGroup size="lg">
            <InputRightElement
              cursor="pointer"
              onClick={() => setViewPassword((prev) => !prev)}
            >
              {errors.password ? (
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
        <Button type="submit" mt="4" size="lg" textTransform="initial">
          Change password
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordResetForm;
