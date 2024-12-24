import { Box } from "@chakra-ui/react";

const Container = ({ children, heightSize, padding, sx, alignItems }) => {
  return (
    <Box
      maxW="1200px"
      maxH="100%"
      h={heightSize}
      w="100%"
      mx="auto"
      px={padding && padding}
      sx={sx}
      alignItems={alignItems}
    >
      {children}
    </Box>
  );
};

export default Container;
