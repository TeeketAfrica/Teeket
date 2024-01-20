import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

// Importing icons
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';

const LoginForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please input your email address'),
    password: Yup.string().required('Please input your password'),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput formik={formik} label="Email address" inputName="email" />

        {/* Password */}
        <PasswordInput formik={formik} label="Password" inputName="password" />

        {/* Submit button */}
        <Button
          type="submit"
          mt="4"
          size="lg"
          variant="primary"
          isDisabled={formik.isSubmitting}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
