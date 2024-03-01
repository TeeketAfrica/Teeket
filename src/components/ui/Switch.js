const switchStyles = {
  baseStyle: {
    track: {
      alignItems: "center",
      bg: "gray.400",
      height: "17px",
      width: "29.5px",
      padding: "3px",
      _checked: {
        bg: "#06CC06",
      },

      _focus: {
        boxShadow: "none",
      },
    },

    thumb: {
      width: "17.5px",
      height: "17.5px",

      _checked: {
        transform: "translateX(12px)",
      },
    },
  },
  variants: {},
  sizes: {},
};

export default switchStyles;
