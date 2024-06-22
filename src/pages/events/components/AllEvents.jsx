import { Button, Center, Container, Grid, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";
import Event1 from "../../../assets/img/e1.png";
import Event2 from "../../../assets/img/e2.png";
import Event3 from "../../../assets/img/e3.png";
import Event4 from "../../../assets/img/e4.png";
import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import { useEffect, useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";
// import EventCautionState from "../../../assets/icon/EventCautionState.svg";
import BrowseEvents from "../../../assets/icon/BrowseEvents";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  // const navigate = useNavigate();
  const [event] = useState(true);

  useEffect(() => {}, []);

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
            <EventCard
              eventImage={Event1}
              eventTitle="The Dao unveiling event"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="By Web3 and co"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event2}
              eventTitle="Art exhibition show down: For enthusiast and newbies"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event3}
              eventTitle="Art exhibition show down: For enthusiast and newbies"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Life camp, Abuja"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event4}
              eventTitle="Vintage all out party"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event2}
              eventTitle="Art exhibition show down: For enthusiast and newbies"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event3}
              eventTitle="Art exhibition show down: For enthusiast and newbies"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Life camp, Abuja"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event4}
              eventTitle="Vintage all out party"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="by the_brush"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
            <EventCard
              eventImage={Event1}
              eventTitle="The Dao unveiling event"
              eventTag="Trending"
              eventTagIcon={EventTagIcon}
              eventOrganizer={Avatars}
              eventCommunity="By Web3 and co"
              eventLocation="Online event"
              eventPrice="Starts at $10"
              eventDate="9th-17th Feb"
            />
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
