import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Radio,
  RadioGroup,
  Divider,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Button,
} from '@chakra-ui/react';

import TicketIcon from '../../../assets/icon/Ticket.svg';
import PriceIcon from '../../../assets/icon/Price.svg';
import DollarIcon from '../../../assets/icon/Dollar.svg';
import TrashIcon from '../../../assets/icon/Trash.svg';
import MultiplyIcon from '../../../assets/icon/Multiply.svg';

const TicketModal = ({ selectedTicket, onSaveTicket, onRequestClose }) => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const tickeName = watch('ticketName');
  const ticketPrice = watch('ticketPrice');
  const ticketCount = watch('ticketCount');

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const handleOnSave = () => {
    onSaveTicket(ticketCount);
    handleSubmit(onSubmit)();
  };

  return (
    <Box
      maxW="567px"
      width="100%"
      position="fixed"
      top="0"
      right="0"
      bottom="0"
      display="flex"
      flexDirection="column"
      backgroundColor="gray.100"
      boxShadow=" 0px 4px 6px -2px rgba(16, 40, 16, 0.03), 0px 16px 24px -4px rgba(16, 40, 16, 0.08);"
      zIndex="999999"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="6"
        backgroundColor="inherit"
        borderBottom="1px solid"
        borderColor="gray.300"
        h="105px"
        cursor="pointer"
      >
        <Text
          color="gray.800"
          fontWeight="bold"
          fontSize="2xl"
          letterSpacing="-0.48px"
        >
          Manage your ticket
        </Text>
        <Box
          onClick={() => {
            onRequestClose(false), reset();
          }}
        >
          <Image src={MultiplyIcon} alt="icon" />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="6"
        padding="6"
        backgroundColor="inherit"
        height="100%"
        overflowY="auto"
      >
        <FormControl isInvalid={errors.eventType}>
          <FormLabel fontSize="lg" fontWeight="semibold" color="black">
            Will this be a free or paid event?
          </FormLabel>
          <Controller
            name="eventType"
            defaultValue=""
            rules={{
              required: 'Please your event type',
            }}
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} marginTop="4">
                <Stack
                  direction="row"
                  color="gray.800"
                  fontWeight="medium"
                  flexWrap="wrap"
                >
                  <Radio value="free" size="lg" variant="border">
                    Free event
                  </Radio>
                  <Radio value="paid" size="lg" variant="border">
                    Paid event
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage color="red.500">
            {errors.eventType && errors.eventType.message}
          </FormErrorMessage>
        </FormControl>

        <Divider h="1px" backgroundColor="gray.300" />

        <FormControl isInvalid={errors.ticketName}>
          <FormLabel
            htmlFor="ticketName"
            fontSize="sm"
            fontWeight="medium"
            color="gray.800"
          >
            Ticket name
          </FormLabel>

          <InputGroup size="lg">
            <InputRightElement pointerEvents="none">
              <Image src={TicketIcon} alt="icon" />
            </InputRightElement>

            <Input
              id="ticketName"
              type="text"
              {...register('ticketName', {
                required: 'Please input a ticket name',
              })}
              placeholder="e.g. Regular"
            />
          </InputGroup>

          <FormErrorMessage color="red.500">
            {errors.ticketName && errors.ticketName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.ticketPrice}>
          <FormLabel
            htmlFor="ticketPrice"
            fontSize="sm"
            fontWeight="medium"
            color="gray.800"
          >
            Ticket price
          </FormLabel>

          <InputGroup size="lg">
            <InputRightElement pointerEvents="none">
              <Image src={PriceIcon} alt="icon" />
            </InputRightElement>
            <InputLeftElement pointerEvents="none">
              <Image src={DollarIcon} alt="icon" />
            </InputLeftElement>

            <Input
              id="ticketPrice"
              type="text"
              {...register('ticketPrice', {
                required: 'Please the price per ticket',
              })}
              placeholder="set ticket price"
            />
          </InputGroup>
          {ticketPrice && (
            <Text fontSize="sm" fontWeight="normal" color="gray.600">
              Our 2% commission will taken from each tickets sold
            </Text>
          )}

          <FormErrorMessage color="red.500">
            {errors.ticketPrice && errors.ticketPrice.message}
          </FormErrorMessage>
        </FormControl>

        {tickeName && (
          <FormControl isInvalid={errors.tickeCount}>
            <FormLabel
              htmlFor="ticketCount"
              fontSize="sm"
              fontWeight="medium"
              color="gray.800"
            >
              How{' '}
              <Text as="span" textTransform="lowercase">
                {tickeName}
              </Text>{' '}
              tickets should be sold
            </FormLabel>

            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Image src={DollarIcon} alt="icon" />
              </InputLeftElement>

              <Input
                id="ticketCount"
                type="text"
                {...register('ticketCount', {
                  required: '',
                })}
                placeholder="e.g. 40"
              />
            </InputGroup>
            {selectedTicket && (
              <Text fontSize="sm" fontWeight="normal" color="gray.600">
                {selectedTicket - ticketCount > 0
                  ? selectedTicket - ticketCount
                  : 0}{' '}
                tickets available
              </Text>
            )}
            <FormErrorMessage color="red.500">
              {errors.ticketCount && errors.ticketCount.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <Button
          leftIcon={<Image src={TrashIcon} alt="icon" />}
          variant="ghost"
          color="red.400"
          width="fit-content"
          onClick={() => {}}
        >
          Delete this ticket
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap="14px"
        backgroundColor="inherit"
        borderTop="1px solid"
        borderColor="gray.300"
        paddingY="3"
        paddingX="6"
        marginTop="6"
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            onRequestClose(false), reset();
          }}
        >
          Discard
        </Button>
        <Button size="lg" onClick={handleOnSave}>
          Save ticket
        </Button>
      </Box>
    </Box>
  );
};

export default TicketModal;
