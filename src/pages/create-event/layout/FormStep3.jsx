import { memo } from "react";
import FormLayout from "../components/FormLayout";
import TicketsForm from "../forms/TicketsForm";

const FormStep3 = memo(() => {
  return (
    <FormLayout
      title="Tickets"
      description="Set how much tickets are to be sold and create the various types of tickets to be used for this event"
    >
      <TicketsForm />
    </FormLayout>
  );
});

export default FormStep3;
