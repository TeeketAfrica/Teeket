import * as Yup from "yup";

export const formStep1Schema = Yup.object({
  eventTitle: Yup.string().required("Please input an event title"),
  eventOrganizer: Yup.string().required("Please input an event organizer"),
  eventType: Yup.string().required("Please select an event type"),
  eventIndustry: Yup.string().required("Please select an event industry"),
  eventStartDate: Yup.date().required("Please select start date"),
  eventStartTime: Yup.string().required("Please select start time"),
  eventEndDate: Yup.date().required("Please select end date"),
  eventEndTime: Yup.string().required("Please select end time"),
});

export const formStep2Schema = Yup.object({
  eventAbout: Yup.string().required(
    "Please provide a description for the event"
  ),
  eventHosting: Yup.string().required(
    "Please specify if the event will be hosted online or physical"
  ),
  eventLocation: Yup.string().when("eventHosting", {
    is: "online",
    then: (schema) =>
      schema.required("Please input a valid event link, such as a Zoom link."),
    otherwise: (schema) =>
      schema.required("Please input an address for the event"),
  }),
});

export const formStep3Schema = Yup.object({
  eventEstimatedSoldTicket: Yup.string().required(
    "Please select/input an estimated number of tickets to be sold"
  ),
});

export const formStep4Schema = Yup.object({
  publishLive: Yup.string().required("Please select publish or draft"),
});
