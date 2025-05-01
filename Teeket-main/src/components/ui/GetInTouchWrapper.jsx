import {
    VStack,
    Box,
    Text,
    Heading,
} from "@chakra-ui/react";
import Container from "./Container";
import GetInTouch from "./GetInTouch";

const GetInTouchWrapper = () => {
    return (
        <Box
            backgroundColor="black"
            color="#EAECF0"
            textAlign="center"
            py={{ base: "11", md: "13" }}
        >
            <Container padding={"16px"}>
                <VStack gap={{ base: "10", md: "11" }}>
                    <VStack gap="3">
                        <Text
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight="semibold"
                            lineHeight={{ base: "5", md: "6" }}
                        >
                            Contact us
                        </Text>
                        <Heading
                            as="h3"
                            pb={{ base: "1", md: "2" }}
                            fontWeight="semibold"
                            fontSize={{ base: "30px", md: "5xl" }}
                            lineHeight={{ base: "38px", md: "44px" }}
                            color="white"
                        >
                            Get in touch
                        </Heading>
                        <Text
                            fontWeight="normal"
                            fontSize={{ base: "lg", md: "xl" }}
                            lineHeight={{ base: "28px", md: "30px" }}
                        >
                            Our friendly team is always here to chat.
                        </Text>
                    </VStack>
                    <GetInTouch />
                </VStack>
            </Container>
        </Box>
    )
}

export default GetInTouchWrapper