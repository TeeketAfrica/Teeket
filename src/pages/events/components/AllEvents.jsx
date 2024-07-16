import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import EventCard from "./EventCard";

import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import BrowseEvents from "../../../assets/icon/BrowseEvents";

const AllEvents = ({ allEvents }) => {
  const freeEvents = [];
  const paidEvents = [];

  allEvents.forEach((event) => {
    if (Number(event.lowest_ticket_price) === 0) {
      freeEvents.push(event);
    } else {
      paidEvents.push(event);
    }
  });

  return (
    <VStack>
      {/* Trending Events */}
      <Box>
        <HStack pt={6} justifyContent="space-between" alignItems="center">
          <Text fontSize={28} fontWeight={700}>
            Trending events
          </Text>
          <Button variant="outline">
            <Link to="/event-category">See more</Link>
          </Button>
        </HStack>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} py={6}>
          {allEvents.map((event) => (
            <EventCard
              key={event.id}
              eventId={event.id}
              eventImage={event.banner_image}
              eventTitle={event.title}
              eventTag={event.status.split("_").join(" ")}
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity={`By ${event.organizer}`}
              eventLocation={event.hosting_site}
              eventPrice={Number(event.lowest_ticket_price)}
              eventDate={{
                startDate: event.start_date,
                endDate: event.end_date,
              }}
            />
          ))}
        </Grid>
      </Box>

      {/* Free Events */}
      {freeEvents.length > 0 && (
        <Box>
          <HStack pt={6} justifyContent="space-between" alignItems="center">
            <Text fontSize={28} fontWeight={700}>
              Free events
            </Text>
            <Button variant="outline">
              <Link to="/event-category/free">See more</Link>
            </Button>
          </HStack>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} py={6}>
            {freeEvents.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id}
                eventImage={event.banner_image}
                eventTitle={event.title}
                eventTag={event.status.split("_").join(" ")}
                eventTagIcon={EventTagIcon}
                eventOrganizer={Avatars}
                eventCommunity={`By ${event.organizer}`}
                eventLocation={event.hosting_site}
                eventPrice={Number(event.lowest_ticket_price)}
                eventDate={{
                  startDate: event.start_date,
                  endDate: event.end_date,
                }}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Paid Events */}
      {paidEvents.length > 0 && (
        <Box>
          <HStack pt={6} justifyContent="space-between" alignItems="center">
            <Text fontSize={28} fontWeight={700}>
              Paid events
            </Text>
            <Button variant="outline">
              <Link to="/event-category/paid">See more</Link>
            </Button>
          </HStack>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} py={6}>
            {paidEvents.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id}
                eventImage={event.banner_image}
                eventTitle={event.title}
                eventTag={event.status.split("_").join(" ")}
                eventTagIcon={EventTagIcon}
                eventOrganizer={Avatars}
                eventCommunity={`By ${event.organizer}`}
                eventLocation={event.hosting_site}
                eventPrice={Number(event.lowest_ticket_price)}
                eventDate={{
                  startDate: event.start_date,
                  endDate: event.end_date,
                }}
              />
            ))}
          </Grid>
        </Box>
      )}

      <Center w="full" py="10" borderTop="1px solid" borderColor="gray.300">
        <Link to="/event-category">
          <Button variant="primary" leftIcon={<BrowseEvents />}>
            Browse all events
          </Button>
        </Link>
      </Center>
    </VStack>
  );
};

export default AllEvents;

{
  /* <Container maxW="385px" px={0}>
          <EmptyState
            icon={EventSpeakerEmpty}
            title="Let’s build your list"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                Share with us your preference on events and we will curate a
                nice list of events for you
              </Text>
            }
            primaryBtn="Get started"
          />
        </Container> */
}
