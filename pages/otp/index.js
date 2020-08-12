import { Fragment, useEffect, useState } from "react";
import { Button, Grid, withStyles, withWidth } from "@material-ui/core";
import OtpForm from "../../components/otp/OtpForm";
import ActionPaper from "../../components/ActionPaper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setOtp } from "../../stores/actions";

const styles = (theme) => ({
  root: {
    marginTop: "60px",
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem",
  },
  otpInput: {
    width: "20%",
    height: "4rem",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "2rem",
    textAlign: "center",
    borderRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  },
});

async function callApi() {
  const res = await fetch(
    "https://us-central1-cignal-273002.cloudfunctions.net/paygate-phoenixtopups-create",
    {
      method: "POST",

      headers: {
        accept: "*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user: {
          mobile: "+639770133487",
          email: "mark@glyph.com.ph",
        },
        items: [
          {
            name: "regular load 10",
            quantity: 1,
            amount: 10,
          },
        ],
        amount: 10,
      }),
    }
  );

  const { redirect_url } = await res.json();
  // const res = await fetch("https://api.github.com/repos/vercel/next.js");
  // const json = await res.json();
  console.log(redirect_url);
  window.location = redirect_url;
}

function Otp(props) {
  const { classes } = props;
  const [loading, setLoading] = useState(false);
  const accountNo = useSelector((state) => state.accountNo);
  const amount = useSelector((state) => state.amount);
  const captcha = useSelector((state) => state.captcha);
  const otp = useSelector((state) => state.otp);
  const OTP_LENGTH = 6;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accountNo || !amount || !captcha) {
      router.push("/topup");
    }
  });

  return (
    <Fragment>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <ActionPaper
          helpPadding
          maxWidth="sm"
          title="We send your mobile an OTP to proceed in your transaction. Kindly input the 6 digit code"
          titleVariant="h6"
          content={
            <OtpForm
              length={OTP_LENGTH}
              className={classes.otpContainer}
              inputClassName={classes.otpInput}
              isNumberInput
              autoFocus
              onChangeOTP={(otp) => dispatch(setOtp(otp))}
            />
          }
          actions={
            <Fragment>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                disabled={!otp || otp.length < OTP_LENGTH}
                onClick={() => callApi()}
              >
                Submit OTP {loading && <ButtonCircularProgress />}
              </Button>
            </Fragment>
          }
        />
      </Grid>
    </Fragment>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(Otp));
