import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import EmptyState from "../../../components/ui/EmptyState";
import EmptyCard from "../../../assets/icon/EmptyCard.svg";
import SingleTicket from "./SingleTicket";

const TicketsSection = () => {
  const [availableTickets] = useState(true);
  const navigate = useNavigate();
  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="gray.300"
      py={9}
    >
      {availableTickets ? (
        <Grid
          gridTemplateColumns={[
            "1fr",
            null,
            "repeat(2, 1fr)",
            null,
            "repeat(3, 1fr)",
          ]}
          gap={6}
          paddingX={5}
        >
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
          <GridItem justifySelf="center" width={"100%"}>
            <SingleTicket
              eventTitle="The vintage art event africa"
              eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
              eventLocation="The rink, prince and princess estate, Abuja Nigeria"
              ticketRegularQuantity="2x"
              ticketVipQuantity="2x"
            />
          </GridItem>
        </Grid>
      ) : (
        <Container maxW="400px">
          <EmptyState
            icon={EmptyCard}
            title="No ticket to show you"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                Browse amazing events and book one or more. All tickets from
                events booked will be displayed here
              </Text>
            }
            outlineBtn="Refresh page"
            primaryBtn="Browse event"
            primaryOnClick={() => navigate("/events")}
            outlineOnClick={() => window.location.reload()}
          />
        </Container>
      )}
    </Box>
  );
};

export default TicketsSection;
