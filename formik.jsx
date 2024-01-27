import { Formik } from 'formik';
import * as Yup from 'yup';

const form1ValidationSchema = Yup.object({
  eventTitle: Yup.string().required('Please input an event title'),
  eventOrganizer: Yup.string().required('Please input an event organizer'),
  eventType: Yup.string().required('Please select an event type'),
  eventIndustry: Yup.string().required('Please select an event industry'),
  eventStartDate: Yup.date().required('Please select start date'),
  eventStartTime: Yup.string().required('Please select start time'),
  eventEndDate: Yup.date().required('Please select end date'),
  eventEndTime: Yup.string().required('Please select end time'),
});

const form2ValidationSchema = Yup.object({
  eventAbout: Yup.string().required(
    'Please provide a description for the event'
  ),
  eventHosting: Yup.string().required(
    'Please specify if the event will be hosted online or physical'
  ),
  eventLocation: Yup.string().when(['eventHosting'], (eventHosting, schema) => {
    if (eventHosting === 'online') {
      return schema.required(
        'Please input a valid event link, such as a Zoom link.'
      );
    } else {
      return schema.required('Please input an address for the event');
    }
  }),
});

const form3ValidationSchema = Yup.object({
  eventEstimatedSoldTicket: Yup.string().required(
    'Please select/input an estimated number of tickets to be sold'
  ),
});

const form4ValidationSchema = Yup.object({
  publishLive: Yup.string().required('Please select publish or draft'),
});

<Formik
  enableReinitialize={true}
  initialValues={{
    eventTitle: '',
    eventOrganizer: '',
    eventType: '',
    eventIndustry: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndDate: '',
    eventEndTime: '',
    eventAbout: '',
    eventHosting: '',
    eventLocation: '',
    eventEstimatedSoldTicket: '',
    publishLive: '',
  }}
  validationSchema={form1ValidationSchema}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => <div>{values}</div>}
</Formik>;
