import { Link } from "react-router-dom";
import { Box, Divider, Text } from "@chakra-ui/layout";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import GoogleBtn from "../../../components/auth/GoogleBtn";
import CreateAccountForm from "./components/CreateAccountForm";
import authApi from "../../../api/authApi";
import { useToast } from "@chakra-ui/react";
// import { useDispatch } from "react-redux";

const CreateAccountPage = () => {
  const toast = useToast();
  // const dispatch = useDispatch();

  const googleSignup = async (res) => {
    try {
      const response = await authApi.post("/google/signup", {
        auth_token: res.access_token,
      });
      console.log("Signup successful:", response);

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
    <AuthLayout>
      <Box display="flex" flexDirection="column" gap={8}>
        <AuthHeader
          heading="Create an account!"
          subheading="Already have an account?"
          subheadingLink="login"
        />
        <Box>
          <GoogleBtn
            title="Connect with Google"
            handleGoogleResponse={googleSignup}
          />
          <Box display="flex" gap={2} alignItems="center" mt={6}>
            <Divider border="1px solid" borderColor="grey100" />
            <Text>Or</Text>
            <Divider border="1px solid" borderColor="grey100" />
          </Box>
        </Box>
        <Box>
          <CreateAccountForm />
        </Box>
        <Box>
          <Text color="gray.600" textAlign="center" fontSize="sm">
            Forgot Password?{" "}
            <Text
              as="span"
              color="gray.700"
              fontWeight="semibold"
              fontSize="sm"
            >
              <Link to="/auth/password-recovery">Recover</Link>
            </Text>
          </Text>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default CreateAccountPage;
