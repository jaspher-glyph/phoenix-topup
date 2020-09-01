import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import withWidth from '@material-ui/core/withWidth'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { compose } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { login } from 'redux/user/actions'
import { push } from 'connected-next-router'
import Router from 'next/router'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitLoading: {
    margin: theme.spacing(1, 0, 0),
  },
})

const SignIn = (props) => {
  const { classes } = props

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.user.pending)
  const error = useSelector((state) => state.user.error)

  useEffect(() => {
    if (user.token && !user.error && !user.pending) Router.push('/topup')

    return
  }, [user])

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert severity="error" visible={error}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="primary" component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault()
              dispatch(login(form))
            }}
            disabled={loading}
          >
            {loading && <CircularProgress className={classes.submitLoading} size={15} />}
            {!loading && 'Sign In'}
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default compose(withStyles(useStyles, { withTheme: true }), withWidth())(SignIn)
