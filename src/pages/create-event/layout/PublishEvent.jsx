import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setEventDetail,
  selectEventDetails,
} from '../../../features/eventSlice';

import {
  formatDate,
  convertTimeFormat,
  calculateMinAndMaxPrices,
} from '../../../utils/utils.js';

import FormLayout from '../components/FormLayout';

import BannerImage from '../../../assets/img/BannerImage.png';
import Map from '../../../assets/icon/Map.svg';
import Clock from '../../../assets/icon/clock.svg';
import Calendar from '../../../assets/icon/calendar-alt.svg';
import TicketNumber from '../../../assets/icon/TicketNumber.svg';
import TicketPrice from '../../../assets/icon/TicketPrice.svg';

const PublishEvent = () => {
  const dispatch = useDispatch();

  const {
    publishLive,
    eventOrganizer,
    eventTitle,
    eventAbout,
    eventHosting,
    eventLocation,
    eventStartDate,
    eventStartTime,
    eventEndTime,
    tickets,
    totalTicketQuantities,
  } = useSelector(selectEventDetails);

  // Formik initialization
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      publishLive: publishLive || '',
    },
    validationSchema: Yup.object({
      publishLive: Yup.string().required('Please select publish or draft'),
    }),
  });

  const handleInputChange = (fieldName, e) => {
    const data = { fieldName: fieldName, value: e };

    dispatch(setEventDetail(data));
  };

  return (
    <>
      <FormLayout
        title="Publish Your Event"
        description="Now that you have finished providing all necessary information to get your event out there, you can go ahead and publish it live or publish to your draft"
      />
      <Stack direction="column" spacing={8}>
        <Box border="1px solid" borderColor="gray.300" borderRadius="16px">
          <Stack direction="row" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <Box
              w={{ base: '100%', lg: '397px' }}
              h={{ base: '320px', lg: '100%' }}
              flexShrink="0"
            >
              <Image
                src={BannerImage}
                alt="event banner"
                display="inline-block"
                h="100%"
                w="100%"
                objectFit="cover"
                borderRadius="16px 0 0 16px"
              />
            </Box>
            <Box p={6}>
              <Stack direction="column" spacing={2}>
                <Box>
                  <Text color="textSuccess" fontSize="xs" fontWeight="semibold">
                    {eventOrganizer}
                  </Text>
                  <Heading color="gray.800" fontSize="lg" fontWeight="semibold">
                    {eventTitle}
                  </Heading>
                </Box>
                <Text color="gray.600" fontSize="sm">
                  {eventAbout}
                </Text>
                {eventHosting === 'physical' ? (
                  <Text display="flex" color="gray.800" gap={2} fontSize="sm">
                    <Image src={Map} alt="location" /> {eventLocation}
                  </Text>
                ) : (
                  <Text display="flex" color="gray.800" gap={2} fontSize="sm">
                    {eventLocation}
                  </Text>
                )}
                {eventStartDate && eventStartTime && eventEndTime && (
                  <Box>
                    <Heading
                      fontWeight="semibold"
                      color="gray.800"
                      fontSize="md"
                      mb={2}
                    >
                      Date and time
                    </Heading>
                    <Stack direction="row" gap={2}>
                      <Text
                        display="flex"
                        alignItems="center"
                        justifyItems="center"
                        color="gray.800"
                        gap={2}
                        fontSize="sm"
                        bgColor="gray.200"
                        p={2}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"
                      >
                        <Image
                          src={Calendar}
                          alt="location"
                          w="14px"
                          h="14px"
                        />
                        {formatDate(eventStartDate)}
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        justifyItems="center"
                        color="gray.800"
                        gap={2}
                        fontSize="sm"
                        bgColor="gray.200"
                        p={2}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"
                      >
                        <Image src={Clock} alt="location" />
                        {convertTimeFormat(eventStartTime)} -{' '}
                        {convertTimeFormat(eventEndTime)}
                      </Text>
                    </Stack>
                  </Box>
                )}
                <Box>
                  <Heading
                    fontWeight="semibold"
                    color="gray.800"
                    fontSize="md"
                    mb={2}
                  >
                    Ticket sales
                  </Heading>
                  <Stack direction="row" gap={2}>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image
                        src={TicketPrice}
                        alt="location"
                        w="14px"
                        h="14px"
                      />
                      <Text display="inline-flex" gap="2">
                        <Text as="span">
                          ${calculateMinAndMaxPrices(tickets).minPrice}
                        </Text>
                        -
                        <Text as="span">
                          ${calculateMinAndMaxPrices(tickets).maxPrice}
                        </Text>
                      </Text>
                    </Text>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyItems="center"
                      color="gray.800"
                      gap={2}
                      fontSize="sm"
                      bgColor="gray.200"
                      p={2}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                    >
                      <Image src={TicketNumber} alt="location" />
                      {totalTicketQuantities} tickets
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Divider border="1px solid" borderColor="gray.300" />
        <Box>
          <Stack direction="column" spacing={6}>
            <Box>
              <Heading color="black" fontSize="lg" fontWeight="semibold">
                Publishing setting
              </Heading>
              <Text color="gray.600">
                How would you like to publish this event?
              </Text>
            </Box>

            {/* Event Publishing */}
            <Box maxW="600px" w="100%">
              <FormControl
                isInvalid={
                  formik.touched.publishLive && formik.errors.publishLive
                }
              >
                <RadioGroup
                  name="publishLive"
                  value={formik.values.publishLive}
                  onChange={(value) => {
                    formik.setFieldValue('publishLive', value);
                    handleInputChange('publishLive', value);
                  }}
                  onBlur={() => formik.setFieldTouched('publishLive', true)}
                  marginTop="4"
                >
                  <HStack
                    color="gray.800"
                    fontWeight="medium"
                    flexWrap="wrap"
                    gap="6"
                  >
                    <Radio value="eventLive" size="lg">
                      <Heading fontSize="md" fontWeight="medium">
                        Publish event live
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        This will place your event publicly for all to see and
                        start purchasing tickets.
                      </Text>
                    </Radio>
                    <Radio value="eventDraft" size="lg">
                      <Heading fontSize="md" fontWeight="medium">
                        Publish event to draft
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        This will not be public and you will be able to review
                        the event from your dashboard to make any changes before
                        going live again.
                      </Text>
                    </Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>
                  {formik.touched.publishLive && formik.errors.publishLive}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default PublishEvent;
