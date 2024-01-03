import { Box, Button, Heading } from "@chakra-ui/react";

const FormStep4 = ({ onPrevStep }) => {
  return (
    <Box>
      <Heading as="h1" bgColor="red">
        Hello Form 4
      </Heading>
      <Button onClick={onPrevStep}>Discard</Button>
      <Button>Save and continue</Button>
    </Box>
  );
};

export default FormStep4;
