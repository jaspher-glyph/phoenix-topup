export const actionTypes = {
  SET_OTP: "SET_OTP",
  SET_AMOUNT: "SET_AMOUNT",
  SET_ACCOUNT_NO: "SET_ACCOUNT_NO",
  SET_CAPTCHA: "SET_CAPTCHA",
  SET_DENOM: "SET_DENOM",
  SET_MOBILE: "SET_MOBILE",
};

export function setOtp(otp) {
  return {
    type: actionTypes.SET_OTP,
    otp,
  };
}

export function setAmount(amount) {
  return { type: actionTypes.SET_AMOUNT, amount };
}

export function setAccountNo(accountNo) {
  return { type: actionTypes.SET_ACCOUNT_NO, accountNo };
}

export function setCaptcha(captcha) {
  return { type: actionTypes.SET_CAPTCHA, captcha };
}

export function setDenom(denom) {
  return { type: actionTypes.SET_DENOM, denom };
}

export function setMobile(mobile) {
  return { type: actionTypes.SET_MOBILE, mobile };
}
