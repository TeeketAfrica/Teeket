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
import { useEffect, useState } from "react";

const EventTabs = ({ allEvents }) => {
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
              <Tab>All events</Tab>
              <Tab>Curated for you</Tab>
              <Tab>Watch out</Tab>
              <Tab>Free events</Tab>
              <Tab>Paid events</Tab>
            </TabList>

            <Box>
              <TabPanels>
                <TabPanel p={0}>
                  <AllEvents events={allEvents} type="all" />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents events={allEvents} type="all" />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents events={allEvents} type="all" />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents events={allEvents} type="free" />
                </TabPanel>
                <TabPanel p={0}>
                  <AllEvents events={allEvents} type="paid" />
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
