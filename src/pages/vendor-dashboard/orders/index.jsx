import { Button, Stack, useToast } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import OrdersTable from "./components/OrdersTable";
import { teeketApi } from "../../../utils/api";

const OrdersDashboardPage = () => {
  const toast = useToast()
      const exportToExcel = async () => {
          try {
              const response = await teeketApi.get("/orders/export-csv");
              const res = response.data;

              const blob = new Blob([res], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
          
              const link = document.createElement('a');
              link.href = url;
              link.download = 'exported-file.csv'; 
          
              document.body.appendChild(link);
              link.click();
          
              document.body.removeChild(link);
              URL.revokeObjectURL(url);

              toast({
                  title: "Export Order List",
                  description: `Order List exported successfully`,
                  status: "success",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
              });
          } catch (error) {
              const errorMessage =
                  error?.response?.data?.message || "Unable to export";
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
        <Button width={{base:"100%",md: '100px'}} onClick={exportToExcel} variant="secondary" p={2} gap={1}>
          <Export />
          Export
        </Button>
      </Stack>
      <OrdersTable />
    </DashboardLayout>
  );
};

export default OrdersDashboardPage;
