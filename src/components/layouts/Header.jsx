import {
  Avatar,
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Container from "../ui/Container";
import BrandLogo from "../../assets/img/brandLogo.png";
import Avatars from "../../assets/img/Avatars.png";
import Search from "../../assets/icon/Search";
import { Link } from "react-router-dom";

const Header = () => {
  const menu = [
    {
      link: "Browse events",
    },
    {
      link: "Contact us",
    },
    {
      link: "About",
    },
  ];
  return (
    <header>
      <Box py={6}>
        <Container>
          <Stack
            direction={["column", "row"]}
            justifyContent="space-between"
            alignItems="center"
            px={5}
          >
            <Link to="/">
              <Image src={BrandLogo} alt="logo" />
            </Link>
            <Box maxW="784px" w="100%">
              <HStack spacing={6}>
                <Box maxW="400px" w="100%" display={["none", "block"]}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Search />
                    </InputLeftElement>
                    <Input
                      borderRadius="48px"
                      type="text"
                      placeholder="Search for an event"
                    />
                  </InputGroup>
                </Box>
                {menu.map((link, i) => (
                  <Link key={i} to={`/${link.link}`}>
                    <Text fontWeight={600} fontSize={14}>
                      {link.link}
                    </Text>
                  </Link>
                ))}
                <Box cursor="pointer">
                  <Avatar src={Avatars} />
                </Box>
              </HStack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
