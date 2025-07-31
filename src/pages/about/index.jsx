import {
  Box,
  VStack,
  Text,
  Heading,
  Image,
  Card,
  CardBody,
  Center,
  SimpleGrid,
  HStack,
  Flex,
  Grid,
} from "@chakra-ui/react";
import Footer from "@/components/layouts/Footer";
import GetInTouch from "@/components/shared/GetInTouch";
import aboutHero from "@/assets/img/about-hero.png";
import aboutPatternBg from "@/assets/img/about-pattern-bg.png";
import aboutStand1 from "@/assets/img/about-stand1.png";
import aboutStand2 from "@/assets/img/about-stand2.png";
import aboutStand3 from "@/assets/img/about-stand3.png";
import aboutStand4 from "@/assets/img/about-stand4.png";
import aboutFindus1 from "@/assets/img/about-findus1.png";
import aboutFindus2 from "@/assets/img/about-findus2.png";
import aboutFindus3 from "@/assets/img/about-findus3.png";
import EventBg from "@/assets/img/eventsBg.png";
import EdaraImg from "@/assets/img/Edara.jpg";
import HuzzyImg from "@/assets/img/Huzzy.jpg";
import PreciousImg from "@/assets/img/Precious.jpg";
import PeterImg from "@/assets/img/Peter.jpg";
import MichaelImg from "@/assets/img/Michael.png";
import TimmyImg from "@/assets/img/Timmy.jpg";
import SololinksImg from "@/assets/img/designerAvatar.png";

import ContactFooter from "../../components/layouts/ContactFooter";
import { Faq } from "../../components/shared/Faq";
import Container from "../../components/ui/Container";

const AboutPage = () => {
  const features = [
    {
      icon: aboutStand1,
      title: "Intentional Experiences, Not Just Tickets",
    },
    {
      icon: aboutStand2,
      title: "Emotional Intelligence Over Empty Engagement",
    },
    {
      icon: aboutStand3,
      title: "Solo-Friendly, Community-First",
    },
    {
      icon: aboutStand4,
      title: "African-Rooted, Globally Aware",
    },
  ];

  const userTypes = [
    {
      title: "Event creators",
      description: "Host, grow, and engage your community like never before",
      image: aboutFindus1,
    },
    {
      title: "Brands & Companies",
      description:
        "Long-term experiences for internal teams and external communities",
      image: aboutFindus2,
    },
    {
      title: "Everyday explorers",
      description:
        "Show up, even if it’s just you. Especially if it’s just you.",
      image: aboutFindus3,
    },
  ];

  const teamMembers = [
    {
      name: "Precious Lawrenson",
      role: "Branding & Marketing",
      image: PreciousImg,
    },
    { name: "Hussein", role: "Backend Developer", image: HuzzyImg },
    { name: "Edara", role: "Project Manager", image: EdaraImg },
    { name: "Solomon", role: "Product Designer", image: SololinksImg },
    { name: "Ogbonnaya Peter", role: "Frontend Developer", image: PeterImg },
    {
      name: "Oluwole Daniel Oluwatimileyin",
      role: "Frontend Developer",
      image: TimmyImg,
    },
    { name: "Michael", role: "Frontend Developer", image: MichaelImg },
    // { name: "Precious Lawrenson", role: "Developer", image: "" },
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <Center>
          <Box w="100%" py="80px">
            <Container maxW="1200px" px="16px">
              <VStack spacing="8" textAlign="center" mb="10">
                <Heading
                  as="h1"
                  fontWeight="bold"
                  fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                  lineHeight={{ base: "1.1", md: "1.1" }}
                  color="gray.800"
                >
                  You weren't meant to <br />
                  go through life{" "}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                    bgClip="text"
                    fontStyle="italic"
                  >
                    Alone
                  </Text>
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.600"
                  maxW="600px"
                  lineHeight="1.6"
                >
                  Life events build us, shape us and become a big piece of our
                  story. Our mission is to help you find and create those
                  moments that matter, and to do so, in comfort, in flow.
                </Text>
              </VStack>

              {/* Event Images Collage */}
              <Center>
                <Box maxW="600px" position="relative">
                  <Image
                    src={aboutHero || "/placeholder.svg"}
                    alt="Event collage showing various events and experiences"
                    w="100%"
                    h="auto"
                    borderRadius="lg"
                  />
                </Box>
              </Center>
            </Container>
          </Box>
        </Center>
        {/* Where Technology Meets Humanity Section */}
        <Box py="20" bg="gray.200">
          <Container padding="16px">
            <HStack
              align="start"
              flexWrap={"wrap"}
              justifyContent="space-between"
              gap={[4, 4, 10]}
              w="100%"
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                color="gray.800"
                lineHeight="1.2"
                maxW="md"
              >
                Where Technology Meets Humanity
              </Heading>
              <Text fontSize="md" color="gray.600" maxW="xl" lineHeight="1.6">
                Teeket is a tribe tech platform that helps people find
                experiences that match who they are and who they’re becoming.
                Whether you show up solo or come with your crew, we turn events
                into opportunities to grow, heal, laugh, and be seen. From
                concerts to wellness circles, tech panels to dance classes, we
                empower creators, corporates, and communities to curate moments
                that matter.
              </Text>
            </HStack>

            <Box>
              <Text
                fontSize="lg"
                color="gray.600"
                lineHeight="1.6"
                my="6"
                fontWeight={600}
              >
                We stand for
              </Text>
              <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} gap="8" w="full">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    variant="outline"
                    boxShadow={"0px 0px 2px 8px #E7ECE7"}
                    bg="white"
                    borderRadius={"20px"}
                  >
                    <CardBody p="6">
                      <VStack align="start" spacing="4">
                        <Box w="60%">
                          <Image
                            src={feature.icon}
                            alt="feature"
                            w="100%"
                            h="100%"
                            objectFit="contain"
                          />
                        </Box>
                        <Text
                          fontWeight="semibold"
                          fontSize="md"
                          color="gray.800"
                          lineHeight="1.4"
                        >
                          {feature.title}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
            <Flex
              w="100%"
              minH={"200px"}
              bg={"#141714"}
              alignItems={"end"}
              justifyContent={"space-between"}
              flexDir={{ base: "column", md: "row" }}
              mt={6}
              borderRadius={"20px"}
              overflow={"hidden"}
            >
              <Box>
                <Image
                  src={aboutPatternBg}
                  alt="about"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
              <Box padding={8}>
                <Text color={"white"} maxW="md">
                  Teeket is for the makers, the faith-driven, the feelers, the
                  misfits, the future-focused. We’re here to humanize the
                  digital, and localize the global, starting with how we gather.
                </Text>
              </Box>
            </Flex>
          </Container>
        </Box>
        {/* Find Your Tribe Section */}
        <Box py="20">
          <Container padding="16px">
            <VStack spacing="12" textAlign="center">
              <VStack spacing="4">
                <Heading
                  as="h2"
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="bold"
                  color="gray.800"
                >
                  Find Your Tribe. <br />
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                    bgClip="text"
                    fontSize={{ base: "6xl", md: "7xl" }}
                    fontStyle="italic"
                  >
                    Build With Us.
                  </Text>
                </Heading>
                <Text fontSize="lg" color="gray.600" lineHeight="1.6">
                  Teeket is a tribe tech platform that helps people find
                  experiences that match who they are and who they’re becoming.
                  Whether you show up solo or come with your crew, we turn
                  events into opportunities to grow, heal, laugh, and be seen.
                  From concerts to wellness circles, tech panels to dance
                  classes, we empower creators, corporates, and communities to
                  curate moments that matter.
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="8" w="full">
                {userTypes.map((type, index) => (
                  <Card
                    key={index}
                    boxShadow={"0px 0px 2px 4px #000"}
                    borderRadius="xl"
                    overflow="hidden"
                    alignItems={"start"}
                  >
                    <CardBody p="4" w="100%" alignItems={"start"}>
                      <Flex
                        flexDirection={
                          index % 2 === 0 ? "column-reverse" : "column"
                        }
                        w="100%"
                      >
                        <Box textAlign={"left"}>
                          <Text
                            fontWeight="semibold"
                            fontSize="lg"
                            color="gray.800"
                          >
                            {type.title}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {type.description}
                          </Text>
                        </Box>
                        <VStack
                          flex={1}
                          pos={"relative"}
                          minH={"400px"}
                          justify="center"
                        >
                          <Box
                            w="200px"
                            zIndex={10}
                            overflow="hidden"
                            ml={index % 2 === 0 ? "auto" : ""}
                            my={4}
                          >
                            <Image
                              src={type.image}
                              alt={type.title}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                          <Box
                            pos={"absolute"}
                            top={index % 2 === 0 ? 0 : "70%"}
                            left={0}
                            w="150px"
                            h="150px"
                            p={4}
                            overflow="hidden"
                          >
                            <Image
                              src={EventBg}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
        {/* Divider */}
        <Box
          m={"16px"}
          maxW="1200px"
          borderTop={"1px"}
          borderColor={"gray.300"}
        />
        {/* Team Section */}
        <Box py="20">
          <Container padding="16px">
            <VStack spacing="12" textAlign="center">
              <VStack spacing="4">
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color="gray.800"
                >
                  the{" "}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                    bgClip="text"
                    fontSize={{ base: "5xl", md: "6xl" }}
                  >
                    Team
                  </Text>
                </Heading>
                <Text fontSize="lg" color="gray.600" maxW="600px">
                  Teeket is held by an amazing team of 8, growing and building a
                  platform for people to connect.
                </Text>
              </VStack>

              <Grid
                gridTemplateColumns={{
                  base: "1fr",
                  sm: "repeat(auto-fit, minmax(230px, 1fr))",
                }}
                justifyItems={"center"}
                alignItems={"center"}
                gap={8}
                w="full"
              >
                {teamMembers.map((member, index) => (
                  <VStack key={index} alignItems={"left"} textAlign={"left"}>
                    <Box
                      w="250px"
                      bg="gray.300"
                      aspectRatio={1}
                      overflow="hidden"
                      borderRadius="16px"
                    >
                      <Image
                        src={member.image}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <Box textAlign={"left"}>
                      <Text
                        fontWeight="semibold"
                        fontSize="md"
                        color="gray.800"
                      >
                        {member.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {member.role}
                      </Text>
                    </Box>
                  </VStack>
                ))}
              </Grid>
            </VStack>
          </Container>
        </Box>
        {/* FAQ Section */}
        <Faq />
        {/* Contact Section */}
        <GetInTouch />
        <ContactFooter />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
