import {
  Box,
  HStack,
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
import Hamburger from "../../assets/icon/Hamburger.svg";
import BrandLogo from "../../assets/img/brandLogo.png";

const DashboardHeader = ({ onOpen }) => {
  return (
    <Box
      py={[3, 6]}
      px={[3, 8]}
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box w="107px" h="29px" display={["block", "none"]}>
          <Image src={BrandLogo} alt="logo" />
        </Box>
        <Box maxW="375px" w="100%" display={["none", "block"]}>
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
        <HStack
          w="100%"
          justifyContent="flex-end"
          alignItems="center"
          spacing={[3, null, null, null, 5]}
        >
          <Image src={Avatar} alt="Avatar" w="40px" h="40px" />
          <Image
            src={Hamburger}
            alt="menu"
            w="24px"
            h="24px"
            onClick={onOpen}
            display={["block", null, null, null, "none"]}
          />
        </HStack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
