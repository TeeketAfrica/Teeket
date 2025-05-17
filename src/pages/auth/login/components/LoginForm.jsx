import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api";
import { setUserDetails } from "@/features/userSlice";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import PasswordInput from "@/components/shared/PasswordInput";
import { useStorage } from "@/utils/storage";
import { selectActiveUser } from "@/features/activeUserSlice";
import TextInput from "@/components/shared/TextInput";
import { setActiveUser } from "../../../../features/activeUserSlice";
import useGetSelf from "../../../../hooks/useGetSelf";
import { teeketApi } from "../../../../utils/api";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const { setAccessToken, setRefreshToken } = useStorage();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please input your email address"),
    password: Yup.string().required("Please input your password"),
  });

  const [error, setError] = useState("");

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

        console.log(response.data)

        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        // const userData = response2.data;

        if (access_token) {
          // set the refresh token and access token to cookie storage
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          const response2 = await teeketApi.get("/user/profile", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
          })

          dispatch(setUserDetails(values));
          dispatch(setActiveUser(response2.data));


          const path = sessionStorage.getItem("REDIRECT");
          if (path) {
            sessionStorage.removeItem("REDIRECT");
            navigate(path);
          }

          if (!activeUser?.is_creator) {
            navigate("/events");
          } else {
            navigate("/app/overview");
          }
        }
      } catch (err) {
        if (err.message == "Network Error") {
          alert("Check your internet connection!.");
        } else {
          setError("Invalid username or password");
        }
        console.log("Failed to login", err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* Email Address */}
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

        {/* Password */}
        <PasswordInput
          formik={{
            handleChange: formik.handleChange,
            values: formik.values,
            touched: formik.touched,
            errors: formik.errors,
            setFieldTouched: formik.setFieldTouched,
          }}
          label="Password"
          inputName="password"
          error={error}
          handleError={setError}
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
