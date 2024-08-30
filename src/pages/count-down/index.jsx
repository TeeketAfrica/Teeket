import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Container from "../../components/ui/Container";
import Masonry from "../home/components/Masonry";
import BrandLogo from "../../assets/img/brandLogo.png";
import EventBg from "../../assets/img/eventsBg.png";
import Masonry1 from "../../assets/img/masonry_1.webp";
import Masonry2 from "../../assets/img/masonry_2.webp";
import Masonry3 from "../../assets/img/masonry_3.webp";
import Masonry4 from "../../assets/img/masonry_4.webp";
import Masonry5 from "../../assets/img/masonry_5.webp";
import Masonry6 from "../../assets/img/masonry_6.webp";
import Masonry7 from "../../assets/img/masonry_7.webp";
import Masonry8 from "../../assets/img/masonry_8.webp";
import LogoBlack from "../../assets/icon/LogoBlack.svg";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { authApi } from "../../utils/api";
import { SOCIAL_LINKS } from "../../utils/constants";

export const Index = () => {
  // const targetDate = new Date("2024-04-31T23:59:59");
  // const timeLeft = CountdownTimer({ targetDate });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [participant, setParticipant] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleWaitList = async () => {
    try {
      setEmailError("");

      if (participant.trim() === "") {
        setEmailError("Email address is required");
        return;
      }

      if (!isValidEmail(participant)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      const response = await authApi.post("/wait_list", {
        email: participant,
      });

      onOpen();
      setParticipant("");

      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };
  // /accounts/wait_list
  return (
    <>
      <SuccessModal isOpen={isOpen} onClose={onClose} />
      <Container padding="16px">
        <Stack height="100dvh" justifyContent="space-between">
          <header>
            <Box py={6}>
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
                <HStack spacing={6}>
                  <Link to="/auth/login">
                    <Button variant="accent" size="sm">
                      Sign up
                    </Button>
                  </Link>
                </HStack>
              </Stack>
            </Box>
          </header>
          <main>
            <Box
              position="relative"
              width={{ base: "100%", md: "60%" }}
              mx="auto"
              overflow="hidden"
              bgImage={`url(${EventBg})`}
              bgSize="cover"
              bgPosition="bottom center"
              // pt="11"
            >
              <Box
                position="absolute"
                width="200px"
                height="567px"
                top="-50px"
                left="-100px"
                backgroundColor="white"
                filter="blur(26px)"
                zIndex={4}
              />
              <Box
                overflowX="auto"
                overflowY="hidden"
                css={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <HStack
                  width="800px"
                  height="100%"
                  gap="7"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="flex-end"
                >
                  <Masonry
                    image={Masonry8}
                    height="128px"
                    width="90px"
                    marginBottom="34px"
                  />
                  <VStack gap={{ base: "8px", md: "23px" }}>
                    <Masonry image={Masonry1} height="76px" width="90px" />
                    <Masonry image={Masonry4} height="99px" width="90px" />
                  </VStack>
                  <Masonry image={Masonry2} height="123px" width="90px" />
                  <Masonry image={Masonry5} height="156px" width="90px" />
                  <VStack gap={{ base: "8px", md: "23px" }}>
                    <Masonry image={Masonry3} height="112px" width="90px" />
                    <Masonry image={Masonry6} height="52px" width="90px" />
                  </VStack>
                  <Masonry
                    image={Masonry7}
                    height="122px"
                    width="90px"
                    marginBottom="9"
                  />
                </HStack>
              </Box>
              <Box
                position="absolute"
                width="211px"
                height="567px"
                top="-50px"
                right="-100px"
                backgroundColor="white"
                filter="blur(26px)"
                zIndex={4}
              />
            </Box>
            <Text
              as="h1"
              fontWeight="bold"
              fontStyle="italic"
              fontSize={{ base: "3xl", md: "8xl" }}
              lineHeight={{ base: "34px", md: "56px" }}
              bgGradient="linear(to-r, #06CC06, #C2F2C2)"
              bgClip="text"
              maxWidth="18ch"
              mx="auto"
              marginTop="5"
              textAlign="center"
            >
              Endless events{" "}
              <Text
                as="span"
                fontStyle="normal"
                fontSize={{ md: "7xl" }}
                lineHeight={{ md: "10" }}
                color="gray.800"
              >
                at your fingertips. No more queues!
              </Text>
            </Text>
            <Text
              fontWeight="normal"
              fontSize={{ base: "sm", md: "lg" }}
              lineHeight={{ base: "5", md: "7" }}
              color="gray.600"
              textAlign="center"
              maxWidth="54ch"
              marginX="auto"
              marginY="6"
            >
              There&apos;s something for everyone. We&apos;re connecting people
              through shared experiences and transforming the entertainment
              industry. Join the wait-list to be the first to experience it all.
            </Text>

            <Center>
              <Box maxW="525px" w="full">
                <Flex
                  w="full"
                  border="1px solid"
                  borderColor="gray.400"
                  borderRadius="6"
                  _hover={{
                    borderColor: "gray.500",
                    boxShadow: "0px 0px 1px 4px #CBD1CB",
                  }}
                >
                  <Input
                    type="email"
                    border="none"
                    outline="none"
                    size="lg"
                    _hover={{
                      borderColor: "none",
                    }}
                    _focusVisible={{
                      borderColor: "none",
                      boxShadow: "none",
                    }}
                    placeholder="Email address"
                    value={participant}
                    onChange={(e) => setParticipant(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    borderRadius={6}
                    width="35%"
                    size="lg"
                    onClick={handleWaitList}
                  >
                    Join wait list
                  </Button>
                </Flex>
                {emailError && (
                  <Text mt="2" color="red.500" fontSize="sm">
                    {emailError}
                  </Text>
                )}
              </Box>
            </Center>
          </main>
          <footer>
            <Stack
              direction={["column", "row"]}
              bgColor="gray.200"
              borderRadius="10px"
              justifyContent="space-between"
              alignItems="center"
              gap="32px"
              py="28px"
              px="32px"
              my={10}
            >
              <HStack spacing={6}>
                {SOCIAL_LINKS.map(({ link, icon: Icon }, i) => (
                  <Link key={i} href={link} target="_blank">
                    <Icon />
                  </Link>
                ))}
              </HStack>
              <Text fontSize="sm">
                © 2024 Teeket Africa. All rights reserved.
              </Text>
              <LogoBlack />
            </Stack>
          </footer>
        </Stack>
      </Container>
    </>
  );
};

export default Index;
