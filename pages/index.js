import { Fragment, useState } from "react";
import { Button, Grid, withStyles, withWidth } from "@material-ui/core";
import ActionPaper from "../components/ActionPaper";
import Amount from "../components/topup/Amount";
import { useSelector } from "react-redux";
import Link from "next/link";

const styles = (theme) => ({
  root: {
    marginTop: "60px",
  },
});

function Topup(props) {
  const [loading, setLoading] = useState(false);
  const mobile = useSelector((state) => state.mobile);
  const denom = useSelector((state) => state.denom);
  const captcha = useSelector((state) => state.captcha);
  const { classes } = props;

  return (
    <Fragment>
      <Grid className={classes.root} container direction="row" justify="center">
        <ActionPaper
          helpPadding
          maxWidth="md"
          title="Top up your account"
          content={<Amount />}
          actions={
            <Fragment>
              <Link href={"/otp"} passHref>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  disabled={!mobile || !denom || !captcha}
                >
                  Proceed {loading && <ButtonCircularProgress />}
                </Button>
              </Link>
            </Fragment>
          }
        />
      </Grid>
    </Fragment>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(Topup));
