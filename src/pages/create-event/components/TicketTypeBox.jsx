import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Add, Minus } from "iconsax-react";
import TicketIcon from "../../../assets/icon/Ticket2.svg";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEventDataTicketsQuantity,
  setTicketQuantity,
} from "../../../features/eventSlice";

export const TicketTypeBox = ({ data }) => {
  // const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { ticketQuantity } = useSelector(
    (state) => state.event
  );

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 1;

    if (value > data.quantity) {
      setError(`Must be less than or equal to ${data.quantity}`);
      value = data.quantity;
    } else {
      setError("");
    }

    if (value < 1) value = 1;
    dispatch(setTicketQuantity(value));

    dispatch(
      changeEventDataTicketsQuantity({
        id: data.id,
        name: data.name,
        quantity: value,
        price: data.price,
      })
    );
  };

  console.log(ticketQuantity);

  return (
    <Box w="100%">
      <VStack
        rounded={16}
        border={1}
        padding={6}
        borderStyle="solid"
        borderColor="gray.300"
        alignItems="start"
        gap={5}
      >
        <HStack justifyContent="space-between" w="100%">
          <HStack>
            <Image src={TicketIcon} />
            <Box>
              <Text
                color="gray.800"
                fontWeight={600}
                fontSize={16}
                maxW="700px"
              >
                {data.name}
              </Text>
              <Text color="gray.600" fontSize={14} maxW="700px">
                ${parseFloat(data.price).toLocaleString()}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Button
              onClick={() => {
                const newQuantity = Math.max(ticketQuantity - 1, 1);
                dispatch(setTicketQuantity(newQuantity));
                dispatch(
                  changeEventDataTicketsQuantity({
                    id: data.id,
                    name: data.name,
                    quantity: newQuantity,
                    price: data.price,
                  })
                );
              }}
              isDisabled={ticketQuantity <= 1}
              variant={ticketQuantity <= 1 ? "secondary" : "primary"}
              padding={2}
            >
              <Minus size="20" color="#fff" />
            </Button>
            <Input
              type="number"
              paddingX={3}
              w={50}
              value={ticketQuantity}
              onChange={handleInputChange}
            />
            <Button
              onClick={() => {
                const newQuantity = Math.min(ticketQuantity + 1, data.quantity);

                dispatch(setTicketQuantity(newQuantity));
                setError("");
                dispatch(
                  changeEventDataTicketsQuantity({
                    id: data.id,
                    name: data.name,
                    quantity: newQuantity,
                    price: data.price,
                  })
                );
              }}
              isDisabled={ticketQuantity >= data.quantity}
              variant={"primary"}
              bgColor="gray.800"
              padding={2}
            >
              <Add size="20" color="#fff" />
            </Button>
          </HStack>
        </HStack>
        {error && <Text color="red.500">{error}</Text>}
        <Text fontSize={14} color="gray.600">
          {data.description}
        </Text>
      </VStack>
    </Box>
  );
};
