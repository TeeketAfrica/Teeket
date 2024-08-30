import {
  Center,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import SuccessIcon from "../../assets/icon/SuccessIcon.svg";
import { SOCIAL_LINKS } from "../../utils/constants";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody py={5}>
          <Center mb={5}>
            <SuccessIcon />
          </Center>
          <Text fontWeight="600" fontSize={18} textAlign="center" mb="1rem">
            Welcome to the Teeket Family
          </Text>
          <Text fontSize={14} color="gray.600" textAlign="center">
            You have successfully joined the waitlist. We will share updates
            with you and notify you of our progress to our product
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <HStack spacing={6}>
            {SOCIAL_LINKS.map(({ link, icon: Icon }, i) => (
              <Link key={i} href={link} target="_blank">
                <Icon />
              </Link>
            ))}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
