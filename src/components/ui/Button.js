const buttonStyles = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: 'semibold', // Normally, it is "semibold"
    textTransform: 'capitalize',
    borderRadius: '8px',
  },
  // 2. We can add a new button size or extend existing
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
  // 3. We can add a new visual variant
  variants: {
    // 4. We can override existing variants
    primary: {
      bg: 'gray.800',
      color: 'white',
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
  // 6. We can overwrite defaultProps
  defaultProps: {
    size: 'md', // default is md
    variant: 'primary', // default is solid
  },
};

export default buttonStyles;
