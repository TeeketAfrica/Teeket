import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ListSummary from "../../../assets/icon/ListSummary.svg";
import {
  changeTicketStep,
  selectPriceDetails,
  setIsPaid,
} from "../../../features/eventSlice";
import { teeketApi } from "../../../utils/api";
import { selectActiveUser } from "../../../features/activeUserSlice";
import useStorage from "../../../utils/storage";

export const EventGetTicketSummaryBox = ({}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    eventData,
    eventTicketBooking,
    ticketStep,
    referenceId,
    ticketSummaryDetails,
    ticketUserDetails,
    isSetDetails,
    isBookedTicket,
  } = useSelector((state) => state.event);

  console.log("TICKS", ticketUserDetails);

  const { subTotalPrice, transactionFee, totalPrice } =
    useSelector(selectPriceDetails);

  const [isLoading, setIsLoading] = useState();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();

  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = token || activeUser?.is_creator !== null;

  const moveToCheckout = async () => {
    dispatch(changeTicketStep(2));
  };

  const handleOrderCheckout = async () => {
    try {
      setIsLoading(true);
      let paymentUrl = `/make-payment`;
      if (isAuthenticated) paymentUrl += "/auth";
      const payload = isAuthenticated
        ? {
            payment_gateway: "paystack",
            callback_url: `http://${location.host}${location.pathname}?step=payment`,
            reference_id: referenceId,
            email: activeUser.email,
          }
        : {
            payment_gateway: "paystack",
            callback_url: `http://${location.host}${location.pathname}?step=payment`,
            reference_id: referenceId,
            email: ticketUserDetails?.email,
            user: {
              first_name: ticketUserDetails?.firstName,
              last_name: ticketUserDetails?.lastName,
              email: ticketUserDetails?.email,
            },
          };

      const response = await teeketApi.post(paymentUrl, payload);

      if (response && response.status === 200) {
        location.href = response.data?.data?.authorization_url;
        dispatch(setIsPaid(true));
      }
    } catch (error) {
      console.log("Failed to create ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFreeTicketOrder = async () => {
    try {
      setIsLoading(true);
      let url = `/events/tickets/complete/free-booking`;

      const payload = isAuthenticated
        ? {
            reference_id: referenceId,

            user_data: {
              first_name: ticketUserDetails.firstName,
              last_name: ticketUserDetails.lastName,
              email: ticketUserDetails.email || activeUser.email,
            },
          }
        : {
            reference_id: referenceId,

            user_data: {
              first_name: ticketUserDetails.firstName,
              last_name: ticketUserDetails.lastName,
              email: ticketUserDetails.email,
            },
          };

      const response = await teeketApi.post(url, payload);

      if (response && response.status === 200) {
        dispatch(changeTicketStep(3));
        dispatch(setIsPaid(true));
      }
    } catch (error) {
      console.log("Failed to create ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOrder = () => {
    if (ticketSummaryDetails) {
      if (Math.floor(Number(ticketSummaryDetails.sub_total)) === 0)
        // use subtotal to determine free and paid order
        handleFreeTicketOrder();
      else handleOrderCheckout();
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
        bgSize="cover"
        bgPosition="center"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontFamily="chela one"
          fontSize={18}
          color="gray.100"
          mixBlendMode="difference"
        >
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
                    ₦{event.price}
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
                  ₦{transactionFee}
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
                  ₦{totalPrice}
                </Text>
              </HStack>
            </VStack>
            <Divider w="100%" borderTopWidth={1} color="gray.300" />
          </VStack>
        ) : (
          <VStack spacing={4}>
            <ListSummary />
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
      {eventTicketBooking &&
        (ticketStep === 2 ? (
          <>
            <Button
              // Implement logic for checkout here
              // onClick={() => {}}
              isDisabled={isLoading || !isSetDetails}
              variant="primary"
              w="100%"
              padding={4}
              onClick={completeOrder}
            >
              Checkout
            </Button>

            <Button
              onClick={() => {
                dispatch(changeTicketStep(ticketStep - 1));
              }}
              isDisabled={isLoading}
              variant="secondary"
              w="100%"
              padding={4}
            >
              Back
            </Button>
          </>
        ) : (
          <Button
            onClick={moveToCheckout}
            isDisabled={isLoading | !referenceId | !isBookedTicket}
            variant="primary"
            w="100%"
            padding={4}
          >
            Continue
          </Button>
        ))}
    </VStack>
  );
};
