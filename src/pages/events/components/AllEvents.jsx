import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import EmptyState from "../../../components/ui/EmptyState";
import { SearchContext } from "../../../context/SearchContext";
import useCategorizeEvents from "../../../hooks/useCategorizeEvents";
import EventCard from "./EventCard";

const AllEvents = ({ events, type }) => {
  const navigate = useNavigate();
  const { trendingFree, trendingPaid, notTrendingFree, notTrendingPaid } =
    useCategorizeEvents(events);
  const { searchTerm, clearSearch } = useContext(SearchContext);
  console.log(events)

  const renderEventSection = (title, events, link) => (
    <Box px={5} style={{width: "100%"}}>
      <HStack pt={6} justifyContent="space-between" alignItems="center">
        <Text fontSize={28} fontWeight={700}>
          {title}
        </Text>
        <Button variant="outline">
          <Link to={link}>See more</Link>
        </Button>
      </HStack>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={6}
        py={6}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            eventImage={event.banner_image}
            eventTitle={event.title}
            eventTag={event.status?.split("_").join(" ")}
            eventTagIcon={EventTagIcon}
            eventOrganizer={event.user.profile_image}
            eventOrganizerName={ event.user.first_name || event.user.email}
            eventCommunity={`By ${event.organizer}`}
            eventLocation={event.hosting_site}
            eventPrice={Number(event.lowest_ticket_price)}
            eventDate={{
              startDate: event.start_date,
              endDate: event.end_date,
            }}
            isFree={event.is_free}
          />
        ))}
      </Grid>
    </Box>
  );

  return (
    <VStack>
      {type === "free" &&
      (trendingFree.length > 0 || notTrendingFree.length > 0) ? (
        <>
          {trendingFree.length > 0 &&
            renderEventSection(
              "Trending Free Events",
              trendingFree,
              "/event-category/free"
            )}
          {notTrendingFree.length > 0 &&
            renderEventSection(
              "Free Events",
              notTrendingFree,
              "/event-category/free"
            )}
        </>
      ) : type === "paid" &&
        (trendingPaid.length > 0 || notTrendingPaid.length > 0) ? (
        <>
          {trendingPaid.length > 0 &&
            renderEventSection(
              "Trending Paid Events",
              trendingPaid,
              "/event-category/paid"
            )}
          {notTrendingPaid.length > 0 &&
            renderEventSection(
              "Paid Events",
              notTrendingPaid,
              "/event-category/paid"
            )}
        </>
      ) : type === "all" &&
        (trendingFree.length > 0 ||
          trendingPaid.length > 0 ||
          notTrendingFree.length > 0 ||
          notTrendingPaid.length > 0) ? (
        <>
          {(trendingFree.length > 0 || trendingPaid.length > 0) &&
            renderEventSection(
              "Trending Events",
              [...trendingFree, ...trendingPaid],
              "/event-category"
            )}
          {notTrendingFree.length > 0 &&
            renderEventSection(
              "Free Events",
              notTrendingFree,
              "/event-category/free"
            )}
          {notTrendingPaid.length > 0 &&
            renderEventSection(
              "Paid Events",
              notTrendingPaid,
              "/event-category/paid"
            )}
        </>
      ) : (
        <>
          {searchTerm !== "" && (
            <Container maxW="385px" px={0}>
              <EmptyState
                icon={EventSpeakerEmpty}
                title="No event found"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    “{searchTerm}” did not match any results. please try again
                  </Text>
                }
                outlineBtn="Clear search"
                outlineOnClick={() => clearSearch()}
                primaryBtn="Create an event"
                primaryOnClick={() => navigate("/create-event")}
              />
            </Container>
          )}
        </>
      )}
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
