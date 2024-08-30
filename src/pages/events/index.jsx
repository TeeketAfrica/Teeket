import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Text, useDisclosure } from "@chakra-ui/react";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import EventPreference from "./components/EventPreference";
import EventTabs from "./components/EventTabs";
import HeroSection from "./components/HeroSection";
import EmptyState from "../../components/ui/EmptyState";
import EventCautionState from "../../assets/icon/EventCautionState.svg";
import EventSpeakerEmpty from "../../assets/icon/EventSpeakerEmptyBlue.svg";
import ScrollToTop from "../../utils/ScrollToTop";
import { SearchContext } from "../../context/SearchContext";
import { useStorage } from "../../utils/storage";
import { teeketApi } from "../../utils/api";

const EventsPage = () => {
  const navigate = useNavigate();
  const { getAccessToken } = useStorage();

  const token = getAccessToken();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { searchTerm, category, clearSearch } = useContext(SearchContext);

  const [events, setEvents] = useState([]);
  const [displayEventPreference, setDisplayEventPreference] = useState(false);
  const [preloader, setPreLoader] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchEvents(searchTerm, category);
  }, [searchTerm, category]);

  useEffect(() => {
    if (!token && !displayEventPreference) {
      setDisplayEventPreference(true);
      onOpen();
    }
  }, [token, displayEventPreference, onOpen]);

  const fetchEvents = async (title) => {
    try {
      const response = await teeketApi.get(`/events?title=${title}`);
      const eventList = response.data.data;

      setEvents(eventList);

      setPreLoader(false);
      setFetchError(false);
    } catch (error) {
      setPreLoader(false);
      setFetchError(true);
      console.error("Error fetching events:", error);
    }
  };

  return (
    <main>
      <ScrollToTop />
      <Header />
      {displayEventPreference && (
        <EventPreference isOpen={isOpen} onClose={onClose} />
      )}
      <HeroSection />
      {preloader ? (
        <Text padding="40px 0" textAlign="center" fontSize="20px">
          {" "}
          Loading ...{" "}
        </Text>
      ) : (
        <>
          {events.length > 0 && <EventTabs allEvents={events} />}

          {events.length == 0 && fetchError && (
            <Container maxW="385px" px={0}>
              <EmptyState
                icon={EventCautionState}
                title="Something went wrong"
                maxW="350px"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    We had some trouble loading this page. Please refresh the
                    page to try again
                  </Text>
                }
                outlineBtn="Contact support"
                primaryBtn="Refresh page"
                outlineOnClick={() => navigate("/support")}
                primaryOnClick={() => window.location.reload()}
              />
            </Container>
          )}

          {events.length === 0 && (
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
      <Footer />
    </main>
  );
};

export default EventsPage;
