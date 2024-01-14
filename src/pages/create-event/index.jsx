import { useState } from 'react';

import Layout from './components/Layout';
import FormStep1 from './layout/FormStep1';
import FormStep2 from './layout/FormStep2';
import FormStep3 from './layout/FormStep3';
import PublishEvent from './layout/PublishEvent';

const VendorPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = async () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
