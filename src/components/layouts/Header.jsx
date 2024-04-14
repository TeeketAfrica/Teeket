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

const Header = ({ userInfo = false }) => {
  // const [user] = useState(false);
  const menu = [
    {
      link: "Browse events",
      url: "events",
    },
    {
      link: "Contact us",
      url: "contact-us",
    },
    {
      link: "About",
      url: "about",
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
            w="full"
          >
            <Link to="/">
              <Image w="full" src={BrandLogo} alt="logo" />
            </Link>
            <Box maxW="860px" w="full">
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
                  <Link key={i} to={`/${link.url}`}>
                    <Text fontWeight={600} fontSize={14}>
                      {link.link}
                    </Text>
                  </Link>
                ))}
                {userInfo ? (
                  <Box cursor="pointer">
                    <Avatar src={Avatars} />
                  </Box>
                ) : (
                  <>
                    <Link to="/auth/login">
                      <Text fontWeight={600} fontSize={14} color="textSuccess">
                        Login
                      </Text>
                    </Link>
                    <Link to="/auth/create-account">
                      <Text
                        p={2}
                        borderRadius={16}
                        bgColor="textSuccess"
                        color="white"
                        fontWeight={600}
                        fontSize={14}
                      >
                        Try Teeket
                      </Text>
                    </Link>
                  </>
                )}
              </HStack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
