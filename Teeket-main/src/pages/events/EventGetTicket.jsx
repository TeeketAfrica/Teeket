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
import { selectActiveUser } from "../../features/activeUserSlice";

const EventGetTicket = () => {
    const { ticketStep, eventData, paid } = useSelector((state) => state.event);
    const activeUser = useSelector(selectActiveUser);  
    

    const [timeLeft, setTimeLeft] = useState("");
    const timerInterval = useRef(null);
 

    // Function to calculate time left until the event ends

    const calculateTimeLeft = (endDate, setTimeLeft, timerIntervalRef) => {
        const now = new Date();
        const end = new Date(endDate);
    
        if (end <= now) {
            setTimeLeft("00h 00m 00s");
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            return;
        }
    
        let years = end.getFullYear() - now.getFullYear();
        let months = end.getMonth() - now.getMonth();
        let days = end.getDate() - now.getDate();
        let hours = end.getHours() - now.getHours();
        let minutes = end.getMinutes() - now.getMinutes();
        let seconds = end.getSeconds() - now.getSeconds();
    
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }
    
        const pad = (n) => String(n).padStart(2, "0");
    
    //    How to dispaly what is left on time 
        let display = "";
    
        if (years > 0) {
            display = `${pad(years)}y ${pad(months)}m`;
        } else if (months > 0) {
            display = `${pad(months)}m ${pad(days)}d`;
        } else if (days > 0) {
            display = `${pad(days)}d ${pad(hours)}h`;
        } else {
            display = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
        }
    
        setTimeLeft(display);
    };
    

    useEffect(() => {
        if (!eventData?.end_date) return;
    
        timerInterval.current = setInterval(() => {
            calculateTimeLeft(eventData.end_date, setTimeLeft, timerInterval);
        }, 1000);
    
        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, [eventData?.end_date]);
    
//    this is just a change  

    return (
        <Container padding="16px">
            <EventGetTicketHeader paid={paid} profile={activeUser}/>
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
