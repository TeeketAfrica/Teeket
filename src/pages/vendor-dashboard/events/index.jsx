import { Button, HStack, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";

const EventsDashboardPage = () => {
  return (
    <DashboardLayout>
      <Stack
        // py={6}
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        spacing="24px"
        alignItems="flex-start"
      >
        <DashboardPageHeaders
          pageTitle="Events"
          subTitle="View your organizations summary"
        />
        <HStack spacing="12px">
          <Button>Export</Button>
          <Button>Add event</Button>
        </HStack>
      </Stack>
    </DashboardLayout>
  );
};

export default EventsDashboardPage;
