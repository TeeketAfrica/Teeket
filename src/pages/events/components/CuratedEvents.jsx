import { Button, Center, Container, Grid, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";
import Event1 from "../../../assets/img/e1.png";
import Event2 from "../../../assets/img/e2.png";
import Event3 from "../../../assets/img/e3.png";
import Event4 from "../../../assets/img/e4.png";
import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import { useState } from "react";
import BrowseEvents from "../../../assets/icon/BrowseEvents.svg";
import EmptyState from "../../../components/ui/EmptyState";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";

const CuratedEvents = ({ events }) => {
  const [event] = useState(true);
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
            {
              events?.map((i, id) =>
                <EventCard
                  key={id}
                  eventId={i.id}
                  eventImage={i.banner_image}
                  eventTitle={i.title}
                  eventTag={i.status}
                  eventTagIcon={EventTagIcon}
                  eventOrganizer={i.user.profile_image}
                  eventOrganizerName={i.user.first_name || i.user.email}
                  eventCommunity={`by ${i.organizer}`}
                  eventLocation={i.hosting_site}
                  eventPrice={`${i.lowest_ticket_price}`}
                  eventDate={{
                    startDate: `${i.start_date}`,
                    endDate: `${i.end_date}`,
                  }}
                  isFree={i.is_free}
                />
              )
            }


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

export default CuratedEvents;
