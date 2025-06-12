import { memo } from "react";
import FormLayout from "../components/FormLayout";
import EventDetailsForm from "../forms/EventDetailsForm";

const FormStep2 = memo(() => {
  return (
    <FormLayout
      title="Event Details"
      description="Provide additional context about what this event is about."
    >
      <EventDetailsForm />
    </FormLayout>
  );
});

export default FormStep2;
