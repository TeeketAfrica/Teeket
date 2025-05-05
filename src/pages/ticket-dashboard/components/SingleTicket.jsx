import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import TicketBg from "../../../assets/img/TicketBg.png";
import TicketCardIcon from "../../../assets/icon/TicketCardIcon.svg";
import DownloadTicket from "../../../assets/icon/DownloadTicket.svg";
import { useNavigate } from "react-router-dom";

const SingleTicket = ({
  eventTitle,
  eventTime,
  eventLocation,
  ticketQuantity,
  ticketType,
  ticketPrice,
  eventId
}) => {
  const navigate = useNavigate();

  return (
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
      <Box bgColor="gray.100" w="full" h="full" borderRadius={8} p={[3, 6]}>
        <VStack alignItems="flex-start" spacing={5}>
          <Box>
            <TicketCardIcon />
            <Heading fontWeight={700} fontSize={24} lineHeight="28.8px">
              {eventTitle}
            </Heading>
            <Text color="gray.600">{eventTime}</Text>
            <Text color="gray.600">{eventLocation}</Text>
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
            <Button leftIcon={<DownloadTicket />} w="50%" variant="primary">
              Get ticket
            </Button>
            <Button 
              w="50%" 
              variant="outline"
              onClick={
                ()=>{
                  navigate(`/event-booking/${eventId}`)
                }
              }  
            >
              View event
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SingleTicket;
