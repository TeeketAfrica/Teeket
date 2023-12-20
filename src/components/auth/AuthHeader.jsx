/* eslint-disable react/prop-types */
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { Link } from "react-router-dom";

const AuthHeader = ({ heading, subheading, subheadingLink }) => {
  const theme = useTheme();
  return (
    <Box>
      <Heading as="h2" fontWeight="bold" textAlign="center" mb={2}>
        {heading}
      </Heading>
      <Text color={theme.colors.gray[600]} textAlign="center">
        {subheading}{" "}
        <Text
          as="span"
          color={theme.colors.gray[700]}
          fontWeight="semibold"
          fontSize="sm"
        >
          <Link to="/auth/create-account">{subheadingLink}</Link>
        </Text>
      </Text>
    </Box>
  );
};

export default AuthHeader;
