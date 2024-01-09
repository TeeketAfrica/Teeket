import { useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import Layout from './components/Layout';
import FormStep1 from './layout/FormStep1';
import FormStep2 from './layout/FormStep2';
import FormStep3 from './layout/FormStep3';
import FormStep4 from './layout/FormStep4';

const VendorPage = () => {
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = methods;

  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = async () => {
    await handleSubmit((data) => {
      Object.keys(data).forEach((fieldName) => {
        setValue(fieldName, data[fieldName]);
      });
    })();

    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
    reset();
  };

  const onSubmit = (data) => {
    console.log('Final form data:', data);
    // Add logic for submitting data to the server or performing other finalization steps
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
        return <FormStep4 />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Layout
          activeStepColor={activeStep}
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
        >
          {renderFormSteps()}
        </Layout>
      </form>
    </FormProvider>
  );
};

export default VendorPage;
