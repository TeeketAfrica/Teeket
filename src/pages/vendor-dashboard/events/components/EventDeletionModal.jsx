import React, { useCallback, useState } from 'react'
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
} from "@chakra-ui/react";
import DeleteIcon from "@/assets/icon/delete-icon.svg";

const EventDeletionModal = ({ isOpen, onClose, eventId, deleteEvent }) => {
    const [loading, setLoading] = useState(false)

    const handleDeletion = useCallback(async () => {
        try {
            setLoading(true);
            await deleteEvent(eventId);
            onClose();
        } catch (error) {
            console.error("Failed to delete event:", error);
        } finally {
            setLoading(false);
        }
    }, [eventId, deleteEvent, onClose]);

    return (
        <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            borderRadius={12}
        >
            <ModalOverlay
                bg="blackAlpha.100"
            />
            <ModalContent>
                <ModalHeader
                    alignSelf="center"
                    paddingBottom={1}
                    paddingTop={6}
                >
                    <DeleteIcon />
                </ModalHeader>
                <ModalBody textAlign={"center"}>
                    <Text fontWeight={600} fontSize={18} mb="1rem">
                        Delete this event?
                    </Text>

                    <Text fontSize={14} mb="1rem" color="gray.600">
                        Are you sure you want to delete this event? This action is irreversible, and you won't be able to recover it.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="secondary"
                        colorScheme="blue"
                        w="100%"
                        h={55}
                        mr={3}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" w="100%" h={55} onClick={handleDeletion} disabled={loading}>
                        {loading ? "Deleting ..." : "Yes, delete"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EventDeletionModal