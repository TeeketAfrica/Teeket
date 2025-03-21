import { useEffect, useRef, useState } from "react";
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
    const [paid, setPaid] = useState(false);

    const [timeLeft, setTimeLeft] = useState("");
    const timerInterval = useRef(null);

    const calculateTimeLeft = (endDate) => {
        console.log(endDate);

        const now = new Date();
        const difference = new Date(endDate) - now;
        console.log(difference);

        if (difference <= 0) {
            setTimeLeft("00:00:00");
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
            return;
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        console.log(hours, seconds, minutes, difference, "okj");

        setTimeLeft(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                2,
                "0"
            )}:${String(seconds).padStart(2, "0")}`
        );
    };

    useEffect(() => {
        calculateTimeLeft(eventData?.end_date);

        // Update every second
        timerInterval.current = setInterval(() => {
            calculateTimeLeft(eventData?.end_date);
        }, 1000);

        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, []);

    return (
        <Container padding="16px">
            <EventGetTicketHeader paid={paid} />
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
                        <EventGetTicketSummaryBox setPaid={setPaid}/>
                    </Box>
                </VStack>
            )}
            <Footer />
        </Container>
    );
};

export default EventGetTicket;
