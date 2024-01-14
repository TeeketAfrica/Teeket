import { useState } from "react";

<<<<<<< HEAD
import Layout from './components/Layout';
import FormStep1 from './layout/FormStep1';
import FormStep2 from './layout/FormStep2';
import FormStep3 from './layout/FormStep3';
import FormStep4 from './layout/FormStep4';
=======
import { useForm, FormProvider } from "react-hook-form";

import Layout from "./components/Layout";
import FormStep1 from "./layout/FormStep1";
import FormStep2 from "./layout/FormStep2";
import FormStep3 from "./layout/FormStep3";
import PublishEvent from "./layout/PublishEvent";
>>>>>>> dev

const VendorPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = async () => {
    // await handleSubmit((data) => {
    //   Object.keys(data).forEach((fieldName) => {
    //     setValue(fieldName, data[fieldName]);
    //   });
    // })();

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
<<<<<<< HEAD
=======
    reset();
  };

  const onSubmit = (data) => {
    console.log("Final form data:", data);
    // Add logic for submitting data to the server or performing other finalization steps
>>>>>>> dev
  };

  const renderFormSteps = () => {
    switch (activeStep) {
      case 0:
        return <FormStep1 />;
      case 1:
        return <FormStep2 />;
      case 2:
        return <FormStep3 />;
      case 3:
        return <PublishEvent />;
      default:
        return null;
    }
  };

  return (
    <Layout
      activeStepColor={activeStep}
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
    >
      {renderFormSteps()}
    </Layout>
  );
};

export default VendorPage;
