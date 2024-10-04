import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import GoogleIcon from "../../assets/icon/GoogleIcon.svg";
import { useTheme } from "@chakra-ui/system";
import { useGoogleLogin } from "@react-oauth/google";
import authApi from "../../api/authApi";
import axios from "axios";
import { clientId } from "../../utils/constants";

const GoogleBtn = ({ title, handleGoogleResponse }) => {
  const theme = useTheme();

  // const googleLogin = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (response) => {
  //     console.log("response", response);

  //     const tokens = await authApi.post("/google/signup", {
  //       auth_token: response.code,
  //     });

  //     console.log(tokens);

  //     if (handleGoogleResponse) {
  //       handleGoogleResponse(response);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Google Login failed:", error);
  //   },
  // });

  // const googleLogin = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (response) => {
  //     console.log("Google OAuth Response:", response);

  //     try {
  //       const accessToken = response.access_token;

  //       const tokenInfo = await axios.get(
  //         `https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${accessToken}`
  //       );
  //       const idToken = tokenInfo.data.id_token;

  //       console.log("token", tokenInfo);

  //       if (handleGoogleResponse) {
  //         handleGoogleResponse({ id_token: idToken });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching id_token:", error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Google Login failed:", error);
  //   },
  // });

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      console.log("Google OAuth Response:", response);
      // https://accounts.google.com/o/oauth2/v2/auth
      try {
        // Exchanging the auth code for tokens
        const { code } = response;
        const data = {
          code,
          client_id: clientId,
          client_secret: "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",
          redirect_uri: "https://www.teeketafrica.com",
          grant_type: "authorization_code",
        };

        const tokenResponse = await axios.post(
          "https://oauth2.googleapis.com/token",
          data
        );

        const { id_token, access_token } = tokenResponse.data;

        console.log("Token response:", tokenResponse.data);

        // Optionally, get token info
        const tokenInfo = await axios.get(
          `https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${access_token}`
        );

        console.log("Token Info:", tokenInfo.data);

        if (handleGoogleResponse) {
          handleGoogleResponse({ id_token, access_token });
        }
      } catch (error) {
        console.error("Error exchanging auth code for tokens:", error);
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
