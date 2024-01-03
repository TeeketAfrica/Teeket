import { Box, Button, Heading } from "@chakra-ui/react";

const FormStep1 = ({ onNextStep }) => {
  return (
    <Box>
      <Heading as="h1" bgColor="red">
        Hello Form 1
      </Heading>
      <Button onClick={onNextStep}>Save and continue</Button>
    </Box>
  );
};

export default FormStep1;
