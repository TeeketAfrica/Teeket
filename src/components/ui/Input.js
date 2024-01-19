const inputStyles = {
  baseStyle: {
    field: {
      fontSize: 'sm',
      border: '1px solid',
      borderColor: 'gray.400',
      borderRadius: '6',
      _hover: {
        borderColor: 'gray.500',
      },
      _focusVisible: {
        borderColor: 'gray.500',
        boxShadow: '0px 0px 1px 4px #CBD1CB',
      },
      _invalid: { borderColor: 'red.300' },
    },
  },
  sizes: {
    lg: {
      field: {
        height: '56px',
      },
    },
  },
  defaultProps: {
    variant: null,
  },
};

export default inputStyles;
