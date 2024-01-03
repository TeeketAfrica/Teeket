import { Box } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <Box maxW="1200px" w="100%" m="auto" py={6} px={5}>
      {children}
    </Box>
  );
};

export default Container;
