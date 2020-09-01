import produce from 'immer'
import { HYDRATE } from 'next-redux-wrapper'
import { map, reduce } from 'lodash'
import {
  DEFAULT_ACTION,
  USER_LOGGED_IN,
  USER_LOADING,
  GET_PROFILE_RESPONSE,
  USER_LOGGED_IN_FAILED,
  SET_USER_WALLET,
} from './constants'

const initialState = {
  id: '',
  username: '',
  email: '',
  mobile: '',
  token: '',
  name: '',
  role: '',
  avatar: '',
  authorized: process.env.REACT_APP_AUTHENTICATED || false,
  loading: false,
}

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // case HYDRATE:
      //   return { ...state, ...action.payload }
      case DEFAULT_ACTION:
        return state
      case USER_LOGGED_IN:
        map(action.user.user.data.user, (v, k) => {
          draft[k] = v
        })
        draft.token = action.user.user.data.token
        draft.fetched = true
        draft.pending = false
        break
      case USER_LOGGED_IN_FAILED:
        draft.error = action.user.error
        draft.fetched = true
        draft.pending = false
        break
      case USER_LOADING:
        draft.error = false
        draft.fetched = false
        draft.pending = true
        break
      case GET_PROFILE_RESPONSE:
        draft.userData = action.profile
        break
      case SET_USER_WALLET:
        draft.wallet = reduce(
          action.wallets,
          (s, n) => {
            return s + n.availableBalance
          },
          0,
        )
        break
    }
  })
}

export default userReducer
