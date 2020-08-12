import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ContactUs from "../ContactUs";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: "sticky",
      left: 0,
      bottom: 0,
      width: "100%",
      background: theme.palette.common.darkBlack,
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.common.white,
      fontWeight: 500,
      fontSize: "1.2em",
    },
  }),
  { name: "MuiFooterComponent" }
);

const Footer = (props) => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <ContactUs />
      <div id="contact">© 2020 Team Phoenix</div>
    </footer>
  );
};

export default Footer;
