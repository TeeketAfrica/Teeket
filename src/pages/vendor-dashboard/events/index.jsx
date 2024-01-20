import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";

const EventsDashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Events"
        subTitle="View your organizations summary"
      />
    </DashboardLayout>
  );
};

export default EventsDashboardPage;
