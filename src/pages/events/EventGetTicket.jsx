import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import { Box, Text, VStack } from "@chakra-ui/react";
import WarningIcon from "../../assets/icon/Warning.svg";
import { EventGetTicketHeader } from "../create-event/components/EventGetTicketHeader";
import { EventGetTicketSummaryBox } from "../create-event/components/EventGetTicketSummaryBox";
import { useSelector } from "react-redux";
import { TicketTypeStep } from "../create-event/components/EventGetTicketSteps/TicketTypeStep";
import { YourDetailsStep } from "../create-event/components/EventGetTicketSteps/YourDetailsStep";
import Payment from "../create-event/components/EventGetTicketSteps/Payment";
import Footer from "../../components/layouts/Footer";

const EventGetTicket = () => {
  const { ticketStep, eventData } = useSelector((state) => state.event);

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const intervalId = setInterval(
      (() => {
        const now = new Date();
        const timeDifference = eventData?.end_date - now;

        if (timeDifference > 0) {
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`
          );
        } else {
          setTimeLeft("00:00");
        }
      })(),
      1000
    );

    return () => clearInterval(intervalId);
  }, [eventData]);

  return (
    <Container padding="16px">
      <EventGetTicketHeader />
      {ticketStep === 3 ? (
        <Payment />
      ) : (
        <VStack marginY={9} spacing={6}>
          <Box w="100%" display="flex" gap={3} alignItems="center">
            <WarningIcon />
            <Text color="gray.600" size={14}>
              Time left: {timeLeft}
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
      )}
      <Footer />
    </Container>
  );
};

export default EventGetTicket;
