import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

const RenderFormControl = (formik, formData) => {
  return (
    <FormControl
      isInvalid={formik.touched[formData.name] && formik.errors[formData.name]}
      key={formData.name}
    >
      <FormLabel htmlFor={formData.name}>{formData.label}</FormLabel>

      {formData.type !== "textarea" ? (
        <Input
          name={formData.name}
          id={formData.name}
          type={formData.type}
          placeholder={formData.placeholder}
          size="lg"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      ) : (
        <Textarea
          id={formData.name}
          name={formData.name}
          placeholder={formData.placeholder}
          size="sm"
          rows="7"
        />
      )}
      <FormErrorMessage>
        {formik.touched[formData.name] && formik.errors[formData.name]}
      </FormErrorMessage>
    </FormControl>
  );
};

export default RenderFormControl;
