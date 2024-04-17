import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../../components/ui/Container";
import Masonry from "../home/components/Masonry";
import CountdownTimer from "./CountdownTimer";

import BrandLogo from "../../assets/img/brandLogo.png";
import EventBg from "../../assets/img/eventsBg.png";

export const Index = () => {
  const targetDate = new Date("2024-04-31T23:59:59");
  const timeLeft = CountdownTimer({ targetDate });
  return (
    <Container padding="16px">
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
          width="60%"
          height="20%"
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
                imageName="masonry_8"
                height="128px"
                width="90px"
                marginBottom="34px"
              />
              <VStack gap={{ base: "8px", md: "23px" }}>
                <Masonry imageName="masonry_1" height="76px" width="90px" />
                <Masonry imageName="masonry_4" height="99px" width="90px" />
              </VStack>
              <Masonry imageName="masonry_2" height="123px" width="90px" />
              <Masonry imageName="masonry_5" height="156px" width="90px" />
              <VStack gap={{ base: "8px", md: "23px" }}>
                <Masonry imageName="masonry_3" height="112px" width="90px" />
                <Masonry imageName="masonry_6" height="52px" width="90px" />
              </VStack>
              <Masonry
                imageName="masonry_7"
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
          maxWidth="54ch"
          marginX="auto"
          marginTop="2"
        >
          Be the first to experience the revolution in entertainment.
        </Text>
        <Center marginTop="4">
          <Button variant="primary" size="md">
            Sign up for early access
          </Button>
        </Center>
        <Flex gap="8" justifyContent="center">
          <VStack gap="1px">
            <Text as="span" fontSize={{ base: "3xl", md: "64px" }}>
              {timeLeft.days}
            </Text>
            <Text as="span" fontSize="sm" textTransform="capitalize">
              days
            </Text>
          </VStack>
          <VStack gap="1px">
            <Text as="span" fontSize={{ base: "3xl", md: "64px" }}>
              {timeLeft.hours}
            </Text>
            <Text as="span" fontSize="sm" textTransform="capitalize">
              hours
            </Text>
          </VStack>
          <VStack gap="1px">
            <Text as="span" fontSize={{ base: "3xl", md: "64px" }}>
              {timeLeft.minutes}
            </Text>
            <Text as="span" fontSize="sm" textTransform="capitalize">
              minutes
            </Text>
          </VStack>
          <VStack gap="1px">
            <Text as="span" fontSize={{ base: "3xl", md: "64px" }}>
              {timeLeft.seconds}
            </Text>
            <Text as="span" fontSize="sm" textTransform="capitalize">
              seconds
            </Text>
          </VStack>
        </Flex>
      </main>
    </Container>
  );
};

export default Index;
