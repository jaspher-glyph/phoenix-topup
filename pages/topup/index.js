import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Paper,
  Snackbar,
  withStyles,
  withWidth,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { resetOrderMessage, resetOrderSuccess, resetOrderProcessing } from 'redux/order/actions'
import Amount from 'components/topup/Amount'
import Wallet from 'components/Wallet'
import { useSelector, useDispatch } from 'react-redux'
import Draggable from 'react-draggable'
import { postOrder } from 'redux/order/actions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const styles = (theme) => ({
  root: {
    marginTop: '60px',
  },
})

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

function Topup(props) {
  const [loading, setLoading] = useState(false)
  const mobile = useSelector((state) => state.order.mobile)
  const amount = useSelector((state) => state.order.amount)
  const captcha = useSelector((state) => state.order.captcha)
  const denom = useSelector((state) => state.order.denom)
  const wallet = useSelector((state) => state.user.wallet)
  const sku = useSelector((state) => state.order.sku)
  const orderMessage = useSelector((state) => state.order.message)
  const orderSucces = useSelector((state) => state.order.success)
  const [open, setOpen] = useState(false)
  const { classes } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'USER/LOAD_BALANCE' })
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSnackClose = () => {
    dispatch(resetOrderMessage())
    dispatch(resetOrderSuccess())
    dispatch(resetOrderProcessing())
  }

  const handleLoad = () => {
    dispatch(postOrder({ mobile, productName: sku }))
    setOpen(false)
  }

  return (
    <>
      <Grid className={classes.root} container direction="row" justify="center">
        <Wallet maxWidth="md" wallet={wallet}>
          <Amount />
          <Box my={3}>
            {/* <Link href={'/otp'} passHref> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              // type="submit"
              size="large"
              disabled={!mobile || !denom || !captcha || !amount || !sku || !wallet}
              onClick={handleClickOpen}
            >
              Proceed {loading && <ButtonCircularProgress />}
            </Button>
            {/* </Link> */}
          </Box>
        </Wallet>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {denom}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to load {denom}. This will deduct PHP {amount} on your wallet. Do you want
            to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoad} color="primary">
            Load
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={orderMessage ? true : false}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={orderSucces ? 'success' : 'error'}>
          {orderMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(Topup))
