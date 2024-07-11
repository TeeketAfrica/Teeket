import { Link } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import AllEvents from "./AllEvents";
import CuratedEvents from "./CuratedEvents";
import WatchoutEvents from "./WatchoutEvents";
import FreeEvents from "./FreeEvents";
import PaidEvents from "./PaidEvents";
import { useState } from "react";

const EventTabs = ({ eventLists }) => {
  const events = eventLists;
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterEvents = (type) => {
    if (type == "curated") {
      setFilteredEvents(events);
    } else if (type == "watch") {
      setFilteredEvents(events);
    } else if (type == "free") {
      setFilteredEvents(
        events.filter((event) => Number(event.lowest_ticket_price) === 0)
      );
    } else if (type == "paid") {
      setFilteredEvents(
        events.filter((event) => Number(event.lowest_ticket_price) > 0)
      );
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <section>
      <Container>
        <Box>
          <Tabs>
            <TabList
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="gray.300"
              justifyContent="center">
              <Tab onClick={handleFilterEvents}>All events</Tab>
              <Tab onClick={() => handleFilterEvents("curated")}>
                Curated for you
              </Tab>
              <Tab onClick={() => handleFilterEvents("watch")}>Watch out</Tab>
              <Tab onClick={() => handleFilterEvents("free")}>Free events</Tab>
              <Tab onClick={() => handleFilterEvents("paid")}>Paid events</Tab>
            </TabList>

            <Box>
              <TabPanels>
                <TabPanel p={0}>
                  <AllEvents allEvents={filteredEvents} />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents allEvents={filteredEvents} />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents allEvents={filteredEvents} />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents allEvents={filteredEvents} />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents allEvents={filteredEvents} />
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Container>
    </section>
  );
};

export default EventTabs;
