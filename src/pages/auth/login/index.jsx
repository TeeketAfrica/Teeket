import { Box, Divider, Text } from "@chakra-ui/layout";
import AuthLayout from "../../../components/auth/AuthLayout";
import GoogleBtn from "../../../components/auth/GoogleBtn";
import AuthHeader from "../../../components/auth/AuthHeader";
import { useTheme } from "@chakra-ui/system";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();

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
            <GoogleBtn />
            <Box display="flex" gap={2} alignItems="center" mt={6}>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
              <Text>Or</Text>
              <Divider border="1px solid" borderColor={theme.colors.grey100} />
            </Box>
          </Box>
          <Box>Insert Form Component</Box>
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
