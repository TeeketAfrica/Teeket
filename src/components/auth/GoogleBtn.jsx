import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Text } from '@chakra-ui/layout';
import GoogleIcon from '../../assets/icon/GoogleIcon.svg';
import { useTheme } from '@chakra-ui/system';

const GoogleBtn = () => {
  const theme = useTheme();
  return (
    <Button
      variant="outline"
      display="flex"
      gap={4}
      w="100%"
      p={4}
      borderRadius="6px"
      border="1.5px solid"
      borderColor={theme.colors.gray[400]}
      size="lg"
    >
      <Image src={GoogleIcon} alt="Register with google" />
      <Text fontWeight="semibold" color={theme.colors.gray[800]}>
        Login with Google
      </Text>
    </Button>
  );
};

export default GoogleBtn;
