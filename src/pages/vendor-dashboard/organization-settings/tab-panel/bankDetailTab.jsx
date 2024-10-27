/* eslint-disable no-unused-vars */
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Portal,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Command } from "cmdk";
import { Loader2, LoaderPinwheel, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useModal } from "../../../../context/ModalContext";
import RenderFormControl from "../renderFormControl";
import { AccountNameField } from "./bank-detail-fields/account-name-field";
import { AccountNumberField } from "./bank-detail-fields/account-number-field";
import { BankNameField } from "./bank-detail-fields/bank-name-field";

const BankDetailTab = () => {
  const { openModal } = useModal();
  const toast = useToast();

  const [selectedBankDetails, setSelectedBankDetails] = useState(false);
  const [verifiedBankDetails, setVerifiedBankDetails] = useState();
  const [verifiedBankDetailsLoading, setVerifiedBankDetailsLoading] =
    useState(false);

  const [bankFormValues, setBankFormValues] = useState({
    acctName: "",
    acctNumber: "",
    bankName: "",
  });

  // FETCH BANK DETAILS
  // useEffect(() => {
  //   const fetchOrganizationDetails = async (values) => {
  //     try {
  //       const response = await teeketApi.get("/bank-account");
  //       const res = response.data;
  //       setBankFormValues({
  //         acctName: res.name,
  //         acctNumber: res.email,
  //         bankName: res.description,
  //       });
  //     } catch (error) {
  //       const errorMessage = error?.message || "An error occured";
  //       toast({
  //         title: "Failed to fetch",
  //         description: `${errorMessage}`,
  //         status: "error",
  //         duration: 3000,
  //         position: "top-right",
  //         isClosable: true,
  //       });
  //     }
  //   };

  //   fetchOrganizationDetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleModal = (type, data) => {
    openModal(type, data);
  };

  return (
    <VStack alignItems="stretch" maxW="624px" px="4" gap="6">
      <Box>
        <Heading as="h2" fontSize="2xl" pb="2">
          Bank account
        </Heading>
        <Text fontSize="md" fontWeight="normal" color="gray.600">
          All your event revenue will be paid here when you request for it
        </Text>
      </Box>

      <Formik
        enableReinitialize={true}
        initialValues={bankFormValues}
        validationSchema={Yup.object({
          bankName: Yup.string().required("Please input  bank name"),
          acctNumber: Yup.number().required("Please input account number"),
          acctName: Yup.string().required("Please input account name"),
        })}
        onSubmit={(values) => {
          handleModal("editBankDetail", values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <VStack gap="4" pb="6">
                <BankNameField
                  formik={formik}
                  setSelectedBankDetails={setSelectedBankDetails}
                />
                <AccountNumberField
                  formik={formik}
                  setVerifiedBankDetailsLoading={setVerifiedBankDetailsLoading}
                  setVerifiedBankDetails={setVerifiedBankDetails}
                  selectedBankDetails={selectedBankDetails}
                />
                <AccountNameField
                  formik={formik}
                  loading={verifiedBankDetailsLoading}
                  details={verifiedBankDetails}
                />
                <Text fontSize="sm" fontWeight="semibold" color="yellow.400">
                  Be sure of your bank information. To change it next time you
                  will have to contact us to request a change.
                </Text>
              </VStack>
              {formik.values.bankName === "" ? (
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  w="fit-content"
                  onClick={() => {
                    formik.isValid &&
                      formik.dirty &&
                      handleModal("saveBankDetail", [
                        {
                          title: "Bank Name",
                          value: formik.values.bankName,
                        },
                        {
                          title: "Account Number",
                          value: formik.values.acctNumber,
                        },
                        {
                          title: "Account Name",
                          value: formik.values.acctName,
                        },
                      ]);
                  }}
                  // isDisabled={!(formik.isValid && formik.dirty)}
                >
                  Save changes
                </Button>
              ) : (
                <HStack>
                  <Button
                    size="lg"
                    variant="secondary"
                    w="fit-content"
                    onClick={() => handleModal("deleteBankDetail", {})}
                  >
                    Remove bank account
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    w="fit-content"
                    onClick={() => formik.handleSubmit()}
                  >
                    Request change
                  </Button>
                </HStack>
              )}
            </form>
          );
        }}
      </Formik>
    </VStack>
  );
};

export default BankDetailTab;
