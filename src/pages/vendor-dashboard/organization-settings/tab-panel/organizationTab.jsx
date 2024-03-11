import { Formik } from "formik";
import * as Yup from "yup";

import { VStack, Box, Heading, Text, Button } from "@chakra-ui/react";
import RenderFormControl from "../renderFormControl";

const OrganizationTab = () => {
  return (
    <VStack alignItems="stretch" maxW="624px" px="4" gap="6">
      <Box>
        <Heading as="h2" fontSize="2xl" pb="2">
          Organization profile
        </Heading>
        <Text fontSize="md" fontWeight="normal" color="gray.600">
          Showcase the information you want your audience to know about your
          organization.
        </Text>
      </Box>

      <Formik
        enableReinitialize={true}
        initialValues={{
          orgName: "",
          orgEmail: "",
        }}
        validationSchema={Yup.object({
          orgName: Yup.string().required("Please input organization name"),
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
                  placeholder: "Full name of organization or individual",
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
                  placeholder: "Short description about your organization",
                },
              ].map((formData) => RenderFormControl(formik, formData))}
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

export default OrganizationTab;
