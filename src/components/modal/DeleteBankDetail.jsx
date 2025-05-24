import {
  VStack,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import FeatureIcon from "../../assets/icon/Feature-icon-danger.svg";
import { teeketApi } from "../../utils/api";

const DeleteBankDetail = () => {
    const toast = useToast();
  const { closeModal } = useModal();

    // DELETE BANK DETAILS
        const deleteOrganizationBank = async (values) => {
        try {
          const response = await teeketApi.delete("/bank-account");
          const res = response.data;
          toast({
            title: "Bank Details Deleted",
            description: `You have successfully deleted the bank details`,
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
          closeModal()
        } catch (error) {
          const errorMessage = error?.message || "An error occured";
          toast({
            title: "Failed to fetch",
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
        <VStack gap={5}>          <FeatureIcon />
          <Heading as="h6" fontSize="lg" fontWeight="semibold">
            Remove bank account
          </Heading>
        </VStack>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center">
          You are about to remove your bank account details. Are you sure you
          want to proceed with this action?
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
        <Button onClick={deleteOrganizationBank} width="170px" variant="danger" size="lg">
          Delete account
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default DeleteBankDetail;
