import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import Avatar from "../../assets/img/Avatars.png";
import Search from "../../assets/icon/Search";
import SearchIcon from "../../assets/icon/SearchIcon.svg";

const DashboardHeader = () => {
  return (
    <Box py={6} px={8} borderBottom="1px solid" borderColor="gray.300">
      <Stack direction="row" justifyContent="space-between">
        <Box maxW="375px" w="100%">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search />
            </InputLeftElement>
            <Input borderRadius="48px" type="text" placeholder="Search" />
            <InputRightElement mr={3}>
              <Image src={SearchIcon} alt="search" />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Image src={Avatar} alt="Avatar" w="40px" h="40px" />
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
