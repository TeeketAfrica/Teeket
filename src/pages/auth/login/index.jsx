import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import GoogleBtn from '../../../components/auth/GoogleBtn';
import AuthHeader from '../../../components/auth/AuthHeader';

const LoginPage = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [viewPassword, setViewPassword] = useState(false);
  const [formError, setFormError] = useState({
    invalidEmail: false,
    incorrectPassword: false,
  });

  const InputStyle = {
    fontSize: 'sm',
    borderColor: 'gray.400',
    borderRadius: '6',
    _hover: {
      borderColor: 'gray.500',
    },
    _focusVisible: {
      borderColor: 'gray.500',
      boxShadow: '0px 0px 1px 4px #CBD1CB',
    },
    _invalid: { borderColor: 'red.300' },
  };

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
            <GoogleBtn />
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
                      {formError.invalidEmail ? (
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.32142 7.64306C8.99598 7.31762 8.46834 7.31762 8.14291 7.64306C7.81747 7.9685 7.81747 8.49613 8.14291 8.82157L9.32142 10.0001L8.14291 11.1786C7.81747 11.504 7.81747 12.0317 8.14291 12.3571C8.46834 12.6825 8.99598 12.6825 9.32142 12.3571L10.4999 11.1786L11.6784 12.3571C12.0039 12.6825 12.5315 12.6825 12.857 12.3571C13.1824 12.0317 13.1824 11.504 12.857 11.1786L11.6784 10.0001L12.857 8.82157C13.1824 8.49613 13.1824 7.9685 12.857 7.64306C12.5315 7.31762 12.0039 7.31762 11.6784 7.64306L10.4999 8.82157L9.32142 7.64306Z"
                            fill="#800009"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.5 1.66675C5.89759 1.66675 2.16663 5.39771 2.16663 10.0001C2.16663 14.6025 5.89759 18.3334 10.5 18.3334C15.1023 18.3334 18.8333 14.6025 18.8333 10.0001C18.8333 5.39771 15.1023 1.66675 10.5 1.66675ZM3.83329 10.0001C3.83329 6.31818 6.81806 3.33341 10.5 3.33341C14.1819 3.33341 17.1666 6.31818 17.1666 10.0001C17.1666 13.682 14.1819 16.6667 10.5 16.6667C6.81806 16.6667 3.83329 13.682 3.83329 10.0001Z"
                            fill="#800009"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.3336 17.5C18.1745 17.5 19.6669 16.0076 19.6669 14.1667V6.68557C19.6672 6.67283 19.6672 6.66005 19.6669 6.64725V5.83333C19.6669 3.99238 18.1745 2.5 16.3336 2.5H4.66693C2.82598 2.5 1.3336 3.99238 1.3336 5.83333V6.64726C1.3333 6.66005 1.3333 6.67282 1.3336 6.68556V14.1667C1.3336 16.0076 2.82598 17.5 4.66693 17.5H16.3336ZM3.00026 14.1667C3.00026 15.0871 3.74645 15.8333 4.66693 15.8333H16.3336C17.2541 15.8333 18.0003 15.0871 18.0003 14.1667V7.89753L11.7382 10.4023C10.9435 10.7202 10.057 10.7202 9.26229 10.4023L3.00026 7.89753V14.1667ZM11.1192 8.85488L18.0003 6.10247V5.83333C18.0003 4.91286 17.2541 4.16667 16.3336 4.16667H4.66693C3.74645 4.16667 3.00026 4.91286 3.00026 5.83333V6.10247L9.88128 8.85488C10.2786 9.01382 10.7219 9.01382 11.1192 8.85488Z"
                            fill="#5E665E"
                          />
                        </svg>
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
                      sx={InputStyle}
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
                      {formError.incorrectPassword ? (
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.32154 7.64306C8.9961 7.31762 8.46847 7.31762 8.14303 7.64306C7.81759 7.9685 7.81759 8.49613 8.14303 8.82157L9.32154 10.0001L8.14303 11.1786C7.81759 11.504 7.81759 12.0317 8.14303 12.3571C8.46847 12.6825 8.9961 12.6825 9.32154 12.3571L10.5001 11.1786L11.6786 12.3571C12.004 12.6825 12.5316 12.6825 12.8571 12.3571C13.1825 12.0317 13.1825 11.504 12.8571 11.1786L11.6786 10.0001L12.8571 8.82157C13.1825 8.49613 13.1825 7.9685 12.8571 7.64306C12.5316 7.31762 12.004 7.31762 11.6786 7.64306L10.5001 8.82157L9.32154 7.64306Z"
                            fill="#800009"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.5001 1.66675C5.89771 1.66675 2.16675 5.39771 2.16675 10.0001C2.16675 14.6025 5.89771 18.3334 10.5001 18.3334C15.1025 18.3334 18.8334 14.6025 18.8334 10.0001C18.8334 5.39771 15.1025 1.66675 10.5001 1.66675ZM3.83341 10.0001C3.83341 6.31818 6.81818 3.33341 10.5001 3.33341C14.182 3.33341 17.1667 6.31818 17.1667 10.0001C17.1667 13.682 14.182 16.6667 10.5001 16.6667C6.81818 16.6667 3.83341 13.682 3.83341 10.0001Z"
                            fill="#800009"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7558 2.74408C18.0812 3.06951 18.0812 3.59715 17.7558 3.92259L4.42243 17.2559C4.09699 17.5814 3.56935 17.5814 3.24391 17.2559C2.91848 16.9305 2.91848 16.4028 3.24391 16.0774L16.5772 2.74408C16.9027 2.41864 17.4303 2.41864 17.7558 2.74408Z"
                            fill="#667185"
                          />
                          <path
                            d="M13.6661 4.4767C12.7275 4.03469 11.6692 3.75 10.4998 3.75C8.04641 3.75 6.08214 5.00308 4.68616 6.33307C3.28698 7.66611 2.37909 9.14973 2.0197 9.7915C1.78418 10.2121 1.75613 10.7143 1.94946 11.1603C2.08447 11.4718 2.31407 11.9544 2.65249 12.5143C2.89053 12.9082 3.40282 13.0346 3.79671 12.7965C4.19061 12.5585 4.31695 12.0462 4.07891 11.6523C3.80672 11.2019 3.61784 10.8124 3.50328 10.5537C3.84141 9.95778 4.64221 8.67693 5.83581 7.53975C7.06871 6.36513 8.64153 5.41667 10.4998 5.41667C11.1682 5.41667 11.7997 5.53937 12.3916 5.75116L13.6661 4.4767Z"
                            fill="#667185"
                          />
                          <path
                            d="M15.2419 7.61491C16.3924 8.73288 17.1657 9.97087 17.4964 10.5537C17.3818 10.8124 17.1929 11.2019 16.9207 11.6523C16.6827 12.0462 16.809 12.5585 17.2029 12.7965C17.5968 13.0346 18.1091 12.9082 18.3472 12.5143C18.6856 11.9544 18.9152 11.4718 19.0502 11.1603C19.2435 10.7143 19.2155 10.2121 18.9799 9.7915C18.6298 9.16625 17.759 7.74193 16.4206 6.43629L15.2419 7.61491Z"
                            fill="#667185"
                          />
                          <path
                            d="M10.4998 6.66667C10.8027 6.66667 11.098 6.69898 11.3825 6.76034L9.66762 8.47519C8.95638 8.7262 8.3927 9.28987 8.1417 10.0011L6.42684 11.716C6.36548 11.4315 6.33317 11.1362 6.33317 10.8333C6.33317 8.53215 8.19865 6.66667 10.4998 6.66667Z"
                            fill="#667185"
                          />
                          <path
                            d="M10.4998 13.3333C10.2074 13.3333 9.92677 13.2831 9.66597 13.1909L8.4151 14.4418C9.02828 14.7968 9.74033 15 10.4998 15C12.801 15 14.6665 13.1345 14.6665 10.8333C14.6665 10.0738 14.4633 9.36177 14.1083 8.74859L12.8574 9.99947C12.9496 10.2603 12.9998 10.5409 12.9998 10.8333C12.9998 12.214 11.8805 13.3333 10.4998 13.3333Z"
                            fill="#667185"
                          />
                        </svg>
                      )}
                    </InputRightElement>
                    <Input
                      id="password"
                      type={`${viewPassword ? 'text' : 'password'}`}
                      {...register('password', {
                        required: 'This is required',
                      })}
                      sx={InputStyle}
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
                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  mt="4"
                  background="gray.800"
                  color="white"
                  _hover={{
                    background: '#090909',
                  }}
                >
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
