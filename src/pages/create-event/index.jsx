import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { selectEventDetails } from '../../features/eventSlice';

import Layout from './components/Layout';
import FormStep1 from './layout/FormStep1';
import FormStep2 from './layout/FormStep2';
import FormStep3 from './layout/FormStep3';
import PublishEvent from './layout/PublishEvent';

// Validation schemas for each step
const validationSchemas = [
  Yup.object({
    eventTitle: Yup.string().required('Please input an event title'),
    eventOrganizer: Yup.string().required('Please input an event organizer'),
    eventType: Yup.string().required('Please select an event type'),
    eventIndustry: Yup.string().required('Please select an event industry'),
    eventStartDate: Yup.date().required('Please select start date'),
    eventStartTime: Yup.string().required('Please select start time'),
    eventEndDate: Yup.date().required('Please select end date'),
    eventEndTime: Yup.string().required('Please select end time'),
  }),
  Yup.object({
    eventAbout: Yup.string().required(
      'Please provide a description for the event'
    ),
    eventHosting: Yup.string().required(
      'Please specify if the event will be hosted online or physical'
    ),
    eventLocation: Yup.string().when(
      ['eventHosting'],
      (eventHosting, schema) => {
        if (eventHosting === 'online') {
          return schema.required(
            'Please input a valid event link, such as a Zoom link.'
          );
        } else {
          return schema.required('Please input an address for the event');
        }
      }
    ),
  }),
  Yup.object({
    eventEstimatedSoldTicket: Yup.string().required(
      'Please select/input an estimated number of tickets to be sold'
    ),
  }),
  Yup.object({
    publishLive: Yup.string().required('Please select publish or draft'),
  }),
];

const VendorPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    eventTitle,
    eventOrganizer,
    eventType,
    eventIndustry,
    eventStartDate,
    eventStartTime,
    eventEndDate,
    eventEndTime,
    eventAbout,
    eventHosting,
    eventLocation,
    eventEstimatedSoldTicket,
    publishLive,
  } = useSelector(selectEventDetails);

  // Handle form submission and proceed to the next step
  const handleNextStep = async (formProps) => {
    await formProps.handleSubmit();
    const errors = await formProps.validateForm();

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Handle moving to the previous step
  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePublishEvent = async (formProps) => {
    await formProps.handleSubmit();
    const errors = await formProps.validateForm();

    if (Object.keys(errors).length === 0) {
      const type = formProps.values.publishLive;

      if (type === 'eventDraft') {
        //Code logic
      } else {
        // Code logic
      }
    }
  };

  // Render the current form step based on the activeStep
  const renderFormStep = (formProps) => {
    const formComponents = [FormStep1, FormStep2, FormStep3, PublishEvent];
    const CurrentForm = formComponents[activeStep];
    return <CurrentForm formik={formProps} />;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        eventTitle: eventTitle || '',
        eventOrganizer: eventOrganizer || '',
        eventType: eventType || '',
        eventIndustry: eventIndustry || '',
        eventStartDate: eventStartDate || '',
        eventStartTime: eventStartTime || '',
        eventEndDate: eventEndDate || '',
        eventEndTime: eventEndTime || '',
        eventAbout: eventAbout || '',
        eventHosting: eventHosting || '',
        eventLocation: eventLocation || '',
        eventEstimatedSoldTicket: eventEstimatedSoldTicket || '',
        publishLive: publishLive || '',
      }}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={() => {}}
    >
      {(formProps) => (
        <Layout
          activeStepColor={activeStep}
          nextStep={() => handleNextStep(formProps)}
          prevStep={handlePrevStep}
          publishEvent={() => handlePublishEvent(formProps)}
        >
          {renderFormStep(formProps)}
        </Layout>
      )}
    </Formik>
  );
};

export default VendorPage;
