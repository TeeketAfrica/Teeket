import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { resetEventState, selectEventDetails, setEventDetails, setTicket } from "../../features/eventSlice";
import { teeketApi } from "../../utils/api";

export const useEventFormLogic = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const eventDetails = useSelector(selectEventDetails);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        dispatch(resetEventState());

        const fetchEvent = async () => {
            try {
                const res = await teeketApi.get(`/events/${id}`);
                dispatch(setEventDetails(res.data));

                const ticketsRes = await teeketApi.get(`/events/${id}/tickets`);
                const transformedTickets = ticketsRes.data.data.map(({ id, name, price, quantity, is_paid }) => ({
                    id, ticketName: name, ticketPrice: price, ticketQuantity: quantity, ticketType: is_paid ? "paid" : "free"
                }));
                dispatch(setTicket(transformedTickets));
            } catch (err) {
                toast({
                    title: "Error loading event",
                    description: err?.response?.data?.message || "Unknown error",
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
            }
        };

        if (id) fetchEvent();
    }, [id, dispatch, toast]);

    const initialValues = useMemo(() => ({
        eventTitle: eventDetails.eventTitle || "",
        eventOrganizer: eventDetails.eventOrganizer || "",
        eventType: eventDetails.eventType || "",
        eventIndustry: eventDetails.eventIndustry || "",
        eventStartDate: eventDetails.eventStartDate || "",
        eventStartTime: eventDetails.eventStartTime || "",
        eventEndDate: eventDetails.eventEndDate || "",
        eventEndTime: eventDetails.eventEndTime || "",
        eventAbout: eventDetails.eventAbout || "",
        eventHosting: eventDetails.eventHosting || "",
        eventLocation: eventDetails.eventLocation || "",
        eventEstimatedSoldTicket: eventDetails.eventEstimatedSoldTicket || "",
        eventTags: eventDetails.eventTags || [],
        tickets: eventDetails.tickets || [],
        publishLive: eventDetails.publishLive || "",
        totalTicketQuantities: eventDetails.totalTicketQuantities || 0,
    }), [eventDetails]);

    return {
        id,
        navigate,
        dispatch,
        activeStep,
        setActiveStep,
        eventDetails,
        initialValues,
    };
};
