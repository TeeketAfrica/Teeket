import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Divider, Flex, Text, VStack } from "@chakra-ui/react";

import teeketApi from "../../api/teeketApi";

import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import Footer from "../../components/layouts/Footer";

import EventBookingDetail from "./components/event-booking/EventBookingDetail";
import FreeEvents from "./components/FreeEvents";

const EventBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    if (!id) {
      navigate("/auth/login");
      return;
    }
    const fetchEvent = async () => {
      try {
        const response = await teeketApi.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.log(`Error fetching event with id ${id} `, err.message);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <main>
      <Header />
      <Container padding="16px">
        <EventBookingDetail event={event} />
        <Divider borderColor="gray.300" borderWidth="1px" />
        <VStack paddingTop="11">
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            gap="6"
            width="100%"
            justifyContent="space-between"
          >
            <Text fontSize="3xl" fontWeight="bold" lineHeight="33px">
              Similar event you can attend to
            </Text>
            <Button variant="secondary" size="sm" width="fit-content">
              See more
            </Button>
          </Flex>
          <FreeEvents />
        </VStack>
      </Container>
      <Footer />
    </main>
  );
};

export default EventBooking;
