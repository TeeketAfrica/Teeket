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

const SingleTicket = ({
  eventTitle,
  eventTime,
  eventLocation,
  ticketRegularQuantity,
  ticketVipQuantity,
}) => {
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
              {ticketRegularQuantity}{" "}
              <Text color="gray.800" as="span">
                Regular
              </Text>
              , {ticketVipQuantity}{" "}
              <Text color="gray.800" as="span">
                VIP
              </Text>
            </Text>
          </Box>
          <Divider border="1px dashed" borderColor="gray.400" />
          <HStack w="full">
            <Button leftIcon={<DownloadTicket />} w="50%" variant="primary">
              Get ticket
            </Button>
            <Button w="50%" variant="outline">
              View event
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SingleTicket;
