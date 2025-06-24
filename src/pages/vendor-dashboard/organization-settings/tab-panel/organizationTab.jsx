/* eslint-disable no-unused-vars */
import { Formik } from "formik";
import * as Yup from "yup";

import { VStack, Box, Heading, Text, Button, useToast } from "@chakra-ui/react";
import RenderFormControl from "../renderFormControl";
import { useEffect, useState } from "react";
import { teeketApi } from "../../../../utils/api";
import { selectActiveUser } from "../../../../features/activeUserSlice";
import { useSelector } from "react-redux";

const OrganizationTab = ({isOrganizer}) => {
  const activeUser = useSelector(selectActiveUser);
  const toast = useToast();
  const [organizationFormValues, setOrganizationFormValues] = useState({
    orgName: "",
    orgEmail: "",
    orgDescription: "",
  });

  // UPDATE ORGANIZATION DETAILS
  const handleUpdateOrganization = async (values) => {
    try {
      const response = await teeketApi.patch("/organization", {
        name: values.orgName,
        email: values.orgEmail,
        description: values.orgDescription,
      });

      console.log(response)

          toast({
            title: "Update Organisation Details",
            description: `Organisation Details updated successfully`,
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occured";
      console.log(error)
      toast({
        title: "Failed to update",
        description: `${errorMessage}`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // FETCH ORGANIZATION DETAILS
  useEffect(() => {
    const fetchOrganizationDetails = async (values) => {
      if(isOrganizer){
        try {
          const response = await teeketApi.get("/organization");
          const res = response.data;
          setOrganizationFormValues({
            orgName: res.name,
            orgEmail: res.email,
            orgDescription: res.description,
          });

          console.log('data', res)


          
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

    fetchOrganizationDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



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
        initialValues={organizationFormValues}
        validationSchema={Yup.object({
          orgName: Yup.string().required("Please input organization name"),
          orgEmail: Yup.string()
            .email("Invalid email format")
            .required("Please input organization email"),
          orgDescription: Yup.string().required(
            "Please input organization description"
          ),
        })}
        onSubmit={async (values, actions) => {
          await handleUpdateOrganization(values);
          actions.setSubmitting(false);
        }}
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
