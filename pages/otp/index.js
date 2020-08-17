import { Fragment, useEffect, useState } from "react";
import { Button, Grid, withStyles, withWidth } from "@material-ui/core";
import OtpForm from "../../components/otp/OtpForm";
import ActionPaper from "../../components/ActionPaper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setOtp } from "../../stores/actions";
import axios from "axios";

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

async function callApi(mobile, amount, denom) {
  axios({
    method: "post",
    headers: { "content-type": "application/json" },
    url: "https://everlasting-morning-dead.glitch.me/slingshot",
    data: {
      mobile,
      amount,
      denom,
    },
  }).then(({ data }) => {
    const { redirect_url } = data;
    window.location = redirect_url;
  });
}

function Otp(props) {
  const { classes } = props;
  const [loading, setLoading] = useState(false);
  const mobile = useSelector((state) => state.mobile);
  const denom = useSelector((state) => state.denom);
  const amount = useSelector((state) => state.amount);
  const captcha = useSelector((state) => state.captcha);
  const otp = useSelector((state) => state.otp);
  const OTP_LENGTH = 6;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mobile || !denom || !captcha || !amount) {
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
                onClick={() => callApi(mobile, amount, denom)}
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
