import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, GridItem, HStack, Input, InputGroup, InputLeftElement, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";
import EmptyState from "../../../components/ui/EmptyState";
import EmptyCard from "../../../assets/icon/EmptyCard.svg";
import SingleTicket from "./SingleTicket";
import { teeketApi } from "../../../utils/api";
import useStorage from "../../../utils/storage";
import { formatDate } from "../../../features/formatDate";
import ReactPaginate from "react-paginate";
import Search from "@/assets/icon/Search.svg";
import { debounce } from "lodash";

const TicketsSection = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [paginatedData, setPaginatedData] = useState(
    tickets.slice(startIndex, endIndex)
  );
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  console.log(tickets)

  const fetchTickets = useCallback(async (searchTerm) => {
    try {
      let url = `orders/me?ordering=-date_created&page_index=${currentPage}`;
      const queryParams = [];

      if (searchTerm) {
        queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
      }
      if (queryParams.length > 0) {
        url += `&${queryParams.join("&")}`;
      }

      const response = await teeketApi.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(response?.data.data);
      setTotalPages(Math.ceil(response?.data.total / itemsPerPage));
      setPaginatedData(response.data.data.slice(0, itemsPerPage));
      setLoading(false);
    } catch (err) {
      console.log("Error fetching tickets:", err);
      setTickets([]);
      setLoading(false);
    }
  }, [currentPage, token]);

  const debouncedFetchTickets = useMemo(
    () => debounce(fetchTickets, 800),
    [fetchTickets]
  );

  useEffect(() => {
    setLoading(true);
    if (search) {
      debouncedFetchTickets(search);
    } else {
      fetchTickets("");
    }
    return () => {
      debouncedFetchTickets.cancel();
    };
  }, [search, currentPage, debouncedFetchTickets, fetchTickets]);

  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="gray.300"
      overflowX={"hidden"}
      width={"full"}
      py={9}
      px={3}
    >
      <InputGroup maxW="375px" w="100%" style={{ marginBottom: "1rem" }}>
        <InputLeftElement pointerEvents="none">
          <Search />
        </InputLeftElement>
        <Input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search for all tickets"
        />
      </InputGroup>

      {
        search && (
          <Text
            fontSize={18}
            fontWeight={600}
            color="gray.800"
            style={{ marginBottom: "1rem" }}
          >
            Result for &quot;{search}&quot;
          </Text>
        )
      }
      {
        loading ? (
          <Box
            px={5}
          >
            <Grid
              style={{ width: "100%" }}
              gridTemplateColumns={[
                "1fr",
                null,
                "repeat(4, 1fr)",
                null,
                "repeat(4, 1fr)",
              ]}
              gap={6}
            >
              {[0, 1, 2, 3].map((digit, i) => (
                <Stack gap="3" maxW="xs" key={digit}>
                  <HStack width="full">
                    <SkeletonText noOfLines={2} />
                  </HStack>
                  <Skeleton height="200px" />
                </Stack>
              ))}
            </Grid>
          </Box>
        ) :
          paginatedData.length > 0 ? (
            <Grid
              gridTemplateColumns={[
                "1fr",
                null,
                "repeat(2, 1fr)",
                null,
                "repeat(3, 1fr)",
              ]}
              gap={6}
            // paddingX={5}
            >
              {
                paginatedData.map((ticket, i) => (
                  <GridItem justifySelf="center" width={"100%"} key={i}>
                    <SingleTicket
                      eventTitle={ticket?.event?.title}
                      eventTime={`${formatDate(ticket?.event.start_date)}`}
                      eventLocation={ticket?.event.hosting_site === "physical" ? `${ticket?.event.event_location}` : `Event Link:${ticket?.event.event_link}`}
                      ticketQuantity={ticket?.quantity}
                      ticketType={ticket?.ticket.name}
                      ticketPrice={ticket?.ticket.price}
                      eventId={ticket?.event.id}
                      eventImageUrl={ticket?.event?.banner_image}
                      tickekId={ticket?.ticket.id}
                      orderId={ticket.id}
                    />
                  </GridItem>
                ))
              }

            </Grid>
          ) : (
            <Container maxW="400px">
              <EmptyState
                icon={EmptyCard}
                title="No ticket to show you"
                desc={
                  <Text fontSize={14} color="gray.600" textAlign="center">
                    Browse amazing events and book one or more. All tickets from
                    events booked will be displayed here
                  </Text>
                }
                outlineBtn="Refresh page"
                primaryBtn="Browse event"
                primaryOnClick={() => navigate("/events")}
                outlineOnClick={() => window.location.reload()}
              />
            </Container>
          )}
      {paginatedData.length !== 0 && (
        <Box px={6} pt={3}>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </Box>
      )}
    </Box>
  );
};

export default TicketsSection;
