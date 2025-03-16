import { useState } from "react";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react"

import LeftSideDetails from "./LeftSideDetails";
import RightSideDetails from "./RightSideDetails";

import { useSelector } from "react-redux";

const EventBookingDetail = () => {
  const { eventData: event } = useSelector((state) => state.event);

  const [isRegistered] = useState(false);

  return (
    event? (
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
          <LeftSideDetails event={event} />

          <RightSideDetails event={event} isRegistered={isRegistered} />
        </Flex>
      </VStack>
    ) : (
        <Stack gap="6" maxW="xs" paddingY={"5rem"}>
            <HStack width="full">
              <SkeletonText noOfLines={2} />
              <SkeletonCircle size="10" /> 
            </HStack>
            <Skeleton width={"full"} height={"500px"}/>
            <Skeleton height='20px' />
        </Stack>
    )
  );
};

export default EventBookingDetail;
