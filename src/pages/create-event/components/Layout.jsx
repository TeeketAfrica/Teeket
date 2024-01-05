import { useState } from 'react';
import {
  Slide,
  Fade,
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import Logo from '../../../assets/img/brandLogo.png';
import Avatar from '../../../assets/img/Avatars.png';
import Preview from '../../../assets/icon/eye.svg';
import CloseIcon from '../../../assets/icon/CloseButton.svg';
import Rocket from '../../../assets/icon/rocket-alt.svg';
import Hamburger from '../../../assets/icon/Hamburger.svg';
import Ticket from '../../../assets/icon/Ticket.svg';
import PlusCircle from '../../../assets/icon/PlusCircle.svg';
import Dashboard from '../../../assets/icon/Dashboard.svg';
import Settings from '../../../assets/icon/Settings.svg';
import SignOut from '../../../assets/icon/SignOut.svg';
import Container from '../../../components/ui/Container';
import SideNav from './SideNav';

const Layout = ({ children, activeStepColor, nextStep, prevStep }) => {
  //   const [stepColor, setstepColor] = useState(0);

  //   useEffect(() => {}, [third]);

  const [mobileToggle, setMobileToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);

  const steps = [
    {
      stepNumber: 1,
      stepInfo: 'Basic info',
    },
    {
      stepNumber: 2,
      stepInfo: 'Event details',
    },
    {
      stepNumber: 3,
      stepInfo: 'Tickets',
    },
    {
      stepNumber: 4,
      stepInfo: 'Publish event',
    },
  ];

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      w="100%"
      h="100vh"
      overflow={{ base: 'visible', lg: 'hidden' }}
      isolation="isolate"
    >
      <Box
        position="fixed"
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
            <Box w="119px">
              <Image src={Logo} alt="logo" />
            </Box>
            <Box display="flex" alignItems="center" gap={{ base: 6, lg: 8 }}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                display="flex"
                alignItems="center"
                color="gray.700"
                gap={2}
              >
                <Image src={Preview} alt="logo" />
                <Text as="span" display={{ base: 'none', lg: 'inline' }}>
                  Preview event
                </Text>
              </Text>
              <Box>
                <Button
                  type="button"
                  size="sm"
                  isDisabled={activeStepColor !== steps.length - 1}
                  gap={2}
                >
                  <Image src={Rocket} alt="logo" />
                  <Text display={{ base: 'none', lg: 'inline' }}>
                    Publish Event
                  </Text>
                </Button>
              </Box>
              <Box position="relative" w={10} h={10}>
                <Box
                  cursor="pointer"
                  onClick={() => setMenuToggle((prev) => !prev)}
                >
                  <Image src={Avatar} alt="logo" />
                </Box>
                <Fade in={menuToggle}>
                  <Box
                    position="absolute"
                    right="0"
                    top="50px"
                    display="flex"
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
                        Solomonteeket@gmail.com
                      </Text>
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Image src={Ticket} alt="icon" />
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
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Image src={PlusCircle} alt="icon" />
                        <Text>Create events</Text>
                      </Link>
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Image src={Dashboard} alt="icon" />
                        <Text>Dashboard</Text>
                      </Link>
                    </Box>
                    <Box w="100%" px="4">
                      <Link
                        href=""
                        display="flex"
                        gap="3"
                        py="2"
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Image src={Settings} alt="icon" />
                        <Text>Account Settings</Text>
                      </Link>
                      <Text display="flex" gap="3" py="2" cursor="pointer">
                        <Image src={SignOut} alt="icon" />
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
        h={{ base: '72px', lg: '100px' }}
        borderBottom={{ base: '1px solid', lg: 'none' }}
        borderColor="gray.300"
        px={6}
        zIndex="-1"
      >
        <Container>
          <Heading
            as="h1"
            display={{ base: 'none', lg: 'block' }}
            fontSize="6xl"
            fontWeight={700}
            color="gray.800"
          >
            Event creation
          </Heading>
          <Box display={{ base: 'flex', lg: 'none' }} gap={6}>
            <Box onClick={() => setMobileToggle(true)}>
              <Image src={Hamburger} alt="Icon" />
            </Box>
            <Box display="inline-flex" gap={2}>
              {steps.map((step, i) => (
                <Text
                  key={step.stepInfo}
                  display={activeStepColor + 1 === i + 1 ? 'flex' : 'none'}
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
        marginTop={{ base: '160px', lg: '188px' }}
        flex="1"
        overflow={{ base: 'visible', lg: 'hidden' }}
      >
        <Container heightSize="100%">
          <Box display="flex" h="100%" gap={{ base: '0', lg: 8 }}>
            <Box display={{ base: 'block', lg: 'none' }}>
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
                      <Image src={CloseIcon} alt="icon" w="full" />
                    </Box>
                  </Box>
                </SideNav>
              </Slide>
            </Box>
            <Box display={{ base: 'none', lg: 'block' }} w="286px">
              <SideNav
                activeStep={activeStepColor}
                height="100%"
                width="100%"
              />
            </Box>
            <Box
              w="100%"
              css={{
                '&::-webkit-scrollbar': {
                  width: '0',
                },
              }}
              overflowY="auto"
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
              display={activeStepColor > 0 ? 'inline-flex' : 'none'}
              variant="secondary"
              size="lg"
              onClick={() => prevStep()}
            >
              Discard
            </Button>
            {activeStepColor === steps.length - 1 ? (
              <Button
                leftIcon={<Image src={Rocket} alt="logo" />}
                size="lg"
                variant="accent"
              >
                Publish Event
              </Button>
            ) : (
              <Button size="lg" onClick={() => nextStep()}>
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
