import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Divider,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import Footer from "../../components/layouts/Footer";
import { Grid } from "@chakra-ui/react";
import EventBookingDetail from "./components/event-booking/EventBookingDetail";
import { setEventData } from "../../features/eventSlice";
import { useDispatch } from "react-redux";
import { teeketApi } from "../../utils/api";
import EventCard from "./components/EventCard";
import EventTagIcon from "@/assets/icon/EventTagIcon.svg";

const EventBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/auth/login");
      return;
    }
    const fetchEvent = async () => {
      try {
        const response = await teeketApi.get(`/events/${id}`);
        dispatch(setEventData(response.data));
      } catch (err) {
        console.log(`Error fetching event with id ${id} `, err.message);
      }
    };

    const fetchSimilarEvents = async () => {
      try {
        setLoading(true);
        const response = await teeketApi.get(`/events/similar/${id}`);
        setSimilarEvents(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(`Error fetching Similar events`, err.message);
        setLoading(false);
      }
    };

    fetchEvent();
    fetchSimilarEvents();
  }, [dispatch, id, navigate]);

  return (
    <main>
      <Header/>
      <Container padding="16px">
        <EventBookingDetail />
        <Divider borderColor="gray.300" borderWidth="1px" />
        <VStack paddingY="11">
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            gap="6"
            width="100%"
            justifyContent="space-between"
          >
            <Text fontSize="3xl" fontWeight="bold" lineHeight="33px">
              Similar event you can attend to
            </Text>
            <Button
              variant="secondary"
              size="sm"
              width="fit-content"
              onClick={() => {
                navigate(`/events/similar-events/${id}`, {
                  state: { similarEvents: similarEvents },
                });
              }}
            >
              See more
            </Button>
          </Flex>
          {/* <AllEvents /> */}
          {loading ? (
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
          ) : (
            similarEvents.length > 0 && (
              <Grid
                width={"100%"}
                gridTemplateColumns={[
                  "1fr",
                  null,
                  "repeat(3, 1fr)",
                  null,
                  "repeat(4, 1fr)",
                ]}
                gap={6}
                borderBottom="1px solid"
                borderColor="gray.300"
                pt={6}
                pb={9}
              >
                {similarEvents.slice(0, 4).map((event) => (
                  <EventCard
                    key={event.id}
                    eventId={event.id}
                    eventImage={event.banner_image}
                    eventTitle={event.title}
                    eventTag={event.status?.split("_").join(" ")}
                    eventTagIcon={EventTagIcon}
                    eventOrganizer={event.user.profile_image}
                    eventOrganizerName={
                      event.user.first_name || event.user.email
                    }
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
            )
          )}
        </VStack>
      </Container>
      <Footer />
    </main>
  );
};

export default EventBooking;
