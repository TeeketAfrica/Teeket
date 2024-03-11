import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Slide,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Radio,
  RadioGroup,
  Divider,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import {
  setTicketDetails,
  updateTicketDetails,
} from "../../../features/eventSlice";

import TicketIcon from "../../../assets/icon/Ticket.svg";
import PriceIcon from "../../../assets/icon/Price.svg";
import DollarIcon from "../../../assets/icon/Dollar.svg";
import TrashIcon from "../../../assets/icon/Trash.svg";
import MultiplyIcon from "../../../assets/icon/Multiply.svg";
import { useModal } from "../../../context/ModalContext";

const TicketModal = ({ ticketState, onCloseModal, selectedQuantity }) => {
  const dispatch = useDispatch();
  const { isModalOpen, data } = ticketState;
  const { openModal } = useModal();

  const ticketQuantity = data
    ? selectedQuantity + data.ticketQuantity
    : selectedQuantity;

  const validationSchema = Yup.object({
    ticketType: Yup.string().required(
      "Please specify if the ticket will be free or paid"
    ),
    ticketName: Yup.string().required("Please enter ticket name"),
    ticketPrice: Yup.number().min(1, "Ticket price must be greater than"),
    ticketQuantity: Yup.number()
      .min(1, "Ticket quantity for sale must be greater than 0")
      .max(
        ticketQuantity,
        `Ticket quantity for sale must be less than or equal to ${ticketQuantity}`
      )
      .required("Please enter ticket quantity for sale"),
  });

  // Formik initialization
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ticketType: data?.ticketType || "",
      ticketName: data?.ticketName || "",
      ticketPrice: data?.ticketPrice || "",
      ticketQuantity: data?.ticketQuantity || "",
    },

    validationSchema: validationSchema,
  });

  const handlerOnClose = () => {
    formik.resetForm();
    onCloseModal({ isModalOpen: false });
  };

  const handleSaveTicketDetails = () => {
    if (formik.isValid) {
      const { values } = formik;
      const ticketType = values.ticketType;
      const updatedValues = {
        ...values,
        ticketPrice: ticketType === "free" ? 0 : values.ticketPrice,
      };
      dispatch(setTicketDetails(updatedValues));

      formik.resetForm();
      onCloseModal({ isModalOpen: false });
    }
  };

  const handleUpdateTicketDetails = (id) => {
    if (formik.isValid && data) {
      dispatch(updateTicketDetails({ id, ...formik.values }));
    }
    formik.resetForm();
    onCloseModal({ isModalOpen: false });
  };

  const handleOpenDeleteModal = () => {
    openModal("deleteTicket", {
      id: data.id,
      formik: formik,
      closeParentModal: onCloseModal,
    });
  };

  // const handleDeleteTicket = (id) => {
  //   if (data) {
  //     dispatch(deleteTicket(id));

  //     formik.resetForm();
  //     onClose();
  //     onCloseModal({ isModalOpen: false });
  //   }
  // };

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
          <Box onClick={handlerOnClose}>
            <Image src={MultiplyIcon} alt="icon" />
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="6"
          padding="6"
          backgroundColor="inherit"
          height="100%"
          overflowY="auto"
        >
          <FormControl
            isInvalid={formik.touched.ticketType && formik.errors.ticketType}
          >
            <FormLabel fontSize="lg" fontWeight="semibold" color="black">
              Will this be a free or paid event?
            </FormLabel>
            <RadioGroup
              name="ticketType"
              value={formik.values.ticketType}
              onChange={(value) => formik.setFieldValue("ticketType", value)}
              onBlur={() => formik.setFieldTouched("ticketType", true)}
              marginTop="4"
            >
              <HStack color="gray.800" fontWeight="medium" flexWrap="wrap">
                <Radio value="free" size="lg" variant="border">
                  Free event
                </Radio>
                <Radio value="paid" size="lg" variant="border">
                  Paid event
                </Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>
              {formik.touched.ticketType && formik.errors.ticketType}
            </FormErrorMessage>
          </FormControl>

          <Divider h="1px" backgroundColor="gray.300" />

          <FormControl
            isInvalid={formik.touched.ticketName && formik.errors.ticketName}
          >
            <FormLabel htmlFor="ticketName">Ticket name</FormLabel>

            <InputGroup size="lg">
              <InputRightElement pointerEvents="none">
                <Image src={TicketIcon} alt="icon" />
              </InputRightElement>

              <Input
                id="ticketName"
                name="ticketName"
                type="text"
                placeholder="e.g. Regular"
                value={formik.values.ticketName}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("ticketName", true)}
              />
            </InputGroup>

            <FormErrorMessage>
              {formik.touched.ticketName && formik.errors.ticketName}
            </FormErrorMessage>
          </FormControl>

          {formik.values.ticketType !== "free" && (
            <FormControl
              isInvalid={
                formik.touched.ticketPrice && formik.errors.ticketPrice
              }
            >
              <FormLabel htmlFor="ticketPrice">Ticket price</FormLabel>

              <InputGroup size="lg">
                <InputRightElement pointerEvents="none">
                  <Image src={PriceIcon} alt="icon" />
                </InputRightElement>
                <InputLeftElement pointerEvents="none">
                  <Image src={DollarIcon} alt="icon" />
                </InputLeftElement>

                <Input
                  id="ticketPrice"
                  name="ticketPrice"
                  type="number"
                  placeholder="set ticket price"
                  value={formik.values.ticketPrice}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched("ticketPrice", true)}
                />
              </InputGroup>
              {formik.values.ticketPrice && (
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                  Our 2% commission will taken from each tickets sold
                </Text>
              )}

              <FormErrorMessage>
                {formik.touched.ticketPrice && formik.errors.ticketPrice}
              </FormErrorMessage>
            </FormControl>
          )}

          <FormControl
            isInvalid={
              formik.touched.ticketQuantity && formik.errors.ticketQuantity
            }
          >
            <FormLabel htmlFor="ticketQuantity">
              How{" "}
              <Text as="span" textTransform="lowercase">
                {formik.values.ticketName}
              </Text>{" "}
              tickets should be sold
            </FormLabel>

            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Image src={DollarIcon} alt="icon" />
              </InputLeftElement>

              <Input
                id="ticketQuantity"
                name="ticketQuantity"
                type="number"
                placeholder="e.g. 40"
                min={0}
                value={formik.values.ticketQuantity}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("ticketQuantity", true)}
              />
            </InputGroup>

            <FormErrorMessage>
              {formik.touched.ticketQuantity && formik.errors.ticketQuantity}
            </FormErrorMessage>

            <Text fontSize="sm" fontWeight="normal" color="gray.600">
              {ticketQuantity - formik.values.ticketQuantity} tickets available
            </Text>
          </FormControl>

          {data && (
            <Button
              onClick={() => handleOpenDeleteModal()}
              leftIcon={<Image src={TrashIcon} alt="icon" />}
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
          marginTop="6"
        >
          <Button variant="secondary" size="lg" onClick={handlerOnClose}>
            Discard
          </Button>
          {!data ? (
            <Button
              onClick={() => handleSaveTicketDetails()}
              size="lg"
              variant="primary"
            >
              Save ticket
            </Button>
          ) : (
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleUpdateTicketDetails(data.id)}
            >
              Update ticket
            </Button>
          )}
        </Box>
      </Box>
    </Slide>
  );
};
export default TicketModal;
