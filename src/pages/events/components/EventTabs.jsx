import {
  Box,
  Button,
  Center,
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

            <Box py={9} borderBottom="1px solid" borderColor="gray.300">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize={28} fontWeight={700}>
                  Trending events
                </Text>
                <Button variant="outline">See more</Button>
              </HStack>

              <TabPanels>
                <TabPanel>
                  <AllEvents />
                </TabPanel>
                <TabPanel>
                  <CuratedEvents />
                </TabPanel>
                <TabPanel>
                  <WatchoutEvents />
                </TabPanel>
                <TabPanel>
                  <FreeEvents />
                </TabPanel>
                <TabPanel>
                  <PaidEvents />
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
          <Center w="full" my="6">
            <Button variant="primary">Browse all events</Button>
          </Center>
        </Box>
      </Container>
    </section>
  );
};

export default EventTabs;
