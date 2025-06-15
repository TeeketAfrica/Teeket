import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import NTFND from "@/assets/img/not-found.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <VStack marginY={9}>
      <VStack maxW={405} spacing={8}>
        <Box>
          <Image width={20} src={NTFND} />
        </Box>
        <VStack spacing={2}>
          <Text size="lg" fontSize={36} fontWeight={700} textAlign="center">
            OOPS 404 Not Found
          </Text>
          <Text textAlign="center" color="gray.600">
            You have likely visited a wrong page. Click one of the buttons below to continue
          </Text>
        </VStack>
        <VStack w="100%" padding={5}>
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            w="100%"
            padding={4}
            height="auto"
          >
            Go Home
          </Button>
          <Button
            onClick={() => navigate("/events")}
            variant="secondary"
            w="100%"
            padding={4}
            height="auto"
          >
            Browse events
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default NotFound;
