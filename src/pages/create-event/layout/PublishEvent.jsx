import { memo } from "react";
import FormLayout from "../components/FormLayout";
import PublishForm from "../forms/PublishForm";

const PublishEvent = memo(() => {
  return (
    <FormLayout
      title="Publish Your Event"
      description="Now that you have finished providing all necessary information to get your event out there, you can go ahead and publish it live or publish to your draft"
    >
      <PublishForm />
    </FormLayout>
  );
});

export default PublishEvent;
