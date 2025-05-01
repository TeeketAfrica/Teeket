import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import EventCard from "../../events/components/EventCard";
import Event1 from "../../../assets/img/e1.png";
import Event2 from "../../../assets/img/e2.png";
import Event3 from "../../../assets/img/e3.png";
import Event4 from "../../../assets/img/e4.png";
import Avatars from "../../../assets/img/Avatars.png";
import EventTagIcon from "../../../assets/icon/EventTagIcon.svg";
import { teeketApi } from "../../../utils/api";

const InterestEvents = () => {
  const [event, setEvents] = useState([]);
  useEffect(()=>{
    const fetchEvents = async ()=>{
      try {
          const response = await teeketApi.get(`/events`, {
              nullAuth: true,
          });
          const eventList = response.data.data;
    
          setEvents(eventList);
      }
      catch(err){
        console.log(`Error fetching similar events: ${err}`)
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      {event && (
        <>
          <Grid
            gridTemplateColumns={[
              "1fr",
              null,
              "repeat(3, 1fr)",
              null,
              "repeat(4, 1fr)",
            ]}
            gap={6}
            borderBottom="1px solid"
            borderColor="gray.300"
            pt={6}
            pb={9}
            paddingX={7}
          >
            {
              event.slice(0, 4).map((event, i)=>(
                <EventCard
                  key={i}
                  eventImage={event.banner_image}
                  eventTitle={event.title}
                  eventTag={event.status}
                  eventTagIcon={EventTagIcon}
                  eventOrganizer={Avatars}
                  eventCommunity={`by ${event.organizer}`}
                  eventLocation={event.hosting_site}
                  eventPrice="Starts at $10"
                  eventDate={{
                    startDate: `${event.start_date}`,
                    endDate: "2024-03-27T14:30:00Z",
                  }}
                />  
              ))
            }
          </Grid>
        </>
      )}
    </>
  );
};

export default InterestEvents;
