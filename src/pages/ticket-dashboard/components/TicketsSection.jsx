import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import EmptyState from "../../../components/ui/EmptyState";
import EmptyCard from "../../../assets/icon/EmptyCard.svg";
import SingleTicket from "./SingleTicket";
import { teeketApi } from "../../../utils/api";
import useStorage from "../../../utils/storage";

const TicketsSection = () => {
  const [availableTickets, setAvailableTickets] = useState(true);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const { getAccessToken } = useStorage();
  const token = getAccessToken(); 

  useEffect(()=>{
      const fetchTickets = async ()=> {
        try {
          const response = await teeketApi.get(`events/tickets/me`,
            {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            } 
          );
          setTickets(response?.data?.data)
          setAvailableTickets(true);
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
         {
            tickets.map((ticket, i)=>(
              <GridItem justifySelf="center" width={"100%"}>
                <SingleTicket
                  eventTitle={ticket?.event?.title}
                  eventTime="23 Jan, 2024, 8;00pm - 10:00pm"
                  eventLocation="The rink, prince and princess estate, Abuja Nigeria"
                  ticketRegularQuantity="2x"
                  ticketVipQuantity="2x"
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
