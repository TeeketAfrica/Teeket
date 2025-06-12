import { useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectEventDetails, setTicket } from "../../features/eventSlice";
import { teeketApi } from "../../utils/api";
import Layout from "./components/Layout";
import FormStep1 from "./layout/FormStep1";
import FormStep2 from "./layout/FormStep2";
import FormStep3 from "./layout/FormStep3";
import PublishEvent from "./layout/PublishEvent";
import { selectActiveUser } from "../../features/activeUserSlice";
import useFormSubmission from "./hooks/useFormSubmission";
import { formStepsValidationSchemas } from "./forms/validationSchemas";

const VendorPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const activeUser = useSelector(selectActiveUser);
  const [locationMetaData, setLocationMetaData] = useState([]);
  const { tickets } = useSelector(selectEventDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  // Custom hook for form submission logic
  const { submitEvent } = useFormSubmission({
    id,
    activeUser,
    navigate,
    toast,
    tickets,
  });

  // Fetch event data if editing
  useEffect(() => {
    const handleFetchEvent = async () => {
      try {
        const response = await teeketApi.get(`/events/${id}`);
        const eventData = response.data;

        // Fetch tickets
        const res = await teeketApi.get(`/events/${id}/tickets`);
        const transformedTickets = res.data.data.map(
          ({ id, name, price, quantity, is_paid }) => ({
            id: id,
            ticketName: name,
            ticketPrice: price,
            ticketQuantity: quantity,
            ticketType: is_paid ? "paid" : "free",
          })
        );

        // Set tickets in Redux (needed for ticket management)
        dispatch(setTicket(transformedTickets));

        // Set initial form values from API data
        setInitialFormValues({
          eventTitle: eventData.title || "",
          eventOrganizer: eventData.organizer || "",
          eventType: eventData.type || "",
          eventIndustry: eventData.industry || "",
          eventStartDate: eventData.start_date
            ? eventData.start_date.split("T")[0]
            : "",
          eventStartTime: eventData.start_date
            ? eventData.start_date.split("T")[1].slice(0, 8)
            : "",
          eventEndDate: eventData.end_date
            ? eventData.end_date.split("T")[0]
            : "",
          eventEndTime: eventData.end_date
            ? eventData.end_date.split("T")[1].slice(0, 8)
            : "",
          eventAbout: eventData.description || "",
          eventHosting: eventData.hosting_site || "",
          eventLocation: eventData.event_location || eventData.event_link || "",
          eventBannerImage: eventData.banner_image || "",
          eventEstimatedSoldTicket: eventData.number_of_tickets || "",
          eventTags: eventData.tags || [],
          publishLive: eventData.status || "",
        });
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
    } else {
      // Set default values for new event
      setInitialFormValues({
        eventTitle: "",
        eventOrganizer: "",
        eventType: "",
        eventIndustry: "",
        eventStartDate: "",
        eventStartTime: "",
        eventEndDate: "",
        eventEndTime: "",
        eventAbout: "",
        eventHosting: "",
        eventLocation: "",
        eventPhysicalLocationDetails: null,
        eventBannerImage: "",
        eventEstimatedSoldTicket: "",
        eventTags: [],
        publishLive: "",
      });
    }
  }, [id, dispatch, toast]);

  // Step navigation handlers
  const handleNextStep = async (validateForm, values, setTouched) => {
    // Validate current step
    const errors = await validateForm();

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevStep) => prevStep + 1);

      // Update ticket quantities if needed (step 3)
      if (id && activeStep === 2) {
        try {
          const res = await teeketApi.get(`/events/${id}`);
          if (res.data.number_of_tickets) {
            const ticketRemaining =
              values.eventEstimatedSoldTicket - res.data.number_of_tickets;
            await teeketApi.patch(`/events/${id}`, {
              number_of_tickets_remaining: ticketRemaining,
            });
          }
        } catch (error) {
          console.log("Unable to update number of tickets:", error.message);
        }
      }
    } else {
      // Mark all fields as touched to show validation errors
      const touchedFields = {};
      Object.keys(errors).forEach((field) => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
    }
  };
  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // (Timmi) submit if the active step is publishing or 3
      if (activeStep === 3) {
        setSubmitting(true);
        await submitEvent(values);
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // Handle specific field errors if returned from API
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setFieldError(field, message);
          }
        );
      }

      toast({
        title: "Failed to save event",
        description:
          error.message ||
          "There was an error saving your event. Please try again.",
        status: "error",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Render current form step
  const renderFormStep = useCallback(() => {
    const formComponents = [FormStep1, FormStep2, FormStep3, PublishEvent];
    const CurrentForm = formComponents[activeStep];
    return <CurrentForm />;
  }, [activeStep]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialFormValues}
      validationSchema={formStepsValidationSchemas[activeStep]}
      onSubmit={handleFormSubmit}
    >
      {({ validateForm, values, setTouched, isSubmitting, submitForm }) => (
        <Form>
          <Layout
            isSubmitting={isSubmitting}
            nextStep={() => handleNextStep(validateForm, values, setTouched)}
            prevStep={handlePrevStep}
            publishEvent={submitForm}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          >
            {renderFormStep()}
            {/* <FormStep2 /> */}
          </Layout>
        </Form>
      )}
    </Formik>
  );
};

export default VendorPage;
