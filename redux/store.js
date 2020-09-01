import { applyMiddleware, createStore, compose } from 'redux'
import { createRouterMiddleware, initialRouterState } from 'connected-next-router'
import createSagaMiddleware, { END } from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import Router from 'next/router'
import { format } from 'url'
import rootReducer from './reducers'
import rootSaga from './sagas'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware()
  const { asPath, pathname, query } = context.ctx || Router.router || {}
  let initialState
  if (asPath) {
    const url = format({ pathname, query })
    initialState = {
      router: initialRouterState(url, asPath),
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(bindMiddleware([sagaMiddleware, routerMiddleware])),
  )

  // store.runSaga = () => {
  //   // Avoid running twice
  //   if (store.sagaTask) return
  //   store.sagaTask = sagaMiddleware.run(rootSaga)
  // }

  // store.stopSaga = async () => {
  //   // Avoid running twice
  //   if (!store.sagaTask) return
  //   store.dispatch(END)
  //   await store.sagaTask.done
  //   store.sagaTask = null
  // }

  // store.execSagaTasks = async (isServer, tasks) => {
  //   // run saga
  //   store.runSaga()
  //   // dispatch saga tasks
  //   tasks(store.dispatch)
  //   // Stop running and wait for the tasks to be done
  //   await store.stopSaga()
  //   // Re-run on client side
  //   if (!isServer) {
  //     store.runSaga()
  //   }
  // }

  // Initial run
  // store.runSaga()
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })
