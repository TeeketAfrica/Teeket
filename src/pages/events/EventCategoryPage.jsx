import { Box } from "@chakra-ui/react";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import EventCategoryHeroSection from "./components/EventCategoryHeroSection";
import SingleEventCategory from "./components/SingleEventCategory";

const EventCategoryPage = () => {
  return (
    <main>
      <Header />
      <EventCategoryHeroSection />
      <Container>
        <Box pt={9} pb={6} borderTop="1px solid" borderColor="gray.300">
          <SingleEventCategory />
        </Box>
      </Container>
      <Footer />
    </main>
  );
};

export default EventCategoryPage;
