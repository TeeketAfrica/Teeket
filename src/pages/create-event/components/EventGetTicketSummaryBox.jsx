import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ListSummary from "../../../assets/icon/ListSummary.svg";
import {
  changeTicketStep,
  selectPriceDetails,
} from "../../../features/eventSlice";

export const EventGetTicketSummaryBox = () => {
  const dispatch = useDispatch();

  const { eventData, eventTicketBooking, ticketStep } = useSelector(
    (state) => state.event
  );
  const { subTotalPrice, transactionFee, totalPrice } =
    useSelector(selectPriceDetails);

  console.log(eventTicketBooking);
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
        <Button
          onClick={() => {
            dispatch(changeTicketStep(ticketStep + 1));
          }}
          bg="gray.800"
          color="white"
          w="100%"
          padding={4}
        >
          Continue
        </Button>
      )}
    </VStack>
  );
};
