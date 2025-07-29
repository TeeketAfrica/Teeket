import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

export const EventGetTicketSummaryBox = ({ selectedOption, onSubmitSelf,
  onSubmitOthers, getValuesSelf, getValuesOthers }) => {
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

  const { subTotalPrice, transactionFee, totalPrice } =
    useSelector(selectPriceDetails);

  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();

  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = token || activeUser?.is_creator !== null;

  const moveToCheckout = async () => {
    dispatch(changeTicketStep(2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderCheckout = async () => {
    let firstName, lastName, email;
    if (selectedOption === "self") {
      ({ firstName, lastName } = getValuesSelf());
    }
    else {
      ({ firstName, lastName, email } = getValuesOthers());
    }
    try {
      setIsLoading(true);
      let paymentUrl = `/make-payment`;
      if (isAuthenticated && selectedOption === "self") paymentUrl += "/auth";
      const payload = isAuthenticated && selectedOption === "self"
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
          email: email,
          user: {
            first_name: firstName,
            last_name: lastName,
            email: email,
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
    let firstName, lastName, email;
    if (selectedOption === "self") {
      ({ firstName, lastName } = getValuesSelf());
    }
    else {
      ({ firstName, lastName, email } = getValuesOthers());
    }
    try {
      setIsLoading(true);
      let url = `/events/tickets/complete/free-booking`;

      const payload = isAuthenticated && selectedOption === "self"
        ? {
          reference_id: referenceId,

          user_data: {
            first_name: firstName,
            last_name: lastName,
            email: activeUser.email,
          },
        }
        : {
          reference_id: referenceId,

          user_data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
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


  const completeOrder = async () => {
    if (!ticketSummaryDetails) return;

    let res;

    if (selectedOption === "self") {
      res = await onSubmitSelf();
    } else {
      res = await onSubmitOthers();
    }

    if (res?.success) {
      const subTotal = Math.floor(Number(ticketSummaryDetails.sub_total));

      if (subTotal === 0) {
        // Free ticket order
        handleFreeTicketOrder();
      } else {
        // Paid ticket order
        handleOrderCheckout();
      }
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
              isDisabled={isLoading || (selectedOption === "" && isAuthenticated)}
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
