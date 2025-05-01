const radioStyles = {
  baseStyle: {
    control: {
      border: '1px solid',
      borderColor: 'gray.400',
      backgroundColor: 'gray.100',

      _checked: {
        backgroundColor: 'gray.100',
        borderColor: 'green.400',

        _hover: {
          backgroundColor: 'gray.100',
          borderColor: 'green.400',
        },

        _before: {
          w: '55%',
          h: '56%',
          bg: 'green.400',
        },
      },

      _invalid: { borderColor: 'red.300' },
    },
  },
  variants: {
    border: {
      container: {
        padding: '4',
        border: '1px solid',
        borderColor: 'gray.300',
        borderRadius: '8',

        _hover: {
          borderColor: 'gray.500',
        },

        _checked: {
          borderColor: 'green.800',
        },

        _invalid: { borderColor: 'red.300' },
      },
    },
  },
  sizes: {
    lg: {
      label: {
        fontSize: 'md',
      },
    },
  },
  defaultProps: {},
};

export default radioStyles;
