import { Box, HStack, Heading, Image } from "@chakra-ui/react";
import YellowRectangle from "../../../assets/icon/YellowRectangle.svg";

const TicketsHeroSection = () => {
  return (
    <section>
      <Box>
        <HStack h="335px" w="full" spacing={8} alignItems="center">
          <Heading fontSize={56} fontWeight={700} textAlign="center">
            My tickets
          </Heading>
          <Image src={YellowRectangle} alt="yellow" />
        </HStack>
      </Box>
    </section>
  );
};

export default TicketsHeroSection;
