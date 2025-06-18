import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Stack, Flex, Center, Button, useToast } from "@chakra-ui/react";
import TextInput from "@/components/shared/TextInput";
import { teeketApi } from "../../../utils/api";

const ContactForm = () => {
  const toast = useToast();
  const [error, setError] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please input your first name"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
    comment: Yup.string().required("Please input your comments"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      comment: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await teeketApi.post("/contact-us", {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          message: values.comment,
        });

        if (response.status === 200) {
          toast({
            title: "Message sent!",
            description: "We've received your message and will get back to you soon.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
          resetForm();
        }
      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.message || "An error occurred";
        setError(errorMessage);
        toast({
          title: "Failed to send message",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Name Fields */}
        <Flex direction={{ base: "column", sm: "row" }} gap={6}>
          <TextInput
            formik={formik}
            label="First name"
            inputName="firstName"
            error={error}
            handleError={setError}
          />
          <TextInput
            formik={formik}
            label="Last name"
            inputName="lastName"
            error={error}
            handleError={setError}
          />
        </Flex>

        {/* Email Field */}
        <TextInput
          formik={formik}
          type="email"
          label="Email address"
          inputName="email"
          error={error}
          handleError={setError}
        />

        {/* Comment Field */}
        <TextInput
          formik={formik}
          type="textarea"
          label="Comments"
          inputName="comment"
          error={error}
          handleError={setError}
        />

        {/* Submit Button */}
        <Center>
          <Button
            type="submit"
            mt="4"
            paddingBlock={2}
            paddingInline={4}
            w="fit-content"
            size="sm"
            variant="primary"
            isLoading={formik.isSubmitting}
            loadingText="Sending..."
          >
            Send message
          </Button>
        </Center>
      </Stack>
    </form>
  );
};

export default ContactForm;
