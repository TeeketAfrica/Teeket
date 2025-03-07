import {
    AvatarGroup,
    Avatar,
    VStack,
    Box,
    Button,
    Text,
    Link,
} from "@chakra-ui/react";
import Container from "./Container";
import Faq1Image from "../../assets/img/faqs_1.webp";
import Faq2Image from "../../assets/img/faqs_2.webp";
import Faq3Image from "../../assets/img/faqs_3.webp";
import Faqs from "./Faqs";
const FaqWrapper = () => {
    return (
        <Box backgroundColor="gray.200" py={{ base: "11", md: "13" }}>
            <Container padding={"16px"}>
                <Faqs />
                <VStack
                    gap="8"
                    backgroundColor="gray.300"
                    minHeight="300px"
                    width="100%"
                    border="none"
                    borderRadius="16px"
                    padding="8"
                    textAlign="center"
                    mt={11}
                >
                    <AvatarGroup max={3}>
                        <Avatar
                            name="FAQ Image"
                            src={Faq2Image}
                            width="52px"
                            height="52px"
                        />
                        <Avatar
                            name="FAQ Image"
                            src={Faq1Image}
                            zIndex="4"
                            width="60px"
                            height="60px"
                        />
                        <Avatar
                            name="FAQ Image"
                            src={Faq3Image}
                            width="52px"
                            height="52px"
                        />
                    </AvatarGroup>

                    <VStack gap="2">
                        <Text
                            as="h3"
                            fontWeight="bold"
                            fontSize="2xl"
                            lineHeight="7"
                            color="gray.800"
                        >
                            Still have questions?
                        </Text>

                        <Text
                            fontWeight="normal"
                            fontSize="md"
                            lineHeight="6"
                            color="gray.600"
                        >
                            Can’t find the answer you’re looking for? Please chat to our
                            friendly team.
                        </Text>
                    </VStack>

                    <Button variant="accent" size="lg">
                        <Link href="/" _hover={{ textDecoration: "none" }}>
                            Get in Touch
                        </Link>
                    </Button>
                </VStack>
            </Container>
        </Box>
    )
}

export default FaqWrapper