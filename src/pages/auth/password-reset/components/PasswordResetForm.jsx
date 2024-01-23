import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import PasswordInput from '../../components/PasswordInput';

const PasswordResetForm = ({ onSubmitData }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    newPassword: Yup.string()
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
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onSubmitData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Password */}
        <PasswordInput
          formik={formik}
          label="New password"
          inputName="newPassword"
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
          Change password
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordResetForm;
