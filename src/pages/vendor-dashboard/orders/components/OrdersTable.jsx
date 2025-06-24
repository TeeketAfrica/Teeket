import { useState } from "react";
import {
    Avatar,
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
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import Search from "../../../../assets/icon/Search.svg";
import Check from "../../../../assets/icon/Check.svg";
import DownIcon from "../../../../assets/icon/DownIcon.svg";
import Filter from "../../../../assets/icon/Filter.svg";
import SearchIconEmpty from "../../../../assets/icon/SearchIconEmpty.svg";
import OrdersIconEmptyState from "../../../../assets/icon/OrdersIconEmptyState.svg";
import EventCautionState from "../../../../assets/icon/EventCautionState.svg";
import MoreDetails from "../../../../assets/icon/MoreDetails.svg";
import { eventFilter, filterPolicy, ordersTableHead } from "../../../../utils/constants";
import EmptyState from "../../../../components/ui/EmptyState";
import { useNavigate } from "react-router-dom";
import MoreDetailsModal from "./MoreDetailsModal";
import { useEffect } from "react";
import { teeketApi } from "../../../../utils/api";
import { Spinner } from '@chakra-ui/react';
import { formatAmount } from "../../../../utils/utils";

const OrdersTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    // STATES
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
    const [ordersTableData, setOrdersTableData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading]= useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [paginatedData, setPaginatedData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [search, setSearch] = useState("");

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
    // FETCH ORDERS

    useEffect(() => {
        const handleFetchOrders = async () => {
            setLoading(true)
            try {
                let url = `/orders?page_index=${currentPage}`;
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
                setTotalItems(res.total);
                setOrdersTableData(res.data);
                setPaginatedData(res.data.slice(0, itemsPerPage));
                setTotalPages(Math.ceil(res.total / itemsPerPage));
                setLoading(false)
            } catch (error) {
                setLoading(false)
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

        handleFetchOrders();
    }, [toast, itemsPerPage, search, statusFilter, currentPage]);

    // useEffect(() => {
    //     const startIndex = currentPage * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;

    //     console.log(startIndex, endIndex)
    //     console.log(ordersTableData)
    //     setPaginatedData(ordersTableData.slice(startIndex, endIndex));
    // }, [currentPage, itemsPerPage, ordersTableData]);


    // HANDLE PAGE CHANGE
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected+1);
    };

    //   HANDLE CLEAR SEARCH

    const handleClearSearch = () => {
        setSearch("");
        setCurrentPage(0);
        setPaginatedData(ordersTableData.slice(0, itemsPerPage));
        setTotalItems(ordersTableData.length);
        setTotalPages(Math.ceil(ordersTableData.length / itemsPerPage));
    };

    // HANDLE MORE

    const handleMoreDetails = (item) => {
        setSelectedItem(item);
        onOpen();
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

        // if (selectedStatus === "All events") {
        //     setPaginatedData(ordersTableData);
        // } else {
        //     const filteredData = ordersTableData.filter(
        //         (item) => selectedStatus === filterPolicy[item.status]  
        //     );
        //     setCurrentPage(1);
        //     setTotalItems(filteredData.length);
        //     setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        //     setPaginatedData(filteredData.slice(0, itemsPerPage));
        // }
    }

    return (
        <Box px={[4, 8]}>
            <Stack
                direction={[ "row"]}
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
                            </Text>{" "}
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
                            ? "No order"
                            : search !== ""
                            ? `${paginatedData.length} orders`
                            : `${totalItems} orders`}
                    </Tag>
                </HStack>
                {isOnline ? 
                    (
                    loading ? (
                        <div style={{ width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}}>
                        <Spinner/>
                        Fetching Your Orders Hang On
                        </div>
                    )
                
                :(
                    <>
                        {paginatedData.length !== 0 ? (
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr bgColor="gray.200">
                                            {ordersTableHead.map((th, i) => (
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
                                    <Tbody fontSize="sm">
                                        {paginatedData.map((td, i) => (
                                            <Tr key={i}>
                                                <Td
                                                    color="gray.600"
                                                    fontWeight={500}
                                                >
                                                    {td.order_no}
                                                </Td>
                                                <Td>
                                                    <HStack spacing={3}>
                                                            <Avatar
                                                                border="1px solid"
                                                                borderColor="gray.800"
                                                                color="gray.800"
                                                                name={td.attendee?.first_name || td.attendee?.email}
                                                                src={td.attendee?.profile_image}
                                                                bgColor="transparent"
                                                            />
                                                        <Box>
                                                            <Text
                                                                fontWeight={500}
                                                                color="gray.800"
                                                            >
                                                               {`${
                                                                    td.attendee.first_name
                                                                }   
                                                                ${
                                                                    td.attendee.last_name
                                                                }`}
                                                            </Text>
                                                        </Box>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={3}>
                                                        <Avatar
                                                                border="1px solid"
                                                                borderColor="gray.800"
                                                                color="gray.800"
                                                                name={td.event?.title || td.event?.organizer}
                                                                src={td.event?.banner_image}
                                                                bgColor="transparent"
                                                            />
                                                        <Box>
                                                            <Text
                                                                fontWeight={500}
                                                                color="gray.800"
                                                            >
                                                                {td.eventTitle||td.event.title}
                                                            </Text>
                                                            <Text color="gray.600">
                                                                {
                                                                    td.eventCategory || td.event.type
                                                                }
                                                            </Text>
                                                        </Box>
                                                    </HStack>
                                                </Td>
                                                <Td
                                                    color="gray.600"
                                                    fontWeight={500}
                                                >
                                                    {td.ticket.name}
                                                </Td>
                                                <Td
                                                    color="gray.600"
                                                    fontWeight={500}
                                                >
                                                    ₦{formatAmount(Number(td.ticket.price), 0)}
                                                </Td>
                                                <Td
                                                    color="gray.600"
                                                    fontWeight={500}
                                                >
                                                    {td.date_created.split('T')[0]}
                                                </Td>
                                                <Td>
                                                    <HStack
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            handleMoreDetails(
                                                                td
                                                            )
                                                        }
                                                        spacing={3}
                                                    >
                                                        <MoreDetails
                                                            width={15}
                                                            height={15}
                                                        />
                                                        <Text
                                                            fontWeight={600}
                                                            color="gray.700"
                                                        >
                                                            More details
                                                        </Text>
                                                    </HStack>
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
                                        Your search “{search}” did not match any
                                        order. Please try again.
                                    </Text>
                                }
                                outlineBtn="Clear search"
                                primaryBtn="Refresh page"
                                outlineOnClick={handleClearSearch}
                                primaryOnClick={() => window.location.reload()}
                            />
                        ) : (
                            <EmptyState
                                maxW="350px"
                                icon={OrdersIconEmptyState}
                                title="No purchases yet on your events"
                                desc={
                                    <Text
                                        fontSize={14}
                                        color="gray.600"
                                        textAlign="center"
                                    >
                                        All orders made will live here for you
                                        to view and manage effectively.
                                    </Text>
                                }
                                outlineBtn="Need help?"
                                primaryBtn="Create event"
                                outlineOnClick={() => navigate("/need-help")}
                                primaryOnClick={() => navigate("/create-event")}
                            />
                        )}
                    </>
                )) : (
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
                    <Box px={6} pt={3}>
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
            <MoreDetailsModal
                isOpen={isOpen}
                onClose={onClose}
                selectedItem={selectedItem}
            />
        </Box>
    );
};

export default OrdersTable;
