import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Image } from '@chakra-ui/image';
import { Stack, Box, Divider, Text } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthHeader from '../../../components/auth/AuthHeader';
import GoogleBtn from '../../../components/auth/GoogleBtn';

import MailIcon from '../../../assets/icon/MailIcon.svg';
import CloseIcon from '../../../assets/icon/CloseIcon.svg';
import EyeSlashIcon from '../../../assets/icon/EyeSlashIcon.svg';

const LoginPage = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [viewPassword, setViewPassword] = useState(false);
  const [formError] = useState({
    invalidEmail: false,
    incorrectPassword: false,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <AuthLayout>
        <Box display="flex" flexDirection="column" gap={8}>
          <AuthHeader
            heading="Welcome back!"
            subheading="Don’t have an account?"
            subheadingLink="Sign up"
          />
          <Box>
            <GoogleBtn title="Login with Google" />
            <Box display="flex" gap={2} alignItems="center" mt={6}>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
              <Text>Or</Text>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
            </Box>
          </Box>
          <Box>
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
                      <Text as="span">Not a valid email address</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.password || formError.incorrectPassword}
                >
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
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red.500">
                    {errors.password && errors.password.message}
                    {formError.incorrectPassword && !errors.password && (
                      <Text as="span">
                        Incorrect password. Please try again
                      </Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <Button type="submit" mt="4" size="lg">
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
          <Box>
            <Text
              color={theme.colors.gray[600]}
              textAlign="center"
              fontSize="sm"
            >
              Forgot Password?{' '}
              <Text
                as="span"
                color={theme.colors.gray[700]}
                fontWeight="semibold"
                fontSize="sm"
              >
                <Link to="/auth/password-recovery">Recover</Link>
              </Text>
            </Text>
          </Box>
        </Box>
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
