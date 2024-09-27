import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Text } from "@chakra-ui/react";
import { Box, HStack } from "@chakra-ui/layout";
import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import { maskEmail } from "../../../utils/utils";
import { authApi } from "../../../utils/api";
import { useStorage } from "../../../utils/storage";

const CreateAccountPage = () => {
  const location = useLocation();
  const { value, token } = location.state || {};
  const navigate = useNavigate();
  const { setAccessToken } = useStorage();

  const formatEmail = value && maskEmail(value);

  const [otpError, setOtpError] = useState(false);
  const formik = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
    validationSchema: Yup.object({
      otp1: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
      otp2: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
      otp3: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
      otp4: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
      otp5: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
      otp6: Yup.string()
        .required("Required")
        .matches(/^\d$/, "Must be a digit"),
    }),
    onSubmit: async (values) => {
      const otp =
        values.otp1 +
        values.otp2 +
        values.otp3 +
        values.otp4 +
        values.otp5 +
        values.otp6;
      try {
        const verifyOTPResponse = await authApi.post("/verify_otp", {
          email: value,
          otp: otp,
          kind: "verify",
        });
        if (verifyOTPResponse.status === 200) {
          navigate("/app/overview");
        }
      } catch (err) {
        setOtpError(true);
      }
    },
  });

  useEffect(() => {
    if (!value) {
      navigate("auth/create-account");
    } else {
      setAccessToken(token);
    }
  }, [navigate, setAccessToken, token, value]);

  const handleInputChange = (e) => {
    if (otpError) {
      setOtpError(false);
    }
    formik.handleChange(e);
  };

  const resendOTP = async () => {
    try {
      await authApi.post("/send_otp", {
        email: value,
        kind: "verify",
      });
    } catch (err) {
      console.log("Error encountered while resend OTP", err);
    }

    setOtpError(false);
    formik.resetForm();
  };

  return (
    <AuthLayout>
      <Box display="flex" flexDirection="column" gap={8}>
        <AuthHeader
          heading="Enter OTP"
          subheading={`Enter the OTP code that we sent to your email ${formatEmail} to verify your email.`}
        />

        <form onSubmit={formik.handleSubmit}>
          <Box>
            <HStack justifyContent="center" marginBottom={6}>
              {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map(
                (field, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength="1"
                    name={field}
                    value={formik.values[field]}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    maxWidth="55px"
                    height={{ base: "50px", md: "55px" }}
                    variant="filled"
                    fontSize={{ base: "14px", md: "16px" }}
                    textAlign="center"
                    textTransform="capitalize"
                    backgroundColor={
                      otpError
                        ? "transparent"
                        : formik.touched[field] && formik.errors[field]
                        ? "transparent"
                        : formik.values[field]
                        ? "transparent"
                        : "gray.300"
                    }
                    borderColor={
                      otpError
                        ? "red.400"
                        : formik.touched[field] && formik.errors[field]
                        ? "red.400"
                        : formik.values[field]
                        ? "gray.300"
                        : "transparent"
                    }
                    _hover={{
                      backgroundColor: "transparent",
                      borderColor: otpError
                        ? "red.400"
                        : formik.touched[field] && formik.errors[field]
                        ? "red.500"
                        : "gray.300",
                    }}
                    _focus={{
                      borderColor: otpError
                        ? "red.400"
                        : formik.touched[field] && formik.errors[field]
                        ? "red.500"
                        : "gray.300",
                    }}
                  />
                )
              )}
            </HStack>
            <Text color="gray.600" textAlign="center" fontSize="sm">
              {otpError ? "Incorrect OTP try again" : "Didn’t get OTP?"}{" "}
              <Text
                as="span"
                color="gray.700"
                fontWeight="semibold"
                fontSize="sm"
                cursor="pointer"
                onClick={resendOTP}
              >
                {otpError ? "Resend OTP" : "Resend"}
              </Text>
            </Text>
          </Box>
          <Button type="submit" mt="4" variant="primary" size="lg" width="100%">
            Verify email
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default CreateAccountPage;
