import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/layout';
import { useTheme } from '@chakra-ui/system';

import AuthLayout from '../../../components/auth/AuthLayout';
import AuthHeader from '../../../components/auth/AuthHeader';
import PasswordRecoveryForm from './components/PasswordRecoveryForm';

const PasswordRecoveryPage = () => {
  const theme = useTheme();

  return (
    <AuthLayout>
      <Box display="flex" flexDirection="column" gap={8}>
        <AuthHeader
          heading="Forgot you password?"
          subheading="Enter the email associated with your account and we will send a link to reset your password."
        />
        <Box>
          <PasswordRecoveryForm />
        </Box>
        <Box>
          <Text color={theme.colors.gray[600]} textAlign="center" fontSize="sm">
            Do you remember it now?{' '}
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
      </Box>
    </AuthLayout>
  );
};

export default PasswordRecoveryPage;
