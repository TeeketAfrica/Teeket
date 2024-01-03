import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/system";
import Logo from "../../../assets/img/brandLogo.png";
import Avatar from "../../../assets/img/Avatars.png";
import Preview from "../../../assets/icon/eye.svg";
import Rocket from "../../../assets/icon/rocket-alt.svg";
import CheckDone from "../../../assets/icon/CheckDone.svg";
import Container from "../../../components/ui/Container";

const Layout = ({ children, activeStepColor }) => {
  //   const [stepColor, setstepColor] = useState(0);

  //   useEffect(() => {}, [third]);

  const theme = useTheme();

  const steps = [
    {
      stepNumber: 1,
      stepInfo: "Basic info",
    },
    {
      stepNumber: 2,
      stepInfo: "Event details",
    },
    {
      stepNumber: 3,
      stepInfo: "Tickets",
    },
    {
      stepNumber: 4,
      stepInfo: "Publish event",
    },
  ];

  return (
    <Container>
      <Box w="100%" maxH="100vh" h="100%">
        <Box display="flex" justifyContent="space-between">
          <Box w="119px">
            <Image src={Logo} alt="logo" />
          </Box>
          <Box display="flex" alignItems="center" gap={8}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              display="flex"
              alignItems="center"
              color="gray.700"
              gap={2}
            >
              <Image src={Preview} alt="logo" />
              Preview event
            </Text>
            <Box
              color="gray.300"
              backgroundColor={theme.colors.gray[300]}
              borderRadius={2}
            >
              <Text
                color="white"
                fontSize="sm"
                fontWeight="semibold"
                display="flex"
                alignItems="center"
                gap={2}
                p={2}
              >
                <Image src={Rocket} alt="logo" />
                Publish event
              </Text>
            </Box>
            <Box w={10} h={10}>
              <Image src={Avatar} alt="logo" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading
            as="h1"
            fontSize="6xl"
            fontWeight={700}
            color="gray.800"
            py={8}
          >
            Event creation
          </Heading>
        </Box>
        <Box display="flex" gap={8}>
          <Box
            maxW="286px"
            w="100%"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {steps.map((step, i) => (
              <Box
                key={i}
                py={2}
                px={4}
                borderRadius={3}
                bgColor={i + 1 === activeStepColor + 1 ? "gray.200" : ""}
                cursor="pointer"
                color={i + 1 <= activeStepColor + 1 ? "gray.800" : "gray.500"}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Text
                    display="flex"
                    alignItems="center"
                    fontSize="xs"
                    fontWeight="semibold"
                    as="span"
                  >
                    {step.stepNumber}/
                    <Text fontSize="md" ml={3} fontWeight="semibold">
                      {step.stepInfo}
                    </Text>
                  </Text>
                </Box>
                {i + 1 <= activeStepColor && (
                  <Image src={CheckDone} alt="done" />
                )}
              </Box>
            ))}
          </Box>
          <Box
            w="100%"
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
            overflowY="scroll"
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
