import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";

const OverviewDashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Overview"
        subTitle="View your organizations summary"
      />
    </DashboardLayout>
  );
};

export default OverviewDashboardPage;
