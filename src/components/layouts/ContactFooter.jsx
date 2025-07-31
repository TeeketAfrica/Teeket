import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import Container from "../ui/Container";

const ContactFooter = ({ border = true }) => {
  return (
    <Container padding="16px">
      <Box pt="64px" borderTop={border && "1px solid"} borderColor="gray.300">
        <Stack
          direction={["column", "row"]}
          justifyContent="space-between"
          gap="24px"
          alignItems="center"
        >
          <Box maxW={400} w="100%" px={0}>
            <Text
              fontSize={["2xl", "4xl"]}
              fontWeight={700}
              textAlign={["center", "start"]}
            >
              Never get bored, find the perfect event for you
            </Text>
          </Box>
          <Link href="/contact">
            <Button variant="primary">Contact us</Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};
export default ContactFooter;
