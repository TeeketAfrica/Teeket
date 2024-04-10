import { Box } from '@chakra-ui/react';

const BoxFrame = ({
  children,
  backgroundColor,
  color,
  paddingX = '3',
  paddingY = '3',
}) => {
  return (
    <Box
      width="100%"
      paddingX={paddingX}
      paddingY={paddingY}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="16"
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </Box>
  );
};

export default BoxFrame;
