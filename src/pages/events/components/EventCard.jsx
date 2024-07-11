import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import EventMap from "../../../assets/icon/EventMap.svg";
import Cash from "../../../assets/icon/Cash.svg";
import Calendar from "../../../assets/icon/calendar-alt.svg";
import { formatDate } from "../../../utils/formatDate";

const formatDateRange = (startDateStr, endDateStr) => {
  const startDateParts = startDateStr.split("/");
  const endDateParts = endDateStr.split("/");

  const startDate = new Date(
    startDateParts[2],
    startDateParts[1] - 1,
    startDateParts[0]
  );
  const endDate = new Date(
    endDateParts[2],
    endDateParts[1] - 1,
    endDateParts[0]
  );

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });

  const getOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  };

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDay}${getOrdinalSuffix(
      startDay
    )} - ${endDay}${getOrdinalSuffix(endDay)} ${startMonth}`;
  } else {
    return `${startDay}${getOrdinalSuffix(
      startDay
    )} ${startMonth} - ${endDay}${getOrdinalSuffix(endDay)} ${endMonth}`;
  }
};

const EventCard = ({
  eventId,
  eventImage,
  eventTitle,
  eventTag,
  eventTagIcon,
  eventOrganizer,
  eventCommunity,
  eventLocation,
  eventPrice,
  eventDate,
}) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("TOKEN");
  const formatedEventDate = formatDateRange(
    formatDate(eventDate.startDate),
    formatDate(eventDate.endDate)
  );

  const handleRedirect = () => {
    if (token) {
      navigate(`/event-booking/${eventId}`);
    } else {
      sessionStorage.setItem("REDIRECT", `/event-booking/${eventId}`);
      navigate("/auth/login");
    }
  };

  return (
    <Link to="#" onClick={handleRedirect}>
      <GridItem
        w="100%"
        h="100%"
        p={3}
        border="1px solid"
        borderColor="gray.300"
        borderRadius={16}>
        <Box height="140px" width="100%" borderRadius={8} overflow="hidden">
          <Image
            src={eventImage}
            alt="event img"
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>
        <VStack justifyContent="space-between" alignItems="normal">
          <Box mt={4}>
            <HStack
              bgColor="gray.200"
              py="2px"
              px={2}
              w="fit-content"
              borderRadius={16}>
              <Image src={eventTagIcon} />
              <Text
                fontSize={12}
                fontWeight={500}
                color="gray.700"
                textTransform="capitalize">
                {eventTag}
              </Text>
            </HStack>
            <Text fontWeight={500} color="gray.800">
              {eventTitle}
            </Text>
          </Box>
          <Box>
            <Box textTransform="capitalize">
              <HStack spacing={2}>
                <Avatar
                  src={eventOrganizer}
                  w={6}
                  h={6}
                  alt="event organizer"
                />
                <Text color="gray.600">{eventCommunity}</Text>
              </HStack>
              <HStack spacing={2} mt={2}>
                <Image src={EventMap} alt="event location" />
                <Text color="gray.600">{eventLocation}</Text>
              </HStack>
            </Box>
            <HStack mt={4} justifyContent="space-between">
              <HStack
                p={2}
                spacing={2}
                bgColor="green.100"
                border="1px solid"
                borderColor="green.300"
                borderRadius={8}>
                <Image src={Cash} alt="event price" />
                <Text color="gray.800" fontSize={12}>
                  {eventPrice > 0 ? `Starts at ${eventPrice}` : "Free event"}
                </Text>
              </HStack>
              <HStack
                p={2}
                spacing={2}
                bgColor="gray.200"
                border="1px solid"
                borderColor="gray.300"
                borderRadius={8}>
                <Image src={Calendar} alt="event date" />
                <Text color="gray.800" fontSize={12}>
                  {formatedEventDate}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </GridItem>
    </Link>
  );
};

export default EventCard;
