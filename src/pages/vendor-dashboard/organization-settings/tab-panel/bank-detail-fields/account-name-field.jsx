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
    if (details?.account_name) {
      formik.setFieldValue("acctName", details.account_name);
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
      />
      {loading && <Loader2 className="animate-spin acct-name-loader" />}
      <FormErrorMessage>
        {formik.touched.acctName && formik.errors.acctName}
      </FormErrorMessage>
    </FormControl>
  );
};
