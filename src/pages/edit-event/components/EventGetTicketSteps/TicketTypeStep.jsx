import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEventDataTicketsData,
  setEventDataTicketsError,
  setEventDataTicketsLoading,
} from "../../../../features/eventSlice";
import { TicketTypeBox } from "../TicketTypeBox";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import { teeketApi } from "../../../../utils/api";

export const TicketTypeStep = () => {
  const {
    eventData,
    eventDataTickets: { data: eventDataTickets, eventDataLoading },
  } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!eventData) {
      navigate("/auth/login");
      return;
    }
    const fetchEvent = async () => {
      try {
        setEventDataTicketsLoading(true);
        const response = await teeketApi.get(`/events/${eventData.id}/tickets`);
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

  return (
    <>
      <Box>
        <Text color="gray.800" fontWeight={700} fontSize={36} maxW="700px">
          The vintage art event africa
        </Text>
        <HStack>
          <CalendarIcon />
          <Box>
            <Text color="gray.800" fontWeight={600} fontSize={16} maxW="700px">
              Tuesday, 23rd January
            </Text>
            <Text color="gray.600" fontSize={14} maxW="700px">
              8:00pm - 10pm
            </Text>
          </Box>
        </HStack>
      </Box>
      <VStack spacing={4} w="100%">
        {eventDataLoading ? (
          <></>
        ) : (
          eventDataTickets &&
          eventDataTickets.map((data, index) => (
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
      >
        Continue
      </Button>
    </>
  );
};
