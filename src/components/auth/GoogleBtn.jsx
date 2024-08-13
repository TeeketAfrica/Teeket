import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import GoogleIcon from "../../assets/icon/GoogleIcon.svg";
import { useTheme } from "@chakra-ui/system";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleBtn = ({ title, handleGoogleResponse }) => {
  const theme = useTheme();

  // const googleLogin = async (res) => {
  //   try {
  //     const response = await authApi.post("/google/login", {
  //       token: res.tokenId,
  //     });
  //     console.log("Login successful:", response.data);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      if (handleGoogleResponse) {
        handleGoogleResponse(response);
      }
    },
    onError: (error) => {
      console.error("Google Login failed:", error);
    },
  });

  return (
    <Button
      w="100%"
      size="lg"
      variant="secondary"
      gap="4"
      onClick={() => googleLogin()}
    >
      <Image src={GoogleIcon} alt="Register with google" />
      <Text fontWeight="semibold" color={theme.colors.gray[800]}>
        {title}
      </Text>
    </Button>
  );
};

export default GoogleBtn;
