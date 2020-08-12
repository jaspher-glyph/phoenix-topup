import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "../Navigation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";

const useStyles = makeStyles(
  {
    root: {
      position: "relative",
      minHeight: "100vh",
      background: "#fff",
      padding: "2rem",
      zIndex: 1,
    },
  },
  { name: "MuiRootComponent" }
);

export default function Layout({ children, title = "Phoenix Top Up" }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Header title={title} />
      <ThemeProvider theme={theme}>
        <Navigation />
        <main className={classes.root}>{children}</main>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}
