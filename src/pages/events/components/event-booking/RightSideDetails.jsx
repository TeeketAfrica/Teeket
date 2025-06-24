import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GPSIcon from "../../../../assets/icon/Gps.svg";
import LightingOutlineIcon from "../../../../assets/icon/LightingOutline.svg";
import EventMap from "../../../../assets/icon/PlaceMarkMap.svg";
import TicketIcon from "../../../../assets/icon/Ticket.svg";
import BoxFrame from "../../../../components/layouts/BoxFrame";
import DetailCard from "../DetailCard";
import { useDispatch } from "react-redux";
import {
  changeTicketStep,
  resetEventTicketBooking,
} from "../../../../features/eventSlice";
import { teeketApi } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { getBookingMessage } from "../../../../utils/formatAttendees";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useStorage from "../../../../utils/storage";

const RightSIdeDetails = ({ event, isRegistered, location }) => {
  const dispatch = useDispatch();
  const [eventAttendees, setEventAttendees] = useState([]);

  const [active, setActive] = useState(false);

  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const showTooltip = useBreakpointValue({ base: false, md: true });

  useEffect(()=>{
    if(isRegistered.is_creator === null || token === null){
      setActive(false);
    }else{
      setActive(true);
    }
  },[token, isRegistered])

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await teeketApi.get(`events/${event?.id}/attendees`);
        setEventAttendees(response.data?.data || []); // Store the attendees in state
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setEventAttendees(null); // Set empty array on error
      }
    };

    if (active) {
      fetchAttendees();
    }
  }, [event?.id, active]);

  console.log(event)
  let attendeesQuantity;

  eventAttendees && active
    ? (attendeesQuantity = getBookingMessage(eventAttendees.length))
    : (attendeesQuantity = "Register to find out more about people going");

  const getTicket = () => {
    dispatch(changeTicketStep(1));
    dispatch(resetEventTicketBooking());
  };
  return (
    <VStack width={{ base: "100%", lg: "40%" }} gap="6" alignItems="flex-start">
    {
      event.status !== "past_event" &&
      <BoxFrame paddingX="24px" paddingY="24px">
        <VStack gap="6" alignItems="flex-start">
          <Text as="h4" fontSize="xl" lineHeight="6" fontWeight="semibold">
            Get tickets
          </Text>
          {active && (
            <DetailCard
              icon={LightingOutlineIcon}
              title="This event is trending"
              subTitle="Hurry up and get your tickets"
            />
          )}

          <HStack gap="10px" alignItems="center">
            {eventAttendees && (
              <AvatarGroup size="sm" max={3}>
                {eventAttendees.slice(0, 3).map((attendees, i) => (
                  <Avatar
                    key={i}
                    border="1px solid"
                    borderColor="gray.800"
                    color="gray.800"
                    name={attendees?.name || attendees?.email}
                    src={attendees?.profile_image}
                    bgColor="transparent"
                  />
                ))}
              </AvatarGroup>
            )}
            <Text fontSize="sm" lineHeight="5" color="gray.600">
              {attendeesQuantity}
            </Text>
          </HStack>

          {active && (
            <DetailCard
              icon={TicketIcon}
              title="Starting price"
              subTitle={`Regular - ₦${Number(event?.lowest_ticket_price)}`}
            />
          )}

            <Link to={`/event-booking/${event?.id}/get-ticket`}>
              <Button
                variant="primary"
                size="lg"
                width="100%"
                onClick={getTicket}
              >
                {!isRegistered ? "Get Your Ticket" : "See my ticket"}
              </Button>
            </Link>            
          

        </VStack>
      </BoxFrame>
      }
      
      <BoxFrame paddingX="24px" paddingY="24px">
        <VStack gap="4" alignItems="flex-start">
          <HStack justifyContent="space-between" width="100%">
            <Flex gap="2">
              <Box
                width="auto"
                height="auto"
                borderRadius="100%"
                overflow="hidden"
              >
                <Avatar
                  border="1px solid"
                  borderColor="gray.800"
                  color="gray.800"
                  name={event?.user?.name || event?.user?.email}
                  src={event?.user?.profile_image}
                  bgColor="transparent"
                />
              </Box>
              <Box>
                <Box>
                  <Text fontSize="sm" lineHeight="5" color="gray.600">
                    Hosted by
                  </Text>
                  <Text fontSize="md" lineHeight="6" fontWeight="semibold">
                    {event?.organizer}
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Tooltip label="Coming soon!!" aria-label="A tooltip">
              <Button variant="secondary" size="sm" isDisabled={true}>
                Subscribe
              </Button>
            </Tooltip>
          </HStack>
          <Divider borderColor="gray.300" borderWidth="1px" />
          <Text fontSize="sm" lineHeight="5" color="gray.500">
            The best african art event host, building and creating experiences
            for art enthusiats
          </Text>
        </VStack>
      </BoxFrame>
      {event?.hosting_site === "physical" && location !== null && (
        <BoxFrame paddingX="8px" paddingY="8px">
          <Box position="relative" overflow="hidden" borderRadius="8px">
            {active ? (
              <Box
                width="100%"
                maxHeight="350px"
                height="100%"
                overflow="hidden"
                borderRadius="8px"
                border="1px solid"
                borderColor="gray.300"
                position={"relative"}
              >
                {/* <LoadScript
                googleMapsApiKey={import.meta.env.VITE_REACT_PLACES_API_KEY}
              >
                <GoogleMap
                  // mapContainerStyle={}
                  center={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude
                  }}
                  zoom={15}
                >
                  <Marker position={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude
                  }} />
                </GoogleMap>
                V
              </LoadScript> */}

                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_REACT_PLACES_API_KEY}&center=${location.coordinates.latitude},${location.coordinates.longitude}&zoom=15`}
                  allowFullScreen
                ></iframe>
              </Box>
            ) : (
              <EventMap
                alt="map"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            )}
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%);"
              gap="10px"
              zIndex={4}
            >
              {!active && (
                <>
                  <GPSIcon width="32px" height="32px" objectFit="cover" />

                  <Button variant="secondary">
                    Register to view address on the map
                  </Button>
                </>
              )}
            </VStack>
            {!active && (
              <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                width="100%"
                height="100%"
                backgroundColor="rgba(247, 250, 247, .9)"
                filter="blur(3px)"
              />
            )}
          </Box>
          {/* Hover Info Message */}
          {active && (
            <Box mt={"2"}>
              {showTooltip ? (
                <Tooltip
                  label="Having trouble finding the event location?
                        Click anywhere on the map to open Google Maps.
                        Then, use the Copy Address button next to the address,
                        paste it into Google Maps, and you'll be able to locate the event easily."
                  fontSize="sm"
                  borderRadius="md"
                  padding="8px"
                  bg="gray.700"
                  color="white"
                  hasArrow
                  placement="top-start"
                >
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="blue.600"
                    _hover={{ textDecoration: "underline", cursor: "help" }}
                  >
                    Having trouble locating the event?
                  </Text>
                </Tooltip>
              ) : (
                <Box
                  bg="gray.100"
                  borderRadius="md"
                  p="2"
                  fontSize="xs"
                  color="gray.700"
                  boxShadow="md"
                  textColor={"blue.600"}
                >
                  Can't find the location? Tap Copy Address, then search on
                  Google Maps.
                </Box>
              )}
            </Box>
          )}
        </BoxFrame>
      )}
    </VStack>
  );
};

export default RightSIdeDetails;
