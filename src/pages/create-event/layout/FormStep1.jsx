import { memo } from "react";
import FormLayout from "../components/FormLayout";
import BasicInfoForm from "../forms/BasicInfoForm";

const FormStep1 = memo(() => {
  return (
    <FormLayout
      title="Basic Info"
      description="Give your event a name and also add other basic information that will help your attendees know what this event is about"
    >
      <BasicInfoForm />
    </FormLayout>
  );
});

export default FormStep1;
