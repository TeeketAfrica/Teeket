import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const SidebarOptions = ({ icon, title, link, darkIcon }) => {
  const location = useLocation();

  const confirmLocation = location.pathname === link;
  return (
    <Box
      bgColor={confirmLocation ? "gray.200" : ""}
      border={confirmLocation ? "1px solid" : ""}
      borderColor="gray.300"
      borderRadius="12px"
      w="255px"
      px={4}
      py={3}
    >
      <Link to={link}>
        <Stack direction="row" spacing={3}>
          <Image src={confirmLocation ? darkIcon : icon} alt={title} />
          <Text
            fontSize="sm"
            fontWeight={confirmLocation ? "semibold" : "normal"}
            color={confirmLocation ? "gray.800" : "gray.600"}
          >
            {title}
          </Text>
        </Stack>
      </Link>
    </Box>
  );
};

export default SidebarOptions;
