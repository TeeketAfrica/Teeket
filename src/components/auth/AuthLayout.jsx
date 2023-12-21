/* eslint-disable react/prop-types */
import { HStack, VStack, Box, Flex, Text } from '@chakra-ui/layout';
import { Link, Avatar } from '@chakra-ui/react';
// import RightPanel from '../../assets/img/RightPanel.png';
import loginBackground from '../../assets/img/loginBackground.png';
import createBackground from '../../assets/img/createBackground.png';
import lightLogo from '../../assets/img/lightLogo.png';
import brandLogo from '../../assets/img/brandLogo.png';
import mockOne from '../../assets/img/mockOne.png';
import mockTwo from '../../assets/img/mockTwo.png';
import mockThree from '../../assets/img/mockThree.png';
import designerAvatar from '../../assets/img/designerAvatar.png';
// import RightPanel2 from '../../assets/img/RightPanel2.png';
import { Image } from '@chakra-ui/image';
import { useLocation } from 'react-router';

const AuthLayout = ({ children }) => {
  const location = useLocation();

  return (
    // <Box
    //   maxW="1512px"
    //   mx="auto"
    //   w="100%"
    //   h="100vh"
    //   p={8}
    //   display={{ base: 'grid', md: 'flex' }}
    //   gap="26px"
    // >
    //   <Box
    //     display="flex"
    //     flexDirection="column"
    //     justifyContent="center"
    //     alignItems="center"
    //     maxW="711px"
    //     w="100%"
    //   >
    //     <Box maxW="454px" w="100%">
    //       {children}
    //     </Box>
    //   </Box>
    //   <Box
    //     h="100%"
    //     display={{ base: 'none', md: 'block' }}
    //     maxW="711px"
    //     w="100%"
    //   >
    //     {location.pathname === '/auth/create-account' ? (
    //       <Image src={RightPanel2} h="100%" />
    //     ) : (
    //       <Image src={RightPanel} h="100%" />
    //     )}
    //   </Box>
    // </Box>
    <Box as="main" p={{ base: '6', md: '8' }} w="100%" h="100vh">
      <Flex
        as="section"
        columnGap={26}
        flexDirection={{ base: 'column', md: 'row' }}
        h="100%"
      >
        <Flex flex="1" placeItems="center">
          <Box flex="1" maxW="454px" mx="auto">
            {children}
          </Box>
        </Flex>

        <Box
          display={{ base: 'none', lg: 'block' }}
          flex="1"
          borderRadius="30px"
          overflow="hidden"
          backgroundImage={`url(${
            location.pathname === '/auth/create-account'
              ? createBackground
              : loginBackground
          })`}
          backgroundColor="rgba(102, 204, 102, 0.70)"
          backgroundSize="cover"
          backgroundBlendMode="luminosity"
        >
          {location.pathname === '/auth/create-account' ? (
            <VStack
              p={{ md: '30px', xl: '60px' }}
              h="100%"
              alignItems="start"
              gap="68px"
            >
              <Link href="/">
                <Image src={brandLogo} alt="Logo" />
              </Link>

              <Text
                as="h2"
                color="gray.800"
                fontSize={{ md: '5xl', lg: '6xl', '2xl': '7xl' }}
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="none"
                maxW="12ch"
              >
                Endless events at your finger tip
              </Text>

              <Box
                mt="auto"
                p="6"
                border="2px"
                borderColor="border"
                borderStyle="dashed"
                borderRadius="20px"
                backdropFilter="blur(50px)"
              >
                <Text color="#FFFFFFE5" fontSize="md" fontWeight="normal">
                  Teeket has really transformed how I make use of ticketing
                  apps, it’s really seemless to use and find events I want to
                  attend or host. I will totally recommend it to any organizer
                  to create and manage their events with Teeket Africa
                </Text>
                <HStack mt="4">
                  <Avatar
                    src={designerAvatar}
                    name="Solomon Rotimi"
                    w="40px"
                    h="40px"
                    border="2px"
                    borderColor="gray.300"
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="#FFFFFFE5">
                      Solomon Rotimi
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" color="#FFFFFF80">
                      Product designer
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          ) : (
            <VStack
              position="relative"
              isolation="isolate"
              p={{ md: '30px', xl: '60px' }}
              h="100%"
              alignItems="start"
              gap={{ md: '106px', lg: '160px' }}
            >
              <Link href="/">
                <Image src={lightLogo} alt="Logo" />
              </Link>
              <Text
                as="h2"
                color="white"
                fontSize={{ md: '5xl', lg: '6xl', '2xl': '7xl' }}
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="none"
              >
                Experience something amazing. That event is waiting for you
              </Text>

              <Box
                position="absolute"
                zIndex="-1"
                right={{ md: '30px', xl: '60px' }}
                bottom="200px"
              >
                <Avatar
                  src={mockOne}
                  name="mock image"
                  w="77px"
                  h="77px"
                  border="2px"
                  borderColor="gray.300"
                />
              </Box>
              <Box
                position="absolute"
                zIndex="-1"
                left="50%"
                transform="translateX(-50%)"
                top="135px"
              >
                <Avatar
                  src={mockTwo}
                  name="mock image"
                  w="77px"
                  h="77px"
                  border="2px"
                  borderColor="gray.300"
                />
              </Box>
              <Box
                position="absolute"
                zIndex="-1"
                left={{ md: '30px', xl: '60px' }}
                bottom={{ md: '30px', xl: '60px' }}
              >
                <Avatar
                  src={mockThree}
                  name="mock image"
                  w="77px"
                  h="77px"
                  border="2px"
                  borderColor="gray.300"
                />
              </Box>
            </VStack>
          )}
        </Box>

        {/* {location.pathname === '/auth/create-account' ? (
          <Box
            display={{ base: 'none', lg: 'block' }}
            flex="1"
            borderRadius="30px"
            overflow="hidden"
            backgroundImage={`url(${createBackground})`}
            backgroundSize="cover"
          ></Box>
        ) : (
          <Box
            display={{ base: 'none', lg: 'block' }}
            flex="1"
            borderRadius="30px"
            overflow="hidden"
            backgroundImage={`url(${loginBackground})`}
            backgroundColor="rgba(102, 204, 102, 0.70)"
            backgroundSize="cover"
            backgroundBlendMode="luminosity"
          >
            <VStack
              position="relative"
              isolation="isolate"
              p={{ md: '30px', xl: '60px' }}
              h="100%"
              alignItems="start"
              gap={{ md: '106px', lg: '160px' }}
            >
              <Link href="/">
                <Image src={lightLogo} alt="Logo" />
              </Link>
              <Text
                color="white"
                fontSize={{ md: '5xl', lg: '6xl', '2xl': '7xl' }}
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="none"
              >
                Experience something amazing. That event is waiting for you
              </Text>

              <Box
                position="absolute"
                zIndex="-1"
                right={{ md: '30px', xl: '60px' }}
                bottom="200px"
              >
                <Image
                  src={mockOne}
                  alt="mock-image"
                  w="77px"
                  h="77px"
                  borderRadius="full"
                  border="2px"
                  borderColor="gray.300"
                  objectFit="cover"
                />
              </Box>
              <Box
                position="absolute"
                zIndex="-1"
                left="50%"
                transform="translateX(-50%)"
                top="135px"
              >
                <Image
                  src={mockTwo}
                  alt="mock-image"
                  w="77px"
                  h="77px"
                  borderRadius="full"
                  border="2px"
                  borderColor="gray.300"
                  objectFit="cover"
                />
              </Box>
              <Box
                position="absolute"
                zIndex="-1"
                left={{ md: '30px', xl: '60px' }}
                bottom={{ md: '30px', xl: '60px' }}
              >
                <Image
                  src={mockThree}
                  alt="mock-image"
                  w="77px"
                  h="77px"
                  borderRadius="full"
                  border="2px"
                  borderColor="gray.300"
                  objectFit="cover"
                />
              </Box>
            </VStack>
          </Box>
        )} */}
      </Flex>
    </Box>
  );
};

export default AuthLayout;
