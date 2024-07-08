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
} from "@chakra-ui/react";

import { useModal } from "../../context/ModalContext";

import FeatureIcon from "../../assets/icon/Feature-icon-danger.svg";

const DeleteBankDetail = () => {
  const { closeModal } = useModal();
  return (
    <ModalContent paddingY={2}>
      <ModalHeader textAlign="center">
        <VStack gap={5}>
          <Image src={FeatureIcon} alt="icon" />
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
        <Button width="170px" variant="danger" size="lg">
          Delete account
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default DeleteBankDetail;
