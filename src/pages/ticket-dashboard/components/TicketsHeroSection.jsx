import { Box, HStack, Heading } from "@chakra-ui/react";
import YellowRectangle from "../../../assets/icon/YellowRectangle.svg";

const TicketsHeroSection = () => {
  return (
    <section>
      <Box>
        <HStack h="335px" w="full" spacing={8} alignItems="center">
          <Heading fontSize={{ base: 32, md: 56 }} fontWeight={700} textAlign="center" paddingX={5}>
            My tickets
          </Heading>
          <YellowRectangle />
        </HStack>
      </Box>
    </section>
  );
};

export default TicketsHeroSection;
