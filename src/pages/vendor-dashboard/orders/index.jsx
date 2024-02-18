import { Button, Image, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import OrdersTable from "./components/OrdersTable";

const OrdersDashboardPage = () => {
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
          pageTitle="Orders"
          subTitle="Explore Your Event Ticket Orders"
        />
        <Button variant="secondary" p={2}>
          <Image src={Export} alt="export" mr={2} />
          Export
        </Button>
      </Stack>
      <OrdersTable />
    </DashboardLayout>
  );
};

export default OrdersDashboardPage;
