import { Box, Heading, Text } from '@chakra-ui/react';

const FormLayout = ({ title, description }) => {
  return (
    <Box display="flex" flexDirection="column" gap={8} mb={6}>
      <Box maxW="600px" display="flex" flexDirection="column" gap={2}>
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
    </Box>
  );
};

export default FormLayout;
