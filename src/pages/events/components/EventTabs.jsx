import { useEffect } from "react";
import { Link } from "react-router-dom";

import teeketApi from "../../../api/teeketApi";

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

const EventTabs = () => {
  // Fetch all events
  useEffect(() => {}, []);

  return (
    <section>
      <Container>
        <Box>
          <Tabs>
            <TabList
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="gray.300"
              justifyContent="center"
            >
              <Tab>All events</Tab>
              <Tab>Curated for you</Tab>
              <Tab>Watch out</Tab>
              <Tab>Free events</Tab>
              <Tab>Paid events</Tab>
            </TabList>

            <Box>
              <HStack pt={6} justifyContent="space-between" alignItems="center">
                <Text fontSize={28} fontWeight={700}>
                  Trending events
                </Text>
                <Button variant="outline">
                  <Link to="/event-category">See more</Link>
                </Button>
              </HStack>

              <TabPanels>
                <TabPanel p={0}>
                  <AllEvents />
                </TabPanel>
                <TabPanel p={0}>
                  <CuratedEvents />
                </TabPanel>
                <TabPanel p={0}>
                  <WatchoutEvents />
                </TabPanel>
                <TabPanel p={0}>
                  <FreeEvents />
                </TabPanel>
                <TabPanel p={0}>
                  <PaidEvents />
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
