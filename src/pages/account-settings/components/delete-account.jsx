import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { teeketApi } from "../../../utils/api";

export const DeleteAccount = () => {
  const [md] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDeletAccount = async () => {
    setLoading(true);
    try {
      const response = await teeketApi.delete("/user/profile");
      if (response.status !== 200) {
        throw new Error("Failed to delete account.");
      }

      toast({
        title: "Account Deleted",
        description: "You have successfully deleted your account.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <VStack maxW="575px" alignItems="start" spacing={9}>
      <VStack alignItems="start">
        <Text fontSize={md ? "2xl" : "xl"} fontWeight={600}>
          Delete Account
        </Text>
        <Text color="#5E665E">
          Would you like to delete your account? NOTE deletion of account will
          remove all the content associated with it.
        </Text>
      </VStack>
      <Button variant="secondary" color="#CC0613" onClick={onOpen}>
        Delete Account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              onClick={handleDeletAccount}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
