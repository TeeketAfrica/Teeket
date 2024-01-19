import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Slide,
  Image,
  // Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  VStack,
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
} from "@chakra-ui/react";

import FormLayout from "../components/FormLayout";
// import Ticket from '../components/Ticket';
import TicketModal from "../components/TicketModal";

// import PlusIcon from '../../../assets/icon/Plus.svg';
import PlusLightIcon from "../../../assets/icon/Plus-light.svg";
import Notebook from "../../../assets/icon/Notebook.svg";
import DownArrowIcon from "../../../assets/icon/DownArrow.svg";
import UpArrowIcon from "../../../assets/icon/UpArrow.svg";

const FormStep3 = () => {
  // const { control } = useFormContext();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [setTicketLeft] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let selectedTickets = watch("selectedTickets");

  const handleSaveTicket = (value) => {
    setTicketLeft(selectedTickets - value);
  };

  const onSubmit = () => {
    console.log("formTwo");
  };

  return (
    <>
      <FormLayout
        title="Tickets"
        description="Set how much tickets are to be sold and create the various types of tickets to be used for this event"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection="column" gap="8">
          <FormControl isInvalid={errors.selectedTickets}>
            <FormLabel fontSize="lg" fontWeight="semibold" color="black">
              How many tickets on estimate should be sold?
            </FormLabel>
            <Controller
              name="selectedTickets"
              control={control}
              defaultValue=""
              rules={{
                required:
                  "Please select/input an estimated number of tickets to be sold",
              }}
              render={({ field }) => (
                <RadioGroup {...field} marginTop="4">
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
                      {...field}
                      min={0}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    >
                      <NumberInputField
                        backgroundColor="transparent"
                        zIndex="2"
                      />
                      <NumberInputStepper marginRight="8px" zIndex="3">
                        <NumberIncrementStepper>
                          <Image src={UpArrowIcon} alt="up-arrow" />
                        </NumberIncrementStepper>
                        <NumberDecrementStepper>
                          <Image src={DownArrowIcon} alt="down-arrow" />
                        </NumberDecrementStepper>
                      </NumberInputStepper>
                      {!field.value && !isInputFocused && (
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
              )}
            />
            <FormErrorMessage color="red.500">
              {errors.selectedTickets && errors.selectedTickets.message}
            </FormErrorMessage>
          </FormControl>
          <Divider height="1px" backgroundColor="gray.300" />
          {/* <Box>
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold" color="black">
                Build your tickets
              </Text>
              {ticketleft > 0 && (
                <Button
                  leftIcon={<Image src={PlusIcon} alt="icon" />}
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsModalOpen((prev) => !prev)}
                >
                  New ticket
                </Button>
              )}
            </HStack>
            <HStack gap="6" flexWrap="wrap" marginTop="4">
              <Ticket count="25" price={50} type="Premium" />
            </HStack>
            <Text fontSize="md" fontWeight="600" color="gray.800" marginTop="8">
              You have {ticketleft - 1} tickets left to allocate
            </Text>
          </Box> */}

          <VStack gap="4">
            <VStack>
              <Image src={Notebook} alt="icon" />
              <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                Build your various ticket category here
              </Text>
            </VStack>
            {selectedTickets ? (
              <Button
                leftIcon={<Image src={PlusLightIcon} alt="icon" />}
                size="lg"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                New Ticket
              </Button>
            ) : (
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {" "}
                Select the estimated number of tickets to be sold
              </Text>
            )}
          </VStack>
        </Stack>
      </form>
      <Slide direction="right" in={isModalOpen} style={{ zIndex: 999999999 }}>
        <TicketModal
          selectedTicket={selectedTickets}
          onSaveTicket={handleSaveTicket}
          onRequestClose={setIsModalOpen}
        />
      </Slide>
    </>
  );
};

export default FormStep3;
