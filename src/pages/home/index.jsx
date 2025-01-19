import {
  Grid,
  Flex,
  HStack,
  VStack,
  Box,
  Image,
  Button,
  Text,
  Link,
  Center,
} from "@chakra-ui/react";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import Masonry from "./components/Masonry";
import Container from "../../components/ui/Container";
import Card from "./components/Card";
import {
  BrowseEventInfo,
  CatergoryInfo,
  StepsInfo,
} from "./config";
import Curves from "../../assets/icon/curves.svg";
import StepBackground from "../../assets/img/steps_bg.webp";
import EventBg from "../../assets/img/eventsBg.png";
import Masonry1 from "../../assets/img/masonry_1.webp";
import Masonry2 from "../../assets/img/masonry_2.webp";
import Masonry3 from "../../assets/img/masonry_3.webp";
import Masonry4 from "../../assets/img/masonry_4.webp";
import Masonry5 from "../../assets/img/masonry_5.webp";
import Masonry6 from "../../assets/img/masonry_6.webp";
import Masonry7 from "../../assets/img/masonry_7.webp";
import Masonry8 from "../../assets/img/masonry_8.webp";
import { useStorage } from "../../utils/storage";
import FaqWrapper from "../../components/ui/FaqWrapper";
import GetInTouchWrapper from "../../components/ui/GetInTouchWrapper";
import GridBg from "../../components/ui/GridBg";

const HomePage = () => {
  const { getAccessToken } = useStorage();
  const token = getAccessToken();

  return (
    <>
      <Header />
      <main>
        <Center>
          <Box
            bgImage={`url(${EventBg})`}
            bgSize="cover"
            bgPosition="bottom center"
            h="425px"
            w="100%"
            pt="100px"
          >
            <Container padding="16px">
              <GridBg
                colouredText={"Events"}
                firstSubHeading={'for everyone.'}
                secondSubHeading={'Browse, create, and share'}
                paragraph={'Say goodbye to event planning stress. Browse countless options, create events with ease, and manage everything in one place.'}
              />
              <HStack justifyContent="center" marginBottom="8" width="100%">
                <Link
                  href={token ? "/create-event" : "/auth/login"}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button variant="primary" size="lg">
                    Create events
                  </Button>
                </Link>
                <Link href="/events" _hover={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="lg">
                    Browse events
                  </Button>
                </Link>
              </HStack>
              <Box
                position="relative"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  width="211px"
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
                    width={{ base: "700px", md: "1216px" }}
                    height="100%"
                    gap="7"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Masonry
                      image={Masonry8}
                      height={{ base: "102px", md: "260px" }}
                      marginBottom="34px"
                    />
                    <VStack gap={{ base: "8px", md: "23px" }}>
                      <Masonry
                        image={Masonry1}
                        height={{ base: "63px", md: "155px" }}
                      />
                      <Masonry
                        image={Masonry4}
                        height={{ base: "82px", md: "203px" }}
                      />
                    </VStack>
                    <Masonry
                      image={Masonry2}
                      height={{ base: "102px", md: "249px" }}
                    />
                    <Masonry
                      image={Masonry5}
                      height={{ base: "128px", md: "317px" }}
                    />
                    <VStack gap={{ base: "8px", md: "23px" }}>
                      <Masonry
                        image={Masonry3}
                        height={{ base: "92px", md: "227px" }}
                      />
                      <Masonry
                        image={Masonry6}
                        height={{ base: "43px", md: "106px" }}
                      />
                    </VStack>
                    <Masonry
                      image={Masonry7}
                      height={{ base: "102px", md: "249px" }}
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
            </Container>
          </Box>
        </Center>
        {/* </main>
      <main> */}
        {/* Browse Events */}
        <Box
          paddingBottom={{ base: "11", md: "14" }}
          paddingTop={{ base: "88px", md: "450px" }}
        >
          <Container padding="16px">
            <Text
              as="h2"
              fontWeight="bold"
              fontSize={{ base: "xl", md: "6xl" }}
              lineHeight={{ base: "6", md: "10" }}
              textAlign="center"
              color="gray.800"
              maxWidth="35ch"
              marginX="auto"
            >
              With Teeket, we want you to get just what you need to browse and
              create events you love.
            </Text>

            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              alignItems="center"
              gap="6"
              marginTop={["8", "11"]}
            >
              {BrowseEventInfo.map((data) => (
                <Card key={data.title} width="389px" height="343px">
                  <VStack
                    justifyContent="space-between"
                    alignItems="flex-start"
                    paddingTop="37px"
                    paddingLeft="25px"
                    paddingRight="8"
                    width="100%"
                    height="100%"
                    overflow="hidden"
                  >
                    <VStack gap="2" alignItems="flex-start">
                      <Text
                        fontWeight="semibold"
                        fontSize="lg"
                        lineHeight="26px"
                        color="black"
                      >
                        {data.title}
                      </Text>
                      <Text
                        fontWeight="normal"
                        fontSize="md"
                        lineHeight="6"
                        color="gray.600"
                      >
                        {data.content}
                      </Text>
                    </VStack>

                    <Box
                      position="absolute"
                      bottom="-27px"
                      transform="rotate3d(1, 0, 1, -5deg)"
                      height="194px"
                      border="1px solid"
                      borderColor="rgba(20, 23, 20, 0.75)"
                      width="313px"
                      borderRadius="8px"
                      overflow="hidden"
                    >
                      <Image
                        src={`/src/assets/img/${data.imageName}.webp`}
                        alt="image"
                        objectFit="contain"
                      />
                    </Box>
                  </VStack>
                </Card>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Categories */}
        <VStack
          position="relative"
          backgroundColor="gray.800"
          width="100%"
          height="100%"
          minHeight={{ md: "1012px" }}
          justifyContent="flex-end"
          paddingTop="11"
          paddingBottom={["11", "106px"]}
        >
          <Box
            display={{ base: "none", md: "block" }}
            position="absolute"
            top="0"
            left="0"
            right="0"
          >
            <Curves />
          </Box>

          <Container padding="16px">
            <Flex
              direction={["column", "row"]}
              justifyContent="space-between"
              alignItems="center"
              gap="6"
              marginBottom="11"
            >
              <Text
                as="h3"
                color="white"
                textAlign={["center", "left"]}
                fontWeight="bold"
                fontSize={{ base: "2xl", md: "6xl" }}
                lineHeight={{ base: "6", md: "10" }}
                maxWidth={{ base: "100%", md: "15ch" }}
              >
                We have events in different categories
              </Text>
              <Link
                href="/auth/create-account"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="secondary" size="lg" width="210px">
                  Get Started
                </Button>
              </Link>
            </Flex>

            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              marginTop="8"
              alignItems="center"
              gap="6"
            >
              {CatergoryInfo.map((data) => (
                <Flex
                  key={data.title}
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  maxWidth={{ base: "140px", md: "285px" }}
                  height={{ base: "68px", md: "116px" }}
                  border="1px solid"
                  borderColor="white"
                  borderRadius="100px"
                  background={`linear-gradient(rgba(20, 23, 20, 0.8), rgba(20, 23, 20, 0.8)), url('/src/assets/img/${data.imageName}.webp')`}
                  backgroundSize="cover"
                  marginX="auto"
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "sm", md: "2xl" }}
                    lineHeight={{ base: "5", md: "7" }}
                    color="white"
                  >
                    {data.title}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Container>
        </VStack>

        {/* Steps */}
        <Box paddingY={{ base: "88px", md: "14" }}>
          <Container padding={"16px"}>
            <VStack gap="11">
              <Text
                as="h2"
                fontWeight="bold"
                fontSize={{ base: "xl", md: "5xl" }}
                lineHeight={{ base: "6", md: "44px" }}
                color="gray.800"
                maxWidth="26ch"
                marginX="auto"
                textAlign="center"
              >
                With 4 easy steps you can create your event and share to the
                world
              </Text>

              <Box width="100%">
                <Box
                  height="280px"
                  width="100%"
                  borderRadius="24px"
                  overflow="hidden"
                >
                  <Image
                    src={StepBackground}
                    alt="Image"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>

                <Grid
                  templateColumns={["1fr", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
                  marginTop="8"
                  alignItems="center"
                  columnGap="9"
                  rowGap="6"
                >
                  {StepsInfo.map(({ title, icon: Icon, id, content }) => (
                    <Card key={title} width="289px" height="240px">
                      <VStack
                        justifyContent="space-between"
                        padding="16px"
                        width="100%"
                        height="100%"
                      >
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize={["5xl"]}
                            lineHeight={["44px"]}
                            color="gray.600"
                          >
                            {id}/
                          </Text>
                          <Icon />
                        </HStack>

                        <VStack alignItems="flex-start" mt="auto" gap="10px">
                          <Text
                            fontWeight="semibold"
                            fontSize="lg"
                            lineHeight="26px"
                            color="black"
                          >
                            {title}
                          </Text>
                          <Text
                            fontWeight="normal"
                            fontSize="sm"
                            lineHeight="5"
                            color="gray.600"
                          >
                            {content}
                          </Text>
                        </VStack>
                      </VStack>
                    </Card>
                  ))}
                </Grid>
              </Box>

              <Link
                href="/auth/create-account"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="primary" size="lg" width="210px">
                  Get Started
                </Button>
              </Link>
            </VStack>
          </Container>
        </Box>

        {/* Frequently Asked Questions */}
        <FaqWrapper />

        {/* Get in touch */}
        <GetInTouchWrapper />
      </main>
      <Footer border={false} />
    </>
  );
};

export default HomePage;
