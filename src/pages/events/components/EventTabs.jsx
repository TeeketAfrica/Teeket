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
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
                <TabPanel>
                  <p>four!</p>
                </TabPanel>
                <TabPanel>
                  <p>five!</p>
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
