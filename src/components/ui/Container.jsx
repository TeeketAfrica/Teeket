import { Box } from "@chakra-ui/react";

const Container = ({ children, heightSize, padding, sx }) => {
  return (
    <Box
      maxW="1200px"
      maxH="100%"
      h={heightSize}
      w="100%"
      mx="auto"
      px={padding && padding}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export default Container;
