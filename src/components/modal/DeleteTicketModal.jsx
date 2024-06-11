import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../features/eventSlice";
import { useModal } from "../../context/ModalContext";

const DeleteTicketModal = () => {
  const { modalState, closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDeleteTicket = () => {
    if (modalState.data) {
      dispatch(deleteTicket(modalState.data.id));

      modalState.data.formik.resetForm();
      modalState.data.closeParentModal({ isModalOpen: false });
      closeModal();
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Are you absolutely sure?</ModalHeader>
      <ModalBody>
        <Text>
          This action cannot be undone. This will permanently delete this ticket
        </Text>
      </ModalBody>
      <ModalFooter gap="2">
        <Button onClick={() => closeModal()} variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={() => handleDeleteTicket()}>
          Continue
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default DeleteTicketModal;
