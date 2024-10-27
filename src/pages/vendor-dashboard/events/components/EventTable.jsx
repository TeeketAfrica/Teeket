import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  IconButton,
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
  useToast,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import Search from "../../../../assets/icon/Search.svg";
import Check from "../../../../assets/icon/Check.svg";
import DownIcon from "../../../../assets/icon/DownIcon.svg";
import Filter from "../../../../assets/icon/Filter.svg";
import SearchIconEmpty from "../../../../assets/icon/SearchIconEmpty.svg";
import EventSpeakerEmpty from "../../../../assets/icon/EventSpeakerEmpty.svg";
import EventCautionState from "../../../../assets/icon/EventCautionState.svg";
import { eventFilter, eventTableHead } from "../../../../utils/constants";
import EmptyState from "../../../../components/ui/EmptyState";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import ActionBtn from "../../../../assets/icon/ActionBtn.svg";
import { teeketApi } from "../../../../utils/api";

const EventTable = ({ setData }) => {
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [eventTableData, setEventTableData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const updateNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  // FECTH EVENTS

  useEffect(() => {
    const handleFetchEvents = async () => {
      try {
        const response = await teeketApi.get(
          `/events/user?search=${search}&status=${statusFilter}`
        );
        const res = response.data;

        setData(res.data);
        setTotalItems(res.total);
        setEventTableData(res.data);
        setPaginatedData(res.data.slice(0, itemsPerPage));
        setTotalPages(Math.ceil(res.total / itemsPerPage));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "An error occured";
        toast({
          title: "Events failed to fetch.",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    };

    handleFetchEvents();
  }, [toast, itemsPerPage, setData, search, statusFilter]);

  // COPY EVENT

  const handleCopyEvent = async (eventId) => {
    await navigator.clipboard.writeText(
      `https://www.teeketafrica.com/event-booking/${eventId}`
    );
    toast({
      title: "Events copied.",
      status: "success",
      duration: 3000,
      position: "top-right",
      isClosable: true,
    });
  };

  // DUPLICATE EVENT
  const handleDuplicateEvent = async (eventId) => {
    try {
      await teeketApi.post(`/events/${eventId}`);
      window.location.reload();
      toast({
        title: "Event duplicated.",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
        title: "Event failed to duplicate.",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // EXPORT ATTENDEE LIST
  const handleAttendeeExport = async (eventId) => {
    try {
      await teeketApi.get(`/events/${eventId}/attendees/export-csv`);
      toast({
        title: "Attendee list exported",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
        title: "Error",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // DELETE EVENT

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await teeketApi.delete(`/events/${eventId}`);

      if (response.status === 204) {
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
        title: "Events failed to fetch.",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(eventTableData.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, eventTableData]);

  // HANDLE PAGE CHANGE
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //   HANDLE CLEAR SEARCH

  const handleClearSearch = () => {
    setSearch("");
    setCurrentPage(0);
    setPaginatedData(eventTableData.slice(0, itemsPerPage));
    setTotalItems(eventTableData.length);
    setTotalPages(Math.ceil(eventTableData.length / itemsPerPage));
  };

  // FILTER BY STATUS

  const statusMap = {
    "All events": "",
    "Coming soon": "coming_soon",
    "On going": "on_going",
    "Past events": "past_event",
  };

  const handleFilterByStatus = (selectedStatus) => {
    setStatusFilter(statusMap[selectedStatus]);
  };

  return (
    <Box px={[4, 8]}>
      <Stack
        direction={["column", "row"]}
        justifyContent="space-between"
        w="100%"
        spacing="24px"
        alignItems="flex-start"
        pt={8}
        pb={6}
      >
        <InputGroup maxW="375px" w="100%">
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
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
              </Text>
              <DownIcon />
            </HStack>
          </MenuButton>
          <MenuList>
            {eventFilter.map((filter, i) => (
              <MenuItem
                key={i}
                justifyContent="space-between"
                onClick={() => {
                  setSelectedFilterIndex(i);
                  handleFilterByStatus(filter.filter);
                }}
              >
                {filter.filter} {selectedFilterIndex === i && <Check />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Stack>
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
              : `${totalItems} events`}
          </Tag>
        </HStack>
        {isOnline ? (
          <>
            {paginatedData.length !== 0 ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr bgColor="gray.200">
                      {eventTableHead.map((th, i) => (
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
                          <HStack spacing={[2, 3]}>
                            <Image
                              src={td.banner_image}
                              alt={td.industry}
                              objectFit="cover"
                              w={10}
                              h={10}
                            />
                            <Box>
                              <Text fontWeight={500} color="gray.800">
                                {td.title}
                              </Text>
                              <Text color="gray.600">{td.organizer}</Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td color="gray.600" fontWeight={500}>
                          {td.tickets_sold}/{td.number_of_tickets}
                        </Td>
                        <Td color="gray.600" fontWeight={500}>
                          ${td.total_revenue}
                        </Td>
                        <Td color="gray.600" fontWeight={500}>
                          {formatDate(td.date_created)}
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
                            borderRadius={16}
                            py="2px"
                            px={2}
                            fontWeight={500}
                            fontSize={12}
                          >
                            {td.status}
                          </Tag>
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ActionBtn />}
                              variant="outline"
                            />
                            <MenuList>
                              <MenuItem _hover={{ bgColor: "gray.200" }}>
                                <Link to={`/edit-event/${td.id}`}>
                                  Edit event
                                </Link>
                              </MenuItem>
                              <MenuItem _hover={{ bgColor: "gray.200" }}>
                                <Link to={`/event-booking/${td.id}`}>
                                  View event
                                </Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDuplicateEvent(td.id)}
                                _hover={{ bgColor: "gray.200" }}
                              >
                                <Link>Duplicate event</Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleAttendeeExport(td.id)}
                                _hover={{ bgColor: "gray.200" }}
                              >
                                Export attendees list
                              </MenuItem>
                              <Divider borderColor="grey100" my={3} />
                              <MenuItem
                                onClick={() => handleCopyEvent(td.id)}
                                _hover={{ bgColor: "gray.200" }}
                              >
                                Copy link
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDeleteEvent(td.id)}
                                _hover={{ bgColor: "gray.200" }}
                              >
                                Delete event
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : search !== "" && paginatedData.length === 0 ? (
              <EmptyState
                maxW="350px"
                icon={SearchIconEmpty}
                title="No result"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    Your search “{search || statusFilter}” did not match any
                    events. Please try again or create add a new event.
                  </Text>
                }
                outlineBtn="Clear search"
                primaryBtn="Create event"
                outlineOnClick={handleClearSearch}
                primaryOnClick={() => navigate("/create-event")}
              />
            ) : (
              <EmptyState
                maxW="350px"
                icon={EventSpeakerEmpty}
                title="Start by creating an event"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    All events created will live here for you to view and manage
                    effectively.
                  </Text>
                }
                outlineBtn="Need help?"
                primaryBtn="Create event"
                outlineOnClick={() => navigate("/need-help")}
                primaryOnClick={() => navigate("/create-event")}
              />
            )}
          </>
        ) : (
          <EmptyState
            icon={EventCautionState}
            title="Something went wrong"
            maxW="350px"
            desc={
              <Text fontSize={14} color="gray.600" textAlign="center">
                We had some trouble loading this page. Please refresh the page
                to try again or get in touch if the problem sticks around!
              </Text>
            }
            outlineBtn="Contact support"
            primaryBtn="Refresh page"
            outlineOnClick={() => navigate("/support")}
            primaryOnClick={() => window.location.reload()}
          />
        )}
        {paginatedData.length !== 0 && (
          <Box px={2} pt={3}>
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              previousClassName="previous"
              nextClassName="next"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventTable;
