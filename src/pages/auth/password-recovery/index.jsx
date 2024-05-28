import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { Button } from "@chakra-ui/react";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import PasswordRecoveryForm from "./components/PasswordRecoveryForm";

import { maskEmail } from "../../../utils/utils";
import authApi from "../../../api/authApi";

const PasswordRecoveryPage = () => {
  const theme = useTheme();
  const [recoveryLink, setRecoveryLink] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleOnSubmit = async (data) => {
    try {
      const response = await authApi.post("/forgot_password", {
        email: data.email,
      });

      if (response.status === 200) {
        setRecoveryEmail(data.email);
        setRecoveryLink(true);
      }
    } catch (err) {
      console.log("Recovery mail error", err);
    }
  };

  return (
    <AuthLayout>
      <Box display="flex" flexDirection="column" gap={8}>
        {recoveryLink && recoveryEmail ? (
          <Box>
            <Heading as="h2" fontWeight="bold" textAlign="center" mb="2">
              Check your email
            </Heading>
            <Text color="gray.600" textAlign="center">
              You should receive an email at{" "}
              <Text as="span" fontWeight="semibold">
                {maskEmail(recoveryEmail)}{" "}
              </Text>
              shortly with the link to reset your password.
            </Text>
            <Text textAlign="center" color="gray.600" my="8">
              Didn’t receive it?{" "}
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                cursor="pointer"
                color="gray.700"
              >
                Resend link
              </Text>
            </Text>
            <Link to="/auth/login">
              <Button type="button" mt="4" size="lg" w="full" variant="primary">
                Back to Login
              </Button>
            </Link>
          </Box>
        ) : (
          <>
            <AuthHeader
              heading="Forgot you password?"
              subheading="Enter the email associated with your account and we will send a link to reset your password."
            />
            <Box>
              <PasswordRecoveryForm onSubmitData={handleOnSubmit} />
            </Box>
            <Box>
              <Text
                color={theme.colors.gray[600]}
                textAlign="center"
                fontSize="sm"
              >
                Do you remember it now?{" "}
                <Text
                  as="span"
                  color={theme.colors.gray[700]}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  <Link to="/auth/login">Login</Link>
                </Text>
              </Text>
            </Box>
          </>
        )}
      </Box>
    </AuthLayout>
  );
};

export default PasswordRecoveryPage;
