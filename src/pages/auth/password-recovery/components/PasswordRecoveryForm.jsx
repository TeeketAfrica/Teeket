import { useFormik } from "formik";
import * as Yup from "yup";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

import EmailInput from "../../components/EmailInput";

const PasswordRecoveryForm = ({ onSubmitData }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmitData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput
          formik={{
            handleChange: formik.handleChange,
            values: formik.values,
            touched: formik.touched,
            errors: formik.errors,
            setFieldTouched: formik.setFieldTouched,
          }}
          label="Email address"
          inputName="email"
        />

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
