import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InterestEvents from "./InterestEvents";

const EventList = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default EventList;
