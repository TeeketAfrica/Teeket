import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import PurchaseTick from "../../../../assets/img/TicketPurchaseTick.png";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <VStack marginY={9}>
      <VStack maxW={405} spacing={8}>
        <Box>
          <Image src={PurchaseTick} />
        </Box>
        <VStack spacing={2}>
          <Text size="lg" fontSize={36} fontWeight={700} textAlign="center">
            Ticket purchased successfully
          </Text>
          <Text textAlign="center" color="gray.600">
            We have sent your ticket to the email address you purchased this
            ticket with. You can also find your ticket within your ticket
            dashboard.
          </Text>
        </VStack>
        <VStack w="100%">
          <Button
            onClick={() => navigate("/my-tickets")}
            variant="primary"
            w="100%"
            padding={4}
            height="auto"
          >
            View your tickets
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

export default Payment;
