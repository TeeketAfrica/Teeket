import { Link } from "react-router-dom";
import { Button, Center, Container, Grid, Text } from "@chakra-ui/react";

import EventCard from "./EventCard";

import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import EmptyState from "../../../components/ui/EmptyState";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";
import BrowseEvents from "../../../assets/icon/BrowseEvents";

const SingleEventCategory = ({ allEvents }) => {
  return (
    <>
      {allEvents.length > 0 ? (
        <>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            borderBottom="1px solid"
            borderColor="gray.300"
            pt={6}
            pb={9}>
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                eventI={event.id}
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
          <Center w="full" my="6">
            <Button variant="primary" leftIcon={<BrowseEvents />}>
              Browse all events
            </Button>
          </Center>
        </>
      ) : (
        <Container maxW="385px" px={0}>
          <EmptyState
            icon={EventSpeakerEmpty}
            title="Let’s build your list"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                Share with us your preference on events and we will curate a
                nice list of events for you
              </Text>
            }
            outlineBtn="Browse all events"
            primaryBtn="Get started"
          />
        </Container>
      )}
    </>
  );
};

export default SingleEventCategory;
