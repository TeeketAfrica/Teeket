const checkboxStyles = {
  // 1. We can update the base styles
  baseStyle: {
    control: {
      w: '20px',
      h: '20px',
      border: '1px solid',
      borderColor: 'gray.400',
      rounded: 'full', // change the border radius of the control
      _checked: { bg: '#66CC66', _hover: 'none', borderColor: '#66CC66' },
      _invalid: { borderColor: 'gray.400' },
    },
  },
  sizes: {},
  defaultProps: {},
};

export default checkboxStyles;
