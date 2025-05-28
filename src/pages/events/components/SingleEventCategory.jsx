import { Button, Center, Container, Grid, HStack, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";

import EventCard from "./EventCard";

import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import EmptyState from "../../../components/ui/EmptyState";
import EventSpeakerEmpty from "../../../assets/icon/EventSpeakerEmptyBlue.svg";
import BrowseEvents from "../../../assets/icon/BrowseEvents.svg";
import { Link } from "react-router-dom";

const SingleEventCategory = ({ allEvents, loading }) => {
  if(loading){
    return (
      <Grid
        style={{ width: "100%" }}
        gridTemplateColumns={[
          "1fr",
          null,
          "repeat(4, 1fr)",
          null,
          "repeat(4, 1fr)",
        ]}
        gap={6}
      >
        {[0, 1, 2, 3].map((digit, i) => (
          <Stack gap="6" maxW="xs" key={digit}>
            <HStack width="full">
              <SkeletonText noOfLines={2} />
            </HStack>
            <Skeleton height="200px" />
          </Stack>
        ))}
      </Grid>
    )
  }
  return (
    <>
      {allEvents.length > 0 ? (
        <>
          <Grid
            gridTemplateColumns={[
              "1fr",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              null,
              "repeat(4, 1fr)",
            ]}
            width={"100%"}
            gap={6}
            borderBottom="1px solid"
            borderColor="gray.300"
            pt={6}
            pb={9}
          >
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                  eventId={event.id}
                  eventImage={event.banner_image}
                  eventTitle={event.title}
                  eventTag={event.status}
                  eventTagIcon={EventTagIcon}
                  eventOrganizer={event.user.profile_image}
                  eventOrganizerName={event.user.first_name || event.user.email}
                  eventCommunity={`by ${event.organizer}`}
                  eventLocation={event.hosting_site}
                  eventPrice={Number(event.lowest_ticket_price)}
                  eventDate={{
                    startDate: `${event.start_date}`,
                    endDate: `${event.end_date}`,
                  }}
                  isFree={event.is_free}
              />
            ))}
          </Grid>
          <Center w="full" my="6">
            <Link to={"/events"}>
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
    </>
  );
};

export default SingleEventCategory;
