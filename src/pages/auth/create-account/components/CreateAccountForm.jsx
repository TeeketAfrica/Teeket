import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

import EmailInput from "../../../../components/shared/EmailInput";
import PasswordInput from "../../../../components/shared/PasswordInput";
import { authApi } from "../../../../utils/api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../../features/userSlice";

const CreateAccountForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        console.log(token);

        if (token) {
          try {
            const sendOTP = await authApi.post("/send_otp", {
              email: values.email,
              kind: "verify",
            });
            console.log(sendOTP);
            if (sendOTP.status === 200) {
              dispatch(setUserDetails(values));

              // navigate("/auth/send-otp", {
              //   state: { value: values.email, token: token },
              // });
              navigate("/app/overview");
            }
          } catch (err) {
            console.log("Error sending OTP", err);
          }
        }
      } catch (err) {
        console.log("Error creating user", err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput formik={formik} label="Email address" inputName="email" />

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
