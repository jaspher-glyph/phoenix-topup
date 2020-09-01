import {
  DEFAULT_ACTION,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOADING,
  USER_CHECK_REQUESTED,
  GET_USER_PROFILE,
  GET_PROFILE_RESPONSE,
  USER_LOGGED_IN_FAILED,
  USER_LOAD_BALANCE,
  SET_USER_WALLET,
} from './constants'

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION,
  }
}

export const login = (data) => {
  return {
    type: USER_CHECK_REQUESTED,
    data,
  }
}

export const setUserAuth = (user) => {
  return {
    type: USER_LOGGED_IN,
    user,
  }
}

export const failedUserAuth = (user) => {
  return {
    type: USER_LOGGED_IN_FAILED,
    user,
  }
}

export const pending = () => {
  return {
    type: USER_LOADING,
    pending: true,
  }
}

export const logout = (token) => {
  return {
    type: USER_LOGGED_OUT,
    token,
  }
}

export const getUserProfile = (userId, cb) => {
  return {
    type: GET_USER_PROFILE,
    userId,
    cb,
  }
}

export const getProfile = (profile) => {
  return {
    type: GET_PROFILE_RESPONSE,
    profile,
  }
}

export const loadBalance = () => {
  return { type: USER_LOAD_BALANCE }
}

export const setUserWallet = (wallets) => {
  return { type: SET_USER_WALLET, wallets }
}
