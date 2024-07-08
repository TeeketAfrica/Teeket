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

import FeatureIcon from "../../assets/icon/Feature-icon.svg";

const EditBankDetail = () => {
  const { closeModal } = useModal();
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
        <Button width="170px" variant="primary" size="lg">
          Send Request
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditBankDetail;
