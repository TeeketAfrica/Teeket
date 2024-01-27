import { Box, Heading, Text } from "@chakra-ui/react";

const DashboardPageHeaders = ({ pageTitle, subTitle }) => {
  return (
    <Box>
      <Heading fontWeight="bold" lineHeight="43px" fontSize="5xl">
        {pageTitle}
      </Heading>
      <Text color="gray.600">{subTitle}</Text>
    </Box>
  );
};

export default DashboardPageHeaders;
