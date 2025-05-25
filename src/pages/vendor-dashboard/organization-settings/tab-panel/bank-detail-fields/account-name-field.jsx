import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

export const AccountNameField = ({ formik, loading, details }) => {
  useEffect(() => {
    const newAcctName = details?.account_name || '';
    if (formik.values.acctName !== newAcctName) {
      formik.setFieldValue("acctName", newAcctName);
    }
  }, [details, formik]);

  return (
    <FormControl className="relative">
      <FormLabel htmlFor="acctName">Account Name</FormLabel>
      <Input
        name="acctName"
        id="acctName"
        type="text"
        placeholder="Account name"
        size="lg"
        readOnly
        value={formik.values.acctName}
        isInvalid={formik.touched.acctName && formik.errors.acctName}
        disabled
      />
      {loading && <Loader2 className="animate-spin acct-name-loader" />}
      <FormErrorMessage>
        {formik.touched.acctName && formik.errors.acctName}
      </FormErrorMessage>
    </FormControl>
  );
};
