import * as Yup from "yup";

export const basicInfoSchema = Yup.object({
  title: Yup.string().required("Please input an event title"),
  organizer: Yup.string().required("Please input an event organizer"),
  type: Yup.string().required("Please select an event type"),
  industry: Yup.string().required("Please select an event industry"),
  start_date: Yup.date().required("Please select start date"),
  end_date: Yup.date().required("Please select end date"),
  tags: Yup.array().min(1, "Please select at least one tag"),
});

export const eventDetailsSchema = Yup.object({
  description: Yup.string().required(
    "Please provide a description for the event"
  ),
  hosting_site: Yup.string().required(
    "Please specify if the event will be hosted online or physical"
  ),
  event_location: Yup.string().when("hosting_site", {
    is: "online",
    then: (schema) =>
      schema.required("Please input a valid event link, such as a Zoom link."),
    otherwise: (schema) =>
      schema.required("Please input an address for the event"),
  }),
});

export const ticketsSchema = Yup.object({
  number_of_tickets: Yup.string().required(
    "Please select/input an estimated number of tickets to be sold"
  ),
});

export const publishSchema = Yup.object({
  status: Yup.string().required("Please select publish or draft"),
});

export const formStepsValidationSchemas = [
  basicInfoSchema,
  eventDetailsSchema,
  ticketsSchema,
  publishSchema,
];
