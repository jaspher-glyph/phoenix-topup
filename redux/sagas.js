import { all } from 'redux-saga/effects'
import user from './user/sagas'
import order from './order/sagas'

function* rootSaga() {
  try {
    yield all([user(), order()])
  } catch (err) {}
}

export default rootSaga
