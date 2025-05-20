import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

export const AccountNumberField = ({
  formik,
  setVerifiedBankDetailsLoading,
  setVerifiedBankDetails,
  selectedBankDetails,
}) => {
  const toast = useToast();

  const acctNumber = formik.values.acctNumber;
  const bankCode = selectedBankDetails?.code;

  const handleVerify = useCallback(async () => {
    try {
      setVerifiedBankDetailsLoading(true);
      const response = await fetch(
        `https://nubapi.com/api/verify?account_number=${acctNumber}&bank_code=${bankCode}`,
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
      const errorMessage = error?.message || "An error occurred";
      toast({
        title: "Failed to fetch",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setVerifiedBankDetailsLoading(false);
    }
  }, [acctNumber, bankCode]);

  // Debounced effect to verify account
  useEffect(() => {
    if (acctNumber?.length === 10 && bankCode) {
      const timer = setTimeout(() => {
        handleVerify();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [acctNumber, bankCode, handleVerify]);

  return (
    <FormControl
      isInvalid={formik.touched.acctNumber && formik.errors.acctNumber}
    >
      <FormLabel htmlFor="acctNumber">Account Number</FormLabel>
      <Input
        name="acctNumber"
        id="acctNumber"
        type="text"
        placeholder="Your account number"
        size="lg"
        maxLength={10}
        value={acctNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <FormErrorMessage>
        {formik.touched.acctNumber && formik.errors.acctNumber}
      </FormErrorMessage>
    </FormControl>
  );
};
