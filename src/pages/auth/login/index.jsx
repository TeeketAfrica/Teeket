import { Link } from 'react-router-dom';
import { Box, Divider, Text } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';

import AuthLayout from '../../../components/auth/AuthLayout';
import AuthHeader from '../../../components/auth/AuthHeader';
import GoogleBtn from '../../../components/auth/GoogleBtn';

import LoginForm from './components/LoginForm';

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
            <GoogleBtn title="Login with Google" />
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
              Forgot Password?{' '}
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
