import { Box, Button, Heading } from "@chakra-ui/react";

const FormStep2 = ({ onNextStep, onPrevStep }) => {
  return (
    <Box>
      <Heading as="h1" bgColor="red">
        Hello Form 2
      </Heading>
      <Button onClick={onPrevStep}>Discard</Button>
      <Button onClick={onNextStep}>Save and continue</Button>
    </Box>
  );
};

export default FormStep2;
