import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import OrganizationTab from "./tab-panel/organizationTab";
import BankDetailTab from "./tab-panel/bankDetailTab";
import NotificationTab from "./tab-panel/notificationTab";

const OrganizationSettingsDashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Organization settings"
        subTitle="Manage core settings for your organization"
      />
      <Box marginTop={6}>
        <Tabs isLazy isManual variant="line" size="md">
          <TabList pl="8">
            <Tab>Organization profile</Tab>
            <Tab>Bank account</Tab>
            <Tab>Notifcations</Tab>
          </TabList>

          <TabPanels marginTop={8}>
            <TabPanel>
              <OrganizationTab />
            </TabPanel>
            <TabPanel>
              <BankDetailTab />
            </TabPanel>
            <TabPanel>
              <NotificationTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
};

export default OrganizationSettingsDashboardPage;
