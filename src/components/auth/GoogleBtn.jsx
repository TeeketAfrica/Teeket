import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import {
    useGoogleLogin,
    GoogleOAuthProvider,
    GoogleLogin,
} from "@react-oauth/google";
import GoogleIcon from "../../assets/icon/GoogleIcon.svg";
import { clientId, googleClientSecretKey } from "../../utils/constants";
import { authApi } from "../../utils/api";
import { useEffect, useState } from "react";
import useStorage from "../../utils/storage";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../features/userSlice";

const GoogleBtn = ({ title, handleGoogleResponse }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location, "location");

    const { setAccessToken, setRefreshToken, getAccessToken } = useStorage();
    const [error, setError] = useState("");

    const handleGoogleLogin = async (credentialResponse, isSignup) => {
        const endpoint = isSignup ? "/google/signup" : "/google/login";
        try {
            const response = await authApi.post(endpoint, {
                code: credentialResponse.code,
            });
            const { access_token, refresh_token } = response?.data;

            if (access_token && refresh_token) {
                setAccessToken(access_token);
                setRefreshToken(refresh_token);

                const redirectPath = sessionStorage.getItem("REDIRECT");
                if (redirectPath) {
                    sessionStorage.removeItem("REDIRECT");
                    navigate(redirectPath);
                } else {
                    navigate("/app/overview");
                }
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
            if (err.message === "Network Error") {
                alert("Please check your internet connection.");
            }
        }
    };

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (credentialResponse) => {
            const isSignup = location.pathname === "/auth/create-account";
            handleGoogleLogin(credentialResponse, isSignup);
        },
        onError: () => {
            console.log("Login Failed");
        },
    });

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Button
                w="100%"
                size="lg"
                variant="secondary"
                gap="4"
                onClick={() => googleLogin()}
            >
                <GoogleIcon />
                <Text fontWeight="semibold" color={theme.colors.gray[800]}>
                    {title}
                </Text>
            </Button>
        </GoogleOAuthProvider>
    );
};

export default GoogleBtn;
