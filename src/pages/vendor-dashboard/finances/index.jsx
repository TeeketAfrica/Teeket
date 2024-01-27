import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";

const FinancesDashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Finance"
        subTitle="Get an overview of all event-related revenue"
      />
    </DashboardLayout>
  );
};

export default FinancesDashboardPage;
