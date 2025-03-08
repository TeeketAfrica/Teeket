import { Box, VStack } from "@chakra-ui/react";
import Footer from "../../components/layouts/Footer";
import Container from "../../components/ui/Container";
import Faqs from "../../components/ui/Faqs";
import GetInTouch from "../../components/ui/GetInTouch";
import GridBg from "../../components/ui/GridBg";
import EventBg from "../../assets/img/eventsBg.png";
import ContactForm from "../../components/ui/ContactForm";


const ContactUsPage = () => {
    return (
        <main>
            <Box
                bgImage={`url(${EventBg})`}
                bgSize="cover"
                bgPosition="bottom center"
                h={{ base: "280px", md: "350px" }}
                w="100%"
                pt="100px"
            >
                <Container padding="16px">
                    <GridBg
                        colouredText={"Get in touch "}
                        secondSubHeading={'with our team'}
                        paragraph={'We will help you find create the a perfect event or get the best available ticket'}
                    />
                </Container>
            </Box>

            <Box py={{ base: 6, md: 10 }}>
                <Container padding={"16px"}>
                    <ContactForm />
                </Container>
            </Box>
            <Box backgroundColor="gray.200" py={{ base: "11", md: "13" }}>
                <Container padding={"16px"}>
                    <Faqs />
                </Container>
            </Box>

            <Box
                backgroundColor="black"
                color="#EAECF0"
                textAlign="center"
                py={{ base: "11", md: "13" }}
            >
                <Container padding={"16px"}>
                    <VStack gap={{ base: "10", md: "11" }}>
                        <GetInTouch />
                    </VStack>
                </Container>
            </Box>
            <Footer />
        </main>
    )
};

export default ContactUsPage;
