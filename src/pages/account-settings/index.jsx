import { Button } from "@chakra-ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Rectangle from "../../assets/icon/rectangle.svg";
import Header from "../../components/layouts/Header";
import Container from "../../components/ui/Container";
import { AccountName } from "./components/account-name";
import { DeleteAccount } from "./components/delete-account";
import { Password } from "./components/password";

const AccountSettingsPage = () => {
  return (
    <main>
      <Header />
      <Container alignItems="start">
        <VStack spacing={9} alignItems="start" py="128px">
          <HStack spacing={6} w="100%">
            <Text fontSize={56} fontWeight={700}>
              Account settings
            </Text>
            <Rectangle />
          </HStack>
          <VStack w="100%" alignItems="start">
            <HStack spacing={9}>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
              <VStack>
                <Button variant="primary">Change photo</Button>
                <Button variant="secondary">Remove photo</Button>
              </VStack>
            </HStack>
          </VStack>
          <VStack w="100%" alignItems="start">
            <Text fontSize="2xl" fontWeight={600}>
              Email address
            </Text>
            <Text color="#5E665E">
              Your email address is <span>solomonteeket@gmail.com</span>
            </Text>
          </VStack>
          <Divider w="100%" borderColor="#CBD1CB" />

          <AccountName />
          <Password />
          <Divider w="100%" borderColor="#CBD1CB" />
          <DeleteAccount />
        </VStack>
      </Container>
    </main>
  );
};

export default AccountSettingsPage;
