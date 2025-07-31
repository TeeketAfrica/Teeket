import Footer from "@/components/layouts/Footer";
import { Faq } from "@/components/shared/Faq";
import GetInTouch from "@/components/shared/GetInTouch";

import EventBg from "@/assets/img/eventsBg.png";

import { Container, VStack, Text, Center, Box, Flex } from "@chakra-ui/react";
import ContactForm from "./components/ContactForm";
import ContactFooter from "../../components/layouts/ContactFooter";

const ContactPage = () => {
  return (
    <>
      <main>
        <Center>
          <Box
            bgImage={`url(${EventBg})`}
            bgSize="cover"
            bgPosition="bottom center"
            w="100%"
            pt="100px"
          >
            <Container padding="16px">
              <VStack gap="3" textAlign="center" marginBottom="10">
                <Text
                  as="h1"
                  fontWeight="semibold"
                  fontStyle="italic"
                  fontSize={{ base: "3xl", md: "8xl" }}
                  lineHeight={{ base: "34px", md: "56px" }}
                  bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                  bgClip="text"
                >
                  Get in touch{" "}
                  <Text
                    as="span"
                    fontStyle="normal"
                    fontSize={{ md: "7xl" }}
                    lineHeight={{ md: "10" }}
                    color="gray.800"
                  >
                    <br /> with our team
                  </Text>
                </Text>
                <Text
                  fontWeight="normal"
                  fontSize={{ base: "sm", md: "lg" }}
                  lineHeight={{ base: "5", md: "7" }}
                  color="gray.600"
                  maxWidth="54ch"
                  marginX="auto"
                >
                  We will help you find create the a perfect event or get the
                  best available ticket
                </Text>
              </VStack>
            </Container>
          </Box>
        </Center>
        <Flex flexDirection="column" alignItems="center">
          <Box w="100%" maxWidth="xl" pb="100px">
            <Container>
              <ContactForm />
            </Container>
          </Box>
        </Flex>
        <Faq />
        <GetInTouch />
        <ContactFooter border={false} />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
