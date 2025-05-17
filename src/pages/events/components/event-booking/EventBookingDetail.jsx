import { useEffect, useState } from "react";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

import LeftSideDetails from "./LeftSideDetails";
import RightSideDetails from "./RightSideDetails";

import { useDispatch, useSelector } from "react-redux";
import {
  resetEventState,
  selectEventDetails,
} from "../../../../features/eventSlice";

const EventBookingDetail = () => {
  const { eventData: event, paid } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEventState());
  }, []);

  const [isRegistered] = useState(false);

  return event ? (
    <VStack width="100%" mx="auto" gap="22px" paddingY="11">
      <Box width="100%" height="420px" overflow="hidden" borderRadius="16px">
        <Image
          src={event?.banner_image}
          alt="vintage art event image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }} gap="6">
        <LeftSideDetails event={event} />

        <RightSideDetails event={event} isRegistered={isRegistered} />
      </Flex>
    </VStack>
  ) : (
    <Stack gap="6">
      <HStack width="full">
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton width={"full"} height={"500px"} />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default EventBookingDetail;
