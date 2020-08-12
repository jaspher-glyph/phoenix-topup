import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import Link from "next/link";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(
  {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
  },
  { name: "MuiHeaderComponent" }
);

export default function Navigation(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link href={"/"} passHref>
              <Typography className={classes.title} variant="h6">
                Phoenix Top Up
              </Typography>
            </Link>
            <Link href={"/topup"} passHref>
              <Button color="inherit">Top Up</Button>
            </Link>
            <Link href={"/terms"} passHref>
              <Button color="inherit">Terms of Service</Button>
            </Link>
            <Link href={"/policy"} passHref>
              <Button color="inherit">Privacy Policy</Button>
            </Link>
            <Link href={"#contact"} passHref>
              <Button color="inherit">Contact Us</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}
