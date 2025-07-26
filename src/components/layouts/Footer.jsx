import { Box, HStack, Link, Stack, Text, VStack } from "@chakra-ui/react";
import LogoBlack from "../../assets/icon/LogoBlack.svg";
import { SOCIAL_LINKS } from "../../utils/constants";
import Policies from "../shared/Policies";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <Container padding="16px">
      <Box py="64px">
        <Stack
          direction={{ md: "row", base: "column" }}
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
  );
};
export default Footer;
