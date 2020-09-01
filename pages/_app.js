import App from 'next/app'
import { ConnectedRouter } from 'connected-next-router'
import MainLayout from '../components/layouts/MainLayout'
import { useSelector, useDispatch } from 'react-redux'
import { parseCookies } from 'nookies'
import { wrapper } from 'redux/store'
import Router from 'next/router'
import { isEmpty } from 'lodash'

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ConnectedRouter>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ConnectedRouter>
  )
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

MyApp.getInitialProps = async (appContext) => {
  const pageProps = await App.getInitialProps(appContext)
  const { Component, ctx } = appContext
  const { '_tsl:pa': token } = parseCookies(ctx)

  // Restrict unauthorized user
  if (isEmpty(token)) {
    const isProtectedRoute = ctx.pathname === '/topup'
    if (isProtectedRoute) {
      redirectUser(ctx, '/')
    }
  } else {
    try {
      // Restrict user based on role on certain page
      // const user;
      // const isRoot = user.role === "root";
      // const isAdmin = user.role === "admin";
      // const isNotPermitted =
      //   !(isRoot || isAdmin) && ctx.pathname === "/create";
      // if (isNotPermitted) {
      //   redirectUser(ctx, "/");
      // }
      // pageProps.user = user
    } catch (err) {
      console.error('Error getting current user', err)
      // destroyCookie(ctx, 'token')
      redirectUser(ctx, '/')
    }
  }
}

export default wrapper.withRedux(MyApp)
