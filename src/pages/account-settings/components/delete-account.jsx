import { Button, Text, VStack } from "@chakra-ui/react";

import React from "react";

export const DeleteAccount = () => {
  return (
    <VStack maxW="575px" alignItems="start" spacing={9}>
      <VStack alignItems="start">
        <Text fontSize="2xl" fontWeight={600}>
          Delete Account
        </Text>
        <Text color="#5E665E">
          Would you like to delete your account? NOTE deletion of account will
          remove all the content associated with it.
        </Text>
      </VStack>
      <Button variant="danger">Delete Account</Button>
    </VStack>
  );
};
