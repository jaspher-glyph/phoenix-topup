import React, { Fragment } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  withStyles,
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ReCAPTCHA from "react-google-recaptcha";
import { setAccountNo, setAmount, setCaptcha } from "../../stores/actions";
import { useDispatch } from "react-redux";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  inputRoot: {
    width: 190,
    "@media (max-width:  400px)": {
      width: 160,
    },
    "@media (max-width:  360px)": {
      width: 140,
    },
    "@media (max-width:  340px)": {
      width: 120,
    },
  },
});

function onChange(value) {
  console.log("Captcha value:", value);
}

function Amount(props) {
  const { classes } = props;
  const dispatch = useDispatch();

  return (
    <Fragment>
      <form noValidate autoComplete="off" className={classes.root}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Account Number"
            helperText="e.g. 1002123456789"
            type="number"
            autoFocus={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={(e) => dispatch(setAccountNo(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Amount"
            helperText="e.g. 10"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => dispatch(setAmount(e.target.value))}
          />
        </FormControl>
        <Box px={2}>
          <ReCAPTCHA
            sitekey="6Lecor0ZAAAAAHrGng8WgIcJ6GZJpmDWjIObTBaJ"
            onChange={(e) => dispatch(setCaptcha(e))}
          />
        </Box>
      </form>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(Amount);
