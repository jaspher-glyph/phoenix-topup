export const actionTypes = {
  SET_OTP: 'SET_OTP',
  SET_AMOUNT: 'SET_AMOUNT',
  SET_ACCOUNT_NO: 'SET_ACCOUNT_NO',
  SET_CAPTCHA: 'SET_CAPTCHA',
  SET_DENOM: 'SET_DENOM',
  SET_MOBILE: 'SET_MOBILE',
  SET_SKU: 'SET_SKU',
  SET_ORDER_MESSAGE: 'SET_ORDER_MESSAGE',
  SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS',
  SET_ORDER_PROCESSING: 'SET_ORDER_PROCESSING',
  RESET_ORDER_MESSAGE: 'RESET_ORDER_MESSAGE',
  RESET_ORDER_SUCCESS: 'RESET_ORDER_SUCCESS',
  RESET_ORDER_PROCESSING: 'RESET_ORDER_PROCESSING',
  POST_ORDER: 'POST_ORDER',
}

export function setOtp(otp) {
  return {
    type: actionTypes.SET_OTP,
    otp,
  }
}

export function setAmount(amount) {
  return { type: actionTypes.SET_AMOUNT, amount }
}

export function setAccountNo(accountNo) {
  return { type: actionTypes.SET_ACCOUNT_NO, accountNo }
}

export function setCaptcha(captcha) {
  return { type: actionTypes.SET_CAPTCHA, captcha }
}

export function setDenom(denom) {
  return { type: actionTypes.SET_DENOM, denom }
}

export function setMobile(mobile) {
  return { type: actionTypes.SET_MOBILE, mobile }
}

export function setSku(sku) {
  return { type: actionTypes.SET_SKU, sku }
}

export function setOrderMessage(message) {
  return { type: actionTypes.SET_ORDER_MESSAGE, message }
}

export function setOrderSuccess(status) {
  return { type: actionTypes.SET_ORDER_SUCCESS, status }
}

export function setOrderProcessing(processing) {
  return { type: actionTypes.RESET_ORDER_PROCESSING, processing }
}

export function resetOrderMessage() {
  return { type: actionTypes.RESET_ORDER_MESSAGE }
}

export function resetOrderSuccess() {
  return { type: actionTypes.RESET_ORDER_SUCCESS }
}

export function resetOrderProcessing() {
  return { type: actionTypes.RESET_ORDER_PROCESSING }
}

export function postOrder(data) {
  return {
    type: actionTypes.POST_ORDER,
    data,
  }
}
