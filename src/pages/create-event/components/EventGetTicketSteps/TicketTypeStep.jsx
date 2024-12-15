import { Box, Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import {
    setEventDataTicketsData,
    setEventDataTicketsError,
    setEventDataTicketsLoading,
    resetEventTicketBooking,
    changeTicketStep,
    setIsBookedTicket,
    setReferenceId,
    setTicketSummaryDetails,
} from "../../../../features/eventSlice";
import { teeketApi } from "../../../../utils/api";
import { TicketTypeBox } from "../TicketTypeBox";

export const TicketTypeStep = () => {
    const {
        eventData,
        eventDataTickets: { data: eventDataTickets, eventDataLoading },
        ticketQuantity,
    } = useSelector((state) => state.event);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [date, setDate] = useState("");
    const [timeRange, setTimeRange] = useState("");
    // const [eventTitle] = useState(eventDataTickets[0]?.event?.title);

    const [isTicketError, setIsTicketError] = useState(false);

    const { eventTicketBooking, ticketStep } = useSelector(
        (state) => state.event
    );
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        if (!eventData) {
            navigate("/auth/login");
            return;
        }
        // Reset ticket list
        // dispatch(resetEventTicketBooking());

        const fetchEvent = async () => {
            try {
                setEventDataTicketsLoading(true);
                const response = await teeketApi.get(
                    `/events/${eventData.id}/tickets`
                );
                dispatch(setEventDataTicketsData(response.data.data));
            } catch (err) {
                console.log(
                    `Error fetching event with id ${eventData.id} `,
                    err.message
                );
                setEventDataTicketsError(err);
            } finally {
                setEventDataTicketsLoading(false);
            }
        };

        fetchEvent();
    }, [dispatch, eventData, navigate]);

    useEffect(() => {
        if (eventData) {
            const startDate = parseISO(eventData.start_date);
            const endDate = parseISO(eventData.end_date);
            const formattedDate = format(endDate, "EEEE, do MMMM yyyy");
            const formattedStartTime = format(startDate, "h:mma").toLowerCase();
            const formattedEndTime = format(endDate, "h:mma").toLowerCase();

            setDate(formattedDate);
            setTimeRange(`${formattedStartTime} - ${formattedEndTime}`);
        }

        if (isTicketError) {
            if (ticketQuantity > 0) {
                setIsTicketError(false);
            }
        }
    }, [eventData, isTicketError, ticketQuantity]);

    // get the request id for checkout
    const handleBookingTickets = async () => {
        if (ticketQuantity === 0) {
            setIsTicketError(true);
            return;
        }
        const tickets = eventTicketBooking.map(({ id, quantity }) => ({
            ticket_id: id,
            quantity: quantity,
        }));

        try {
            setIsLoading(true);
            const response = await teeketApi.post(
                `/events/${eventData.id}/tickets/book`,
                {
                    ticket_orders: tickets,
                }
            );

            if (response && response.status === 200) {
                dispatch(setReferenceId(response.data.reference_id));
                dispatch(setTicketSummaryDetails(response.data));
                toast({
                    title: "Booking Successful.",
                    description: "You have successfully booked your ticket.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch (error) {
            console.log("Failed to create ticket:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Box>
                <Text
                    color="gray.800"
                    fontWeight={700}
                    fontSize={36}
                    maxW="700px"
                    pb={5}
                >
                    {eventDataTickets?.[0]?.event?.title}
                </Text>
                <HStack>
                    <CalendarIcon />
                    <Box>
                        <Text
                            color="gray.800"
                            fontWeight={600}
                            fontSize={16}
                            maxW="700px"
                        >
                            {date}
                        </Text>
                        <Text color="gray.600" fontSize={14} maxW="700px">
                            {timeRange}
                        </Text>
                    </Box>
                </HStack>
            </Box>
            <VStack spacing={4} w="100%">
                {eventDataLoading ? (
                    <>Loading...</>
                ) : (
                    eventDataTickets?.map((data, index) => (
                        <TicketTypeBox data={data} key={index} />
                    ))
                )}
            </VStack>
            <Button
                bgColor="gray.800"
                color="gray.100"
                padding={4}
                fontWeight={600}
                w="max"
                variant="primary"
                onClick={handleBookingTickets}
                isDisabled={isLoading}
            >
                Continue
            </Button>
            {isTicketError && (
                <HStack spacing={4}>
                    <Box
                        bg="#FBEAE9"
                        padding="6px"
                        borderRadius="16px"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="#F2BCBA"
                    >
                        <TickCircle size="24" color="#CB1A14" variant="Bold" />
                    </Box>
                    <Text fontSize={14} color="gray.600">
                        You have to pick a ticket before checking out
                    </Text>
                </HStack>
            )}
        </>
    );
};
