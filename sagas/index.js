import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  setOtp,
  setAmount,
  setAccountNo,
} from "../stores/actions";

function* rootSaga() {
  yield all([]);
}

export default rootSaga;
