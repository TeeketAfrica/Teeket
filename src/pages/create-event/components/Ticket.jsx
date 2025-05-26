import { Box, Button, Text } from "@chakra-ui/react";
import Illustration from "../../../assets/icon/Illustration.svg";
import { formatAmount } from "../../../utils/utils";

const Ticket = ({ data, handleOnclick }) => {
  console.log(data.ticketPrice)
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="6"
      backgroundColor="gray.800"
      color="gray.100"
      padding="6"
      borderRadius="8"
      minW="283px"
      flex={1}
      maxH="174px"
      boxShadow=" 0px 20px 60px 0px rgba(255, 255, 255, 0.25) inset"
    >
      <Box display="flex" flexDirection="column" gap="6">
        <Button
          width="fit-content"
          size="sm"
          variant="secondary"
          onClick={() => handleOnclick({ isModalOpen: true, data: data })}
        >
          Manage
        </Button>
        <Box>
          <Text
            fontSize="md"
            fontWeight="semibold"
            color="rgba(255, 255, 255, 0.75)"
          >
            {data.ticketQuantity} {data.ticketName} tickets
          </Text>
            {
              data.ticketPrice === 0 ?         
            <Text fontSize="5xl" fontWeight="bold">
              Free
            </Text>:
            <Text fontSize="5xl" fontWeight="bold">
              ₦{formatAmount(Number.parseInt(data.ticketPrice), 0)}
            </Text>        
            }

        </Box>
      </Box>
      <Box position="absolute" right="11px" top="10px">
        <Illustration />
      </Box>
    </Box>
  );
};

export default Ticket;
