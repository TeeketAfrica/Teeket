/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/layout";
import RightPanel from "../../assets/img/RightPanel.png";
import RightPanel2 from "../../assets/img/RightPanel2.png";
import { Image } from "@chakra-ui/image";
import { useLocation } from "react-router";

const AuthLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Box
      maxW="1512px"
      mx="auto"
      w="100%"
      h="100vh"
      p={8}
      display={{ base: "grid", lg: "flex" }}
      gap="26px"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="711px"
        w="100%"
      >
        <Box maxW="454px" w="100%">
          {children}
        </Box>
      </Box>
      <Box
        h="100%"
        display={{ base: "none", lg: "block" }}
        maxW="711px"
        w="100%"
      >
        {location.pathname === "/auth/create-account" ? (
          <Image src={RightPanel2} h="100%" />
        ) : (
          <Image src={RightPanel} h="100%" />
        )}
      </Box>
    </Box>
  );
};

export default AuthLayout;
