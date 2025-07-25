import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api";
import { setUserDetails } from "@/features/userSlice";
import { Stack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import PasswordInput from "@/components/shared/PasswordInput";
import { useStorage } from "@/utils/storage";
import { selectActiveUser } from "@/features/activeUserSlice";
import TextInput from "@/components/shared/TextInput";
import { setActiveUser } from "../../../../features/activeUserSlice";
import { teeketApi } from "../../../../utils/api";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const { setAccessToken, setRefreshToken } = useStorage();
  const toast = useToast();

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

        console.log("res", response)
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

        if (err.response.data.message == "Network Error") {
          console.log("sad", err)
          alert("Check your internet connection!.");
        }
        else if (err.response.data.message === "User is not verified") {
          try {
            const sendOTP = await authApi.post("/send_otp", {
              email: values.email,
              kind: "verify_and_login",
            });
            console.log(sendOTP);
            if (sendOTP.status === 200) {
              dispatch(setUserDetails(values));

              navigate("/auth/send-otp", {
                state: { value: values.email },
              });
              // navigate("/app/overview");
            }
          }
          catch (err) {
            console.log(err)
            toast({
              title: "Error sending otp",
              description: `${err.response.data.message}`,
              status: "error",
              duration: 5000,
              position: "top-right",
              isClosable: true,
            })

          }
        }
        else {
          setError("Invalid username or password");
          console.log("Failed to login", err.response.data.message);
          toast({
            title: "Error login in",
            description: `${err.response.data.message}`,
            status: "error",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        }
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
