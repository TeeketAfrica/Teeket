import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    FormErrorMessage,
    HStack,
    InputGroup,
    InputRightElement,
    Box,
    useToast
} from "@chakra-ui/react";
import { Formik } from "formik";
import MailIconBlack from "../../assets/icon/MailIcon-black.svg";

const ContactForm = () => {
    const toast = useToast();
    return (
        <VStack gap="5" marginBottom="11" maxW="598px" mx="auto">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    comment: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.firstName) {
                        errors.firstName = 'First name is required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Last name is required';
                    }
                    if (!values.comment) {
                        errors.comment = 'Comment is required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        toast({
                            title: "Submitted",
                            description:
                                "Thank you for contacting us.",
                            status: "success",
                            duration: 4000,
                            isClosable: true,
                            position: "top",
                        });
                        
                        setSubmitting(false);
                        resetForm()
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <HStack spacing="5" flexDir={{ base: "column", md: "row" }}>
                            <FormControl isInvalid={errors.firstName && touched.firstName}>
                                <FormLabel>First name</FormLabel>
                                <Input
                                    size="lg"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                />
                                <FormErrorMessage fontSize="xs">{errors.firstName}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.lastName && touched.lastName}>
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    size="lg"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                />
                                <FormErrorMessage fontSize="xs">{errors.lastName}</FormErrorMessage>
                            </FormControl>
                        </HStack>
                        <FormControl isInvalid={errors.email && touched.email} mt="5">
                            <FormLabel>Email Address</FormLabel>
                            <InputGroup>
                                <Input
                                    size="lg"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <InputRightElement pointerEvents="none" h="full">
                                    <MailIconBlack />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.comment && touched.comment} mt="5">
                            <FormLabel>Comment</FormLabel>
                            <Textarea
                                name="comment"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                                height={214}
                            />
                            <FormErrorMessage fontSize="xs">{errors.comment}</FormErrorMessage>
                        </FormControl>
                        <Box mt={5} w="full" display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                size="lg"
                                width={{ base: "100%", md: 145 }}
                                variant="primary"
                            >
                                Send message
                            </Button>
                        </Box>

                    </form>
                )}
            </Formik>
        </VStack>
    );
};

export default ContactForm;
