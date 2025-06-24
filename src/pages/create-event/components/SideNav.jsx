import { Box, Text } from "@chakra-ui/react";
import CheckDone from "../../../assets/icon/CheckDone.svg";

const SideNav = ({
  children,
  activeStep,
  setActiveStep,
  setMobileToggle,
  height,
  width,
}) => {
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
    <Box
      h={height}
      maxW={width}
      w="100%"
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="gray.100"
    >
      {children}
      <Box p={{ base: 3, lg: 0 }}>
        {steps.map((step, i) => (
          <Box
            key={i}
            py={2}
            px={4}
            borderRadius={3}
            bgColor={i + 1 === activeStep + 1 ? "gray.200" : ""}
            cursor="pointer"
            color={i + 1 <= activeStep + 1 ? "gray.800" : "gray.500"}
            display="flex"
            justifyContent="space-between"
            onClick={() => {
              if(i + 1 <= activeStep){
                setActiveStep(i)
                setMobileToggle(false);
              }
            }}
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
            {i + 1 <= activeStep && <CheckDone />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideNav;
