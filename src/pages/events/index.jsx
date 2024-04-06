import { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import EventPreference from "./components/EventPreference";
import EventTabs from "./components/EventTabs";
import HeroSection from "./components/HeroSection";
import { useDisclosure } from "@chakra-ui/react";

const EventsPage = () => {
  const [displayEventPreference, setDisplayEventPreference] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    setDisplayEventPreference(true);
    onOpen();
  }, [onOpen]);

  return (
    <main>
      <Header />
      {displayEventPreference && (
        <EventPreference isOpen={isOpen} onClose={onClose} />
      )}
      <HeroSection />
      <EventTabs />
      <Footer />
    </main>
  );
};

export default EventsPage;
