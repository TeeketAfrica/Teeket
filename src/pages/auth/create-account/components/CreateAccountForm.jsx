import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Stack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";

import PasswordInput from "@/components/shared/PasswordInput";
import { authApi } from "@/utils/api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/features/userSlice";
import TextInput from "@/components/shared/TextInput";

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
    password: Yup.string()
      .required("Please input your password")
      .test(
        "password-criteria",
        "Password must have at least one uppercase letter, one lowercase letter, be at least 8 characters long, and contain at least one special character",
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authApi.post("/signup", {
          email: values.email,
          password: values.password,
        });

        const token = response.data.access_token;

        if (token) {
          try {
            const sendOTP = await authApi.post("/send_otp", {
              email: values.email,
              kind: "verify",
            });
            console.log(sendOTP);
            if (sendOTP.status === 200) {
              dispatch(setUserDetails(values));

              navigate("/auth/send-otp", {
                state: { value: values.email, token: token },
              });
              // navigate("/app/overview");
            }
          } catch (err) {
            console.log("Error sending OTP", err);
            toast({
              title: "Error sending OTP",
              status: "error",
              duration: 5000,
              position: "top-right",
              isClosable: true,
            });
          }
        }
      } catch (err) {
        console.log("Error creating user", err);
        toast({
          title: "Error creating user",
          description: err.response.data.message === "Validation Error"? "Account already exists": err.response.data.message,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <TextInput formik={formik} label="Email address" inputName="email" />

        {/* Password */}
        <PasswordInput
          formik={formik}
          label="Password"
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
