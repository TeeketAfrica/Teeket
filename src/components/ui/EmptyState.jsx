import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";

const EmptyState = ({
  icon: Icon,
  maxW,
  title,
  desc,
  outlineBtn,
  primaryBtn,
  outlineOnClick,
  primaryOnClick,
}) => {
  return (
    <Box my="64px">
      <Center h="100%">
        <VStack>
          <Icon />
          <VStack pt={4} pb={6}>
            <Text fontWeight={600} color="gray.800">
              {title}
            </Text>
            <Box maxW={maxW}>{desc}</Box>
          </VStack>
          <HStack>
            {outlineBtn && (
              <Button onClick={outlineOnClick} p={2} variant="outline">
                {outlineBtn}
              </Button>
            )}

            {primaryBtn && (
              <Button onClick={primaryOnClick} p={2} variant="primary">
                {primaryBtn}
              </Button>
            )}
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default EmptyState;
