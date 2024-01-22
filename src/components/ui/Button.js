const buttonStyles = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: '8px',

    _disabled: {
      opacity: 1,
    },
  },

  sizes: {
    sm: {
      h: '36px',
      fontSize: 'sm',
      px: '8px',
    },
    lg: {
      h: '56px',
      fontSize: 'md',
      px: '16px',
    },
  },

  variants: {
    primary: {
      bg: 'gray.800',
      color: 'white',

      _disabled: {
        bg: 'gray.300',
      },

      _hover: {
        _disabled: {
          bg: 'gray.300',
        },
      },
    },

    accent: {
      bg: 'green.500',
      color: 'white',
    },

    secondary: {
      bg: 'gray.100',
      color: 'gray.800',
      border: '2px solid',
      borderColor: 'gray.300',
    },
  },
};

export default buttonStyles;
