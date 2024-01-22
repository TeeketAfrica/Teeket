import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Stack,
  HStack,
  VStack,
  Box,
  Button,
  Image,
  Text,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  InputLeftElement,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setEventDetail,
  selectEventDetails,
} from '../../../features/eventSlice';

import FormLayout from '../components/FormLayout';
import ImageUpload from '../components/ImageUpload';

import Refresh from '../../../assets/icon/Refresh.svg';
import Map from '../../../assets/icon/Map.svg';

const FormStep2 = () => {
  const dispatch = useDispatch();

  const { eventAbout, eventHosting, eventLocation } =
    useSelector(selectEventDetails);

  const [image, setImage] = useState(null);

  // Form validation schema
  const validationSchema = Yup.object({
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
  });

  // Formik initialization
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eventAbout: eventAbout || '',
      eventHosting: eventHosting || '',
      eventLocation: eventLocation || '',
    },
    validationSchema: validationSchema,
  });

  const handleInputChange = (fieldName, e) => {
    let data;
    if (typeof e !== 'string') {
      formik.handleChange(e);
      data = { fieldName: fieldName, value: e.target.value };
    } else {
      data = { fieldName: fieldName, value: e };
    }

    dispatch(setEventDetail(data));
  };

  return (
    <FormLayout
      title="Nigeria Anime Festival"
      description="Provide additional context about what this event is about."
    >
      <Stack maxW="600px" flexDirection="column" gap="8">
        {/* Banner Image */}
        {image ? (
          <Box>
            <Box
              h="264px"
              w="600px"
              borderRadius="12px"
              overflow="hidden"
              mb="2"
            >
              <Image
                src={image}
                alt="event banner"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
            <Button
              onClick={() => setImage(null)}
              leftIcon={<Image src={Refresh} alt="icon" />}
              variant="secondary"
              size="sm"
            >
              Change Image
            </Button>
          </Box>
        ) : (
          <ImageUpload handleSetImage={setImage} />
        )}

        <VStack alignItems="flex-start" gap="8">
          {/* About Event */}
          <FormControl
            isInvalid={formik.touched.eventAbout && !!formik.errors.eventAbout}
          >
            <FormLabel htmlFor="eventAbout">About the event</FormLabel>
            <Text fontWeight="normal" color="gray.500">
              Give a detailed description of what this event is about
            </Text>
            <Textarea
              id="eventAbout"
              name="eventAbout"
              placeholder="Tell us about the event"
              size="sm"
              rows="7"
              marginTop="4"
              value={formik.values.eventAbout}
              onChange={(value) => handleInputChange('eventAbout', value)}
              onBlur={() => formik.setFieldTouched('eventAbout', true)}
            />
            <FormErrorMessage>
              {formik.touched.eventAbout && formik.errors.eventAbout}
            </FormErrorMessage>
          </FormControl>

          {/* Event Hosting */}
          <FormControl
            isInvalid={
              formik.touched.eventHosting && !!formik.errors.eventHosting
            }
          >
            <FormLabel>How will this event be hosted</FormLabel>

            <RadioGroup
              name="eventHosting"
              value={formik.values.eventHosting}
              onChange={(value) => {
                formik.setFieldValue('eventHosting', value),
                  handleInputChange('eventHosting', value);
              }}
              onBlur={() => formik.setFieldTouched('eventHosting', true)}
              marginTop="4"
            >
              <HStack spacing="24px">
                <Radio value="online" size="lg" variant="border">
                  Online event
                </Radio>
                <Radio value="physical" size="lg" variant="border">
                  Physical event
                </Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>
              {formik.touched.eventHosting && formik.errors.eventHosting}
            </FormErrorMessage>

            {/* Event Location */}
            <Box marginTop="4">
              {formik.values.eventHosting === 'online' && (
                <FormControl
                  isInvalid={
                    formik.touched.eventLocation &&
                    !!formik.errors.eventLocation
                  }
                >
                  <FormLabel
                    htmlFor="eventLocation"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Online event link
                  </FormLabel>
                  <Input
                    name="eventLocation"
                    id="eventLocation"
                    type="text"
                    placeholder="Event url"
                    size="lg"
                    value={formik.values.eventLocation}
                    onChange={(value) =>
                      handleInputChange('eventlocation', value)
                    }
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>
                    {formik.touched.eventLocation &&
                      formik.errors.eventLocation}
                  </FormErrorMessage>
                </FormControl>
              )}
              {formik.values.eventHosting === 'physical' && (
                <FormControl
                  isInvalid={
                    formik.touched.eventLocation &&
                    !!formik.errors.eventLocation
                  }
                >
                  <FormLabel
                    htmlFor="eventLocation"
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.800"
                  >
                    Event location
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Image src={Map} alt="icon" />
                    </InputLeftElement>
                    <Input
                      id="eventLocation"
                      name="eventLocation"
                      type="text"
                      placeholder="Address"
                      value={formik.values.eventLocation}
                      onChange={(value) =>
                        handleInputChange('eventlocation', value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formik.touched.eventLocation &&
                      formik.errors.eventLocation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Box>
          </FormControl>
        </VStack>
      </Stack>
    </FormLayout>
  );
};

export default FormStep2;
