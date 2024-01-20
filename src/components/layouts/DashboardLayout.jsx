import { Box, Stack } from "@chakra-ui/react";
import DashboardHeader from "./DashboardHeader";
import SidebarMenu from "./SidebarMenu";

const DashboardLayout = ({ children }) => {
  return (
    <Box h="100vh">
      <Stack direction="row" spacing={0}>
        <SidebarMenu />
        <Box w="100%">
          <DashboardHeader />
          <Box pb={10} px={8}>
            {children}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
