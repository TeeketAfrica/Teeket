import * as Yup from "yup";

//(Timmi) Ensured each validation schema matches name of field
export const basicInfoSchema = Yup.object({
  eventTitle: Yup.string().required("Please input an event title"),
  eventOrganizer: Yup.string().required("Please input an event organizer"),
  eventType: Yup.string().required("Please select an event type"),
  eventIndustry: Yup.string().required("Please select an event industry"),
  eventStartDate: Yup.date().required("Please select start date"),
  eventEndDate: Yup.date().required("Please select end date"),
  eventTags: Yup.array().min(1, "Please select at least one tag"),
});

export const eventDetailsSchema = Yup.object({
  eventAbout: Yup.string().required(
    "Please provide a description for the event and include the event address in the description"
  ),
  eventHosting: Yup.string().required(
    "Please specify if the event will be hosted online or physical"
  ),
  eventLocation: Yup.string().when("hosting_site", {
    is: "online",
    then: (schema) =>
      schema.required("Please input a valid event link, such as a Zoom link."),
    otherwise: (schema) =>
      schema.required("Please input an address for the event"),
  }),
});

export const ticketsSchema = Yup.object({
  eventEstimatedSoldTicket: Yup.string().required(
    "Please select/input an estimated number of tickets to be sold"
  ),
});

export const publishSchema = Yup.object({
  publishLive: Yup.string().required("Please select publish or draft"),
});

export const formStepsValidationSchemas = [
  basicInfoSchema,
  eventDetailsSchema,
  ticketsSchema,
  publishSchema,
];
