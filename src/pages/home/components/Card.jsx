import { Box } from "@chakra-ui/react";

const Card = ({ children, width, height }) => {
  return (
    <Box
      position="relative"
      backgroundColor="gray.200"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="3"
      width="100%"
      height="100%"
      maxWidth={["100%", width]}
      minHeight={height}
      marginX="auto"
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default Card;
