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
    useToast,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import Search from "../../../../assets/icon/Search.svg";
import Check from "../../../../assets/icon/Check.svg";
import DownIcon from "../../../../assets/icon/DownIcon.svg";
import Filter from "../../../../assets/icon/Filter.svg";
import SearchIconEmpty from "../../../../assets/icon/SearchIconEmpty.svg";
import FinanceEmptyState from "../../../../assets/icon/FinanceEmptyState.svg";
import EventCautionState from "../../../../assets/icon/EventCautionState.svg";
import SupportIcon from "../../../../assets/icon/SupportIcon.svg";
import {
    eventTableHead,
    filterPolicy,
    financeHistoryTableData,
    financeTableData,
    financeTableHistoryHead,
    revEventFilter,
} from "../../../../utils/constants";
import EmptyState from "../../../../components/ui/EmptyState";
import { useNavigate } from "react-router-dom";
import { teeketApi } from "../../../../utils/api";
import { formatDate } from "../../../../utils/formatDate";
import { formatAmount } from "../../../../utils/utils";
import { Spinner } from '@chakra-ui/react';

const RevenueTable = () => {
    const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
    const [viewHistory, setViewHistory] = useState(false);
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [request] = useState(true);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const navigate = useNavigate();

    const itemsPerPage = 8;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [revenueTableData, setRevenueTableData] = useState([]);
    const [paginatedData, setPaginatedData] = useState(
        revenueTableData.slice(startIndex, endIndex)
    );
    const [historyTableData, setHistoryTableData] = useState([]);
    const [historyTableData, setHistoryTableData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // useEffect(() => {
    //     const startIndex = currentPage * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     setPaginatedData(revenueTableData.slice(startIndex, endIndex));
    // }, [currentPage, itemsPerPage, revenueTableData]);

    //   HANDLE PAGE CHANGE

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected+1);
    };

    //   HANDLE SEARCH

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let filteredData;

        if(!viewHistory){
            filteredData = revenueTableData.filter(
                (item) =>
                    (item.event.title && item.event.title.toLowerCase().includes(searchTerm)) ||
                    (item.event.organizer && item.event.organizer.toLowerCase().includes(searchTerm))
            );
        }
        else{
            filteredData = historyTableData.filter(
                (item) =>
                    (item.revenue.event.title && item.revenue.event.title.toLowerCase().includes(searchTerm)) ||
                    (item.revenue.event.organizer && item.revenue.event.organizer.toLowerCase().includes(searchTerm))
            );
        }

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
        setPaginatedData(revenueTableData.slice(0, itemsPerPage));
        setTotalItems(revenueTableData.length);
        setTotalPages(Math.ceil(revenueTableData.length / itemsPerPage));
    };

    //   const handleFilterByStatus = () => {}

    const handleFilterByStatus = (selectedStatus) => {
        // setSelectedStatusFilter(selectedStatus);

        if(!viewHistory){
            if (selectedStatus === "All events") {
            setPaginatedData(revenueTableData);
            } else {
                const filteredData = revenueTableData.filter(
                    (item) => item.status === selectedStatus
                );
                setCurrentPage(0);
                setTotalItems(filteredData.length);
                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setPaginatedData(filteredData.slice(0, itemsPerPage));
            }
        }else{
            if(selectedStatus === "All events"){
                setPaginatedData(historyTableData);
            }
            else{
                const filteredData = historyTableData.filter(
                    (item) => item.status === selectedStatus
                );
                setCurrentPage(0);
                setTotalItems(filteredData.length);
                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setPaginatedData(filteredData.slice(0, itemsPerPage));
            }
        }
    };

    useEffect(() => {
        const handleFetchEvents = async () => {
            setLoading(true);
            try {
                let url = `/revenue?page_index=${currentPage}`;
                const queryParams = [];

                if (search) {
                    queryParams.push(`search=${search}`);
                }
                if (queryParams.length > 0) {
                    url += `?${queryParams.join("&")}`;
                }
                const response = await teeketApi.get(url);
                const res = response.data;

                setTotalItems(res.total);
                setRevenueTableData(res.data);
                setPaginatedData(res.data.slice(0, itemsPerPage));
                setTotalPages(Math.ceil(res.total / itemsPerPage));
                setLoading(false);
            } catch (error) {
                console.log(error);

                const errorMessage =
                    error?.response?.data?.message || "An error occured";
                toast({
                    title: "Failed to fetch revenue",
                    description: `${errorMessage}`,
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
                setLoading(false);
            }
        };

        const handleFetchPaymentHistory = async ()=>{
            setLoading(true);
            try{
                let url = "/payment-requests";
                const queryParams = [];

                if (search) {
                    queryParams.push(`search=${search}`);
                }
                if (queryParams.length > 0) {
                    url += `?${queryParams.join("&")}`;
                }
                const response = await teeketApi.get(url);
                const res = response.data;
                setHistoryTableData(res.data);
                setLoading(false);
            }
            catch(error){
                console.log(error);

                const errorMessage =
                    error?.response?.data?.message || "An error occured";
                toast({
                    title: "Failed to fetch payment history",
                    description: `${errorMessage}`,
                    status: "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                });
                setLoading(false);
            }
        }

        handleFetchEvents();
        handleFetchPaymentHistory();
    }, [toast, itemsPerPage]);

    if(loading) return (
        <div style={{ width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}}>
            <Spinner/>
            Fetching Revenue data Hang on
        </div>
    )
    return (
        <Box px={[4, 8]}>
            <Stack
                direction={["column-reverse", null, null, "row"]}
                justifyContent="space-between"
                w="100%"
                spacing="24px"
                alignItems="flex-start"
                pt={8}
                pb={6}
            >
                <Box fontSize={14} fontWeight={500}>
                    <HStack spacing={0}>
                        <Box
                            bgColor={`${!viewHistory ? "gray.800" : "white"}`}
                            py="10px"
                            px={4}
                            cursor="pointer"
                            border="1px solid"
                            borderColor="gray.300"
                            borderTopLeftRadius={8}
                            borderBottomLeftRadius={8}
                            onClick={() => setViewHistory(false)}
                        >
                            <Text
                                color={`${!viewHistory ? "white" : "gray.600"}`}
                            >
                                Revenue made
                            </Text>
                        </Box>
                        <Box
                            bgColor={`${viewHistory ? "gray.800" : "white"}`}
                            py="10px"
                            px={4}
                            cursor="pointer"
                            border="1px solid"
                            borderColor="gray.300"
                            borderTopRightRadius={8}
                            borderBottomRightRadius={8}
                            onClick={() => setViewHistory(true)}
                        >
                            <Text
                                color={`${viewHistory ? "white" : "gray.600"}`}
                            >
                                Request history
                            </Text>
                        </Box>
                    </HStack>
                </Box>
                <HStack spacing={5}>
                    <InputGroup maxW="375px" w="100%">
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
                                <Text
                                    fontSize={14}
                                    fontWeight={600}
                                    color="gray.800"
                                >
                                    File
                                </Text>{" "}
                                <DownIcon />
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            {(viewHistory ? revEventFilter[1] : revEventFilter[0]).map((filter, i) => (
                                <MenuItem
                                    key={i}
                                    justifyContent="space-between"
                                    onClick={() => {
                                        setSelectedFilterIndex(i);
                                        handleFilterByStatus(filter.filter);
                                    }}
                                    style={{textTransform: "capitalize"}}
                                >
                                    {filter.filter === "ongoing_event"? "On Going": filter.filter === "failed_request"? "Failed Requests": filter.filter}{" "}
                                    {selectedFilterIndex === i && <Check />}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </HStack>
            </Stack>
            <Box border="1px" borderColor="gray.300" borderRadius={8} pb={4}>
                {!viewHistory ? (
                    <HStack px={6} py={5}>
                        {search === "" ? (
                            <Text
                                fontSize={18}
                                fontWeight={600}
                                color="gray.800"
                            >
                                All revenue
                            </Text>
                        ) : (
                            <Text
                                fontSize={18}
                                fontWeight={600}
                                color="gray.800"
                            >
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
                                : `${revenueTableData.length} events`}
                        </Tag>
                    </HStack>
                ) : (
                    <HStack px={6} py={5}>
                        <Text fontSize={18} fontWeight={600} color="gray.800">
                            Payment requests
                        </Text>
                        <Tag
                            py="2px"
                            px={2}
                            bgColor="gray.200"
                            fontSize={12}
                            fontWeight={500}
                            color="gray.700"
                        >
                            {`${historyTableData.length} requests`}
                        </Tag>
                    </HStack>
                )}
                {request ? (
                    <>
                        {paginatedData.length !== 0 ? (
                            <>
                                {!viewHistory ? (
                                    <TableContainer>
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr bgColor="gray.200">
                                                    {eventTableHead.map(
                                                        (th, i) => (
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
                                                        )
                                                    )}
                                                </Tr>
                                            </Thead>
                                            <Tbody fontSize={14}>
                                                {paginatedData.map((td, i) => (
                                                    <Tr key={i}>
                                                        <Td>
                                                            <HStack spacing={3}>
                                                                <Image
                                                                    src={td.event.banner_image}
                                                                    alt={
                                                                        td.iitle
                                                                    }
                                                                    w={10}
                                                                    h={10}
                                                                />
                                                                <Box>
                                                                    <Text
                                                                        fontWeight={
                                                                            500
                                                                        }
                                                                        color="gray.800"
                                                                    >
                                                                        {
                                                                            td.event.title
                                                                        }
                                                                    </Text>
                                                                    <Text color="gray.600">
                                                                        {
                                                                            td.event.organizer
                                                                        }
                                                                    </Text>
                                                                </Box>
                                                            </HStack>
                                                        </Td>
                                                        <Td
                                                            color="gray.600"
                                                            fontWeight={500}
                                                        >
                                                            {td.total_tickets_sold}/
                                                            {td.total_tickets}
                                                        </Td>
                                                        <Td
                                                            color="gray.600"
                                                            fontWeight={500}
                                                        >
                                                            {td.amount === null? "₦0": `₦${formatAmount(Number(td.amount))}`}
                                                        </Td>
                                                        <Td
                                                            color="gray.600"
                                                            fontWeight={500}
                                                        >
                                                            {formatDate(td.date_created)}
                                                        </Td>
                                                        <Td>
                                                            <Tag
                                                                bg={
                                                                    td.status ===
                                                                    "ongoing_event"
                                                                        ? "gray.200"
                                                                        : td.status ===
                                                                          "remitted"
                                                                        ? "green.100"
                                                                        : td.status ===
                                                                          "due"
                                                                        ? "blue.100"
                                                                        : "red.100"
                                                                }
                                                                color={
                                                                    td.status ===
                                                                    "ongoing_event"
                                                                        ? "gray.700"
                                                                        : td.status ===
                                                                          "remitted"
                                                                        ? "green.500"
                                                                        : td.status ===
                                                                          "due"
                                                                        ? "blue.400"
                                                                        : "red.400"
                                                                }
                                                                borderRadius={
                                                                    16
                                                                }
                                                                py="2px"
                                                                px={2}
                                                                fontWeight={500}
                                                                fontSize={12}
                                                            >
                                                                {td.status === "ongoing_event"? "On Going": td.status === "remitted"? "Remitted": td.status === "due"? "Due": "Unavailable"}
                                                                {td.status === "ongoing_event"? "On Going": td.status === "remitted"? "Remitted": td.status === "due"? "Due": "Unavailable"}
                                                            </Tag>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <TableContainer>
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr bgColor="gray.200">
                                                    {financeTableHistoryHead.map(
                                                        (th, i) => (
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
                                                        )
                                                    )}
                                                </Tr>
                                            </Thead>
                                            <Tbody fontSize={14}>
                                                {historyTableData.map(
                                                    (td, i) => (
                                                        <Tr key={i}>
                                                            <Td
                                                                color="gray.600"
                                                                fontWeight={500}
                                                            >
                                                                {td.request_id}
                                                            </Td>
                                                            <Td>
                                                                <HStack
                                                                    spacing={3}
                                                                >
                                                                    <Image
                                                                        src={
                                                                            td.revenue.event.banner_image
                                                                        }
                                                                        alt={
                                                                            td.revenue.event.title
                                                                        }
                                                                        objectFit={"cover"}
                                                                        borderRadius={"6px"}
                                                                        w={10}
                                                                        h={10}
                                                                    />
                                                                    <Box>
                                                                        <Text
                                                                            fontWeight={
                                                                                500
                                                                            }
                                                                            color="gray.800"
                                                                        >
                                                                            {
                                                                                td.revenue.event.title
                                                                            }
                                                                        </Text>
                                                                        <Text color="gray.600">
                                                                            {
                                                                                td.revenue.event.organizer
                                                                            }
                                                                        </Text>
                                                                    </Box>
                                                                </HStack>
                                                            </Td>
                                                            <Td
                                                                color="gray.600"
                                                                fontWeight={500}
                                                            >
                                                                {td.revenue.amount === null? "0": td.revenue.amount}
                                                            </Td>
                                                            <Td
                                                                color="gray.600"
                                                                fontWeight={500}
                                                            >
                                                                {formatDate(td.date_created)}
                                                            </Td>
                                                            <Td
                                                                color="gray.600"
                                                                fontWeight={500}
                                                            >
                                                                {
                                                                    td.date_remitted === null? "Coming soon": formatDate(td.date_remitted)
                                                                }
                                                            </Td>
                                                            <Td>
                                                                <Tag
                                                                    bg={
                                                                        td.status ===
                                                                        "processing" || "created"
                                                                            ? "gray.200"
                                                                            : td.status ===
                                                                              "remitted"
                                                                            ? "green.100"
                                                                            : "red.100"
                                                                    }
                                                                    color={
                                                                        td.status ===
                                                                        "processing" || "created"
                                                                            ? "gray.700"
                                                                            : td.status ===
                                                                              "remitted"
                                                                            ? "green.500"
                                                                            : "red.400"
                                                                    }
                                                                    borderRadius={
                                                                        16
                                                                    }
                                                                    py="2px"
                                                                    px={2}
                                                                    fontWeight={
                                                                        500
                                                                    }
                                                                    fontSize={
                                                                        12
                                                                    }
                                                                >
                                                                    {td.status}
                                                                </Tag>
                                                            </Td>
                                                            <Td>
                                                                <HStack>
                                                                    <SupportIcon />
                                                                    <Text>
                                                                        support
                                                                    </Text>
                                                                </HStack>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </>
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
                                        events. Please try again or create add a
                                        new event.
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
                                icon={FinanceEmptyState}
                                title="You have gotten no revenue yet"
                                desc={
                                    <Text
                                        fontSize={14}
                                        color="gray.600"
                                        textAlign="center"
                                    >
                                        All revenue that comes from your event
                                        will be shown here.
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

export default RevenueTable;
