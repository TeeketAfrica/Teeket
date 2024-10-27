import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

export const AccountNumberField = ({
  formik,
  setVerifiedBankDetailsLoading,
  setVerifiedBankDetails,
  selectedBankDetails,
}) => {
  const [bankDetailsAcctNumber, setBankDetailsAcctNumber] = useState();
  const toast = useToast();

  const handleAcctNumberChange = (event) => {
    const value = event.target.value;
    if (value.length <= 10) {
      formik.setFieldValue("acctNumber", value);
      setBankDetailsAcctNumber(value);
    }
  };

  const handleVerify = useCallback(async () => {
    try {
      setVerifiedBankDetailsLoading(true);
      const response = await fetch(
        `https://nubapi.com/api/verify?account_number=${bankDetailsAcctNumber}&bank_code=${selectedBankDetails?.code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer yZcY84twWMgoXjdPdG4BPP51gLGsGFkTrGMWghJV651464da",
          },
        }
      );
      const res = await response.json();
      setVerifiedBankDetails(res);
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
      setVerifiedBankDetailsLoading(false);
    }
  }, [
    selectedBankDetails,
    toast,
    bankDetailsAcctNumber,
    setVerifiedBankDetailsLoading,
    setVerifiedBankDetails,
  ]);

  useEffect(() => {
    if (bankDetailsAcctNumber?.length === 10 && selectedBankDetails) {
      const timer = setTimeout(() => {
        handleVerify();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [bankDetailsAcctNumber, handleVerify, selectedBankDetails]);

  return (
    <FormControl>
      <FormLabel htmlFor="acctNumber">Account Number</FormLabel>
      <Input
        name="acctNumber"
        id="acctNumber"
        type="number"
        placeholder="Your account number"
        size="lg"
        maxLength={10}
        value={formik.values.acctNumber}
        onChange={handleAcctNumberChange}
        isInvalid={formik.touched.acctNumber && formik.errors.acctNumber}
      />
      <FormErrorMessage>
        {formik.touched.acctNumber && formik.errors.acctNumber}
      </FormErrorMessage>
    </FormControl>
  );
};
