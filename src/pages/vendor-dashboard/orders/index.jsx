import { Button, Stack, useToast } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import OrdersTable from "./components/OrdersTable";
import { teeketApi } from "../../../utils/api";

const OrdersDashboardPage = () => {
  const toast = useToast();
  const exportToExcel = async () => {
    console.log("caught in the act");
    try {
      let url = "/orders/export-csv";

      const response = await teeketApi.get(url);
      const res = response.data;

      toast({
        title: "Export Order List",
        description: `Order List exported successfully`,
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unable to export";
      toast({
        title: "Failed to export order",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
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
        <Button
          leftIcon={<Export />}
          onClick={exportToExcel}
          variant="secondary"
          p={2}
        >
          Export
        </Button>
      </Stack>
      <OrdersTable />
    </DashboardLayout>
  );
};

export default OrdersDashboardPage;
