import { Flex, Text } from "@chakra-ui/react";

import EventBadge from "./EventBadge";

const DetailCard = ({ icon, title, subTitle }) => {
  return (
    <Flex flexDirection="row" gap="10px">
      <EventBadge
        eventBadgeInfo={{
          state: "defaultIcon",
          icon: icon,
        }}
      />
      <Flex flexDirection="column">
        <Text fontSize="md" fontWeight="semibold" lineHeight="23px">
          {title}
        </Text>
        <Text fontSize="sm" lineHeight="5" color="gray.600">
          {subTitle}
        </Text>
      </Flex>
    </Flex>
  );
};

export default DetailCard;
