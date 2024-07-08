const buttonStyles = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: '8px',

    _disabled: {
      opacity: 1,
    },

    _hover: {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s ease-in-out',
      boxShadow:
        '0px 2.02px 4.04px -1.01px rgba(16, 40, 16, 0.02), 0px 5.05px 13.13px -5.05px rgba(16, 40, 16, 0.05)',
      _disabled: {
        transform: 'none',
      },
    },

    _active: {
      transform: 'scale(1)',
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

      _hover: {
        bg: 'gray.700',
        _disabled: {
          bg: 'gray.300',
        },
      },

      _active: {
        bg: 'gray.800',
      },

      _disabled: {
        bg: 'gray.300',
      },
    },

    accent: {
      bg: 'green.400',
      color: 'white',

      _hover: {
        bg: 'green.500',
        _disabled: {
          bg: 'gray.300',
        },
      },

      _active: {
        bg: 'green.400',
      },

      _disabled: {
        bg: 'gray.300',
      },
    },

    secondary: {
      bg: 'gray.100',
      color: 'gray.800',
      border: '2px solid',
      borderColor: 'gray.300',

      _hover: {
        bg: 'gray.300',
        _disabled: {
          bg: 'gray.300',
        },
      },

      _active: {
        bg: 'gray.100',
      },

      _disabled: {
        opacity: 0.2,
        bg: 'gray.300',
      },
    },

    danger: {
      bg: 'red.400',
      color: 'white',

      _hover: {
        bg: 'red.500',
        _disabled: {
          bg: 'red.200',
        },
      },

      _active: {
        bg: 'red.400',
      },

      _disabled: {
        bg: 'red.200',
      },
    },
  },
};

export default buttonStyles;
