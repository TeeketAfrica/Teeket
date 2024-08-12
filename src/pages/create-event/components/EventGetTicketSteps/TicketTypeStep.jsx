import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEventDataTicketsData,
  setEventDataTicketsError,
  setEventDataTicketsLoading,
} from "../../../../features/eventSlice";
import teeketApi from "../../../../api/teeketApi";
import { TicketTypeBox } from "../TicketTypeBox";
import CalendarIcon from "../../../../assets/icon/Calendar.svg";
import { format, parseISO } from "date-fns";

export const TicketTypeStep = () => {
  const {
    eventData,
    eventDataTickets: { data: eventDataTickets, eventDataLoading },
  } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [eventTitle] = useState(eventDataTickets[0]?.event?.title);

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
  }, [eventData]);

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
          {eventTitle}
        </Text>
        <HStack>
          <Image src={CalendarIcon} />
          <Box>
            <Text color="gray.800" fontWeight={600} fontSize={16} maxW="700px">
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
        variant="primary"
      >
        Continue
      </Button>
    </>
  );
};
