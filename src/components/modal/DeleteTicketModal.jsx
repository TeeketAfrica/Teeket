import { useDispatch, useSelector } from "react-redux";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  deleteTicket,
  selectEventDetails,
  setEventDetail,
} from "../../features/eventSlice";
import { useModal } from "../../context/ModalContext";
import { teeketApi } from "../../utils/api";

const DeleteTicketModal = () => {
  const { modalState, closeModal } = useModal();
  const dispatch = useDispatch();

  const { totalTicketQuantities } = useSelector(selectEventDetails);

  const handleDeleteTicket = async () => {
    const event_id = modalState.data.event_id;
    const ticket_id = modalState.data.id;
    const ticketLeft =
      totalTicketQuantities - modalState.data.formik.values.ticketQuantity;

    dispatch(deleteTicket(ticket_id));
    dispatch(
      setEventDetail({
        fieldName: "eventEstimatedSoldTicket",
        value: ticketLeft,
      })
    );

    if (event_id && ticket_id) {
      try {
        // Delete ticket
        await teeketApi.delete(`events/${event_id}/tickets/${ticket_id}`);
        await teeketApi.patch(`/events/${event_id}`, {
          number_of_tickets: ticketLeft,
        });
      } catch (error) {
        console.log("Unable to delete ticket", error.message);
      }
    }

    modalState.data.formik.resetForm();
    modalState.data.closeParentModal({ isModalOpen: false });
    closeModal();
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
