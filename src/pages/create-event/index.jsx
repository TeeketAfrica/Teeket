import { useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  resetEventState,
  selectEventDetails,
  setEventDetails,
  setTicket,
} from "../../features/eventSlice";
import { teeketApi } from "../../utils/api";
import Layout from "./components/Layout";
import FormStep1 from "./layout/FormStep1";
import FormStep2 from "./layout/FormStep2";
import FormStep3 from "./layout/FormStep3";
import PublishEvent from "./layout/PublishEvent";
import { DEFAULTBANNERIMAGE } from "../../utils/constants";
import { convertUrlToHttpFormat } from "../../utils/utils";
import { selectActiveUser, setIsCreator } from "../../features/activeUserSlice";

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
        }
        return schema.required("Please input an address for the event");
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

const VendorPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const activeUser = useSelector(selectActiveUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();

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
    eventTags,
    tickets,
    publishLive,
    totalTicketQuantities,
  } = useSelector(selectEventDetails);

  useEffect(() => {
    dispatch(resetEventState());

    const handleFetchEvent = async () => {
      try {
        const response = await teeketApi.get(`/events/${id}`);

        dispatch(setEventDetails(response.data));

        const res = await teeketApi.get(`/events/${id}/tickets`);

        const transformedData = res.data.data.map(
          ({ id, name, price, quantity, is_paid }) => ({
            id: id,
            ticketName: name,
            ticketPrice: price,
            ticketQuantity: quantity,
            ticketType: is_paid ? "paid" : "free",
          })
        );
        dispatch(setTicket(transformedData));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          `Error fetching event with id ${id}`;
        toast({
          title: "Events failed to fetch.",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    };

    if (id) {
      handleFetchEvent();
    }
  }, [id, dispatch, toast]);

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
      eventTags: eventTags || [],
      tickets: tickets || [],
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
      eventTags,
      publishLive,
      tickets,
      totalTicketQuantities,
    ]
  );

  const handleNextStep = useCallback(
    async (formProps) => {
      await formProps.handleSubmit();
      const errors = await formProps.validateForm();

      if (Object.keys(errors).length === 0) {
        setActiveStep((prevStep) => prevStep + 1);
        if (id) {
          try {
            if (id && activeStep === 2) {
              const res = await teeketApi.get(`/events/${id}`);

              if (res.data.number_of_tickets) {
                const ticketRemaining =
                  formProps.values.totalTicketQuantities -
                  res.data.number_of_tickets;

                // update number of ticket
                await teeketApi.patch(`/events/${id}`, {
                  number_of_tickets_remaining: ticketRemaining,
                });
              }
            }
          } catch (error) {
            console.log("Unable to update number of tickets:", error.message);
          }
        }
      }
    },
    [activeStep, id]
  );

  const handlePrevStep = useCallback(() => {
    setActiveStep((prevStep) => prevStep - 1);
  }, []);

  const handlePublishEvent = useCallback(
    async (formProps) => {
      // await formProps.handleSubmit();
      const errors = await formProps.validateForm();

      if (Object.keys(errors).length === 0) {
        const data = { ...formProps.values, eventBannerImage };
        const eventPayload = {
          title: data.eventTitle,
          organizer: data.eventOrganizer,
          industry: data.eventIndustry,
          type: data.eventType,
          tags: data.eventTags.map((tag) => tag.id),
          start_date: `${data.eventStartDate}T${data.eventStartTime}`,
          end_date: `${data.eventEndDate}T${data.eventEndTime}`,
          description: data.eventAbout,
          banner_image: eventBannerImage
            ? eventBannerImage.secure_url || eventBannerImage
            : DEFAULTBANNERIMAGE,
          hosting_site: data.eventHosting,
          event_location:
            data.eventHosting === "physical" ? data.eventLocation : null,
          event_link:
            data.eventHosting === "online"
              ? convertUrlToHttpFormat(data.eventLocation)
              : null,
          number_of_tickets: data.totalTicketQuantities,
        };
        console.log(eventPayload);

        try {
          let eventId;

          if (id) {
            const res = await teeketApi.patch(`/events/${id}`, eventPayload);
            eventId = res.data.id;
          } else {
            const res = await teeketApi.post("/events", eventPayload);
            eventId = res.data.id;
          }

          if (!eventId) {
            throw new Error("Event ID is missing from the response.");
          }
          console.log(data);

          const ticketPromises = data.tickets.map((ticket) => {
            console.log("get here");

            const ticketPayload = {
              name: ticket.ticketName,
              price: ticket.ticketPrice,
              quantity: ticket.ticketQuantity,
              is_paid: ticket.ticketType === "paid",
            };

            if (typeof ticket.id === "string") {
              return teeketApi.patch(
                `/events/${eventId}/tickets/${ticket.id}`,
                ticketPayload
              );
            }
            return teeketApi.post(`/events/${eventId}/tickets`, ticketPayload);
          });

          // Wait for all ticket requests to complete
          await Promise.all(ticketPromises);

                    if (formProps.values.publishLive === "eventLive") {
                        try {
                            // Publish event
                            await teeketApi.patch(`events/${eventId}/publish`);
                        } catch (error) {
                            console.log(
                                "Failed to publish event",
                                error.message
                            );
                        }
                    }
                    //ensure that the user becomes a creator after creating an event
                    if(!activeUser.is_creator){
                        dispatch(setIsCreator(true))
                    }
                    // Reset state and navigate upon successful creation
                    navigate("/app/events");
                    dispatch(resetEventState());
                } catch (error) {
                    console.log("Failed to create or update event", error);
                }
            }
        },
        [dispatch, navigate, id, eventBannerImage]
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
          publishEvent={() => handlePublishEvent(formProps)}
        >
          {renderFormStep(formProps)}
        </Layout>
      )}
    </Formik>
  );
};

export default VendorPage;
