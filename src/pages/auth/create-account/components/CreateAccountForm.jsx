import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';

const CreateAccountForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please input your email address'),
    password: Yup.string()
      .required('Please input your password')
      .test(
        'password-criteria',
        'Password must have at least one uppercase letter, one lowercase letter, be at least 8 characters long, and contain at least one special character',
        (value) => {
          const hasUppercase = /[A-Z]/.test(value);
          const hasLowercase = /[a-z]/.test(value);
          const hasMinLength = value.length >= 8;
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

          return hasUppercase && hasLowercase && hasMinLength && hasSpecialChar;
        }
      ),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput formik={formik} label="email address" inputName="email" />

        {/* Password */}
        <PasswordInput
          formik={formik}
          label="password"
          inputName="password"
          isCriteriaVisible={true}
        />

        {/* Submit button */}
        <Button
          type="submit"
          mt="4"
          variant="primary"
          size="lg"
          isDisabled={formik.isSubmitting}
        >
          Sign up
        </Button>
      </Stack>
    </form>
  );
};

export default CreateAccountForm;
