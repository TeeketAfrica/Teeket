import { Button, HStack, Image, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import AddEvent from "../../../assets/icon/AddEvent.svg";
import EventTable from "./components/EventTable";

const EventsDashboardPage = () => {
  return (
    <DashboardLayout>
      <Stack
        borderBottom="1px solid"
        borderColor="gray.300"
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        alignItems="flex-start"
        pb={6}
        px={[4, 8]}
      >
        <DashboardPageHeaders
          pageTitle="Events"
          subTitle="View your organizations summary"
        />
        <HStack spacing="12px">
          <Button variant="secondary" p={2}>
            <Image src={Export} alt="export" mr={2} />
            Export
          </Button>
          <Button variant="primary" p={2}>
            <Image src={AddEvent} alt="add event" mr={2} />
            Add event
          </Button>
        </HStack>
      </Stack>
      <EventTable />
    </DashboardLayout>
  );
};

export default EventsDashboardPage;
