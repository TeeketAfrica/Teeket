/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";

import Logo from "../../assets/img/brandLogo.png";

const AuthHeader = ({ heading, subheading, subheadingLink }) => {
  const theme = useTheme();
  return (
    <Box>
      <HStack
        display={{ base: "flex", lg: "none" }}
        justifyContent="center"
        marginBottom={8}>
        <Image src={Logo} alt="Brand Logo" width="106px" />
      </HStack>
      <Heading as="h2" fontWeight="bold" textAlign="center" mb={2}>
        {heading}
      </Heading>
      <Text color={theme.colors.gray[600]} textAlign="center">
        {subheading}{" "}
        <Text
          as="span"
          color={theme.colors.gray[700]}
          fontWeight="semibold"
          fontSize="sm">
          <Link
            to={`${
              subheadingLink == "login" ? "/auth/login" : "/auth/create-account"
            }`}>
            <Text as="span" textTransform="capitalize">
              {subheadingLink}
            </Text>
          </Link>
        </Text>
      </Text>
    </Box>
  );
};

export default AuthHeader;
