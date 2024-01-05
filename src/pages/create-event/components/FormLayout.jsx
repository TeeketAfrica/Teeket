import { Box, Heading, Text } from '@chakra-ui/react';

const FormLayout = ({ children, title, description }) => {
  return (
    <Box maxW="600px" display="flex" flexDirection="column" gap={8}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Heading
          as="h5"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="-1px"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        <Text fontSize="md" fontWeight="normal" color="gray.600">
          {description}
        </Text>
      </Box>
      {children}
    </Box>
  );
};

export default FormLayout;
