import Container from "../../components/ui/Container";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import WarningIcon from "../../assets/icon/Warning.svg";
import { EventGetTicketHeader } from "../create-event/components/EventGetTicketHeader";
import { EventGetTicketSummaryBox } from "../create-event/components/EventGetTicketSummaryBox";
import { useSelector } from "react-redux";
import { TicketTypeStep } from "../create-event/components/EventGetTicketSteps/TicketTypeStep";
import { YourDetailsStep } from "../create-event/components/EventGetTicketSteps/YourDetailsStep";

const EventGetTicket = () => {
  const { ticketStep } = useSelector((state) => state.event);

  return (
    <Container padding="16px">
      <EventGetTicketHeader />
      <VStack marginY={9} spacing={6}>
        <Box w="100%" display="flex" gap={3} alignItems="center">
          <Image src={WarningIcon} />
          <Text color="gray.600" size={14}>
            Time left: 09:58
          </Text>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(8, minmax(0, 1fr))"
          w="100%"
          justifyItems="between"
          alignItems="stretch"
        >
          <VStack
            gap={8}
            gridColumn="span 4 / span 4"
            alignItems="start"
            flex="2"
          >
            {ticketStep === 1 && <TicketTypeStep />}
            {ticketStep === 2 && <YourDetailsStep />}
          </VStack>
          <Box gridColumn="span 1 / span 1" />
          <EventGetTicketSummaryBox />
        </Box>
      </VStack>
    </Container>
  );
};

export default EventGetTicket;
