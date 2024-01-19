import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import EmailInput from '../../components/EmailInput';

const PasswordRecoveryForm = ({ onSubmitData }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please input your email address'),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onSubmitData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput formik={formik} label="email address" inputName="email" />

        {/* Submit button */}
        <Button
          type="submit"
          mt="4"
          variant="primary"
          size="lg"
          isDisabled={formik.isSubmitting}
        >
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordRecoveryForm;
