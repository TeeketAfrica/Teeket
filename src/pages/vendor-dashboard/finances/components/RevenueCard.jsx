import { Box, HStack, Image, Text } from "@chakra-ui/react";
import UpIncreaseArrow from "../../../../assets/icon/UpIncreaseArrow.svg";

const RevenueCard = ({
  icon,
  revenueTitle,
  revenueTotal,
  percentIncrease,
  desc,
  color,
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius={8}
      p={6}
      maxW="352px"
      w="100%"
      minH="221px"
      h="100%"
      boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
    >
      <HStack spacing={5} mb={6}>
        <Image src={icon} />
        <Text fontWeight={500} color="grey900">
          {revenueTitle}
        </Text>
      </HStack>
      <Text fontSize="36px" fontWeight={700} mb={4}>
        {revenueTotal}
      </Text>
      <HStack spacing={2}>
        {percentIncrease && (
          <HStack spacing={1}>
            <Image src={UpIncreaseArrow} alt="increase" />
            <Text fontSize={14} fontWeight={500} color="success700">
              {percentIncrease}
            </Text>
          </HStack>
        )}
        {desc && (
          <Text fontSize={14} fontWeight={500} color={color}>
            {desc}
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default RevenueCard;
