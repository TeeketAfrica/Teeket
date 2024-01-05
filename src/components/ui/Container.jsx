import { Box } from '@chakra-ui/react';

const Container = ({ children, heightSize }) => {
  return (
    <Box maxW="1200px" maxH="100%" h={heightSize} w="100%" mx="auto">
      {children}
    </Box>
  );
};

export default Container;
