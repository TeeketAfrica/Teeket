/* eslint-disable no-unused-vars */
import {
  VStack,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useModal } from "../../context/ModalContext";

import FeatureIcon from "../../assets/icon/Feature-icon.svg";
import { teeketApi } from "../../utils/api";

const EditBankDetail = () => {
  const { closeModal, modalState } = useModal();
  const toast = useToast();

  // UPDATE BANK DETAILS
  const handleUpdateBank = async () => {
    try {
      const response = await teeketApi.patch("/bank-account", {
        account_name: modalState.data.acctName,
        account_number: modalState.data.acctNumber,
        bank_name: modalState.data.bankName,
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      toast({
        title: "Failed to update",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <ModalContent paddingY={2}>
      <ModalHeader textAlign="center">
        <VStack gap={5}>
          <Image src={FeatureIcon} alt="icon" />
          <Heading as="h6" fontSize="lg" fontWeight="semibold">
            Confirm sending request
          </Heading>
        </VStack>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center">
          You are about to send a request to edit your bank account. A link will
          be sent to your email address after reviewing your request.
        </Text>
      </ModalBody>
      <ModalFooter justifyContent="center" gap="2">
        <Button
          width="170px"
          onClick={() => closeModal()}
          variant="secondary"
          size="lg"
        >
          Cancel
        </Button>
        <Button
          width="170px"
          variant="primary"
          size="lg"
          onClick={handleUpdateBank}
        >
          Send Request
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditBankDetail;
