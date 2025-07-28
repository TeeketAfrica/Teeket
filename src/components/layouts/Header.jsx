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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Container from "../ui/Container";
import BrandLogo from "../../assets/img/brand.svg";
import Hamburger from "../../assets/icon/Hamburger.svg";
import Search from "../../assets/icon/Search.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/activeUserSlice";
import { CirclePlus, GridIcon, SettingsIcon, TicketIcon } from "lucide-react";
import SignOutIcon from "../../assets/icon/sign-out-2.svg";
import LogoutModal from "../auth/LogoutModal";
import useStorage from "../../utils/storage";
import useGetSelf from "../../hooks/useGetSelf";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const user = useSelector(selectActiveUser);
  const { getAccessToken } = useStorage();
  const token = getAccessToken();
  const handleGetProfile = useGetSelf();
  const location = useLocation();

  useEffect(() => {
    handleGetProfile();
  }, []);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const menu = [
    {
      link: "Browse events",
      url: "events",
    },
    {
      link: "Contact us",
      url: "contact",
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
              <BrandLogo style={{ width: "100%" }} />
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
                    <Text
                      fontWeight={600}
                      fontSize={14}
                      color={
                        location.pathname === `/${link.url}`
                          ? "textSuccess"
                          : "black"
                      }
                    >
                      {link.link}
                    </Text>
                  </Link>
                ))}
                {token && user && user.is_creator !== null ? (
                  <Menu>
                    <MenuButton>
                      <Avatar
                        border="1px solid"
                        borderColor="gray.800"
                        color="gray.800"
                        name={user?.first_name || user?.email}
                        src={user?.profile_image}
                        bgColor="transparent"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title={user?.email}>
                        <Link to={"/my-tickets"}>
                          <MenuItem
                            icon={<TicketIcon />}
                            color="gray.600"
                            fontSize={14}
                          >
                            My Tickets
                          </MenuItem>
                        </Link>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup>
                        <Link to="/create-event">
                          <MenuItem
                            icon={<CirclePlus />}
                            color="gray.600"
                            fontSize={14}
                            command="⌘N"
                          >
                            Create Event
                          </MenuItem>
                        </Link>

                        {user.is_creator && (
                          <Link to={"/app/overview"}>
                            <MenuItem
                              icon={<GridIcon />}
                              color="gray.600"
                              fontSize={14}
                            >
                              My dashboard
                            </MenuItem>
                          </Link>
                        )}
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup>
                        <Link to="/account-settings">
                          <MenuItem
                            icon={<SettingsIcon />}
                            color="gray.600"
                            fontSize={14}
                          >
                            Account settings
                          </MenuItem>
                        </Link>
                        <MenuItem
                          icon={<SignOutIcon color="#5E665E" />}
                          color="gray.600"
                          fontSize={14}
                          onClick={onOpenModal}
                        >
                          Log out
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Link to="/auth/login">
                      <Text
                        fontWeight={600}
                        fontSize={14}
                        color={
                          location.pathname === "/auth/login"
                            ? "textSuccess"
                            : "black"
                        }
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
                )}
              </HStack>
            </Box>
            <Box
              display={["block", null, "none"]}
              h="screen"
              overflowY="scroll"
            >
              <>
                <Hamburger onClick={onOpen} ref={btnRef} />
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
                        <BrandLogo style={{ width: "100%" }} />
                      </Link>
                    </Box>

                    <DrawerBody>
                      <VStack
                        spacing={
                          token && user && user.is_creator !== null ? 2 : 6
                        }
                      >
                        <>
                          {token && user && user.is_creator !== null ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <Avatar
                                  border="1px solid"
                                  borderColor="gray.800"
                                  color="gray.800"
                                  name={user?.first_name || user?.email}
                                  src={user?.profile_image}
                                  bgColor="transparent"
                                />
                                <Text>{user?.email}</Text>
                              </div>
                              <Menu>
                                {menu.map((link, i) => (
                                  <Link
                                    key={i}
                                    to={`/${link.url}`}
                                    onClick={onClose}
                                  >
                                    <MenuItem>{link.link}</MenuItem>
                                  </Link>
                                ))}
                                <Link to="/my-tickets" onClick={onClose}>
                                  <MenuItem>My Tickets</MenuItem>
                                </Link>
                                <Link to={"/create-event"} onClick={onClose}>
                                  <MenuItem>Create Event</MenuItem>
                                </Link>
                                {user.is_creator && (
                                  <Link to={"/app/overview"} onClick={onClose}>
                                    <MenuItem>My dashboard</MenuItem>
                                  </Link>
                                )}
                                <Link to="/account-settings" onClick={onClose}>
                                  <MenuItem>Account settings</MenuItem>
                                </Link>
                                <Link>
                                  <MenuItem
                                    onClick={onOpenModal}
                                    color={"red.300"}
                                  >
                                    Log out
                                  </MenuItem>
                                </Link>
                              </Menu>
                            </>
                          ) : (
                            <>
                              {menu.map((link, i) => (
                                <Link
                                  key={i}
                                  to={`/${link.url}`}
                                  onClick={onClose}
                                >
                                  <Text fontWeight={600} fontSize={14}>
                                    {link.link}
                                  </Text>
                                </Link>
                              ))}
                              <Link to="/auth/login" onClick={onClose}>
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
                          )}
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
      <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />
    </header>
  );
};

export default Header;
