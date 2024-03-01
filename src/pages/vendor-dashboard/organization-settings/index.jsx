"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  HStack,
  VStack,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useModal } from "../../../context/ModalContext";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardPageHeaders from "../../../components/layouts/DashboardPageHeaders";
import RenderFormControl from "./renderFormControl";

const OrganizationSettingsDashboardPage = () => {
  // const handleOpenCustomModal = () => {
  //   openModal('custom'); // Open modal with type 'custom'
  // };

  const { openModal } = useModal();

  const handleModal = (type, data) => {
    openModal(type, data);
  };

  return (
    <DashboardLayout>
      <DashboardPageHeaders
        pageTitle="Organization settings"
        subTitle="Manage core settings for your organization"
      />
      <Box marginTop={6}>
        <Tabs isLazy isManual variant="line" size="md">
          <TabList pl="8">
            <Tab>Organization profile</Tab>
            <Tab>Bank account</Tab>
            <Tab>Notifcations</Tab>
          </TabList>

          <TabPanels marginTop={8}>
            <TabPanel>
              <VStack alignItems="stretch" maxW="624px" px="4" gap="6">
                <Box>
                  <Heading as="h2" fontSize="2xl" pb="2">
                    Organization profile
                  </Heading>
                  <Text fontSize="md" fontWeight="normal" color="gray.600">
                    Showcase the information you want your audience to know
                    about your organization.
                  </Text>
                </Box>

                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    orgName: "",
                    orgEmail: "",
                  }}
                  validationSchema={Yup.object({
                    orgName: Yup.string().required(
                      "Please input organization name"
                    ),
                    orgEmail: Yup.string()
                      .email("Invalid email format")
                      .required("Please input organization email"),
                  })}
                >
                  {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                      <VStack gap="4" pb="6">
                        {[
                          {
                            name: "orgName",
                            label: "Organization name",
                            type: "text",
                            placeholder:
                              "Full name of organization or individual",
                          },
                          {
                            name: "orgEmail",
                            label: " Organization email",
                            type: "email",
                            placeholder:
                              "Email address of your organization or indivisual",
                          },
                          {
                            name: "orgDescription",
                            label: "Organization description",
                            type: "textarea",
                            placeholder:
                              "Short description about your organization",
                          },
                        ].map((formData) =>
                          RenderFormControl(formik, formData)
                        )}
                      </VStack>
                      <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        w="fit-content"
                        isDisabled={!(formik.isValid && formik.dirty)}
                      >
                        Save changes
                      </Button>
                    </form>
                  )}
                </Formik>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack alignItems="stretch" maxW="624px" px="4" gap="6">
                <Box>
                  <Heading as="h2" fontSize="2xl" pb="2">
                    Bank account
                  </Heading>
                  <Text fontSize="md" fontWeight="normal" color="gray.600">
                    All your event revenue will be paid here when you request
                    for it
                  </Text>
                </Box>

                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    bankName: "",
                    acctNumber: "",
                    acctName: "",
                  }}
                  validationSchema={Yup.object({
                    bankName: Yup.string().required("Please input  bank name"),
                    acctNumber: Yup.number().required(
                      "Please input account number"
                    ),
                    acctName: Yup.string().required(
                      "Please input account name"
                    ),
                  })}
                >
                  {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                      <VStack gap="4" pb="6">
                        {[
                          {
                            name: "bankName",
                            label: "Bank name",
                            type: "text",
                            placeholder: "Bank name",
                          },
                          {
                            name: "acctNumber",
                            label: "Account number",
                            type: "number",
                            placeholder: "Your account number",
                          },
                          {
                            name: "acctName",
                            label: "Account name",
                            type: "text",
                            placeholder: "Account name",
                          },
                        ].map((formData) =>
                          RenderFormControl(formik, formData)
                        )}

                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="yellow.400"
                        >
                          Be sure of your bank information. To change it next
                          time you will have to contact us to request a change.
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
                            onClick={() => handleModal("editBankDetail", {})}
                          >
                            Request change
                          </Button>
                        </HStack>
                      )}
                    </form>
                  )}
                </Formik>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack alignItems="stretch" maxW="624px" px="4" gap="6">
                <Box>
                  <Heading as="h2" fontSize="2xl" pb="2">
                    Notification
                  </Heading>
                  <Text fontSize="md" fontWeight="normal" color="gray.600">
                    Set how you will receive notification on your events
                  </Text>
                </Box>

                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    emailNotification: false,
                    appNotification: false,
                  }}
                  validationSchema={Yup.object({
                    bankName: Yup.boolean(),
                    acctNumber: Yup.boolean(),
                  })}
                >
                  {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                      <VStack gap="4" pb="6">
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <FormLabel
                              htmlFor="emailNotification"
                              mb="0"
                              fontSize="md"
                            >
                              Email notification
                            </FormLabel>
                            <Text fontSize="sm" color="gray.600">
                              Receive all notifications via email
                            </Text>
                          </Box>
                          <Switch
                            id="emailNotification"
                            isChecked={formik.values.emailNotification}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "emailNotification",
                                e.target.checked
                              )
                            }
                          />
                        </FormControl>
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <FormLabel
                              htmlFor="appNotification"
                              mb="0"
                              fontSize="md"
                            >
                              App notifcation
                            </FormLabel>
                            <Text fontSize="sm" color="gray.600">
                              Coming soon
                            </Text>
                          </Box>
                          <Switch
                            id="appNotification"
                            isChecked={formik.values.appNotification}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "appNotification",
                                e.target.checked
                              )
                            }
                          />
                        </FormControl>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
};

export default OrganizationSettingsDashboardPage;
