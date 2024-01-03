import { Box, Button, Heading } from "@chakra-ui/react";

const FormStep3 = ({ onPrevStep, onNextStep }) => {
  return (
    <Box>
      <Heading as="h1" bgColor="red">
        Hello Form 3
      </Heading>
      <Button onClick={onPrevStep}>Discard</Button>
      <Button onClick={onNextStep}>Save and continue</Button>
    </Box>
  );
};

export default FormStep3;
