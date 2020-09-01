import { takeLatest, call, put, all } from 'redux-saga/effects'
import { postOrder } from 'lib/apiRequest'
import { actionTypes, setOrderProcessing, setOrderSuccess, setOrderMessage } from './actions'
import { ORDER_SUCCESS, ORDER_FAILED } from './constants'
import { USER_LOAD_BALANCE } from 'redux/user/constants'

export function* dispatchOrder(payload) {
  try {
    yield put(setOrderProcessing(true))
    yield call(postOrder, payload.data, 'paymiah')
    yield put({ type: USER_LOAD_BALANCE })
    yield put(setOrderProcessing(false))
    yield put(setOrderMessage(ORDER_SUCCESS))
    yield put(setOrderSuccess(true))
  } catch (res) {
    yield put(setOrderProcessing(false))
    yield put(setOrderMessage(ORDER_FAILED))
    yield put(setOrderSuccess(false))
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.POST_ORDER, dispatchOrder)])
}
