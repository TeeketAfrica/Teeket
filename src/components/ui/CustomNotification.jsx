import { Box, Divider, Text } from "@chakra-ui/layout";
import CloseButton from "../../assets/icon/CloseButton.svg";
import MiscIcon from "../../assets/icon/MiscIcon.svg";
import { useTheme } from "@chakra-ui/system";

const CustomNotification = ({ message, addedText }) => {
  const theme = useTheme();
  //   const _toast_type = () => {
  // if (type === "success") return MiscIcon;
  // if (type === "error") return toast_error;
  // if(type === 'info') return '../../../'
  // if (type === "warn") return toast_warn;
  //   };

  //   return a position style based on position entered

  return (
    <Box
      maxW="390px"
      w="100%"
      display="flex"
      py={3}
      px={4}
      justifyContent="space-between"
      alignItems="flex-start"
      border="1px solid"
      borderRadius="4px"
      borderColor={theme.colors.gray[300]}
      borderLeftColor={theme.colors.error500}
      borderLeft="6px solid"
      position="absolute"
      zIndex={10}
      top={8}
      left={8}
    >
      <MiscIcon />
      <Box maxW="271px" w="100%">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={theme.colors.gray[800]}
        >
          {message}
        </Text>
        <Text fontSize="sm" color={theme.colors.gray[600]}>
          {addedText}
        </Text>
      </Box>
      <Box display="flex" gap={3} alignItems="flex-start">
        <Divider
          h="62px"
          border="1px solid"
          borderColor={theme.colors.grey100}
        />
        <CloseButton />
      </Box>
    </Box>
  );
};

export default CustomNotification;
