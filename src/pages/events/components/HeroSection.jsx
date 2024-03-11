import { Box, Center, Heading, Text } from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import EventBg from "../../../assets/img/eventsBg.png";

const HeroSection = () => {
  return (
    <section>
      <Box>
        <Container>
          <Box px={109}>
            <Box
              bgImage={`url(${EventBg})`}
              bgSize="cover"
              bgPosition="bottom center"
              h="425px"
              w="100%"
            >
              <Box h="full" maxW="519px" w="full" mx="auto">
                <Center h="full" w="full">
                  <Heading fontSize={56} fontWeight={700} textAlign="center">
                    Browse
                    <Text
                      as="span"
                      fontStyle="italic"
                      bgGradient="linear(to-r, #06CC06, #C2F2C2)"
                      bgClip="text"
                    >
                      {" "}
                      events{" "}
                    </Text>
                    curated for you
                  </Heading>
                </Center>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default HeroSection;
