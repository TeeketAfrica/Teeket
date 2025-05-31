import { Button, HStack, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import AddEvent from "../../../assets/icon/AddEvent.svg";
import EventTable from "./components/EventTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveUser, setIsCreator } from "../../../features/activeUserSlice";

const EventsDashboardPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const activeUser = useSelector(selectActiveUser);

  const exportToExcel = () => {
    const exportData = data.map((event) => ({
      Title: event.title,
      Organizer: event.organizer,
      Tickets_sold: event.tickets_sold,
      Tickets_number: event.number_of_tickets,
      Tickets_revenue: event.total_revenue,
      Created: formatDate(event.date_created),
      Status: event.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Created_Events");
    XLSX.writeFile(workbook, "Created_Events.xlsx");
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
        px={[4, 8]}>
        <DashboardPageHeaders
          pageTitle="Events"
          subTitle="View your organizations summary"
        />
        <HStack  width={{base:"100%", md:'250px'}} spacing="12px">
          <Button width={{base:"50%"}} variant="secondary" p={2} onClick={exportToExcel}>
            <Export />
            Export
          </Button> 
          <Link to="/create-event">
            <Button width={{base:'150px', md:'130px'}} variant="primary" p={2}>
              <AddEvent />
              Add event
            </Button>
          </Link>
        </HStack>
      </Stack>
    <EventTable setData={setData} loading={loading} setIsLoading={setIsLoading}/>  
    </DashboardLayout>
  ); 
};

export default EventsDashboardPage;
