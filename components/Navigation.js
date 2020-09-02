import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import store from 'store'

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const useStyles = makeStyles(
  {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      cursor: 'pointer',
    },
  },
  { name: 'MuiHeaderComponent' },
)

const logout = () => {
  destroyCookie(null, '_tsl:pa')
  store.remove('_tsl:pa')
  Router.push('/')
}

export default function Navigation(props) {
  const classes = useStyles()
  const { '_tsl:pa': token } = parseCookies()

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* eslint-disable react/jsx-props-no-spreading */}
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link href="/" passHref>
              <Typography className={classes.title} variant="h6">
                Mactel
              </Typography>
            </Link>
            {token && (
              <Link href="/topup" passHref>
                <Button color="inherit">Top Up</Button>
              </Link>
            )}
            {/* <Link href="/terms" passHref>
              <Button color="inherit">Terms of Service</Button>
            </Link>
            <Link href="/policy" passHref>
              <Button color="inherit">Privacy Policy</Button>
            </Link> */}

            {/* <Link href="#contact" passHref>
              <Button color="inherit">Contact Us</Button>
            </Link> */}
            {token && (
              <Button color="inherit" onClick={logout}>
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  )
}
