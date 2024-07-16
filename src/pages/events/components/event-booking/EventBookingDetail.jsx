import { useState } from "react";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";

import LeftSideDetails from "./LeftSideDetails";
import RightSideDetails from "./RightSideDetails";

import { useSelector } from "react-redux";

const EventBookingDetail = () => {
  const { eventData: event } = useSelector((state) => state.event);

  const [isRegistered] = useState(false);

  return (
    event && (
      <VStack width="85%" mx="auto" gap="22px" paddingY="11">
        <Box width="100%" height="420px" overflow="hidden" borderRadius="16px">
          <Image
            src={event?.banner_image}
            alt="vintage art event image"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Flex flexDirection={{ base: "column", lg: "row" }} gap="6">
          <LeftSideDetails />

          <RightSideDetails isRegistered={isRegistered} />
        </Flex>
      </VStack>
    )
  );
};

export default EventBookingDetail;
