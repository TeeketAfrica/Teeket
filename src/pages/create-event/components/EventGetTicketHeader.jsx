import {
    Avatar,
    Box,
    Button,
    HStack,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import BrandLogo from "../../../assets/img/brandLogo.png";

import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeTicketStep } from "../../../features/eventSlice";
import { TickCircle } from "iconsax-react";

export const EventGetTicketHeader = ({paid, profile}) => {
    const { ticketStep, isBookedTicket, isSetDetails } = useSelector(
        (state) => state.event
    );
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (ticketStep == 1) {
            setSearchParams({ step: "ticket-type" });
        } else if (ticketStep === 2) {
            setSearchParams({ step: "your-details" });
        } else if (ticketStep == 3) {
            setSearchParams({ step: "payment" });
        }
    }, [setSearchParams, ticketStep]);

    useEffect(() => {
        console.log(isBookedTicket, isSetDetails);

        if (searchParams.get("step") == "ticket-type") {
            dispatch(changeTicketStep(1));
        } else if (
            searchParams.get("step") == "your-details" &&
            isBookedTicket
        ) {
            dispatch(changeTicketStep(2));
        } else if (searchParams.get("step") == "payment" && isBookedTicket) {
            dispatch(changeTicketStep(3));
        }
    }, [dispatch, isBookedTicket, isSetDetails, searchParams]);

    return (
        <Box py={6}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                w="full"
            >
                <Link to="/">
                    <Image w="full" src={BrandLogo} alt="logo" />
                </Link>

                <HStack spacing="2">
                    <Button
                        rounded={12}
                        bg={ticketStep == 1 && "gray.200"}
                        paddingX={4}
                        paddingY={2}
                        display="flex"
                        gap="2"
                        alignItems="center"
                        onClick={() => {
                            dispatch(changeTicketStep(1));
                        }}
                        disabled={paid}
                    >
                        <Text
                            fontSize={12}
                            fontWeight={600}
                            color={ticketStep == 1 ? "gray.800" : "gray.500"}
                        >
                            1/
                        </Text>
                        <Text
                            fontSize={16}
                            fontWeight={600}
                            color={ticketStep == 1 ? "gray.800" : "gray.500"}
                        >
                            Ticket type
                        </Text>

                        {isBookedTicket && (
                            <TickCircle
                                variant="Bold"
                                color="#06CC06"
                                opacity={ticketStep == 1 ? 1 : 0.7}
                            />
                        )}
                    </Button>
                    <Button
                        rounded={12}
                        paddingX={4}
                        paddingY={2}
                        display="flex"
                        bg={ticketStep == 2 && "gray.200"}
                        gap="2"
                        alignItems="center"
                        onClick={() => {
                            dispatch(changeTicketStep(2));
                        }}
                        isDisabled={!isBookedTicket || paid}
                    >
                        <Text
                            fontSize={12}
                            fontWeight={600}
                            color={ticketStep == 2 ? "gray.800" : "gray.500"}
                        >
                            2/
                        </Text>
                        <Text
                            fontSize={16}
                            fontWeight={600}
                            color={ticketStep == 2 ? "gray.800" : "gray.500"}
                        >
                            Your details
                        </Text>
                        {isSetDetails && isBookedTicket && (
                            <TickCircle
                                variant="Bold"
                                color="#06CC06"
                                opacity={ticketStep == 2 ? 1 : 0.7}
                            />
                        )}
                    </Button>
                    <Button
                        rounded={12}
                        paddingX={4}
                        paddingY={2}
                        display="flex"
                        gap="2"
                        alignItems="center"
                        onClick={() => {
                            dispatch(changeTicketStep(3));
                        }}
                        isDisabled={true} // implement !isBookedTicket && !isSetDetails here so users can only click on this if they have a details set and have booked a ticket
                    >
                        <Text fontSize={12} fontWeight={600} color="gray.500">
                            3/
                        </Text>
                        <Text fontSize={16} fontWeight={600} color="gray.500">
                            Payment
                        </Text>
                        {isSetDetails && isBookedTicket && ticketStep ===  3 && paid && (
                            <TickCircle
                                variant="Bold"
                                color="#06CC06"
                                opacity={ticketStep == 2 ? 1 : 0.7}
                            />
                        )}
                    </Button>
                </HStack>

                <Box cursor="pointer">
                <Avatar
                    border="1px solid"
                    borderColor="gray.800"
                    color="gray.800"
                    name={profile?.name || profile?.email}
                    src={profile?.profile_image}
                    bgColor="transparent"
                />
                </Box>
            </Stack>
        </Box>
    );
};
