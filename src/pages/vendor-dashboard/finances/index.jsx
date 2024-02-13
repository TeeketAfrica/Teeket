import { Button, HStack, Image, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import RevenueCard from "./components/RevenueCard";
import TotalRevenue from "../../../assets/icon/TotalRevenue.svg";
import RemittedRevenue from "../../../assets/icon/RemittedRevenue.svg";
import AvailableRevenue from "../../../assets/icon/AvailableRevenue.svg";
import RevenueTable from "./components/RevenueTable";

const FinancesDashboardPage = () => {
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
        px={8}
      >
        <DashboardPageHeaders
          pageTitle="Finance"
          subTitle="Get an overview of all event-related revenue"
        />
        <HStack spacing="12px">
          <Button variant="secondary" p={2}>
            <Image src={Export} alt="export" mr={2} />
            Export
          </Button>
          <Button variant="primary" p={2}>
            $ Request payment
          </Button>
        </HStack>
      </Stack>
      <Stack
        borderBottom="1px solid"
        borderColor="gray.300"
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        alignItems="flex-start"
        py={6}
        px={8}
      >
        <RevenueCard
          icon={TotalRevenue}
          revenueTitle="Total revenue made"
          revenueTotal="$40,000"
          percentIncrease="20%"
          desc="increase vs last revenue"
          color="grey500"
        />
        <RevenueCard
          icon={AvailableRevenue}
          revenueTitle="Available revenue"
          revenueTotal="$10,000"
          desc="You can request payment in 4days time"
          color="blue.400"
        />
        <RevenueCard
          icon={RemittedRevenue}
          revenueTitle="Remiited revenue"
          revenueTotal="$40,000"
        />
      </Stack>
      <RevenueTable />
    </DashboardLayout>
  );
};

export default FinancesDashboardPage;
