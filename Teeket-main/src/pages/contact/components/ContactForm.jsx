import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Stack } from "@chakra-ui/layout";
import { Button, Flex, Center } from "@chakra-ui/react";
import TextInput from "@/components/shared/TextInput";

const ContactForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please input your first name"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
    comment: Yup.string().required("Please input your comments"),
  });

  const [error, setError] = useState("");

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      comment: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* names */}
        <Flex direction={{ base: "column", sm: "row" }} gap={6}>
          <TextInput
            formik={{
              handleChange: formik.handleChange,
              values: formik.values,
              touched: formik.touched,
              errors: formik.errors,
              setFieldTouched: formik.setFieldTouched,
            }}
            label="First name"
            inputName="firstName"
            error={error}
            handleError={setError}
          />
          <TextInput
            formik={{
              handleChange: formik.handleChange,
              values: formik.values,
              touched: formik.touched,
              errors: formik.errors,
              setFieldTouched: formik.setFieldTouched,
            }}
            label="Last name"
            inputName="lastName"
            error={error}
            handleError={setError}
          />
        </Flex>

        {/* email */}
        <TextInput
          formik={{
            handleChange: formik.handleChange,
            values: formik.values,
            touched: formik.touched,
            errors: formik.errors,
            setFieldTouched: formik.setFieldTouched,
          }}
          type="email"
          label="Email address"
          inputName="email"
          error={error}
          handleError={setError}
        />
        <TextInput
          formik={{
            handleChange: formik.handleChange,
            values: formik.values,
            touched: formik.touched,
            errors: formik.errors,
            setFieldTouched: formik.setFieldTouched,
          }}
          type="textarea"
          label="Comments"
          inputName="comment"
          error={error}
          handleError={setError}
        />

        {/* Submit button */}
        <Center>
          <Button
            type="submit"
            mt="4"
            paddingBlock={2}
            paddingInline={4}
            w={"fit-content"}
            size="sm"
            variant="primary"
            isDisabled={formik.isSubmitting}
          >
            Send message
          </Button>
        </Center>
      </Stack>
    </form>
  );
};

export default ContactForm;
