import {
  HStack,
  VStack,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListItem,
  UnorderedList,
  Heading,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";
import FeatureIcon from "../../assets/icon/Feature-icon.svg";

const SaveBankDetail = () => {
  const { closeModal, modalState } = useModal();

  return (
    <ModalContent paddingY={2}>
      <ModalHeader>
        <VStack alignItems="flex-start" gap={5}>
          <FeatureIcon />
          <Heading as="h6" fontSize="lg" fontWeight="semibold">
            Confirm bank information
          </Heading>
        </VStack>
      </ModalHeader>
      <ModalBody>
        <Text>
          After confirming your bank information you will only be able to change
          it by requesting to change your bank details because of security
          reasons.
        </Text>
        <UnorderedList
          listStyleType="none"
          margin="0"
          marginTop={6}
          marginBottom={8}
          spacing={3}
        >
          {modalState.data?.map((data, idx) => (
            <ListItem key={`${data.title}_${idx}`} fontSize="sm" lineHeight={5}>
              <HStack justifyContent="space-between" marginBottom={3}>
                <Text color="gray.600">{data.title}</Text>
                <Text color="gray.800" fontWeight="semibold">
                  {data.value}
                </Text>
              </HStack>
              <Divider backgroundColor="gray.500" height="1px" />
            </ListItem>
          ))}
        </UnorderedList>
      </ModalBody>
      <ModalFooter justifyContent="center" gap="2">
        <Button
          width="170px"
          onClick={() => closeModal()}
          variant="secondary"
          size="lg"
        >
          Cancel
        </Button>
        <Button width="170px" variant="primary" size="lg">
          Send Request
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default SaveBankDetail;
