import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import TicketBg from "../../../assets/img/TicketBg.png";
import TicketCardIcon from "../../../assets/icon/TicketCardIcon.svg";
import DownloadTicket from "../../../assets/icon/DownloadTicket.svg";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import DownloadableTicket from "./DownloadableTicket";

const SingleTicket = ({
  eventTitle,
  eventTime,
  eventLocation,
  ticketQuantity,
  ticketType,
  ticketPrice,
  eventId,
  ticketId,
  eventImageUrl,
}) => {
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const ticketRef = useRef(null);

  const handleDownloadImage = async () => {
    setDownloadingImage(true);
    const canvas = await html2canvas(ticketRef.current, {
      useCORS: true,
      allowTaint: false,
    });
    const link = document.createElement("a");
    link.download = `${eventTitle}_ticket.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloadingImage(false);
    onClose();
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    const canvas = await html2canvas(ticketRef.current, {
      useCORS: true,
      allowTaint: false,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${eventTitle}_ticket.pdf`);
    setDownloadingPDF(false);
    onClose();
  };


  return (
    <>
      <Box
        bgImage={`url(${TicketBg})`}
        bgSize="cover"
        bgColor="black"
        bgPosition="center center"
        borderRadius={16}
        p={[2, 3]}
        h="414px"
        w="full"
      >
        <Box
          bgColor="gray.100"
          w="full"
          h="full"
          borderRadius={8}
          p={[3, 6]}
        >
          <VStack alignItems="flex-start" spacing={5}>
            <Box>
              <TicketCardIcon />
              <Heading fontWeight={700} fontSize={24} lineHeight="28.8px">
                {eventTitle}
              </Heading>
              <Text color="gray.600">{eventTime}</Text>
              <Text color="gray.600" noOfLines={3}>{eventLocation}</Text>
            </Box>
            <Divider border="1px dashed" borderColor="gray.400" />
            <Box>
              <Text color="gray.600">Ticket purchased</Text>
              <Text color="gray.600" fontWeight={600}>
                {ticketQuantity}{" "} X {" "}
                <Text color="gray.800" as="span">
                  {ticketType}{" "}
                </Text>
                <Text color="gray.800" as="span">
                {"@$"}{ticketPrice}
                </Text>
              </Text>
            </Box>
            <Divider border="1px dashed" borderColor="gray.400" />
            <HStack w="full">
              <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverTrigger>
                  <Button
                    leftIcon={<DownloadTicket />}
                    w="50%"
                    variant="primary"
                    onClick={onOpen}
                  >
                    Get ticket
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="fit-content">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack align="stretch" spacing={3}>
                      <Button colorScheme="green" onClick={handleDownloadImage}>
                        {downloadingImage ? "Downloading..." : "Download as Image"}
                      </Button>
                      <Button colorScheme="teal" onClick={handleDownloadPDF}>
                        {
                          downloadingPDF ? "Downloading..." : "Download as PDF"
                        }
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Button
                w="50%"
                variant="outline"
                onClick={() => {
                  navigate(`/event-booking/${eventId}`);
                }}
              >
                View event
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>    
      <Box position="absolute" top="-9999px" left="-9999px">
        <DownloadableTicket 
          eventTitle={eventTitle}
          eventTime={eventTime}
          eventLocation={eventLocation}
          ticketQuantity={ticketQuantity}
          ticketType={ticketType}
          ticketPrice={ticketPrice}
          ticketRef={ticketRef}
          eventId={eventId}
          ticketId={ticketId}
          eventImageUrl={eventImageUrl}
        />
      </Box>

    </>

  );
};

export default SingleTicket;
