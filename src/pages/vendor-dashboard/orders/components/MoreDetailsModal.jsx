import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  HStack,
  Image,
  Divider,
  Container,
  Tag,
} from "@chakra-ui/react";
import Calendar from "../../../../assets/icon/calendar-alt-dark.svg";
import Clock from "../../../../assets/icon/clock-dark.svg";
import Ticket from "../../../../assets/icon/ticket-icon.svg";

const MoreDetailsModal = ({ isOpen, onClose, selectedItem }) => {
  return (
    <Modal
      size="xl"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      {selectedItem && (
        <ModalContent p={6} borderRadius={16}>
          <ModalHeader p={0}>
            <HStack gap="11px">
              <Image
                src={selectedItem.attendeeAvatar}
                alt={selectedItem.attendeeName}
                w={10}
                h={10}
              />
              <Text fontWeight={700} fontSize="xl">
                {selectedItem.attendeeName}’s Order details
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Box
              position="relative"
              borderRadius={16}
              border="1px solid"
              borderColor="border2"
              bgColor="black"
              bg="bgGradient"
              h="auto"
              boxShadow="0px 2px 20px 6px rgba(0, 0, 0, 0.25), 0px 0.5px 0px 3px rgba(255, 255, 255, 0.50), 0px 0px 0px 2px #000, 0px 20px 50px 0px rgba(255, 255, 255, 0.20) inset"
              bgSize="cover"
              bgPosition="top left"
              my={8}
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgImage={`url(${selectedItem.img})`}
                bgSize="cover"
                bgPosition="center"
                zIndex={-1}
              />
              <HStack
                px={6}
                justifyContent="space-between"
                borderBottom="1px solid"
                borderColor="utilityLight100"
                gap={6}
              >
                <Box
                  borderRight="1px solid"
                  borderColor="utilityLight100"
                  pr={6}
                  pt={6}
                  pb={4}
                  w="100%"
                  zIndex={1}
                >
                  <Text color="limeGreen" fontWeight={600} fontSize={14}>
                    {selectedItem.ticketType} ticket
                  </Text>
                  <Text fontWeight={700} color="white" fontSize={20}>
                    {selectedItem.eventTitle}
                  </Text>
                  <Container maxW="300px" px={0} mx={0}>
                    <Text fontSize={14} color="utilityLight200">
                      Join us for the Outdoors Conveyning, an event that
                      celebrates the beauty of nature...
                    </Text>
                  </Container>
                </Box>
                <Box w={149}>
                  <Image
                    src={selectedItem.img}
                    alt={selectedItem.eventTitle}
                    w={101}
                    h={101}
                  />
                </Box>
              </HStack>
              <HStack
                w="100%"
                px={6}
                pt={3}
                pb={6}
                justifyContent="space-between"
              >
                <HStack>
                  <Tag
                    borderRadius={8}
                    p={2}
                    bgColor="utilityLight100"
                    borderColor="utilityLight100"
                    border="1px solid"
                    color="white"
                  >
                    <Image src={Calendar} alt="calendar" mr={2} />
                    5th Jan, 2024
                  </Tag>
                  <Tag
                    borderRadius={8}
                    p={2}
                    bgColor="utilityLight100"
                    borderColor="utilityLight100"
                    border="1px solid"
                    color="white"
                  >
                    <Image src={Clock} alt="clock" mr={2} />
                    6:00PM - 8:00PM
                  </Tag>
                </HStack>
                <Box>
                  <Image src={Ticket} alt="ticket icon" />
                </Box>
              </HStack>
            </Box>
            <Box>
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Order ID</Text>
                <Text color="gray.600">{selectedItem.orderId}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Ticket type</Text>
                <Text color="gray.600">{selectedItem.ticketType}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Ticket Cost</Text>
                <Text color="gray.600">{selectedItem.ticketCost}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Event status</Text>
                <Text color="gray.600">{selectedItem.status}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Purchase date</Text>
                <Text color="gray.600">{selectedItem.created}</Text>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default MoreDetailsModal;
