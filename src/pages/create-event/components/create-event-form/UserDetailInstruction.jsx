import {
    Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const UserDetailInstruction = ({ isOpen, onClose }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      borderRadius={12}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Hello Creator 👋. Please make sure to include the event address in the
          description section so attendees can easily find your event location.
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" w="100%" onClick={onClose}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailInstruction;
