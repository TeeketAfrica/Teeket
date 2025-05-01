import { Formik } from "formik";
import * as Yup from "yup";
import Layout from "./components/Layout";
import FormStep1 from "./layout/FormStep1";
import FormStep2 from "./layout/FormStep2";
import FormStep3 from "./layout/FormStep3";
import PublishEvent from "./layout/PublishEvent";
import { teeketApi } from "../../utils/api";
import { useEventFormLogic } from "./useEventFormLogic";
import { convertUrlToHttpFormat } from "../../utils/utils";
import { resetEventState } from "../../features/eventSlice";
import { DEFAULTBANNERIMAGE } from "../../utils/constants";

// Validation per step
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
        eventAbout: Yup.string().required("Please provide a description for the event"),
        eventHosting: Yup.string().required("Please specify event hosting type"),
        eventLocation: Yup.string().when("eventHosting", (value, schema) =>
            value === "online"
                ? schema.required("Please input a valid event link.")
                : schema.required("Please input an event address")
        ),
    }),
    Yup.object({
        eventEstimatedSoldTicket: Yup.string().required("Estimated ticket count required"),
    }),
    Yup.object({
        publishLive: Yup.string().required("Please select publish or draft"),
    }),
];

const VendorPage = () => {
    const {
        id,
        navigate,
        dispatch,
        activeStep,
        setActiveStep,
        eventDetails,
        initialValues,
    } = useEventFormLogic();

    const handleNextStep = async (formProps) => {
        const errors = await formProps.validateForm();
        if (Object.keys(errors).length === 0) {
            setActiveStep((prev) => prev + 1);

            // Optional: Update ticket remaining if on step 2
            if (id && activeStep === 2) {
                try {
                    const res = await teeketApi.get(`/events/${id}`);
                    const ticketRemaining = formProps.values.totalTicketQuantities - res.data.number_of_tickets;
                    await teeketApi.patch(`/events/${id}`, {
                        number_of_tickets_remaining: ticketRemaining,
                    });
                } catch (error) {
                    console.warn("Ticket update failed:", error.message);
                }
            }
        }
    };

    const handlePrevStep = () => setActiveStep((prev) => prev - 1);

    const handlePublishEvent = async (formProps) => {
        const errors = await formProps.validateForm();
        if (Object.keys(errors).length > 0) return;

        const data = { ...formProps.values };
        const payload = {
            title: data.eventTitle,
            organizer: data.eventOrganizer,
            industry: data.eventIndustry,
            type: data.eventType,
            tags: data.eventTags.map((tag) => tag.id),
            start_date: `${data.eventStartDate}T${data.eventStartTime}`,
            end_date: `${data.eventEndDate}T${data.eventEndTime}`,
            description: data.eventAbout,
            banner_image: eventDetails.eventBannerImage?.secure_url || DEFAULTBANNERIMAGE,
            hosting_site: data.eventHosting,
            event_location: data.eventHosting === "physical" ? data.eventLocation : null,
            event_link: data.eventHosting === "online" ? convertUrlToHttpFormat(data.eventLocation) : null,
            number_of_tickets: data.totalTicketQuantities,
        };

        try {
            const eventRes = id
                ? await teeketApi.patch(`/events/${id}`, payload)
                : await teeketApi.post("/events", payload);

            const eventId = eventRes.data.id;

            const ticketPromises = data.tickets.map((ticket) => {
                const ticketPayload = {
                    name: ticket.ticketName,
                    price: ticket.ticketPrice,
                    quantity: ticket.ticketQuantity,
                    is_paid: ticket.ticketType === "paid",
                };
                return typeof ticket.id === "string"
                    ? teeketApi.patch(`/events/${eventId}/tickets/${ticket.id}`, ticketPayload)
                    : teeketApi.post(`/events/${eventId}/tickets`, ticketPayload);
            });

            await Promise.all(ticketPromises);

            if (data.publishLive === "eventLive") {
                await teeketApi.patch(`/events/${eventId}/publish`);
            }

            dispatch(resetEventState());
            navigate("/app/overview");
        } catch (error) {
            console.error("Failed to publish event", error);
        }
    };

    const renderStep = (formProps) => {
        const components = [FormStep1, FormStep2, FormStep3, PublishEvent];
        const Component = components[activeStep];
        return <Component formik={formProps} />;
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchemas[activeStep]}
            onSubmit={() => {}}
        >
            {(formProps) => (
                <Layout
                    activeStepColor={activeStep}
                    nextStep={() => handleNextStep(formProps)}
                    prevStep={handlePrevStep}
                    publishEvent={() => handlePublishEvent(formProps)}
                >
                    {renderStep(formProps)}
                </Layout>
            )}
        </Formik>
    );
};

export default VendorPage;
