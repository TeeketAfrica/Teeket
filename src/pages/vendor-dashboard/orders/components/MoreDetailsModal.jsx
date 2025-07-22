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
  Avatar,
  Tag,
  Collapse,
} from "@chakra-ui/react";
import Calendar from "../../../../assets/icon/calendar-alt-dark.svg";
import Clock from "../../../../assets/icon/clock-dark.svg";
import Ticket from "../../../../assets/icon/ticket-icon.svg";
import { filterPolicy, formatEventDateRange } from "../../../../utils/constants";
import { useEffect, useRef, useState } from "react";
import markdownit from 'markdown-it';
import { Button } from "@chakra-ui/button";

const md = markdownit();

const MoreDetailsModal = ({ isOpen, onClose, selectedItem }) => {

  const [result, setResult] = useState({ date: '', time: '' });
  const parsedContent = md.render(selectedItem?.event.description || "");
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  // const [isOverflowing, setIsOverflowing] = useState(false);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     const el = contentRef.current;
  //     console.log("Scroll height:", el.scrollHeight);
  //     setIsOverflowing(el.scrollHeight > 150);
  //   }
  // }, [parsedContent]);

  console.log(selectedItem)

  useEffect(() => {
    if (selectedItem?.event.start_date && selectedItem?.event.end_date) {
      setResult(formatEventDateRange({
        start_date: selectedItem?.event.start_date,
        end_date: selectedItem?.event.end_date
      }))
    }
  }, [selectedItem])

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
              <Avatar
                border="1px solid"
                borderColor="gray.800"
                color="gray.800"
                name={selectedItem.attendeeName || selectedItem.attendee.first_name}
                src={selectedItem.attendeeAvatar || selectedItem.attendee.profile_image}
                bgColor="transparent"
              />
              {/* <Image
                src={selectedItem.attendeeAvatar || selectedItem.attendee.profile_image}
                alt={selectedItem.attendeeName}
                w={10}
                h={10}
              /> */}
              <Text fontWeight={700} fontSize="xl">
                {selectedItem.attendeeName || selectedItem.attendee.first_name}’s Order details
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
                bgImage={`url(${selectedItem.img || selectedItem.event.banner_image})`}
                bgSize="cover"
                bgPosition="center"
                zIndex={-1}
              />
              <HStack
                px={2}
                justifyContent="space-between"
                borderBottom="1px solid"
                borderColor="utilityLight100"
                gap={6}
              >
                <Box
                  borderRight="1px solid"
                  borderColor="utilityLight100"
                  pt={6}
                  pb={4}
                  w="100%"
                  zIndex={1}
                >
                  <Text color="limeGreen" fontWeight={600} fontSize={14}>
                    {selectedItem.ticketType || selectedItem.event.type} ticket
                  </Text>
                  <Text fontWeight={700} color="white" fontSize={20}>
                    {selectedItem.eventTitle || selectedItem.event.title}
                  </Text>
                  <Container minW={"full"} px={0} mx={0}>
                    {
                      parsedContent ? (
                        <Box
                          style={{ background: "#FFFF", borderRadius: "6px", maxHeight: "300px", overflowX: "auto" }}
                        >
                            <Box
                              as="article"
                              wordBreak="break-word"
                              className="prose"
                              ref={contentRef}
                              dangerouslySetInnerHTML={{ __html: parsedContent }}
                            />

                          {/* {isOverflowing && (
                            <Button
                              size="sm"
                              variant="secondary"
                              mt={2}
                              onClick={() => setShowMore(!showMore)}
                            >
                              {showMore ? "Show Less" : "Read More"}
                            </Button>
                          )} */}
                        </Box>
                      ) :
                        (
                          <Text fontSize={14} color="utilityLight200">
                            {selectedItem?.event.description}
                          </Text>
                        )
                    }
                  </Container>
                </Box>
                <Box w={149}>
                  <Image
                    src={selectedItem.img || selectedItem.event.banner_image}
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
                    <Calendar />
                    {result.date}
                  </Tag>
                  <Tag
                    borderRadius={8}
                    p={2}
                    bgColor="utilityLight100"
                    borderColor="utilityLight100"
                    border="1px solid"
                    color="white"
                  >
                    <Clock />
                    {result.time}
                  </Tag>
                </HStack>
                <Box>
                  <Ticket />
                </Box>
              </HStack>
            </Box>
            <Box>
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Order ID</Text>
                <Text color="gray.600">{selectedItem.orderId || selectedItem.order_no}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between" my={2}>
                <Text fontWeight={500}>Ticket Quantity</Text>
                <Text color="gray.600">{selectedItem.quantity}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Ticket type</Text>
                <Text color="gray.600">{selectedItem.ticketType || selectedItem.ticket.name}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Ticket Cost</Text>
                <Text color="gray.600">{selectedItem.ticketCost || selectedItem.ticket.price}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Event status</Text>
                <Text color="gray.600">{filterPolicy[selectedItem.event_status]}</Text>
              </HStack>
              <Divider borderColor="gray.300" my={2} />
              <HStack justifyContent="space-between">
                <Text fontWeight={500}>Purchase date</Text>
                <Text color="gray.600">{selectedItem.created || selectedItem.date_created.split('T')[0]}</Text>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default MoreDetailsModal;
