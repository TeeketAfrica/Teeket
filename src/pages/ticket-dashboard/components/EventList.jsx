import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InterestEvents from "./InterestEvents";
import Container from "../../../components/ui/Container";

const EventList = () => {
  return (
    <Container padding="16px">
      <HStack
        w="full"
        pt={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={{ base: 18, md: 28 }} fontWeight={700}>
          Events that might interest you
        </Text>
        <Button variant="outline">
          <Link to="/event-category">See more</Link>
        </Button>
      </HStack>

      <InterestEvents />
    </Container>
  );
};

export default EventList;
