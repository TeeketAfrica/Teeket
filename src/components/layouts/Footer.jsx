import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Container from "../ui/Container";
import LogoBlack from "../../assets/icon/LogoBlack.svg";
import FacebookIcon from "../../assets/icon/FacebookIcon.svg";
import TwitterIcon from "../../assets/icon/TwitterIcon.svg";
import InstagramIcon from "../../assets/icon/InstagramIcon.svg";
import LinkedInIcon from "../../assets/icon/LinkedInIcon.svg";

const Footer = ({ border = true }) => {
  const socialLinks = [
    {
      img: FacebookIcon,
      link: "#",
      alt: "facebook",
    },
    {
      img: TwitterIcon,
      link: "#",
      alt: "facebook",
    },
    {
      img: InstagramIcon,
      link: "#",
      alt: "facebook",
    },
    {
      img: LinkedInIcon,
      link: "#",
      alt: "facebook",
    },
  ];

  return (
    <footer>
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
            <Button variant="primary">Contact us</Button>
          </Stack>
          <Stack
            direction={["column", "row"]}
            bgColor="gray.200"
            borderRadius="10px"
            justifyContent="space-between"
            alignItems="center"
            gap="32px"
            py="28px"
            px="32px"
          >
            <HStack spacing={6}>
              {socialLinks.map((link, i) => (
                <Link key={i} href={link.link}>
                  <Image src={link.img} alt={link.alt} />
                </Link>
              ))}
            </HStack>
            <Text fontSize="sm">
              © 2024 Teeket Africa. All rights reserved.
            </Text>
            <Image src={LogoBlack} alt="logo" />
          </Stack>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
