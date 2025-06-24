import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import Container from "../../../components/ui/Container";
import EventBg from "../../../assets/img/eventsBg.png";
import YellowRectangle from "../../../assets/icon/YellowRectangle.svg";

const EventCategoryHeroSection = ({ eventType }) => {
  return (
    <section style={{width: "100%"}}>
      <Box>
        <Box
          bgImage={`url(${EventBg})`}
          bgSize="cover"
          bgPosition="bottom right"
          h="425px"
        >
          <Container>
            <HStack h="425px" w="full" spacing={8} alignItems="center">
            <Heading
              fontSize={{ base: 32, md: 56 }}
              fontWeight={700}
              textAlign="center"
            >
              <Text as="span" textTransform="capitalize">
                {eventType ? eventType : "Trending"}
              </Text>{" "}
              events
            </Heading>
              <YellowRectangle />
            </HStack>
            <Divider />
          </Container>
        </Box>
      </Box>
    </section>
  );
};

export default EventCategoryHeroSection;
