import { useState } from "react";
import {
  Stack,
  Box,
  Divider,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";
import Ticket from "../components/Ticket";
import TicketModal from "../components/TicketModal";
import { selectEventDetails } from "../../../features/eventSlice";
import CircleCheckIcon from "../../../assets/icon/CircleCheck.svg";
import InfoTriangleIcon from "../../../assets/icon/InfoTriangle.svg";
import Notebook from "../../../assets/icon/Notebook.svg";
import PlusIcon from "../../../assets/icon/Plus.svg";
import PlusLightIcon from "../../../assets/icon/PlusLight.svg";

const TicketsForm = () => {
  const { values } = useFormikContext();
  // Only keep Redux for tickets since they're managed separately
  const { tickets, totalTicketQuantities } = useSelector(selectEventDetails);
  const [isTicketOpen, setIsTicketOpen] = useState({
    isModalOpen: false,
    data: null,
  });

  const ticketQuantity =
    values.eventEstimatedSoldTicket - totalTicketQuantities;

  const ticketOptions = [
    { value: 25, label: "25 Tickets" },
    { value: 50, label: "50 Tickets" },
    { value: 100, label: "100 Tickets" },
  ];

  return (
    <Stack flexDirection="column" gap="8">
      {/* Estimated Tickets */}
      <Box>
        <FormField
          name="eventEstimatedSoldTicket"
          label="How many tickets on estimate should be sold?"
          type={FormFieldType.Radio}
          options={ticketOptions}
          radioDirection="row"
          radioSpacing="10px"
          radioMaxWidth="200px"
        />

        {/* Custom Number Input */}
        <Box mt={4} maxW="200px">
          Custom Amount
          <FormField
            name="eventEstimatedSoldTicket"
            type={FormFieldType.Number}
            placeholder="Custom amount"
            min={0}
          />
        </Box>
      </Box>

      <Divider height="1px" backgroundColor="gray.300" />

      {/* Tickets Section */}
      {tickets.length > 0 ? (
        <Box>
          {ticketQuantity > 0 && (
            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold" color="black">
                Build your tickets
              </Text>
              <Button
                leftIcon={<PlusIcon />}
                variant="secondary"
                size="sm"
                onClick={() => setIsTicketOpen({ isModalOpen: true })}
              >
                New ticket
              </Button>
            </HStack>
          )}

          <HStack gap={6} mt={6} flexWrap="wrap">
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
            {ticketQuantity > 0 ? <CircleCheckIcon /> : <InfoTriangleIcon />}
            <Text as="span">
              You have {ticketQuantity > -1 ? ticketQuantity : 0} tickets left
              to allocate
            </Text>
          </Text>
        </Box>
      ) : (
        <VStack gap="4">
          <VStack>
            <Notebook />
            <Text fontSize="lg" fontWeight="semibold" color="gray.600">
              Build your various ticket category here
            </Text>
          </VStack>
          {values.eventEstimatedSoldTicket ? (
            <Button
              leftIcon={<PlusLightIcon />}
              size="lg"
              variant="primary"
              onClick={() => setIsTicketOpen({ isModalOpen: true })}
            >
              New Ticket
            </Button>
          ) : (
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">
              Select the estimated number of tickets to be sold
            </Text>
          )}
        </VStack>
      )}

      {/* Ticket Modal */}
      <TicketModal
        ticketState={isTicketOpen}
        onCloseModal={setIsTicketOpen}
        selectedQuantity={ticketQuantity}
      />
    </Stack>
  );
};

export default TicketsForm;
