import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import DollarsIcon from "../../../../assets/icon/DollarsIcon.svg";
import RequestDollarFailed from "../../../../assets/icon/RequestDollarFailed.svg";

const RequestPaymentModal = ({ isOpen, onClose, requestPayment }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      borderRadius={12}
    >
      <ModalOverlay />
      {requestPayment ? (
        <ModalContent>
          <ModalHeader>
            <Image src={DollarsIcon} alt="payment" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={600} fontSize={18} mb="1rem">
              Request payment
            </Text>

            <Text fontSize={14} mb="1rem" color="gray.600">
              Your current events with due payment brings a total of{" "}
              <Text as="span" fontWeight={700}>
                $10,000
              </Text>
              . All payment will be made within 24hours after your request.
            </Text>
            <HStack alignItems="flex-start" mb={4}>
              <Checkbox />
              <Box>
                <Text fontWeight={500}>Nigerian Anime Fest</Text>
                <Text fontSize={14} color="gray.600">
                  <Text as="span" fontWeight={600}>
                    $5,000
                  </Text>
                  . Overdue in 5days
                </Text>
              </Box>
            </HStack>
            <HStack alignItems="flex-start">
              <Checkbox />
              <Box>
                <Text fontWeight={500}>Outdoor conveyning</Text>
                <Text fontSize={14} color="gray.600">
                  <Text as="span" fontWeight={600}>
                    $7,000
                  </Text>
                  . Overdue in 5days
                </Text>
              </Box>
            </HStack>
            <Divider border="1px solid" my={5} borderColor="gray.300" />
            <HStack justifyContent="space-between">
              <Text color="gray.600" fontSize={14}>
                Total revenue requested
              </Text>
              <Text fontSize={14} fontWeight={500}>
                $12,000
              </Text>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              colorScheme="blue"
              w="100%"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button variant="primary" w="100%">
              Send request
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Image src={RequestDollarFailed} alt="can't request" />
              <Text fontWeight={600} fontSize={18} mb="1rem">
                You can’t request payment yet
              </Text>
              <Text fontSize={14} mb="1rem" color="grey500" textAlign="center">
                The available payment is still connected to an event that is
                till ongoing. All requests should be made after your event is
                concluded.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary" w="100%">
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default RequestPaymentModal;
