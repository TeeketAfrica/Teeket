import { Button, HStack, Image, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import Export from "../../../assets/icon/Export.svg";
import AddEvent from "../../../assets/icon/AddEvent.svg";
import EventTable from "./components/EventTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import * as XLSX from "xlsx";

const EventsDashboardPage = () => {
  const [data, setData] = useState([]);

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
        <HStack spacing="12px">
          <Button variant="secondary" p={2} onClick={exportToExcel}>
            <Image src={Export} alt="export" mr={2} />
            Export
          </Button>
          <Link to="/create-event">
            <Button variant="primary" p={2}>
              <Image src={AddEvent} alt="add event" mr={2} />
              Add event
            </Button>
          </Link>
        </HStack>
      </Stack>
      <EventTable setData={setData} />
    </DashboardLayout>
  );
};

export default EventsDashboardPage;
