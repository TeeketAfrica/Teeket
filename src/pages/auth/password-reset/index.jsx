import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import PasswordResetForm from "./components/PasswordResetForm";
import DoubleCheckMark from "../../../assets/icon/DoubleCheckMark.svg";

const PasswordResetPage = () => {
  const [passwordReset, setPasswordReset] = useState(false);

  const handleOnSubmit = () => {
    setPasswordReset(true);
  };

  return (
    <AuthLayout>
      <Box display="flex" flexDirection="column" gap={8}>
        {passwordReset ? (
          <>
            <Box textAlign="center">
              <DoubleCheckMark />
            </Box>
            <AuthHeader
              heading="Password reset"
              subheading="Your password was reset successfully"
            />
            <Link to="/auth/login">
              <Button type="button" mt="4" size="lg" w="full">
                Back to Login
              </Button>
            </Link>
          </>
        ) : (
          <>
            <AuthHeader heading="Reset password" />
            <Box>
              <PasswordResetForm onSubmitData={handleOnSubmit} />
            </Box>
          </>
        )}
      </Box>
    </AuthLayout>
  );
};

export default PasswordResetPage;
