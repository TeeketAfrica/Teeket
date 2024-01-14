const NumberInputStyles = {
  baseStyle: {
    field: {
      fontSize: 'sm',
      border: '1px solid',
      borderColor: 'gray.300',
      borderRadius: '6',
      height: '58px',
      _hover: {
        borderColor: 'gray.500',
      },
      _focusVisible: {
        borderColor: 'gray.500',
        boxShadow: '0px 0px 1px 4px #CBD1CB',
      },
      _invalid: { borderColor: 'red.300' },
    },
    stepper: {
      border: 'none',
    },
  },
  sizes: {},
  defaultProps: {
    variant: null,
  },
};

export default NumberInputStyles;
