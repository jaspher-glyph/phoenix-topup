import produce from 'immer'
import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  accountNo: null,
  amount: null,
  otp: null,
  captcha: null,
  denom: null,
  mobile: null,
  sku: null,
  message: null,
  success: null,
  processing: false,
}

const orderReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // case HYDRATE: {
      //   return { ...state, ...action.payload }
      // }

      case actionTypes.SET_OTP:
        draft.otp = action.otp
        break

      case actionTypes.SET_AMOUNT:
        draft.amount = action.amount
        break

      case actionTypes.SET_ACCOUNT_NO:
        draft.accountNo = action.accountNo
        break

      case actionTypes.SET_CAPTCHA:
        draft.captcha = action.captcha
        break

      case actionTypes.SET_DENOM:
        draft.denom = action.denom
        break

      case actionTypes.SET_MOBILE:
        draft.mobile = action.mobile
        break

      case actionTypes.SET_SKU:
        draft.sku = action.sku
        break

      case actionTypes.SET_ORDER_MESSAGE:
        draft.message = action.message
        break

      case actionTypes.SET_ORDER_SUCCESS:
        draft.success = action.status
        break

      case actionTypes.SET_ORDER_PROCESSING:
        draft.processing = action.processing
        break

      case actionTypes.RESET_ORDER_MESSAGE:
        draft.message = null
        break

      case actionTypes.RESET_ORDER_SUCCESS:
        draft.success = null
        break

      case actionTypes.RESET_ORDER_PROCESSING:
        draft.processing = false
        break
    }
  })
}

export default orderReducer
