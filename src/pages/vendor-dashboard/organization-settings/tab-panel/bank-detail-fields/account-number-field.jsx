import React, { useEffect, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

export const AccountNumberField = ({
  formik,
  setVerifiedBankDetailsLoading,
  setVerifiedBankDetails,
  selectedBankDetails,
}) => {
  const toast = useToast();
  const acctNumber = formik.values.acctNumber;
  const bankCode = selectedBankDetails?.code || "";

useEffect(() => {
  if (!selectedBankDetails && formik.values.acctNumber !== "") {
    formik.setFieldValue("acctNumber", "");
  }
}, [selectedBankDetails, formik]);


  const handleVerify = useCallback(async () => {
    try {
      setVerifiedBankDetailsLoading(true);
      const response = await fetch(
        `https://nubapi.com/api/verify?account_number=${acctNumber}&bank_code=${bankCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer yZcY84twWMgoXjdPdG4BPP51gLGsGFkTrGMWghJV651464da`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to verify account");
      }

      setVerifiedBankDetails(data);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setVerifiedBankDetailsLoading(false);
    }
  }, [acctNumber, bankCode, setVerifiedBankDetails, toast, setVerifiedBankDetailsLoading]);

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
      isInvalid={formik.touched.acctNumber && !!formik.errors.acctNumber}
    >
      <FormLabel htmlFor="acctNumber">Account Number</FormLabel>
      <Input
        id="acctNumber"
        name="acctNumber"
        type="text"
        placeholder="Enter your account number"
        maxLength={10}
        size="lg"
        value={acctNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <FormErrorMessage>
        {formik.errors.acctNumber}
      </FormErrorMessage>
    </FormControl>
  );
};
