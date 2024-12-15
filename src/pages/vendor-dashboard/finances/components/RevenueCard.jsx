import { Box, HStack, Text } from "@chakra-ui/react";
import UpIncreaseArrow from "../../../../assets/icon/UpIncreaseArrow.svg";
import DownDecreaseArrow from "../../../../assets/icon/DownDecreaseArrow.svg";

const RevenueCard = ({
    icon: Icon,
    revenueTitle,
    revenueTotal,
    percentIncrease,
    desc,
    color,
    growthRate,
}) => {
    return (
        <Box
            border="1px solid"
            borderColor="gray.300"
            borderRadius={8}
            p={6}
            // maxW={[null, null, null, "352px"]}
            w="100%"
            minH={["auto", null, null, "242px", "221px"]}
            h="100%"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
        >
            <HStack spacing={5} mb={6}>
                <Icon />
                <Text fontWeight={500} color="grey900">
                    {revenueTitle}
                </Text>
            </HStack>
            <Text fontSize="36px" fontWeight={700} mb={4}>
                ${revenueTotal.toLocaleString()}
            </Text>
            <HStack spacing={2}>
                {percentIncrease !== undefined && percentIncrease !== null && (
                    <HStack spacing={1}>
                        {growthRate ? (
                            <UpIncreaseArrow />
                        ) : (
                            <DownDecreaseArrow />
                        )}
                        <Text
                            fontSize={14}
                            fontWeight={500}
                            color={growthRate ? "success700" : "error700"}
                        >
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
