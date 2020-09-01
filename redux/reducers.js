import { combineReducers } from 'redux'
import { routerReducer } from 'connected-next-router'
import user from './user/reducers'
import order from './order/reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  user,
  order,
})

export default rootReducer
