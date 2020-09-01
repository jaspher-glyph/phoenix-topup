import { Fragment } from 'react'
import { Box, FormControl, InputAdornment, TextField, withStyles } from '@material-ui/core'
import PhoneAndroid from '@material-ui/icons/PhoneAndroid'
import ReCAPTCHA from 'react-google-recaptcha'
import { setMobile, setCaptcha } from '../../stores/actions'
import { useDispatch } from 'react-redux'
import Denom from './Denom'

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(2),
    },
  },
  inputRoot: {
    width: 190,
    '@media (max-width:  400px)': {
      width: 160,
    },
    '@media (max-width:  360px)': {
      width: 140,
    },
    '@media (max-width:  340px)': {
      width: 120,
    },
  },
})

function Amount(props) {
  const { classes } = props
  const dispatch = useDispatch()

  return (
    <Fragment>
      <form noValidate autoComplete="off" className={classes.root}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Mobile"
            helperText="e.g. 09770133487"
            type="number"
            autoFocus={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroid />
                </InputAdornment>
              ),
            }}
            onChange={(e) => dispatch(setMobile(e.target.value))}
          />
        </FormControl>
        <Denom />
        <Box pt={1} px={2} display="flex" justifyContent="center" width="100%" alignItems="center">
          <ReCAPTCHA
            sitekey="6Lecor0ZAAAAAHrGng8WgIcJ6GZJpmDWjIObTBaJ"
            onChange={(e) => dispatch(setCaptcha(e))}
          />
        </Box>
      </form>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(Amount)
