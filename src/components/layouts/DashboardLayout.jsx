import { Box, Stack } from "@chakra-ui/react";
import DashboardHeader from "./DashboardHeader";
import SidebarMenu from "./SidebarMenu";

const DashboardLayout = ({ children }) => {
  return (
    <Box h="100vh" w="100vw" overflow="hidden">
      <Stack h="100%" w="100%" direction="row" spacing={0}>
        <SidebarMenu />
        <Box h="100%" w="100%" pb={12}>
          <DashboardHeader />
          <Box h="100%" pt={6} pb={10} overflowY="auto">
            {children}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
