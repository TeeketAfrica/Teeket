import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Text, useDisclosure } from "@chakra-ui/react";

import teeketApi from "../../api/teeketApi";

import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";

import EventPreference from "./components/EventPreference";
import EventTabs from "./components/EventTabs";
import HeroSection from "./components/HeroSection";

import EmptyState from "../../components/ui/EmptyState";

import EventCautionState from "../../assets/icon/EventCautionState.svg";
import EventSpeakerEmpty from "../../assets/icon/EventSpeakerEmptyBlue.svg";

import ScrollToTop from "../../utils/ScrollToTop";

const EventsPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("TOKEN");
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [displayEventPreference, setDisplayEventPreference] = useState(false);
  const [serchString, setSerchString] = useState("");
  const [preloader, setPreLoader] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!token && !displayEventPreference) {
      setDisplayEventPreference(true);
      onOpen();
    }
  }, [token, displayEventPreference, onOpen]);

  const fetchEvents = async () => {
    try {
      const response = await teeketApi.get("/events");
      const eventList = response.data.data;

      setEvents(eventList);
      setFilteredEvents(eventList);

      setPreLoader(false);
    } catch (error) {
      setPreLoader(false);
      console.error("Error fetching events:", error);
    }
  };

  const handleSearch = (searchTerms) => {
    if (searchTerms.params && searchTerms.category) {
      setFilteredEvents(
        filteredEvents.filter(
          (event) =>
            event.title
              .toLowerCase()
              .includes(searchTerms.params.toLowerCase()) ||
            event.industry
              .toLowerCase()
              .includes(searchTerms.category.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(events);
    }
    setSerchString(searchTerms.params);
  };

  return (
    <main>
      <ScrollToTop />
      <Header />
      {displayEventPreference && (
        <EventPreference isOpen={isOpen} onClose={onClose} />
      )}
      <HeroSection onSearch={handleSearch} />
      {preloader ? (
        <Text padding="40px 0" textAlign="center" fontSize="20px">
          {" "}
          Loading ...{" "}
        </Text>
      ) : (
        <>
          {events.length > 0 && filteredEvents.length > 0 && (
            <EventTabs eventLists={filteredEvents} />
          )}

          {events.length == 0 && filteredEvents.length == 0 && (
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

          {events.length > 0 && filteredEvents.length == 0 && (
            <Container maxW="385px" px={0}>
              <EmptyState
                icon={EventSpeakerEmpty}
                title="No event found"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    {serchString} did not match any results. please try again
                  </Text>
                }
                outlineBtn="Clear search"
                outlineOnClick={() => setFilteredEvents(events)}
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
