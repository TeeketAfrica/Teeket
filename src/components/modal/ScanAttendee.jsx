import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@chakra-ui/react";
import useSignOut from "../../utils/signOut";
import SignOut from "../../assets/icon/logouticon.svg";

const ScanAttendeeModal
 = ({ isOpen, onClose }) => {
    const { signOut } = useSignOut();

    return (
        <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            borderRadius={12}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    alignSelf="center"
                    paddingBottom={1}
                    paddingTop={6}
                >
                    <SignOut />
                </ModalHeader>
                <ModalBody textAlign={"center"}>
                    <Text fontWeight={600} fontSize={18} mb="1rem">
                        Logout
                    </Text>

                    <Text fontSize={14} mb="1rem" color="gray.600">
                        Are you sure you want to log out of your account? Please
                        confirm your decision to ensure that your session ends
                        properly.
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
                    <Button variant="danger" w="100%" h={55} onClick={signOut}>
                        Yes, Logout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ScanAttendeeModal
;
