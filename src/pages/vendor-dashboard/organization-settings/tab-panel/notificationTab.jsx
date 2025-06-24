import { Formik } from "formik";
import * as Yup from "yup";
import {
  VStack,
  Box,
  Heading,
  Text,
  Switch,
  FormControl,
  FormLabel,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { teeketApi } from "../../../../utils/api";

const NotificationTab = ({isOrganizer}) => {
  const toast = useToast();
  const [organizationFormValues, setOrganizationFormValues] = useState({
    emailNotification: false,
    appNotification: false,
    smsNotification: false,
  });


    useEffect(() => {
      const fetchOrganizationNotification = async (values) => {
        if(isOrganizer){
          try {
            const response = await teeketApi.get("/notification/settings");
            const res = response.data;
            setOrganizationFormValues({
              emailNotification: res.email_enabled,
              appNotification: res.push_enabled,
              smsNotification: res.sms_enabled,
            });
            
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
          }
        }
      };
  
      fetchOrganizationNotification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateNotication = async (values) => {
      console.log(values)
      const params = {
        "sms_enabled": values.smsNotification,
        "push_enabled": values.appNotification,
        "email_enabled": values.emailNotification
      }
      try {
        const response = await teeketApi.patch("/notification/settings", params);
        const res = response.data;
        toast({
          title: "Notification Updated",
          description: ``,
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });

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
      }
    }

  return (
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
        initialValues={organizationFormValues}
        validationSchema={Yup.object({
          appNotification: Yup.boolean(),
          smsNotification: Yup.boolean(),
          emailNotification: Yup.boolean(),
        })}
        onSubmit={(values) => {
          handleUpdateNotication(values);
        }}
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
                  <FormLabel htmlFor="emailNotification" mb="0" fontSize="md">
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
                    formik.setFieldValue("emailNotification", e.target.checked)
                  }
                />
              </FormControl>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <FormLabel htmlFor="appNotification" mb="0" fontSize="md">
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
                    formik.setFieldValue("appNotification", e.target.checked)
                  }
                />
              </FormControl>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <FormLabel htmlFor="smsNotification" mb="0" fontSize="md">
                    Sms notifcation
                  </FormLabel>
                  <Text fontSize="sm" color="gray.600">
                    Coming soon
                  </Text>
                </Box>
                <Switch
                  id="smsNotification"
                  isChecked={formik.values.smsNotification}
                  onChange={(e) =>
                    formik.setFieldValue("smsNotification", e.target.checked)
                  }
                />
              </FormControl>
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
  );
};

export default NotificationTab;
