import { Image } from "@chakra-ui/image";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import InProgress from "../../assets/icon/InProgress.svg";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

const HomePage = () => {
  const theme = useTheme();
  return (
    <Box
      bgColor="#2E3133"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={["75px", "150px"]} // USE 'heading.2xl' to test font, I just made it big for now
        fontWeight="black"
        fontFamily="heading"
        color={theme.colors.gray[100]}
        textTransform="uppercase"
      >
        Teeket Africa
      </Heading>
      <Box
        border="3px dashed"
        p={6}
        mt={6}
        borderRadius="100px"
        borderColor="border"
        display="flex"
        gap="8px"
      >
        <Image src={InProgress} alt="In progress" />
        <Text fontSize="2xl" color={theme.colors.gray[100]}>
          In progress
        </Text>
      </Box>
      <VStack spacing={6} color="white" mt={6}>
        <Link to="/auth/login">Login</Link>
        <Link to="/create-event">Create event</Link>
      </VStack>
    </Box>
  );
};

export default HomePage;
