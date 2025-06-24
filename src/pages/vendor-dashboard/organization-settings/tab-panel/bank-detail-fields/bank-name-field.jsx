import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export const BankNameField = ({ formik, setSelectedBankDetails }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const [bankDetailsLoading, setBankDetailsLoading] = useState(false);
  const [bankDetailsData, setBankDetailsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setBankDetailsLoading(true);
        const response = await fetch("https://nubapi.com/bank-json");
        const res = await response.json();
        setBankDetailsData(res);
      } catch (error) {
        const errorMessage = error?.message || "An error occured";
        toast({
          title: "Failed to fetch",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } finally {
        setBankDetailsLoading(false);
      }
    })();
  }, [toast]);

  return (
    <Popover onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <FormControl
        isInvalid={formik.touched.bankName && formik.errors.bankName}
      >
        <FormLabel htmlFor="bankName">Bank Name</FormLabel>
        <PopoverTrigger asChild>
          <Button
            w="100%"
            h="56px"
            rounded="lg"
            fontSize="sm"
            p="4"
            border="1px"
            borderColor="gray.400"
            outlineColor=""
            justifyContent="start"
            fontWeight={400}
            boxShadow={isOpen ? "0px 0px 1px 4px #CBD1CB" : ""}
            _hover={{
              boxShadow: "",
              borderColor: "gray.500",
            }}
          >
            {formik.values.bankName || "Search Bank"}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="xl">
            <Command label="Command Menu" className="command-container">
              <Box position="relative">
                <Search className="command-input-search" />
                <Command.Input className="command-input" />
              </Box>
              <Command.List className="command-list">
                {bankDetailsLoading && (
                  <Command.Loading className="command-loading">
                    Hang on…
                  </Command.Loading>
                )}
                <Command.Empty className="command-empty">
                  No results found.
                </Command.Empty>

                {bankDetailsData?.map((bank) => (
                  <Command.Item
                    key={bank.id}
                    className="command-item"
                    onSelect={() => {
                      formik.setFieldValue("bankName", bank.name);
                      setSelectedBankDetails(bank);
                      onClose();
                    }}
                  >
                    {bank.name}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </PopoverContent>
        </Portal>
        <FormErrorMessage>
          {formik.touched.bankName && formik.errors.bankName}
        </FormErrorMessage>
      </FormControl>
    </Popover>
  );
};
