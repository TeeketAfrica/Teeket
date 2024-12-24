import { Modal, ModalOverlay } from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import DeleteTicketModal from "./DeleteTicketModal";
import EditBankDetail from "./EditBankDetail";
import DeleteBankDetail from "./DeleteBankDetail";
import SaveBankDetail from "./SaveBankDetail";

const ReusableModal = () => {
  const { modalState, closeModal } = useModal();

  // Function to render modal content based on type
  const renderModalContent = () => {
    switch (modalState.type) {
      case "deleteTicket":
        return <DeleteTicketModal />;
      case "editBankDetail":
        return <EditBankDetail />;
      case "deleteBankDetail":
        return <DeleteBankDetail />;
      case "saveBankDetail":
        return <SaveBankDetail />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      blockScrollOnMount={false}
    >
      <ModalOverlay
        bg="rgba(20, 23, 20, 0.5)"
        backdropFilter="auto"
        backdropBlur="8px"
      />
      {renderModalContent()}
    </Modal>
  );
};

export default ReusableModal;
