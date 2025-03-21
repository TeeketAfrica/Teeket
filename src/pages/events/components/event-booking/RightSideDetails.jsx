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
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GPSIcon from "../../../../assets/icon/Gps.svg";
import LightingOutlineIcon from "../../../../assets/icon/LightingOutline.svg";
import EventMap from "../../../../assets/icon/PlaceMarkMap.svg";
import TicketIcon from "../../../../assets/icon/Ticket.svg";
import UserAvatar from "../../../../assets/img/Avatars.png";
import BoxFrame from "../../../../components/layouts/BoxFrame";
import DetailCard from "../DetailCard";
import { useDispatch } from "react-redux";
import {
    changeTicketStep,
    resetEventTicketBooking,
} from "../../../../features/eventSlice";
import { teeketApi } from "../../../../utils/api";
import { useEffect } from "react";

const RightSIdeDetails = ({ event, isRegistered }) => {
    const dispatch = useDispatch();
    
    const getEventAttendees = async()=>{
        const event_attendees = await teeketApi.get(`events/${event?.id}/attendees`)
        console.log("EA", event_attendees)
        return event_attendees;
    }

    useEffect(()=>{
        getEventAttendees()
    }, [])

    const getTicket = () => {
        dispatch(changeTicketStep(1));
        dispatch(resetEventTicketBooking());
    };
    return (
        <VStack
            width={{ base: "100%", lg: "40%" }}
            gap="6"
            alignItems="flex-start"
        >
            <BoxFrame paddingX="24px" paddingY="24px">
                <VStack gap="6" alignItems="flex-start">
                    <Text
                        as="h4"
                        fontSize="xl"
                        lineHeight="6"
                        fontWeight="semibold"
                    >
                        {!isRegistered ? "Get tickets" : "View tickets"}
                    </Text>
                    {!isRegistered && (
                        <DetailCard
                            icon={LightingOutlineIcon}
                            title="This event is trending"
                            subTitle="Hurry up and get your tickets"
                        />
                    )}

                    <HStack gap="10px" alignItems="center">
                        <AvatarGroup size="sm" max={3}>
                            <Avatar
                                name="Ryan Florence"
                                src="https://bit.ly/ryan-florence"
                            />
                            <Avatar
                                name="Segun Adebayo"
                                src="https://bit.ly/sage-adebayo"
                                zIndex={2}
                            />
                            <Avatar
                                name="Kent Dodds"
                                src="https://bit.ly/kent-c-dodds"
                                zIndex={3}
                            />
                        </AvatarGroup>
                        <Text fontSize="sm" lineHeight="5" color="gray.600">
                            <Text as="span">40</Text>+ people are going already
                        </Text>
                    </HStack>

                    {!isRegistered && (
                        <DetailCard
                            icon={TicketIcon}
                            title="Starting price"
                            subTitle={`Regular - $${Number(
                                event?.lowest_ticket_price
                            )}`}
                        />
                    )}
                    <Link to={`/event-booking/${event?.id}/get-ticket`}>
                        <Button
                            variant="primary"
                            size="lg"
                            width="100%"
                            onClick={getTicket}
                        >
                            {!isRegistered
                                ? "Get Your Ticket"
                                : "See my ticket"}
                        </Button>
                    </Link>
                </VStack>
            </BoxFrame>
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
                                    <Text
                                        fontSize="sm"
                                        lineHeight="5"
                                        color="gray.600"
                                    >
                                        Hosted by
                                    </Text>
                                    <Text
                                        fontSize="md"
                                        lineHeight="6"
                                        fontWeight="semibold"
                                    >
                                        {event?.organizer}
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Tooltip label="Coming soon!!" aria-label="A tooltip">
                            <Button
                                variant="secondary"
                                size="sm"
                                isDisabled={true}
                            >
                                Subscribe
                            </Button>
                        </Tooltip>
                    </HStack>
                    <Divider borderColor="gray.300" borderWidth="1px" />
                    <Text fontSize="sm" lineHeight="5" color="gray.500">
                        The best african art event host, building and creating
                        experiences for art enthusiats
                    </Text>
                </VStack>
            </BoxFrame>
            {event?.hosting_site === "physical" && (
                <BoxFrame paddingX="8px" paddingY="8px">
                    <Box
                        position="relative"
                        overflow="hidden"
                        borderRadius="8px"
                    >
                        <Box
                            width="100%"
                            maxHeight="222px"
                            height="100%"
                            overflow="hidden"
                            borderRadius="8px"
                            border="1px solid"
                            borderColor="gray.300"
                        >
                            <EventMap
                                alt="map"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                            />
                        </Box>
                        <VStack
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%);"
                            gap="10px"
                            zIndex={4}
                        >
                            <GPSIcon
                                width="32px"
                                height="32px"
                                objectFit="cover"
                            />

                            <Button variant="secondary">
                                {!isRegistered
                                    ? "Register to view address"
                                    : "View address"}
                            </Button>
                        </VStack>
                        {!isRegistered && (
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
                </BoxFrame>
            )}
        </VStack>
    );
};

export default RightSIdeDetails;
