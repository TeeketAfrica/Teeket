import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import EmptyState from "../../../components/ui/EmptyState";
import EmptyCard from "../../../assets/icon/EmptyCard.svg";
import SingleTicket from "./SingleTicket";
import { teeketApi } from "../../../utils/api";
import useStorage from "../../../utils/storage";
import { formatDate } from "../../../features/formatDate";

const TicketsSection = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const { getAccessToken } = useStorage();
  const token = getAccessToken(); 

  useEffect(()=>{
      const fetchTickets = async ()=> {
        try {
          const response = await teeketApi.get(`orders/me`,
            {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            } 
          );
          setTickets(response?.data.data)
          console.log("ticccksss", tickets);
        }
        catch(err){
          console.log("Error fetching tickets:", err);
          setTickets([]);
          setAvailableTickets(false);
        }
      }

      fetchTickets();
  }, []);

  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="gray.300"
      py={9}
    >
      {tickets.length > 0 ? (
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
         {
            tickets.map((ticket, i)=>(
              <GridItem justifySelf="center" width={"100%"}>
                <SingleTicket
                  eventTitle={ticket?.event?.title}
                  eventTime={`${formatDate(ticket?.event.start_date)}`}
                  eventLocation={ticket?.event.hosting_site === "physical"? `${ticket?.event.event_location}`: `Event Link:${ticket?.event.event_link}`}
                  ticketQuantity={ticket?.quantity}
                  ticketType={ticket?.ticket.name}
                  ticketPrice={ticket?.ticket.price}
                  eventId={ticket?.event.id}
                />
              </GridItem>
            ))
         } 
         
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
