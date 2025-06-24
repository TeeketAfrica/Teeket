import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import OrganizationTab from "./tab-panel/organizationTab";
import BankDetailTab from "./tab-panel/bankDetailTab";
import NotificationTab from "./tab-panel/notificationTab";
import { selectActiveUser } from "../../../features/activeUserSlice";
import { useSelector } from "react-redux";

const OrganizationSettingsDashboardPage = () => {
  const activeUser = useSelector(selectActiveUser);
  return (
    <DashboardLayout>
      {
        activeUser.is_creator?
        <>
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
                  <OrganizationTab isOrganizer={true}/>
                </TabPanel>
                <TabPanel>
                  <BankDetailTab isOrganizer={true}/>
                </TabPanel>
                <TabPanel>
                  <NotificationTab isOrganizer={true}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </>:
        <DashboardPageHeaders
          pageTitle="You are not an Organizer Yet"
          subTitle="Please Endeavor to create an event to get started"
        />
      }
    </DashboardLayout>
  );
};

export default OrganizationSettingsDashboardPage;
