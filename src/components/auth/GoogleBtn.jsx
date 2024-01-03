import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Text } from '@chakra-ui/layout';
import GoogleIcon from '../../assets/icon/GoogleIcon.svg';
import { useTheme } from '@chakra-ui/system';

const GoogleBtn = ({ title }) => {
  const theme = useTheme();
  return (
    <Button w="100%" size="lg" variant="secondary" gap="4">
      <Image src={GoogleIcon} alt="Register with google" />
      <Text fontWeight="semibold" color={theme.colors.gray[800]}>
        {title}
      </Text>
    </Button>
  );
};

export default GoogleBtn;
