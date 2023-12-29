import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image } from '@chakra-ui/image';
import { Stack, Text } from '@chakra-ui/layout';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

import MailIcon from '../../../../assets/icon/MailIcon.svg';
import CloseIcon from '../../../../assets/icon/CloseIcon.svg';

const PasswordRecoveryForm = ({ onSubmitData }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [formError] = useState({
    invalidEmail: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
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
                  message: 'Not a valid email address',
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
        <Button type="submit" mt="4" size="lg">
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordRecoveryForm;
