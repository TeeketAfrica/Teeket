import { Link } from "react-router-dom";
import { Box, Divider, Text } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import GoogleBtn from "../../../components/auth/GoogleBtn";

import LoginForm from "./components/LoginForm";
import { useToast } from "@chakra-ui/react";
import { authApi } from "../../../utils/api";

const LoginPage = () => {
  const theme = useTheme();
  const toast = useToast();

  const googleLogin = async (res) => {
    try {
      const response = await authApi.post("/google/login", {
        auth_token: res.access_token,
      });
      console.log("Login successful:", response);

      const token = response.data;

      sessionStorage.setItem("TOKEN", token);

      // if (token) {
      //   sessionStorage.setItem("TOKEN", token);
      //   dispatch(setUserDetails(values));
      //   const path = sessionStorage.getItem("REDIRECT");

      //   if (path) {
      //     console.log(path);
      //     sessionStorage.removeItem("REDIRECT");
      //     navigate(path);
      //   } else {
      //     navigate("/app/overview");
      //   }
      // }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
        title: "Events failed to fetch.",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <AuthLayout>
        <Box display="flex" flexDirection="column" gap={8}>
          <AuthHeader
            heading="Welcome back!"
            subheading="Don’t have an account?"
            subheadingLink="Sign up"
          />
          <Box>
            <GoogleBtn
              title="Login with Google"
              handleGoogleResponse={googleLogin}
            />
            <Box display="flex" gap={2} alignItems="center" mt={6}>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
              <Text>Or</Text>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
            </Box>
          </Box>
          <Box>
            <LoginForm />
          </Box>
          <Box>
            <Text
              color={theme.colors.gray[600]}
              textAlign="center"
              fontSize="sm"
            >
              Forgot Password?{" "}
              <Text
                as="span"
                color={theme.colors.gray[700]}
                fontWeight="semibold"
                fontSize="sm"
              >
                <Link to="/auth/password-recovery">Recover</Link>
              </Text>
            </Text>
          </Box>
        </Box>
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
