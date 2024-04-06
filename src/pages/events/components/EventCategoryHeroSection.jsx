import { Box, Divider, HStack, Heading, Image } from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import EventBg from "../../../assets/img/eventsBg.png";
import YellowRectangle from "../../../assets/icon/YellowRectangle.svg";

const EventCategoryHeroSection = () => {
  return (
    <section>
      <Box>
        <Box
          bgImage={`url(${EventBg})`}
          bgSize="cover"
          bgPosition="bottom right"
          h="425px"
          mr="-100px"
        >
          <Box px={109}>
            <Container>
              <HStack h="425px" w="full" spacing={8} alignItems="center">
                <Heading fontSize={56} fontWeight={700} textAlign="center">
                  Trending events
                </Heading>
                <Image src={YellowRectangle} alt="yellow" />
              </HStack>
              <Divider />
            </Container>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default EventCategoryHeroSection;
