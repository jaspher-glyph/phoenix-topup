import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import NProgress from 'nprogress'
import Header from './Header'
import Footer from './Footer'
import Navigation from '../Navigation'
import { ThemeProvider } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme'

const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      minHeight: '100vh',
      background: '#fff',
      padding: '2rem',
      zIndex: 1,
    },
  },
  { name: 'MuiRootComponent' },
)
let previousPath = ''

export default function Layout({ children, title = 'Mactel' }) {
  const classes = useStyles()
  const routerState = useSelector((state) => state.router)
  const user = useSelector((state) => state.user)

  // Layout Rendering
  const getLayout = () => {
    if (routerState.pathname === '/login' || routerState.pathname === '/logout') return true

    return false
  }

  // const Container = Layouts[getLayout()]
  const isUserAuthorized = user.token
  const isUserLoading = user.pending
  const isAuthLayout = getLayout()

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
      return null
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized) {
      return <Redirect to="/" />
    }
    // in other case render previously set layout
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      <Header title={title} />
      <ThemeProvider theme={theme}>
        <Navigation />
        <main className={classes.root}>{children}</main>
        <Footer />
      </ThemeProvider>
    </Fragment>
  )
}
