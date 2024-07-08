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
} from "@chakra-ui/react";

const NotificationTab = () => {
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
            </VStack>
          </form>
        )}
      </Formik>
    </VStack>
  );
};

export default NotificationTab;
