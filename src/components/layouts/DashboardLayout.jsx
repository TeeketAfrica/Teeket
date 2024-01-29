import { Box, Stack } from "@chakra-ui/react";
import DashboardHeader from "./DashboardHeader";
import SidebarMenu from "./SidebarMenu";

const DashboardLayout = ({ children }) => {
  return (
    <Box h="100vh" w="100vw">
      <Stack h="100vh" w="100%" direction="row" spacing={0}>
        <SidebarMenu />
        <Box h="100vh" w="100%">
          <DashboardHeader />
          <Box h="100%" py={6} pb={10} overflowY="scroll">
            {children}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
