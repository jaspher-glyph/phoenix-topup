import { takeLatest, call, put, all } from 'redux-saga/effects'
import { loginOtp, getWallet } from 'lib/apiRequest'
import store from 'store'
import { setCookie } from 'nookies'

import {
  USER_CHECK_REQUESTED,
  USER_DISABLED,
  USER_LOGGED_OUT,
  GET_USER_PROFILE,
  USER_DISABLED_ERROR,
  USER_INCORRECT_ERROR,
  USER_LOAD_BALANCE,
} from './constants'

import { setUserAuth, pending, getProfile, failedUserAuth, setUserWallet } from './actions'
import { getAccountData, encryptKey } from 'lib/secure'

export function* loginNow({ data: { username, password } }) {
  try {
    yield put(pending())
    const response = yield call(loginOtp, { email: username, password })
    yield put(setUserAuth({ user: response }))

    const {
      data: { token, sk, ttl, user },
    } = response

    let data = {
      auth: token,
      sk,
      ttl,
      lli: new Date().toLocaleString(),
      profile: JSON.stringify(user),
    }

    store.set('_tsl:pa', encryptKey(data))
    setCookie(null, '_tsl:pa', encryptKey(data))
  } catch (res) {
    const {
      response: {
        data: { code },
      },
    } = res
    yield put(
      failedUserAuth({
        user: false,
        error: code === USER_DISABLED ? USER_DISABLED_ERROR : USER_INCORRECT_ERROR,
      }),
    )
  }
}

export function* logoutNow(action) {
  const requestUrl = config.apiRoot + config.apiURL.logout2
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: action.token.split('=')[1],
    },
  }
  try {
    const response = yield call(request, requestUrl, options)
  } catch (e) {}
}

export function* userProfile(action, callback) {
  const requestUrl = `${config.apiRoot}${config.apiURL.getUserProfile}/${action.userId}`
  const requestAdmin = `${config.apiRoot}UserAdmins?filter={"where":{"id": "${action.userId}"}, "include":"userLevel"}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAccountData().id,
    },
  }

  try {
    const response = yield call(request, requestUrl, options)
    const userAdminData = yield call(request, requestAdmin, options)
    let data = {}
    if (userAdminData) {
      data.role = response.data.role = userAdminData.data[0].userLevel.name || 'INVALID'
    }
    data.name = response.data.firstname + ' ' + response.data.lastname

    localStorage.setItem('_sp:stn', encryptKey(data))

    yield put(getProfile({ userData: response }))
  } catch (e) {}
}

export function* loadUserBalance() {
  try {
    const response = yield call(getWallet)
    const {
      data: {
        data: { wallets },
      },
    } = response

    yield put(setUserWallet(wallets))
  } catch (e) {
    console.log(e)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(USER_CHECK_REQUESTED, loginNow),
    takeLatest(USER_LOGGED_OUT, logoutNow),
    takeLatest(GET_USER_PROFILE, userProfile),
    takeLatest(USER_LOAD_BALANCE, loadUserBalance),
  ])
}
