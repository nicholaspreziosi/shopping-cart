import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    slate50opacity: "rgba(54, 69, 79, 0.5)",
    slate75opacity: "rgba(54, 69, 79, 0.75)",
    slate: "rgba(54, 69, 79, 1)",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
