import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  HStack,
  Image,
} from "@chakra-ui/react";

const MoreDetailsModal = ({ isOpen, onClose, selectedItem }) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {selectedItem && (
        <ModalContent>
          <ModalHeader>
            <HStack gap="11px">
              <Image
                src={selectedItem.attendeeAvatar}
                alt={selectedItem.attendeeName}
                w={10}
                h={10}
              />
              <Text fontWeight={700} fontSize="xl">
                Olivia Rhye’s Order details
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight="bold" mb="0.5rem">
                Order ID: {selectedItem.orderId}
              </Text>
              <Text fontWeight="bold" mb="0.5rem">
                Attendee: {selectedItem.attendeeName}
              </Text>
              <Text fontWeight="bold" mb="0.5rem">
                Event: {selectedItem.eventTitle}
              </Text>
              <Text fontWeight="bold" mb="0.5rem">
                Ticket Type: {selectedItem.ticketType}
              </Text>
              <Text fontWeight="bold" mb="0.5rem">
                Ticket Cost: {selectedItem.ticketCost}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default MoreDetailsModal;
