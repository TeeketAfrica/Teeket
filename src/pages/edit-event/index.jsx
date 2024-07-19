import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetEventState, selectEventDetails } from "../../features/eventSlice";
import Layout from "./components/Layout";
import FormStep1 from "./layout/FormStep1";
import FormStep2 from "./layout/FormStep2";
import FormStep3 from "./layout/FormStep3";
import PublishEvent from "./layout/PublishEvent";
import teeketApi from "../../api/teeketApi";
import { useToast } from "@chakra-ui/react";

// Validation schemas for each step
const validationSchemas = [
  Yup.object({
    eventTitle: Yup.string().required("Please input an event title"),
    eventOrganizer: Yup.string().required("Please input an event organizer"),
    eventType: Yup.string().required("Please select an event type"),
    eventIndustry: Yup.string().required("Please select an event industry"),
    eventStartDate: Yup.date().required("Please select start date"),
    eventStartTime: Yup.string().required("Please select start time"),
    eventEndDate: Yup.date().required("Please select end date"),
    eventEndTime: Yup.string().required("Please select end time"),
  }),
  Yup.object({
    eventAbout: Yup.string().required(
      "Please provide a description for the event"
    ),
    eventHosting: Yup.string().required(
      "Please specify if the event will be hosted online or physical"
    ),
    eventLocation: Yup.string().when(
      ["eventHosting"],
      (eventHosting, schema) => {
        if (eventHosting === "online") {
          return schema.required(
            "Please input a valid event link, such as a Zoom link."
          );
        } else {
          return schema.required("Please input an address for the event");
        }
      }
    ),
  }),
  Yup.object({
    eventEstimatedSoldTicket: Yup.string().required(
      "Please select/input an estimated number of tickets to be sold"
    ),
  }),
  Yup.object({
    publishLive: Yup.string().required("Please select publish or draft"),
  }),
];

const EditEventPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    eventTitle,
    eventOrganizer,
    eventType,
    eventIndustry,
    eventStartDate,
    eventStartTime,
    eventEndDate,
    eventEndTime,
    eventAbout,
    eventHosting,
    eventLocation,
    eventBannerImage,
    eventEstimatedSoldTicket,
    publishLive,
    tickets,
    totalTicketQuantities,
  } = useSelector(selectEventDetails);

  useEffect(() => {
    const pageNumber = sessionStorage.getItem("EVENT_PAGE");
    if (pageNumber !== null) {
      setActiveStep(Number(pageNumber));
    }
  }, []);

  const initialValues = useMemo(
    () => ({
      eventTitle: eventTitle || "",
      eventOrganizer: eventOrganizer || "",
      eventType: eventType || "",
      eventIndustry: eventIndustry || "",
      eventStartDate: eventStartDate || "",
      eventStartTime: eventStartTime || "",
      eventEndDate: eventEndDate || "",
      eventEndTime: eventEndTime || "",
      eventAbout: eventAbout || "",
      eventHosting: eventHosting || "",
      eventLocation: eventLocation || "",
      eventEstimatedSoldTicket: eventEstimatedSoldTicket || "",
      publishLive: publishLive || "",
      totalTicketQuantities: totalTicketQuantities || 0,
    }),
    [
      eventTitle,
      eventOrganizer,
      eventType,
      eventIndustry,
      eventStartDate,
      eventStartTime,
      eventEndDate,
      eventEndTime,
      eventAbout,
      eventHosting,
      eventLocation,
      eventEstimatedSoldTicket,
      publishLive,
      totalTicketQuantities,
    ]
  );

  const handleNextStep = useCallback(
    async (formProps) => {
      await formProps.handleSubmit();
      const errors = await formProps.validateForm();

      if (Object.keys(errors).length === 0) {
        setActiveStep((prevStep) => prevStep + 1);
        sessionStorage.setItem("EVENT_PAGE", activeStep + 1);
      }
    },
    [activeStep]
  );

  const handlePrevStep = useCallback(() => {
    setActiveStep((prevStep) => prevStep - 1);
    sessionStorage.setItem("EVENT_PAGE", activeStep - 1);
  }, [activeStep]);

  // FETCH EVENT
  useEffect(() => {
    const handleFetchEvent = async () => {
      try {
        const response = await teeketApi.get(`/events/${id}`);
        dispatch(setEventData(response.data));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          `Error fetching event with id ${id}`;
        toast({
          title: "Events failed to fetch.",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    };

    handleFetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  // Update Event

  const handleUpdateEvent = useCallback(
    async (formProps) => {
      await formProps.handleSubmit();
      const errors = await formProps.validateForm();

      if (Object.keys(errors).length === 0) {
        const data = { ...formProps.values, eventBannerImage };

        try {
          const res = await teeketApi.patch(`/events/${id}`, {
            title: data.eventTitle,
            organizer: data.eventOrganizer,
            industry: data.eventIndustry,
            type: data.eventType,
            tags: [],
            start_date: `${data.eventStartDate}T${data.eventStartTime}`,
            end_date: `${data.eventEndDate}T${data.eventEndTime}`,
            description: data.eventAbout,
            banner_image: data.eventBannerImage.secure_url,
            hosting_site: data.eventHosting,
            event_location:
              data.eventHosting == "physical" ? data.eventLocation : null,
            event_link:
              data.eventHosting == "online" ? data.eventLocation : null,
            number_of_tickets: data.totalTicketQuantities,
          });

          if (res.data.id) {
            const eventId = res.data.id;
            const createTicketURL = `/api/v1/events/${eventId}/tickets`;

            const ticketPromises = tickets.map(async (ticket) => {
              try {
                await teeketApi.post(createTicketURL, {
                  name: ticket.ticketName,
                  price: ticket.ticketPrice,
                  quantity: ticket.ticketQuantity,
                  is_paid: ticket.ticketType === "paid",
                });
              } catch (error) {
                console.log("Failed to create ticket:", error.message);
              }
            });

            await Promise.all(ticketPromises);
            dispatch(resetEventState());
            sessionStorage.setItem("EVENT_PAGE", 0);
            navigate("/app/overview");
          }
        } catch (error) {
          console.log("Failed to create event", error);
        }
      }
    },
    [eventBannerImage]
  );

  const renderFormStep = useCallback(
    (formProps) => {
      const formComponents = [FormStep1, FormStep2, FormStep3, PublishEvent];
      const CurrentForm = formComponents[activeStep];
      return <CurrentForm formik={formProps} />;
    },
    [activeStep]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={() => {}}
    >
      {(formProps) => (
        <Layout
          activeStepColor={activeStep}
          nextStep={() => handleNextStep(formProps)}
          prevStep={() => handlePrevStep(formProps)}
          editEvent={() => handleUpdateEvent(formProps)}
        >
          {renderFormStep(formProps)}
        </Layout>
      )}
    </Formik>
  );
};

export default EditEventPage;
