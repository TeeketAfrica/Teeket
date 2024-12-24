const tabsStyles = {
  variants: {
    line: {
      tab: {
        fontWeight: "medium",
        color: "gray.600",

        _selected: {
          color: "gray.800",
        },

        _hover: {
          color: "gray.800",
        },

        _active: {
          bgColor: "gray.300",
        },
      },
    },
  },

  sizes: {
    md: {
      tab: {
        fontSize: "sm",
        px: "4",
        py: "4",
      },
    },
  },
};

export default tabsStyles;
