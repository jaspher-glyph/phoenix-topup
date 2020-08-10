import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "../Navigation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ed8b42",
      contrastText: "#fff", //button text white instead of black
    },
    secondary: {
      main: "#4a55b1",
    },
  },
});

export default function Layout({ children, title = "Phoenix Top Up" }) {
  return (
    <React.Fragment>
      <Header title={title} />
      <ThemeProvider theme={theme}>
        <Navigation />
        {children}
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
