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
import { formatAmount, formatDateAndTime } from "../../../utils/utils";
import EventMap from "../../../assets/icon/EventMap.svg";
import Cash from "../../../assets/icon/Cash.svg";
import Calendar from "../../../assets/icon/calendar-alt.svg";
import { useStorage } from "../../../utils/storage";

const EventCard = ({
  eventId,
  eventImage,
  eventTitle,
  eventTag,
  eventTagIcon: EventTagIcon,
  eventOrganizer,
  eventOrganizerName,
  eventCommunity,
  eventLocation,
  eventPrice,
  eventDate,
  isFree,
}) => {
  const navigate = useNavigate();
  const { getAccessToken } = useStorage();

  const token = getAccessToken();

  const startDate = formatDateAndTime(eventDate.startDate || eventDate, "short");
  const endDate = formatDateAndTime(eventDate.endDate || eventDate, "short");

  let formatedDate = "";

  if (startDate.date.month === endDate.date.month) {
    formatedDate = `${startDate.date.dayNumber} - ${endDate.date.dayNumber} ${startDate.date.month}`;
  } else {
    formatedDate = `${startDate.date.dayNumber} ${startDate.date.month} - ${endDate.date.dayNumber} ${endDate.date.month}`;
  }

  const handleRedirect = () => {
    // if (token) {
    //   navigate(`/event-booking/${eventId}`);
    // } else {
    //   sessionStorage.setItem("REDIRECT", `/event-booking/${eventId}`);
    //   navigate("/auth/login");
    // }
    navigate(`/event-booking/${eventId}`);
  };

  return (
    <Link w="100%" to="#" onClick={handleRedirect}>
      <GridItem
        w="100%"
        h="100%"
        p={3}
        border="1px solid"
        borderColor="gray.300"
        borderRadius={16}
      >
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
              borderRadius={16}
            >
              <EventTagIcon />
              <Text
                fontSize={12}
                fontWeight={500}
                color="gray.700"
                textTransform="capitalize"
              >
                {eventTag === "on_going"? "On Going": eventTag === "coming_soon"? "Coming Soon": eventTag === "past_event"? "Past Event": ""}
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
                  name={eventOrganizerName}
                  src={eventOrganizer}
                  border="1px solid"
                  borderColor="gray.800"
                  color="gray.800"
                  bgColor="transparent"
                  w={6}
                  h={6}
                  alt="event organizer"
                />
                <Text color="gray.600">{eventCommunity}</Text>
              </HStack>
              <HStack spacing={2} mt={2}>
                <EventMap />
                <Text noOfLines={1} color="gray.600">{eventLocation}</Text>
              </HStack>
            </Box>
            <HStack mt={4} justifyContent="space-between" gap={2}>
              <HStack
                p={[1, null, null, 2]}
                spacing={2}
                bgColor="green.100"
                border="1px solid"
                borderColor="green.300"
                borderRadius={8}
              >
                <Cash />
                <Text color="gray.800" fontSize={12}>
                  {!isFree && eventPrice !== 0 ? `Starts at ₦${formatAmount(eventPrice, 0)}` : "Free event"}
                </Text>
              </HStack>
              <HStack
                p={[1, null, null, 2]}
                spacing={2}
                bgColor="gray.200"
                border="1px solid"
                borderColor="gray.300"
                borderRadius={8}
              >
                <Calendar />
                <Text color="gray.800" fontSize={12}>
                  {formatedDate}
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
