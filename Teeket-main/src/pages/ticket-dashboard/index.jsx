import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import EventList from "./components/EventList";
import TicketsHeroSection from "./components/TicketsHeroSection";
import TicketsSection from "./components/TicketsSection";

const TicketDashboardPage = () => {
  return (
    <main>
      <Header />
      <Container>
        <TicketsHeroSection />
        <TicketsSection />
        <EventList />
      </Container>
      <Footer />
    </main>
  );
};

export default TicketDashboardPage;
