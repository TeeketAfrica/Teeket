const textareaStyles = {
  baseStyle: {
    fontSize: 'sm',
    border: '1px solid',
    borderColor: 'gray.400',
    borderRadius: '6',
    _hover: {
      borderColor: 'gray.800',
    },
    _focusVisible: {
      borderColor: 'gray.800',
      boxShadow: '0px 0px 0px 4px #E7ECE7',
    },
    _invalid: { borderColor: 'red.300' },
  },
  sizes: {},
  defaultProps: {
    variant: null,
  },
};

export default textareaStyles;
