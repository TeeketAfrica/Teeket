import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "../../../features/userSlice";
import {
  Slide,
  Fade,
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link,
  useOutsideClick,
  Avatar,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Logo from "../../../assets/img/brandLogo.png";
import Preview from "../../../assets/icon/eye.svg";
import CloseIcon from "../../../assets/icon/CloseButton.svg";
import Rocket from "../../../assets/icon/rocket-alt.svg";
import Hamburger from "../../../assets/icon/Hamburger.svg";
import Ticket from "../../../assets/icon/Ticket.svg";
import PlusCircle from "../../../assets/icon/PlusCircle.svg";
import Dashboard from "../../../assets/icon/Dashboard.svg";
import Settings from "../../../assets/icon/Settings.svg";
import SignOut from "../../../assets/icon/SignOut.svg";
import Container from "../../../components/ui/Container";
import SideNav from "./SideNav";
import useSignOut from "../../../utils/signOut";
import { resetEventState } from "../../../features/eventSlice";
import { selectActiveUser } from "../../../features/activeUserSlice";

const Layout = ({
  children,
  activeStepColor,
  nextStep,
  prevStep,
  editEvent,
}) => {
  const activeUser = useSelector(selectActiveUser);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const ref = useRef();
  const { signOut } = useSignOut();
  const dispatch = useDispatch();

  const { email } = useSelector(selectUserDetails).data;

  useOutsideClick({
    ref: ref,
    handler: () => setMenuToggle(false),
  });

  const resetEvent = () => {
    dispatch(resetEventState());
    sessionStorage.setItem("EVENT_PAGE", 0);
  };

  const steps = [
    {
      stepNumber: 1,
      stepInfo: "Basic info",
    },
    {
      stepNumber: 2,
      stepInfo: "Event details",
    },
    {
      stepNumber: 3,
      stepInfo: "Tickets",
    },
    {
      stepNumber: 4,
      stepInfo: "Publish event",
    },
  ];

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      w="100%"
      h="100vh"
      overflow={{ base: "visible", lg: "hidden" }}
      isolation="isolate"
    >
      <Box
        position="fixed"
        zIndex={20}
        top="0"
        right="0"
        left="0"
        display="flex"
        alignItems="center"
        backgroundColor="gray.100"
        borderBottom="1px solid"
        borderColor="gray.300"
        h="88px"
        px={6}
      >
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Link href="/" w="119px" cursor="pointer">
              <Image src={Logo} alt="logo" />
            </Link>
            <Box display="flex" alignItems="center" gap={{ base: 6, lg: 8 }}>
              <Button type="submit" size="sm" variant="ghost" gap={2}>
                <Preview />
                <Text as="span" display={{ base: "none", lg: "inline" }}>
                  Preview event
                </Text>
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                isDisabled={activeStepColor !== steps.length - 1}
                gap={2}
              >
                <Rocket />
                <Text as="span" display={{ base: "none", lg: "inline" }}>
                  Publish Event
                </Text>
              </Button>
              <Box ref={ref} position="relative" w={10} h={10}>
                <Box
                  cursor="pointer"
                  onClick={() => setMenuToggle(!menuToggle)}
                >
                  <Avatar
                    border="1px solid"
                    borderColor="gray.800"
                    color="gray.800"
                    name={activeUser?.name || activeUser?.email}
                    src={activeUser?.imageURL}
                    bgColor="transparent"
                  />
                </Box>
                <Fade in={menuToggle}>
                  <Box
                    display={menuToggle ? "flex" : "none"}
                    position="absolute"
                    right="0"
                    top="50px"
                    flexDirection="column"
                    gap={3}
                    w="267px"
                    backgroundColor="gray.100"
                    fontSize="sm"
                    color="gray.600"
                    fontWeight="normal"
                    py="3"
                    borderRadius="8"
                    boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);"
                  >
                    <Box
                      w="100%"
                      px="4"
                      borderBottom="1px solid"
                      borderColor="#F0F2F5"
                    >
                      <Text py="2" color="gray.800" fontWeight="semibold">
                        {email}
                      </Text>
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: "none" }}
                        onClick={resetEvent}
                      >
                        <Ticket />
                        <Text>My tickets</Text>
                      </Link>
                    </Box>
                    <Box
                      w="100%"
                      px="4"
                      borderBottom="1px solid"
                      borderColor="#F0F2F5"
                    >
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: "none" }}
                        onClick={resetEvent}
                      >
                        <PlusCircle />
                        <Text>Create events</Text>
                      </Link>
                      <Link
                        href="/app/overview"
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: "none" }}
                        onClick={resetEvent}
                      >
                        <Dashboard />
                        <Text>Dashboard</Text>
                      </Link>
                    </Box>
                    <Box w="100%" px="4">
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: "none" }}
                        onClick={resetEvent}
                      >
                        <Settings />
                        <Text>Account Settings</Text>
                      </Link>
                      <Text
                        display="flex"
                        gap="3"
                        py="2"
                        cursor="pointer"
                        onClick={signOut}
                      >
                        <SignOut />
                        <Text as="span">Log out</Text>
                      </Text>
                    </Box>
                  </Box>
                </Fade>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        position="fixed"
        top="88px"
        right="0"
        left="0"
        display="flex"
        alignItems="center"
        backgroundColor="gray.100"
        h={{ base: "72px", lg: "100px" }}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderColor="gray.300"
        px={6}
        zIndex="10"
      >
        <Container>
          <Heading
            as="h1"
            display={{ base: "none", lg: "block" }}
            fontSize="6xl"
            fontWeight={700}
            color="gray.800"
          >
            Event creation
          </Heading>
          <Box display={{ base: "flex", lg: "none" }} gap={6}>
            <Box onClick={() => setMobileToggle(true)}>
              <Hamburger />
            </Box>
            <Box display="inline-flex" gap={2}>
              {steps.map((step, i) => (
                <Text
                  key={step.stepInfo}
                  display={activeStepColor + 1 === i + 1 ? "flex" : "none"}
                  gap={2}
                >
                  <Text as="span" fontSize="sm" color="gray.500">
                    {step.stepNumber}/
                  </Text>
                  <Text
                    as="span"
                    fontSize="md"
                    color="gray.800"
                    fontWeight="semibold"
                  >
                    {step.stepInfo}
                  </Text>
                </Text>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        p={6}
        marginTop={{ base: "160px", lg: "188px" }}
        flex="1"
        overflow={{ base: "visible", lg: "hidden" }}
      >
        <Container heightSize="100%">
          <Box display="flex" h="100%" gap={{ base: "0", lg: 8 }}>
            <Box display={{ base: "block", lg: "none" }}>
              <Slide direction="left" in={mobileToggle} style={{ zIndex: 10 }}>
                <SideNav
                  activeStep={activeStepColor}
                  height="100vh"
                  width="370px"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={6}
                  >
                    <Text fontSize="lg" fontWeight="semibold">
                      Create event
                    </Text>
                    <Box w={6} h={6} onClick={() => setMobileToggle(false)}>
                      <CloseIcon />
                    </Box>
                  </Box>
                </SideNav>
              </Slide>
            </Box>
            <Box display={{ base: "none", lg: "block" }} w="286px">
              <SideNav
                activeStep={activeStepColor}
                height="100%"
                width="100%"
              />
            </Box>
            <Box
              w="100%"
              px={5}
              css={{
                "&::-webkit-scrollbar": {
                  width: "0",
                },
              }}
              overflowY="auto"
              padding="2"
            >
              {children}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        borderTop="1px solid"
        borderColor="gray.300"
        py={3}
        px={6}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="flex-end"
            gap="14px"
            alignItems="center"
          >
            <Button
              display={activeStepColor > 0 ? "inline-flex" : "none"}
              variant="secondary"
              size="lg"
              onClick={() => prevStep()}
            >
              Discard
            </Button>
            {activeStepColor === steps.length - 1 && (
              <Button
                leftIcon={<Rocket />}
                size="lg"
                variant="accent"
                onClick={editEvent}
              >
                Update Event
              </Button>
            )}
            {activeStepColor !== steps.length - 1 && (
              <Button
                variant="primary"
                type="submit"
                size="lg"
                onClick={nextStep}
              >
                Save and continue
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
