import { useState } from 'react';

import {
  Image,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Stack,
  HStack,
  Radio,
  RadioGroup,
  Divider,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setEventDetail,
  selectEventDetails,
} from '../../../features/eventSlice';

import FormLayout from '../components/FormLayout';
import Ticket from '../components/Ticket';
import TicketModal from '../components/TicketModal';

import PlusIcon from '../../../assets/icon/Plus.svg';
import PlusLightIcon from '../../../assets/icon/PlusLight.svg';
import Notebook from '../../../assets/icon/Notebook.svg';
import DownArrowIcon from '../../../assets/icon/DownArrow.svg';
import UpArrowIcon from '../../../assets/icon/UpArrow.svg';
import CircleCheckIcon from '../../../assets/icon/CircleCheck.svg';
import InfoTriangleIcon from '../../../assets/icon/InfoTriangle.svg';

const FormStep3 = ({ formik }) => {
  const dispatch = useDispatch();

  const { tickets, totalTicketQuantities } = useSelector(selectEventDetails);

  const [isTicketOpen, setIsTicketOpen] = useState({
    isModalOpen: false,
    data: null,
  });

  const [isInputFocused, setIsInputFocused] = useState(false);

  const ticketQuantity =
    formik.values.eventEstimatedSoldTicket - totalTicketQuantities;

  const handleInputChange = (fieldName, e) => {
    const data = { fieldName: fieldName, value: e };

    dispatch(setEventDetail(data));
  };

  return (
    <FormLayout
      title="Tickets"
      description="Set how much tickets are to be sold and create the various types of tickets to be used for this event"
    >
      <Stack flexDirection="column" gap="8">
        {/* Estimated Tickets */}
        <FormControl
          isInvalid={
            formik.touched.eventEstimatedSoldTicket &&
            formik.errors.eventEstimatedSoldTicket
          }
        >
          <FormLabel>How many tickets on estimate should be sold?</FormLabel>
          <RadioGroup
            name="eventEstimatedSoldTicket"
            value={formik.values.eventEstimatedSoldTicket}
            onChange={(value) => {
              formik.setFieldValue('eventEstimatedSoldTicket', value),
                handleInputChange('eventEstimatedSoldTicket', value);
            }}
            onBlur={() =>
              formik.setFieldTouched('eventEstimatedSoldTicket', true)
            }
            marginTop="4"
          >
            <HStack color="gray.800" fontWeight="medium" flexWrap="wrap">
              <Radio value="25" size="lg" variant="border">
                25 Tickets
              </Radio>
              <Radio value="50" size="lg" variant="border">
                50 Tickets
              </Radio>
              <Radio value="100" size="lg" variant="border">
                100 Tickets
              </Radio>
              <NumberInput
                min={0}
                value={formik.values.eventEstimatedSoldTicket}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue(
                    'eventEstimatedSoldTicket',
                    valueNumber || ''
                  )
                }
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              >
                <NumberInputField backgroundColor="transparent" zIndex="2" />
                <NumberInputStepper marginRight="8px" zIndex="3">
                  <NumberIncrementStepper>
                    <Image src={UpArrowIcon} alt="up-arrow" />
                  </NumberIncrementStepper>
                  <NumberDecrementStepper>
                    <Image src={DownArrowIcon} alt="down-arrow" />
                  </NumberDecrementStepper>
                </NumberInputStepper>
                {!formik.values.eventEstimatedSoldTicket && !isInputFocused && (
                  <Text
                    as="span"
                    position="absolute"
                    top="45%"
                    left="1rem"
                    transform="translateY(-45%)"
                    color="gray.400"
                    fontSize="sm"
                  >
                    Custom amount
                  </Text>
                )}
              </NumberInput>
            </HStack>
          </RadioGroup>
          <FormErrorMessage>
            {formik.touched.eventEstimatedSoldTicket &&
              formik.errors.eventEstimatedSoldTicket}
          </FormErrorMessage>
        </FormControl>

        <Divider height="1px" backgroundColor="gray.300" />

        {tickets.length > 0 ? (
          <Box>
            {ticketQuantity > 0 && (
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold" color="black">
                  Build your tickets
                </Text>
                <Button
                  leftIcon={<Image src={PlusIcon} alt="icon" />}
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsTicketOpen({ isModalOpen: true })}
                >
                  New ticket
                </Button>
              </HStack>
            )}
            <HStack gap="6" flexWrap="wrap" marginTop="4">
              {tickets.map((data) => (
                <Ticket
                  key={data.id}
                  data={data}
                  handleOnclick={setIsTicketOpen}
                />
              ))}
            </HStack>
            <Text
              display="inline-flex"
              gap="3"
              fontSize="md"
              fontWeight="600"
              color="gray.800"
              marginTop="8"
            >
              {ticketQuantity > 0 ? (
                <Image src={CircleCheckIcon} alt="circle-check" />
              ) : (
                <Image src={InfoTriangleIcon} alt="info-triangle" />
              )}{' '}
              <Text as="span">
                You have {ticketQuantity > -1 ? ticketQuantity : 0} tickets left
                to allocate
              </Text>
            </Text>
          </Box>
        ) : (
          <VStack gap="4">
            <VStack>
              <Image src={Notebook} alt="icon" />
              <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                Build your various ticket category here
              </Text>
            </VStack>
            {formik.values.eventEstimatedSoldTicket ? (
              <Button
                leftIcon={<Image src={PlusLightIcon} alt="icon" />}
                size="lg"
                variant="primary"
                onClick={() => setIsTicketOpen({ isModalOpen: true })}
              >
                New Ticket
              </Button>
            ) : (
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {' '}
                Select the estimated number of tickets to be sold
              </Text>
            )}
          </VStack>
        )}
      </Stack>

      {/* Ticket Modal */}
      <TicketModal
        ticketState={isTicketOpen}
        onCloseModal={setIsTicketOpen}
        selectedQuantity={ticketQuantity}
      />
    </FormLayout>
  );
};

export default FormStep3;
