import { Box, Button, Divider, HStack, Slide, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import MultiplyIcon from "../../../assets/icon/Multiply.svg";
import PriceIcon from "../../../assets/icon/Price.svg";
import TicketIcon from "../../../assets/icon/Ticket.svg";
import TrashIcon from "../../../assets/icon/Trash.svg";
import { useModal } from "../../../context/ModalContext";
import {
  setTicketDetails,
  updateTicketDetails,
} from "../../../features/eventSlice";
import FormField from "../../../components/ui/FormField";
import { FormFieldType } from "../../../components/ui/form-field-types";

const TicketModal = ({ ticketState, onCloseModal, selectedQuantity }) => {
  const dispatch = useDispatch();
  const { isModalOpen, data } = ticketState;
  const { openModal } = useModal();
  const { id } = useParams();


  const ticketQuantity = data
    ? selectedQuantity + data.ticketQuantity
    : selectedQuantity;

  const validationSchema = Yup.object({
    ticketType: Yup.string().required(
      "Please specify if the ticket will be free or paid"
    ),
    ticketName: Yup.string().required("Please enter ticket name"),
    ticketPrice: Yup.number().min(1, "Ticket price must be greater than 0"),
    ticketQuantity: Yup.number()
      .min(1, "Ticket quantity for sale must be greater than 0")
      .max(
        ticketQuantity,
        `Ticket quantity for sale must be less than or equal to ${ticketQuantity}`
      )
      .required("Please enter ticket quantity for sale"),
  });

  const initialValues = {
    ticketType: data?.ticketType || "",
    ticketName: data?.ticketName || "",
    ticketPrice: Number.parseInt(data?.ticketPrice) || "",
    ticketQuantity: data?.ticketQuantity || "",
  };

  const handleOpenDeleteModal = (formik) => {
    openModal("deleteTicket", {
      event_id: id,
      id: data.id,
      formik: formik,
      closeParentModal: onCloseModal,
    });
  };

  const handleSubmit = ({ values, resetForm, isValid }) => {
    if (isValid) {
      const ticketType = values.ticketType;
      const updatedValues = {
        ...values,
        ticketPrice: ticketType === "free" ? 0 : values.ticketPrice,
      };

      if (data?.id) {
        dispatch(updateTicketDetails({ id: data.id, ...updatedValues }));
      } else {
        dispatch(setTicketDetails(updatedValues));
      }

      onCloseModal({ isModalOpen: false });
      resetForm();
    }
  };

  return (
    <Slide in={isModalOpen} direction="right" style={{ zIndex: "999999" }}>
      <Box
        maxW="567px"
        width="100%"
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        display="flex"
        flexDirection="column"
        backgroundColor="gray.100"
        boxShadow=" 0px 4px 6px -2px rgba(16, 40, 16, 0.03), 0px 16px 24px -4px rgba(16, 40, 16, 0.08);"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="6"
          backgroundColor="inherit"
          borderBottom="1px solid"
          borderColor="gray.300"
          h="105px"
          cursor="pointer"
        >
          <Text
            color="gray.800"
            fontWeight="bold"
            fontSize="2xl"
            letterSpacing="-0.48px"
          >
            Manage your ticket
          </Text>
          <Box onClick={() => onCloseModal({ isModalOpen: false })}>
            <MultiplyIcon />
          </Box>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowY: "scroll",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="6"
                padding="6"
                backgroundColor="inherit"
                height="100%"
                overflowY="auto"
              >
                <FormField
                  name="ticketType"
                  label="Will this be a free or paid event?"
                  type={FormFieldType.Radio}
                  options={[
                    { value: "free", label: "Free event" },
                    { value: "paid", label: "Paid event" },
                  ]}
                  radioDirection="row"
                  radioSpacing="10px"
                  radioVariant="border"
                  radioMaxWidth="fit-content"
                />

                <Divider h="1px" backgroundColor="gray.300" />

                {formik.values.ticketType !== "" && (
                  <>
                    <FormField
                      name="ticketName"
                      label="Ticket name"
                      type={FormFieldType.Text}
                      placeholder="e.g. Regular"
                      rightIcon={<TicketIcon />}
                      size="lg"
                    />

                    {formik.values.ticketType === "paid" && (
                      <FormField
                        name="ticketPrice"
                        label="Ticket price"
                        type={FormFieldType.Number}
                        placeholder="set ticket price"
                        rightIcon={<PriceIcon />}
                        helperText={
                          formik.values.ticketPrice
                            ? "Our 2% commission will taken from each tickets sold"
                            : undefined
                        }
                        min={1}
                        size="lg"
                        leftIcon="₦"
                      />
                    )}

                    <FormField
                      name="ticketQuantity"
                      label={`How many ${
                        formik.values.ticketName
                          ? formik.values.ticketName.toLowerCase()
                          : ""
                      } tickets should be sold`}
                      type={FormFieldType.Number}
                      placeholder="e.g. 40"
                      rightIcon={
                        <Box
                          as="button"
                          fontSize="sm"
                          color="gray.600"
                          fontWeight="medium"
                          disabled={
                            ticketQuantity - formik.values.ticketQuantity <= 0
                          }
                          onClick={() =>
                            formik.setFieldValue(
                              "ticketQuantity",
                              ticketQuantity
                            )
                          }
                          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                        >
                          Max
                        </Box>
                      }
                      helperText={`${
                        ticketQuantity - formik.values.ticketQuantity < 1 
                          ? "0"
                          : ticketQuantity - formik.values.ticketQuantity
                      } tickets available`}
                      min={1}
                      max={ticketQuantity}
                      size="lg"
                    />
                  </>
                )}
                {data && (
                  <Button
                    onClick={() => handleOpenDeleteModal(formik)}
                    leftIcon={<TrashIcon />}
                    variant="ghost"
                    color="red.400"
                    size="sm"
                    width="fit-content"
                  >
                    Delete this ticket
                  </Button>
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap="14px"
                backgroundColor="inherit"
                borderTop="1px solid"
                borderColor="gray.300"
                paddingY="3"
                paddingX="6"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onCloseModal({ isModalOpen: false })}
                >
                  Discard
                </Button>
                <Button
                  onClick={() => handleSubmit(formik)}
                  size="lg"
                  variant="primary"
                  disabled={
                    !formik.isValid ||
                    !formik.values.ticketName ||
                    (formik.values.ticketType === "paid" &&
                      !formik.values.ticketPrice) ||
                    !formik.values.ticketQuantity ||
                    !formik.values.ticketType || ticketQuantity < formik.values.ticketQuantity
                  }
                >
                  {!data ? "Save ticket" : "Update ticket"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Slide>
  );
};
export default TicketModal;
