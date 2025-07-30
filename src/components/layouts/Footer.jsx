import { Box, Button, HStack, Link, Stack, Text, VStack } from "@chakra-ui/react";
import Container from "../ui/Container";
import LogoBlack from "../../assets/icon/LogoBlack.svg";
import { SOCIAL_LINKS } from "../../utils/constants";
import Policies from "../shared/Policies";

const Footer = ({ border = true }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{width: "100%"}}>
      <Container padding="16px">
        <Box py="64px" borderTop={border && "1px solid"} borderColor="gray.300">
          <Stack
            direction={["column", "row"]}
            justifyContent="space-between"
            gap="24px"
            alignItems="center"
            mb="64px"
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
            <Link href='/contact'>
              <Button variant="primary">Contact us</Button>
            </Link>

          </Stack>
          <Stack
            direction={["column", "column", "row"]}
            bgColor="gray.200"
            borderRadius="10px"
            justifyContent="space-between"
            alignItems="center"
            gap="32px"
            py="28px"
            px="32px"
          >
            <HStack spacing={6}>
              {SOCIAL_LINKS.map(({ link, icon: Icon }, i) => (
                <Link key={i} href={link} target="_blank">
                  <Icon />
                </Link>
              ))}
            </HStack>
            <VStack>
              <Text fontSize="sm">
                © {new Date().getFullYear()} Teeket Africa. All rights reserved.
              </Text>
              <Policies />
            </VStack>
            <Link href="/">
              <LogoBlack />
            </Link>
          </Stack>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
