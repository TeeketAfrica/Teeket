import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ModalFlake from "../../../assets/icon/ModalFlake.svg";

const EventPreference = ({ isOpen, onClose }) => {
  const preference = [
    "Anime",
    "Gaming",
    "Food",
    "Cooperate event",
    "Conferences",
    "Government",
    "Entertainment",
    "Religion",
    "Fashion",
    "Sports",
    "Travel",
    "Outdoors",
    "Tech",
    "Outdoors",
    "Charity",
    "Art & Craft",
    "Campus",
    "Youth",
    "Crypto",
    "Attractions",
    "Outdoors",
  ];
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack>
              <Image src={ModalFlake} alt="modal icon" w={42} />
              <Text fontSize={24} fontWeight={700} lineHeight="28.8px">
                Choose your preference
              </Text>
              <Text textAlign="center" fontWeight={400} fontSize={14} mb="1rem">
                We will like to know what kinds of event you are drawn to so we
                can build suggestions of events you may want to attend for you.
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap spacing={3}>
              {preference.map((pref, i) => (
                <WrapItem
                  key={i}
                  cursor="pointer"
                  border="1px solid"
                  p="10px"
                  borderRadius={48}
                  borderColor="gray.300"
                >
                  <Text color="gray.600" fontSize={14} fontWeight={500}>
                    {pref}
                  </Text>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <HStack w="full">
              <Button w="50%" variant="outline" onClick={onClose}>
                Skip
              </Button>
              <Button w="50%" variant="primary">
                Save preference
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventPreference;
