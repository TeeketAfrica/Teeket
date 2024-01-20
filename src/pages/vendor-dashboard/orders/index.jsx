import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";

const OrdersDashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Orders"
        subTitle="Explore Your Event Ticket Orders"
      />
    </DashboardLayout>
  );
};

export default OrdersDashboardPage;
