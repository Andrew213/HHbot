import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import Core from "./pages/core";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

darkTheme.typography.h6 = {
  [darkTheme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "1.3rem",
  },
  [darkTheme.breakpoints.up("lg")]: {
    fontSize: "1.5rem",
  },
};

darkTheme.typography.h5 = {
  fontSize: "1rem",
  "@media (min-width: 500px)": {
    fontSize: "1rem",
  },
  "@media (min-width: 900px)": {
    fontSize: "1.3rem",
  },
  "@media (min-width: 1325px)": {
    fontSize: "1.5rem",
  },
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Core />
    </ThemeProvider>
  </BrowserRouter>,
);
