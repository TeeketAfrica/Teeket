import { Grid, VStack, Box, Text, Heading, Link } from "@chakra-ui/react";
import MailIcon from "@/assets/icon/MailIcon.svg";
import PhoneIcon from "@/assets/icon/Phone.svg";
import LocationIcon from "@/assets/icon/Location.svg";
import Container from "@/components/ui/Container";

const GetInTouch = () => {
  const ContactInfo = [
    {
      type: "email",
      content: "Our friendly team is here to help.",
      address: "info@teeketafrica.com",
    }
  ];
  const iconMap = {
    email: <MailIcon fillColor="#ffffff" size="24px" />,
    office: <LocationIcon />,
    phone: <PhoneIcon />,
  };

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
          <Grid
            templateColumns={{
              base: "1fr"
            }}
            alignItems="center"
            width="100%"
            gap="9"
          >
            {ContactInfo.map((data) => (
              <VStack
                key={data.type}
                gap={["4", "5"]}
                maxWidth="360px"
                marginX="auto"
              >
                <Box
                  p="12px"
                  backgroundColor="gray.600"
                  border="8px solid"
                  borderColor="gray.400"
                  borderRadius="full"
                >
                  {iconMap[data.type]}
                </Box>
                <VStack gap={["1", "2"]}>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize={["lg", "xl"]}
                    lineHeight={["7", "30px"]}
                    textTransform="capitalize"
                  >
                    {data.type}
                  </Text>
                  <Text
                    color="#EAECF0"
                    fontWeight="normal"
                    fontSize="md"
                    lineHeight="6"
                  >
                    {data.content}
                  </Text>
                </VStack>
                {data.type === "email" ? (
                  <Link
                    href={`mailto:${data.address}`}
                    _hover={{ textDecoration: "none" }}
                    fontWeight="semibold"
                    fontSize="md"
                    lineHeight="6"
                  >
                    {data.address}
                  </Link>
                ) : (
                  <Text fontWeight="semibold" fontSize="md" lineHeight="6">
                    {data.address}
                  </Text>
                )}
              </VStack>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default GetInTouch;
