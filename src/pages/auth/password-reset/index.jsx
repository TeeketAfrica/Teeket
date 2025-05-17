import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import PasswordResetForm from "./components/PasswordResetForm";
import DoubleCheckMark from "../../../assets/icon/DoubleCheckMark.svg";

const PasswordResetPage = () => {
  const params = useParams()
  const {id, token} = params

  const [passwordReset, setPasswordReset] = useState(false);

  const handleOnSubmit = async(value) => {
    console.log(value)

          try {
            const response = await authApi.post("/accounts/reset_password", {
              uidb64: id, token, new_password: value
            });

            setPasswordReset(true)
    

          } catch (err) {
            if (err.message == "Network Error") {
              alert("Check your internet connection!.");
            } else {
              alert("Invalid or Expired token");
              // setError("Invalid or Expired token");
            }
            console.log("Failed to Reset Password", err.message);
          }
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
