import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, HStack, Heading } from "@chakra-ui/react";
import YellowRectangle from "@/assets/icon/YellowRectangle.svg";
import { useLocation } from "react-router-dom";
import EventCard from "./components/EventCard";
import EventTagIcon from "@/assets/icon/EventTagIcon.svg";
import Footer from "../../components/layouts/Footer";
import ContactFooter from "../../components/layouts/ContactFooter";

const SimilarEvents = () => {
  const { eventData: event } = useSelector((state) => state.event);
  const location = useLocation();
  const { similarEvents } = location.state || {};
  return (
    <div style={{ maxWidth: "1600px" }}>
      <Box>
        <HStack h="335px" w="full" spacing={8} alignItems="center">
          <Heading
            fontSize={56}
            fontWeight={700}
            textAlign="center"
            paddingX={5}
          >
            Events Similar To {event.title}
          </Heading>
          <YellowRectangle />
        </HStack>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {similarEvents.length > 0 && (
          <Grid
            gridTemplateColumns={[
              "1fr",
              null,
              "repeat(3, 1fr)",
              null,
              "repeat(4, 1fr)",
            ]}
            style={{ width: "100%" }}
            gap={6}
            borderBottom="1px solid"
            borderColor="gray.300"
            pt={6}
            pb={9}
            paddingX={7}
          >
            {similarEvents.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id}
                eventImage={event.banner_image}
                eventTitle={event.title}
                eventTag={event.status}
                eventTagIcon={EventTagIcon}
                eventOrganizer={event.user.profile_image}
                eventOrganizerName={event.user.first_name || event.user.email}
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
        )}
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default SimilarEvents;
