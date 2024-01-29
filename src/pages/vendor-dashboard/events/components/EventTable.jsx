import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import Search from "../../../../assets/icon/Search";
import Check from "../../../../assets/icon/Check";
import DownIcon from "../../../../assets/icon/DownIcon";
import Filter from "../../../../assets/icon/Filter";
import SearchIconEmpty from "../../../../assets/icon/SearchIconEmpty.svg";
import EventSpeakerEmpty from "../../../../assets/icon/EventSpeakerEmpty.svg";
import { eventFilter, tableData, tableHead } from "../../../../utils/constants";
import EmptyState from "../../../../components/ui/EmptyState";
import { useNavigate } from "react-router-dom";

const EventTable = () => {
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const itemsPerPage = 8;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [paginatedData, setPaginatedData] = useState(
    tableData.slice(startIndex, endIndex)
  );
  const [totalItems, setTotalItems] = useState(tableData.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  //   HANDLE PAGE CHANGE

  const handlePageChange = ({ selected }) => {
    const newStartIndex = selected * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;

    setPaginatedData(tableData.slice(newStartIndex, newEndIndex));
    setCurrentPage(selected);
  };

  //   HANDLE SEARCH

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredData = tableData.filter(
      (item) =>
        item.eventTitle.toLowerCase().includes(searchTerm) ||
        item.eventCategory.toLowerCase().includes(searchTerm)
    );

    console.log("Filtered Data:", filteredData);

    setSearch(searchTerm);
    setCurrentPage(0);
    setPaginatedData(filteredData.slice(0, itemsPerPage));
    setTotalItems(filteredData.length);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  };

  //   HANDLE CLEAR SEARCH

  const handleClearSearch = () => {
    setSearch("");
    setCurrentPage(0);
    setPaginatedData(tableData.slice(0, itemsPerPage));
    setTotalItems(tableData.length);
    setTotalPages(Math.ceil(tableData.length / itemsPerPage));
  };

  //   const handleFilterByStatus = () => {}

  return (
    <Box px={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        spacing="24px"
        alignItems="flex-start"
        pt={8}
        pb={6}
      >
        <InputGroup w="375px">
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search for all events"
          />
        </InputGroup>
        <Menu>
          <MenuButton
            p={2}
            border="1px solid"
            borderColor="gray.300"
            transition="all 0.2s"
            borderRadius="md"
            _hover={{ bg: "gray.400" }}
          >
            <HStack spacing="8px">
              <Filter />
              <Text fontSize={14} fontWeight={600} color="gray.800">
                File
              </Text>{" "}
              <DownIcon />
            </HStack>
          </MenuButton>
          <MenuList>
            {eventFilter.map((filter, i) => (
              <MenuItem
                key={i}
                justifyContent="space-between"
                onClick={() => setSelectedFilterIndex(i)}
              >
                {filter.filter} {selectedFilterIndex === i && <Check />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Stack>
      {/* <Box
        border="1px"
        borderColor="gray.300"
        borderRadius={8}
        maxW="1104px"
        w="100%"
      > */}
      <Box border="1px" borderColor="gray.300" borderRadius={8} pb={4}>
        <HStack px={6} py={5}>
          {search === "" ? (
            <Text fontSize={18} fontWeight={600} color="gray.800">
              All events
            </Text>
          ) : (
            <Text fontSize={18} fontWeight={600} color="gray.800">
              Result for &quot;{search}&quot;
            </Text>
          )}
          <Tag
            py="2px"
            px={2}
            bgColor="gray.200"
            fontSize={12}
            fontWeight={500}
            color="gray.700"
          >
            {(paginatedData.length === 0 && search === "") ||
            (paginatedData.length === 0 && search !== "")
              ? "No events"
              : search !== ""
              ? `${paginatedData.length} events`
              : `${tableData.length} events`}
          </Tag>
        </HStack>
        {paginatedData.length !== 0 ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr bgColor="gray.200">
                  {tableHead.map((th, i) => (
                    <Th
                      textTransform="capitalize"
                      fontSize={12}
                      fontWeight={500}
                      color="gray.600"
                      borderBottom="1px solid"
                      borderColor="gray.300"
                      key={i}
                    >
                      {th.head}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {paginatedData.map((td, i) => (
                  <Tr key={i}>
                    <Td>
                      <HStack spacing={3}>
                        <Image src={td.img} alt={td.eventTitle} w={10} h={10} />
                        <Box>
                          <Text fontWeight={500} color="gray.800">
                            {td.eventTitle}
                          </Text>
                          <Text color="gray.600">{td.eventCategory}</Text>
                        </Box>
                      </HStack>
                    </Td>
                    <Td color="gray.600" fontWeight={500}>
                      {td.ticketSold}/{td.ticketTotal}
                    </Td>
                    <Td color="gray.600" fontWeight={500}>
                      {td.revenue}
                    </Td>
                    <Td color="gray.600" fontWeight={500}>
                      {td.dateCreated}
                    </Td>
                    <Td>
                      <Tag
                        bg={
                          td.status === "Coming soon"
                            ? "gray.200"
                            : td.status === "Ongoing"
                            ? "green.100"
                            : "red.100"
                        }
                        color={
                          td.status === "Coming soon"
                            ? "gray.700"
                            : td.status === "Ongoing"
                            ? "green.500"
                            : "red.400"
                        }
                        py="2px"
                        px={2}
                        fontWeight={500}
                        fontSize={12}
                      >
                        {td.status}
                      </Tag>
                    </Td>
                    <Td>
                      <Image cursor="pointer" src={td.action} alt="more" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : search !== "" && paginatedData.length === 0 ? (
          <EmptyState
            icon={SearchIconEmpty}
            title="No result"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                Your search “{search}” did not match any events. Please
                <br />
                try again or create add a new event.
              </Text>
            }
            outlineBtn="Clear search"
            primaryBtn="Create event"
            outlineOnClick={handleClearSearch}
            primaryOnClick={() => navigate("/create-event")}
          />
        ) : (
          <EmptyState
            icon={EventSpeakerEmpty}
            title="Start by creating an event"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                All events created will live here for you to view and
                <br />
                manage effectively.
              </Text>
            }
            outlineBtn="Need help?"
            primaryBtn="Create event"
            outlineOnClick={() => navigate("/need-help")}
            primaryOnClick={() => navigate("/create-event")}
          />
        )}
        {/* // (
        //     <EmptyState
        //       icon={EventSpeakerEmpty}
        //       title="Start by creating an event"
        //       desc={
        //         <Text fontSize={14} color="gray.600" textAlign="center">
        //           All events created will live here for you to view and
        //           <br />
        //           manage effectively.
        //         </Text>
        //       }
        //       outlineBtn="Need help?"
        //       primaryBtn="Create event"
        //       outlineOnClick={() => navigate("/need-help")}
        //       primaryOnClick={() => navigate("/create-event")}
        //     />
        //  */}
        {paginatedData.length !== 0 && (
          <Box px={6} pt={3}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventTable;
