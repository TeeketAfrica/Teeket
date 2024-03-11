import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import EventTabs from "./components/EventTabs";
import HeroSection from "./components/HeroSection";

const EventsPage = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <EventTabs />
      <Footer />
    </main>
  );
};

export default EventsPage;
