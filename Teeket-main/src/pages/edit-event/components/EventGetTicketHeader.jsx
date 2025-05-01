import { Avatar, Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import BrandLogo from "../../../assets/img/brandLogo.png";
import Avatars from "../../../assets/img/Avatars.png";

import { Link } from "react-router-dom";

export const EventGetTicketHeader = () => {
  return (
    <Box py={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        w="full"
      >
        <Link to="/">
          <Image w="full" src={BrandLogo} alt="logo" />
        </Link>

        <HStack spacing="2">
          <Box
            rounded={12}
            bg="gray.200"
            paddingX={4}
            paddingY={2}
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Text fontSize={12} fontWeight={600} color="gray.800">
              1/
            </Text>
            <Text fontSize={16} fontWeight={600} color="gray.800">
              Ticket type
            </Text>
          </Box>
          <Box
            rounded={12}
            paddingX={4}
            paddingY={2}
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Text fontSize={12} fontWeight={600} color="gray.500">
              2/
            </Text>
            <Text fontSize={16} fontWeight={600} color="gray.500">
              Your details
            </Text>
          </Box>
          <Box
            rounded={12}
            paddingX={4}
            paddingY={2}
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Text fontSize={12} fontWeight={600} color="gray.500">
              3/
            </Text>
            <Text fontSize={16} fontWeight={600} color="gray.500">
              Payment
            </Text>
          </Box>
        </HStack>

        <Box cursor="pointer">
          <Avatar src={Avatars} />
        </Box>
      </Stack>
    </Box>
  );
};
