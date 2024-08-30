import { HStack, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/layouts/Header";
import Rectangle from "../../assets/icon/rectangle.svg";
import Container from "../../components/ui/Container";

const AccountSettingsPage = () => {
  return (
    <main>
      <Header />
      <Container>
        <VStack py="128px">
          <HStack spacing={6} w="100%">
            <Text fontSize={56} fontWeight={700}>
              Account settings
            </Text>
            <Rectangle />
          </HStack>
        </VStack>
      </Container>
    </main>
  );
};

export default AccountSettingsPage;
