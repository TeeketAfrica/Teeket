import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import AllEvents from "./AllEvents";

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
              justifyContent="center"
            >
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
