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
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
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
import { Spinner } from '@chakra-ui/react';
import { formatAmount } from "../../../../utils/utils";
import { Html5QrcodeScanner } from "html5-qrcode";


const EventTable = ({ setData, loading, setIsLoading }) => {
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
    const [eventTableData, setEventTableData] = useState([]);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [paginatedData, setPaginatedData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState('')
    const toast = useToast();

    useEffect(()=>{
        if(isOpen){
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox:{
                    width:250,
                    height:250
                },
                fps: 5
            })

            scanner.render(success, error);

            function success(result){
                scanner.clear();
                setScanResult(result)
            }

            function error(err){
                console.warn(err);

            }                 
        }
   
    }, [])

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

    const handleFetchEvents = async () => {
        try {
            let url = `/events/user?page_index=${currentPage}`;
            const queryParams = [];

            if (search) {
                queryParams.push(`search=${search}`);
            }

            if (statusFilter) {
                queryParams.push(`status=${statusFilter}`);
            }

            if (queryParams.length > 0) {
                url += `&${queryParams.join("&")}`;
            }
            const response = await teeketApi.get(url);
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
        setIsLoading(false);
    };

    // FECTH EVENTS

    useEffect(() => {

        handleFetchEvents();
    }, [toast, itemsPerPage, setData, search, statusFilter, currentPage]);

    // COPY EVENT

    const handleCopyEvent = async (eventId) => {
        await navigator.clipboard.writeText(
            `${location.host}/event-booking/${eventId}`
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
            await teeketApi.post(`/events/${eventId}`);;
            toast({
                title: "Event duplicated.",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });

            await handleFetchEvents();
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "An error occured";
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
           const res = await teeketApi.get(`/events/${eventId}/attendees/export-csv`, 
                {
                    responseType: 'blob', 
                }
             );
             console.log(res)
            
                const blob = new Blob([res.data], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
            
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Attendee-List.csv'; 
            
                document.body.appendChild(link);
                link.click();
            
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            
            toast({
                title: "Attendee list exported",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "You do not have any Attendees to export at this time";
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
                await handleFetchEvents()

                toast({
                    title: "Event deleted.",
                    status: "success",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "An error occured";
            toast({
                title: "Events failed to delete.",
                description: `${errorMessage}`,
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        }
    };

    // useEffect(() => {
    //     const startIndex = currentPage * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     setPaginatedData(eventTableData.slice(startIndex, endIndex));
    // }, [currentPage, itemsPerPage, eventTableData]);

    // HANDLE PAGE CHANGE
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected+1);
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
                direction={["row"]}
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
                        onChange={(e) =>
                            setSearch(e.target.value.toLowerCase())
                        }
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
                            <Text
                                fontSize={14}
                                fontWeight={600}
                                color="gray.800"
                            >
                                Filter
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
                                {filter.filter}{" "}
                                {selectedFilterIndex === i && <Check />}
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
                    loading ? (
                        <div style={{ width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}}>
                        <Spinner/>
                        Fetching Your Events Hang On
                        </div>
                    ) :
                    (
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
                                                                src={
                                                                    td.banner_image
                                                                }
                                                                alt={td.industry}
                                                                objectFit="cover"
                                                                w={10}
                                                                h={10}
                                                            />
                                                            <Box>
                                                                <Text
                                                                    fontWeight={500}
                                                                    color="gray.800"
                                                                >
                                                                    {td.title}
                                                                </Text>
                                                                <Text color="gray.600">
                                                                    {td.organizer}
                                                                </Text>
                                                            </Box>
                                                        </HStack>
                                                    </Td>
                                                    <Td
                                                        color="gray.600"
                                                        fontWeight={500}
                                                    >
                                                        {td.tickets_sold}/
                                                        {td.number_of_tickets}
                                                    </Td>
                                                    {
                                                        td.total_revenue === 0?
                                                        <Td
                                                            color="gray.600"
                                                            fontWeight={500}
                                                        >
                                                            Free
                                                        </Td>:
                                                        <Td
                                                            color="gray.600"
                                                            fontWeight={500}
                                                        >
                                                            ₦{formatAmount(td.total_revenue, 0)}
                                                        </Td>                                                      
                                                    }
                                                    <Td
                                                        color="gray.600"
                                                        fontWeight={500}
                                                    >
                                                        {formatDate(
                                                            td.date_created
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        <Tag
                                                            bg={
                                                                td.status ===
                                                                "coming_soon"
                                                                    ? "gray.200"
                                                                    : td.status ===
                                                                    "on_going"
                                                                    ? "green.100"
                                                                    : "red.100"
                                                            }
                                                            color={
                                                                td.status ===
                                                                "coming_soon"
                                                                    ? "gray.700"
                                                                    : td.status ===
                                                                    "on_going"
                                                                    ? "green.500"
                                                                    : "red.400"
                                                            }
                                                            borderRadius={16}
                                                            py="2px"
                                                            px={2}
                                                            fontWeight={500}
                                                            fontSize={12}
                                                        >
                                                            {td.status === "on_going"? "On Going": td.status === "coming_soon"? "Coming Soon": td.status === "past_event"? "Past Event": ""}
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
                                                                <MenuItem
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                    onClick={()=>setIsOpen(true)}
                                                                >
                                                                    <Text>Scan attendees</Text>
                                                                        
                                                                </MenuItem>
                                                                <MenuItem
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/edit-event/${td.id}`}
                                                                    >
                                                                        Edit event
                                                                    </Link>
                                                                </MenuItem>
                                                                <MenuItem
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/event-booking/${td.id}`}
                                                                    >
                                                                        View event
                                                                    </Link>
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        handleDuplicateEvent(
                                                                            td.id
                                                                        )
                                                                    }
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                >
                                                                    <Link>
                                                                        Duplicate
                                                                        event
                                                                    </Link>
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        handleAttendeeExport(
                                                                            td.id
                                                                        )
                                                                    }
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                >
                                                                    Export attendees
                                                                    list
                                                                </MenuItem>
                                                                <Divider
                                                                    borderColor="grey100"
                                                                    my={3}
                                                                />
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        handleCopyEvent(
                                                                            td.id
                                                                        )
                                                                    }
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
                                                                >
                                                                    Copy link
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        handleDeleteEvent(
                                                                            td.id
                                                                        )
                                                                    }
                                                                    _hover={{
                                                                        bgColor:
                                                                            "gray.200",
                                                                    }}
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
                                        <Text
                                            fontSize={14}
                                            color="gray.600"
                                            textAlign="center"
                                        >
                                            Your search “{search || statusFilter}”
                                            did not match any events. Please try
                                            again or create add a new event.
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
                                        <Text
                                            fontSize={14}
                                            color="gray.600"
                                            textAlign="center"
                                        >
                                            All events created will live here for
                                            you to view and manage effectively.
                                        </Text>
                                    }
                                    outlineBtn="Need help?"
                                    primaryBtn="Create event"
                                    outlineOnClick={() => navigate("/need-help")}
                                    primaryOnClick={() => navigate("/create-event")}
                                />
                            )}
                        </>
                    )
                ) : (
                    <EmptyState
                        icon={EventCautionState}
                        title="Something went wrong"
                        maxW="350px"
                        desc={
                            <Text
                                fontSize={14}
                                color="gray.600"
                                textAlign="center"
                            >
                                We had some trouble loading this page. Please
                                refresh the page to try again or get in touch if
                                the problem sticks around!
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
