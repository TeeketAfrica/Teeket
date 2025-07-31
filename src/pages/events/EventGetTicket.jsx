import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../../components/ui/Container";
import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import WarningIcon from "../../assets/icon/Warning.svg";
import { EventGetTicketHeader } from "../create-event/components/EventGetTicketHeader";
import { EventGetTicketSummaryBox } from "../create-event/components/EventGetTicketSummaryBox";
import { useDispatch, useSelector } from "react-redux";
import { TicketTypeStep } from "../create-event/components/EventGetTicketSteps/TicketTypeStep";
import {
  userFormSchema,
  visitorsFormSchema,
  YourDetailsStep,
} from "../create-event/components/EventGetTicketSteps/YourDetailsStep";
import Payment from "../create-event/components/EventGetTicketSteps/Payment";
import { selectActiveUser } from "../../features/activeUserSlice";
import Footer from "../../components/layouts/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useStorage from "../../utils/storage";
import {
  selectEventDetails,
  setIsSetDetails,
  setTicketUserDetails,
} from "../../features/eventSlice";
import { teeketApi } from "../../utils/api";

const EventGetTicket = () => {
  const { ticketStep, eventData, paid, eventDetails } = useSelector(
    (state) => state.event
  );
  const activeUser = useSelector(selectActiveUser);

  const [timeLeft, setTimeLeft] = useState("");
  const timerInterval = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const isAuthenticated = token || activeUser?.is_creator !== null;
  const [errors, setErrors] = useState(false);

  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit: handleSubmitSelf,
    setValue: setValueSelf,
    getValues: getValuesSelf,
    formState: { errors: errorsSelf },
    trigger: triggerSelf,
  } = useForm({
    resolver: zodResolver(
      isAuthenticated ? userFormSchema : visitorsFormSchema
    ),
  });

  const {
    register: registerOthers,
    handleSubmit: handleSubmitOthers,
    setValue: setValueOthers,
    formState: { errors: errorsOthers },
    getValues: getValuesOthers,
    trigger: triggerOthers,
  } = useForm({ resolver: zodResolver(userFormSchema) });

  useEffect(() => {
    if (isAuthenticated && selectedOption === "self") {
      setFirstName(activeUser?.first_name || "");
      setLastName(activeUser?.last_name || "");
      setEmail(activeUser?.email || "");

      setValueSelf("firstName", activeUser?.first_name || "");
      setValueSelf("lastName", activeUser?.last_name || "");
      setValueSelf("email", activeUser?.email || "");
    } else {
      setFirstName(eventDetails?.ticketUserDetails?.firstName || "");
      setLastName(eventDetails?.ticketUserDetails?.lastName || "");
      setEmail(eventDetails?.ticketUserDetails?.email || "");

      setValueOthers("firstName", "");
      setValueOthers("lastName", "");
      setValueOthers("email", "");
    }
  }, [activeUser, eventDetails, selectedOption]);

  const onSubmitSelf = useCallback(async () => {
    const { firstName, lastName, email } = getValuesSelf();
    const valid = await triggerSelf();
    if (valid) {
      try {
        if (firstName !== fName || lastName !== lName) {
          await teeketApi.patch(
            "/user/profile",
            {
              first_name: firstName,
              last_name: lastName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        dispatch(setTicketUserDetails({ firstName, lastName, email }));
        dispatch(setIsSetDetails(true));
        setErrors(false);
        toast({
          title: "Details saved, redirecting ...",
          status: "success",
          position: "top-right",
        });
        return { success: true };
      } catch (err) {
        toast({
          title: "Error updating",
          status: "error",
          position: "top-right",
        });
        return { success: false };
      }
    } else {
      dispatch(setIsSetDetails(false));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return { success: false };
    }
  }, [getValuesSelf, dispatch]);

  const onSubmitOthers = useCallback(async () => {
    const { firstName, lastName, email } = getValuesOthers();
    const valid = await triggerOthers();
    if (valid) {
      dispatch(setTicketUserDetails({ firstName, lastName, email }));
      dispatch(setIsSetDetails(true));
      toast({
        title: "Guest details saved, Redirecting ...",
        status: "success",
        position: "top-right",
      });
      setErrors(false);
      return { success: true };
    } else {
      setErrors(true);
      dispatch(setIsSetDetails(false));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return { success: false };
    }
  }, [getValuesOthers, dispatch]);

  const calculateTimeLeft = (endDate, setTimeLeft, timerIntervalRef) => {
    const now = new Date();
    const end = new Date(endDate);

    if (end <= now) {
      setTimeLeft("00h 00m 00s");
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      return;
    }

    let years = end.getFullYear() - now.getFullYear();
    let months = end.getMonth() - now.getMonth();
    let days = end.getDate() - now.getDate();
    let hours = end.getHours() - now.getHours();
    let minutes = end.getMinutes() - now.getMinutes();
    let seconds = end.getSeconds() - now.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    const pad = (n) => String(n).padStart(2, "0");

    //    How to dispaly what is left on time
    let display = "";

    if (years > 0) {
      display = `${pad(years)}y ${pad(months)}m ${pad(days)}d`;
    } else if (months > 0) {
      display = `${pad(months)}m ${pad(days)}d ${pad(hours)}h`;
    } else if (days > 0) {
      display = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`;
    } else {
      display = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    }

    setTimeLeft(display);
  };

  useEffect(() => {
    if (!eventData?.end_date) return;

    timerInterval.current = setInterval(() => {
      calculateTimeLeft(eventData.end_date, setTimeLeft, timerInterval);
    }, 1000);

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [eventData?.end_date]);
  return (
    <Container padding="16px">
      <EventGetTicketHeader
        paid={paid}
        profile={activeUser}
        selectedOption={selectedOption}
      />
      {ticketStep === 3 ? (
        <Payment />
      ) : (
        <VStack marginY={9} spacing={6}>
          <Box w="100%" display="flex" gap={3} alignItems="center">
            <WarningIcon />
            <Text color="gray.600" size={14}>
              Time left: {timeLeft}
            </Text>
          </Box>
          <Flex
            gap={6}
            w="100%"
            flexDir={{ md: "row", base: "column" }}
            alignItems={{ md: "start", base: "center" }}
            justifyContent="space-between"
          >
            <VStack w="100%" maxW={700} gap={8}>
              {ticketStep === 1 && <TicketTypeStep />}
              {ticketStep === 2 && (
                <YourDetailsStep
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  isAuthenticated={isAuthenticated}
                  activeUser={activeUser}
                  fName={fName}
                  lName={lName}
                  setValueSelf={setValueSelf}
                  setValueOthers={setValueOthers}
                  register={register}
                  registerOthers={registerOthers}
                  errorsSelf={errorsSelf}
                  errorsOthers={errorsOthers}
                  errors={errors}
                />
              )}
            </VStack>
            <Box w="100%" maxW={400}>
              <EventGetTicketSummaryBox
                selectedOption={selectedOption}
                onSubmitSelf={onSubmitSelf}
                onSubmitOthers={onSubmitOthers}
                getValuesSelf={getValuesSelf}
                getValuesOthers={getValuesOthers}
              />
            </Box>
          </Flex>
        </VStack>
      )}
      <Footer />
    </Container>
  );
};

export default EventGetTicket;
