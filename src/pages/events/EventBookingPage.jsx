import { useState } from "react";
import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import Footer from "../../components/layouts/Footer";

import EventBookingDetail from "./components/EventBookingDetail";
import FreeEvents from "./components/FreeEvents";

const EventBooking = () => {
  const [isRegistered] = useState(false);

  return (
    <main>
      <Header userInfo={true} />
      <Container padding="16px">
        <EventBookingDetail isRegistered={isRegistered} />
        <Divider borderColor="gray.300" borderWidth="1px" />
        <VStack paddingTop="11">
          <HStack width="100%" justifyContent="space-between">
            <Text fontSize="3xl" fontWeight="bold" lineHeight="33px">
              Similar event you can attend to
            </Text>
            <Button variant="secondary" size="sm">
              See more
            </Button>
          </HStack>
          <FreeEvents />
        </VStack>
      </Container>
      <Footer />
    </main>
  );
};

export default EventBooking;
