import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Center, Container, Grid, Text } from "@chakra-ui/react";

import EventCard from "./EventCard";
import EmptyState from "../../../components/ui/EmptyState";

import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";
import BrowseEvents from "../../../assets/icon/BrowseEvents";

const AllEvents = () => {
    const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await teeketApi.get(`/events`);
        setAllEvents(response.data.data);
        console.log(response);
      } catch (err) {
        console.log("Error fetching all event", err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {event ? (
        <>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            borderBottom="1px solid"
            borderColor="gray.300"
            pt={6}
            pb={9}
          >
            {allEvents.map((event) => (
              <Link to={`/event-booking/${event.id}`} key={event.id}>
                <EventCard
                  eventImage={event.banner_image}
                  eventTitle={event.title}
                  eventTag={event.status}
                  eventTagIcon={EventTagIcon}
                  eventOrganizer={Avatars}
                  eventCommunity={`By ${event.organizer}`}
                  eventLocation={event.hosting_site}
                  eventPrice={`Starts at $${event.lowest_ticket_price}`}
                  eventDate="9th-17th Feb"
                />
              </Link>
            ))}
          </Grid>
          <Center w="full" my="6">
            <Link to="/event-category">
              <Button variant="primary" leftIcon={<BrowseEvents />}>
                Browse all events
              </Button>
            </Link>
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

      {/* <Container maxW="385px" px={0}>
        <EmptyState
          icon={EventSpeakerEmpty}
          title="No event found"
          desc={
            <Text fontSize={14} color="gray.600" textAlign="center">
              “Food” did not match any results. please try again
            </Text>
          }
          outlineBtn="Clear search"
          primaryBtn="Create an event"
        />
      </Container>

      <Container maxW="385px" px={0}>
        <EmptyState
          icon={EventCautionState}
          title="Something went wrong"
          maxW="350px"
          desc={
            <Text fontSize={14} color="gray.600" textAlign="center">
              We had some trouble loading this page. Please refresh the page to
              try again
            </Text>
          }
          outlineBtn="Contact support"
          primaryBtn="Refresh page"
          outlineOnClick={() => navigate("/support")}
          primaryOnClick={() => window.location.reload()}
        />
      </Container> */}
    </>
  );
};

export default AllEvents;
