import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Footer from "../../components/layouts/Footer";
import Container from "../../components/ui/Container";
import EventCategoryHeroSection from "./components/EventCategoryHeroSection";
import SingleEventCategory from "./components/SingleEventCategory";
import ScrollToTop from "../../utils/ScrollToTop";
import { teeketApi } from "../../utils/api";

const EventCategoryPage = () => {
  const { type } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [type]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await teeketApi.get("/events", {
        nullAuth: true,
      });
      const eventList = response.data.data;
      let filteredEvents;

      if (type === "free") {
        filteredEvents = eventList.filter(
          (event) => Number(event.lowest_ticket_price) === 0
        );
      } else if (type === "paid") {
        filteredEvents = eventList.filter(
          (event) => Number(event.lowest_ticket_price) > 0
        );
      } else {
        filteredEvents = eventList;
      }

      setEvents(filteredEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <main>
      <ScrollToTop />
      <EventCategoryHeroSection eventType={type} />
      <Container>
        <Box pt={9} pb={6} borderTop="1px solid" borderColor="gray.300">
          <SingleEventCategory allEvents={events} loading={loading} />
        </Box>
      </Container>
      <Footer />
    </main>
  );
};

export default EventCategoryPage;
