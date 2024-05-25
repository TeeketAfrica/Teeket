import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { setToken, setUserDetails } from "../../../../features/userSlice";

import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

// Importing icons
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
    password: Yup.string().required("Please input your password"),
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authApi.post("/login", {
          email: values.email,
          password: values.password,
        });

        const token = response.data.access_token;

        if (token) {
          sessionStorage.setItem("TOKEN", token);
          dispatch(setToken(token));
          dispatch(setUserDetails(values));
          navigate("/app/overview");
        }
      } catch (err) {
        console.log(err.response.data.message);
        if (err.response.data.message === "Authentication Error") {
          setErrors({ email: "Incorrect email address" });
        } else {
          setErrors({ password: "Incorrect password" });
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
        <EmailInput
          formik={formik}
          label="Email address"
          inputName="email"
          errors={errors}
          handleError={setErrors}
        />

        {/* Password */}
        <PasswordInput
          formik={formik}
          label="Password"
          inputName="password"
          errors={errors}
          handleError={setErrors}
        />

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
