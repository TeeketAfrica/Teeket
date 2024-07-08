import { useState } from "react";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";

import LeftSideDetails from "./LeftSideDetails";
import RightSideDetails from "./RightSideDetails";

import HeroImage from "../../../../assets/img/event-booking-herobg.webp";

const EventBookingDetail = ({ event }) => {
  const [isRegistered] = useState(false);

  return (
    <VStack width="85%" mx="auto" gap="22px" paddingY="11">
      <Box width="100%" height="420px" overflow="hidden" borderRadius="16px">
        <Image
          src={event.banner_image}
          alt="vintage art event image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap="6">
        <LeftSideDetails event={event} />

        <RightSideDetails event={event} isRegistered={isRegistered} />
      </Flex>
    </VStack>
  );
};

export default EventBookingDetail;
