import { extendTheme } from "@chakra-ui/react";

import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Checkbox from "./components/ui/Checkbox";
import Progress from "./components/ui/Progress";
import Textarea from "./components/ui/Textarea";
import Radio from "./components/ui/Radio";

// example theme
export const theme = extendTheme({
  components: {
    Button,
    Input,
    Checkbox,
    Progress,
    Textarea,
    Radio,
  },
  colors: {
    transparent: "transparent",
    black: "#000000",
    white: "#fff",
    border: "rgba(255, 255, 255, 0.30)",
    grey100: "#F0F2F5",
    error500: "#CB1A14",
    textSuccess: "#06CC06",
    gray: {
      100: "#FFFFFF",
      200: "#F7FAF7",
      300: "#E7ECE7",
      400: "#CBD1CB",
      500: "#98A298",
      600: "#5E665E",
      700: "#3E453E",
      800: "#141714",
    },
    green: {
      100: "#F4FFF9",
      200: "#E1FAED",
      300: "#3DF291",
      400: "#06CC62",
      500: "#00803B",
    },
    red: {
      100: "#FFF4F5",
      200: "#FAE1E3",
      300: "#F23D49",
      400: "#CC0613",
      500: "#800009",
    },
    blue: {
      100: "#F4F9FF",
      200: "#E1EDFA",
      300: "#3D91F2",
      400: "#0662CC",
      500: "#003C80",
    },
    Yellow: {
      100: "#FFFCF4",
      200: "#FAF4E1",
      300: "#F2C53D",
      400: "#CC9E13",
      500: "#806000",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Inter, sans-serif",
  },
  fontSizes: {
    xxs: "10px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "32px",
    "5xl": "36px",
    "6xl": "40px",
    "7xl": "48px",
    "8xl": "56px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  space: {
    1: "4px", // 4px
    2: "8px", // 8px
    3: "12px", // 12px
    4: "16px", // 16px
    5: "20px", // 20px
    6: "24px", // 24px
    7: "28px", // 28px
    8: "32px", // 32px
    9: "40px", // 40px
    10: "48px", // 48px
    11: "64px", // 64px
    12: "80px", // 80px
    13: "96px", // 96px
    14: "128px", // 128px
    15: "160px", // 160px
    16: "192px", // 192px
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
});
