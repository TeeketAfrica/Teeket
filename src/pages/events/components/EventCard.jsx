import {
  Avatar,
  Box,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EventMap from "../../../assets/icon/EventMap.svg";
import Cash from "../../../assets/icon/Cash.svg";
import Calendar from "../../../assets/icon/calendar-alt.svg";

const EventCard = ({
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
  return (
    <GridItem
      w="100%"
      h="100%"
      p={3}
      border="1px solid"
      borderColor="gray.300"
      borderRadius={16}
    >
      <Link to="/events">
        <Image src={eventImage} alt="event img" />
        <VStack justifyContent="space-between" alignItems="normal">
          <Box mt={4}>
            <HStack
              bgColor="gray.200"
              py="2px"
              px={2}
              w="fit-content"
              borderRadius={16}
            >
              <Image src={eventTagIcon} />
              <Text fontSize={12} fontWeight={500} color="gray.700">
                {eventTag}
              </Text>
            </HStack>
            <Text fontWeight={500} color="gray.800">
              {eventTitle}
            </Text>
          </Box>
          <Box>
            <Box>
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
            <HStack mt={4}>
              <HStack
                p={2}
                spacing={2}
                bgColor="green.100"
                border="1px solid"
                borderColor="green.300"
                borderRadius={8}
              >
                <Image src={Cash} alt="event price" />
                <Text color="gray.800" fontSize={12}>
                  {eventPrice}
                </Text>
              </HStack>
              <HStack
                p={2}
                spacing={2}
                bgColor="gray.200"
                border="1px solid"
                borderColor="gray.300"
                borderRadius={8}
              >
                <Image src={Calendar} alt="event date" />
                <Text color="gray.800" fontSize={12}>
                  {eventDate}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </Link>
    </GridItem>
  );
};

export default EventCard;
