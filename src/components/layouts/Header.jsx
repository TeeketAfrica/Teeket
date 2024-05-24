import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Container from "../ui/Container";
import BrandLogo from "../../assets/img/brandLogo.png";
import Avatars from "../../assets/img/Avatars.png";
import Hamburger from "../../assets/icon/Hamburger.svg";
import Search from "../../assets/icon/Search";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Header = ({ userInfo = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
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
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={5}
            w="full"
          >
            <Link to="/">
              <Image w="full" src={BrandLogo} alt="logo" />
            </Link>
            <Box maxW="860px" w="full" display={["none", null, "block"]}>
              <HStack spacing={6} justifyContent="end">
                <Box
                  maxW="400px"
                  w="100%"
                  display={["none", "none", "none", "block"]}
                >
                  <InputGroup w="full">
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
            <Box
              display={["block", null, "none"]}
              h="screen"
              overflowY="scroll"
            >
              <>
                <Image
                  src={Hamburger}
                  ref={btnRef}
                  onClick={onOpen}
                  alt="menu-icon"
                />
                <Drawer
                  isOpen={isOpen}
                  placement="left"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  size="sm"
                  h="full"
                >
                  <DrawerOverlay />
                  <DrawerContent p={5}>
                    <DrawerCloseButton />
                    <Box w={119} h={32}>
                      <Link to="/">
                        <Image w="full" src={BrandLogo} alt="logo" />
                      </Link>
                    </Box>

                    <DrawerBody>
                      <VStack spacing={6}>
                        {menu.map((link, i) => (
                          <Link key={i} to={`/${link.url}`}>
                            <Text fontWeight={600} fontSize={14}>
                              {link.link}
                            </Text>
                          </Link>
                        ))}
                        <>
                          <Link to="/auth/login">
                            <Text
                              fontWeight={600}
                              fontSize={14}
                              color="textSuccess"
                            >
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
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            </Box>
          </Stack>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
