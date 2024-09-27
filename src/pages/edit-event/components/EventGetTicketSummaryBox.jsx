import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ListSummary from "../../../assets/icon/ListSummary.svg";
import {
  changeTicketStep,
  selectPriceDetails,
} from "../../../features/eventSlice";
import { useState } from "react";
import { teeketApi } from "../../../utils/api";

export const EventGetTicketSummaryBox = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { eventData, eventTicketBooking, ticketStep } = useSelector(
    (state) => state.event
  );

  const { subTotalPrice, transactionFee, totalPrice } =
    useSelector(selectPriceDetails);

  const [isLoading, setIsLoading] = useState();

  const handleBookingTickets = async () => {
    const tickets = eventTicketBooking.map(({ id, quantity }) => ({
      ticket_id: id,
      quantity: quantity,
    }));

    try {
      setIsLoading(true);
      const response = await teeketApi.post(
        `/events/${eventData.id}/tickets/book`,
        {
          ticket_orders: tickets,
        }
      );

      if (response && response.status == 200) {
        toast({
          title: "Booking Successful.",
          description: "You have successfully booked your ticket.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        dispatch(changeTicketStep(ticketStep + 1));
      }
      console.log(response);
    } catch (error) {
      console.log("Failed to create ticket:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <VStack
      bg="gray.200"
      rounded={8}
      borderColor="gray.300"
      border
      borderStyle="solid"
      padding={4}
      gridColumn="span 3 / span 2"
      spacing={4}
    >
      <Text fontSize={20} fontWeight={600} color="gray.800">
        Your ticket summary
      </Text>

      <Box
        bgImage={eventData?.banner_image}
        height="148px"
        bgRepeat="no-repeat"
        bgSize="contain"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontFamily="chela one" fontSize={18} color="gray.100">
          {eventData.title}
        </Text>
      </Box>
      <Box
        bgColor="gray.100"
        w="100%"
        h="100%"
        rounded={8}
        border
        borderStyle="solid"
        borderColor="gray.300"
        padding={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {eventTicketBooking ? (
          <VStack w="100%" h="100%" alignItems="start" spacing={5}>
            <VStack spacing={4} w="100%" alignItems="start">
              {eventTicketBooking.map((event, index) => (
                <HStack key={index} justifyContent="space-between" w="100%">
                  <Text fontSize={16} color="gray.600" casing="capitalize">
                    {event.quantity}x {event.name}
                  </Text>
                  <Text fontSize={16} color="gray.600">
                    ${event.price}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <Divider w="100%" borderTopWidth={1} color="gray.300" />
            <VStack spacing={4} w="100%" alignItems="start">
              <HStack justifyContent="space-between" w="100%">
                <Text fontSize={16} color="gray.600" casing="capitalize">
                  Subtotal
                </Text>
                <Text fontSize={16} color="gray.600">
                  {subTotalPrice}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" w="100%">
                <Text fontSize={16} color="gray.600" casing="capitalize">
                  Transaction fee
                </Text>
                <Text fontSize={16} color="gray.600">
                  ${transactionFee}
                </Text>
              </HStack>
            </VStack>
            <Divider w="100%" borderTopWidth={1} color="gray.300" />
            <VStack spacing={4} w="100%" alignItems="start">
              <HStack justifyContent="space-between" w="100%">
                <Text fontSize={16} color="gray.800" fontWeight={500}>
                  Total
                </Text>
                <Text fontSize={16} color="gray.800" fontWeight={500}>
                  ${totalPrice}
                </Text>
              </HStack>
            </VStack>
            <Divider w="100%" borderTopWidth={1} color="gray.300" />
          </VStack>
        ) : (
          <VStack spacing={4}>
            <Image src={ListSummary} />
            <VStack spacing={0}>
              <Text color="gray.800" fontWeight={600}>
                No summary yet
              </Text>
              <Text color="gray.750" fontSize={14}>
                Choose a ticket type to purchase
              </Text>
            </VStack>
          </VStack>
        )}
      </Box>
      {eventTicketBooking && (
        <>
          <Button
            onClick={handleBookingTickets}
            bg="gray.800"
            color="white"
            w="100%"
            padding={4}
          >
            {ticketStep === 2 ? "Checkout" : "Continue"}
          </Button>
          {ticketStep === 2 && (
            <Button
              onClick={() => {
                dispatch(changeTicketStep(ticketStep - 1));
              }}
              isDisabled={isLoading}
              w="100%"
              padding={4}
            >
              Back
            </Button>
          )}
        </>
      )}
    </VStack>
  );
};
