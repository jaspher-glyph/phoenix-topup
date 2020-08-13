import { actionTypes } from "../actions";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  accountNo: undefined,
  amount: undefined,
  otp: undefined,
  captcha: undefined,
  denom: undefined,
  mobile: undefined,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case actionTypes.SET_OTP:
      return {
        ...state,
        ...{ otp: action.otp },
      };

    case actionTypes.SET_AMOUNT:
      return {
        ...state,
        ...{ amount: action.amount },
      };

    case actionTypes.SET_ACCOUNT_NO:
      return {
        ...state,
        ...{ accountNo: action.accountNo },
      };

    case actionTypes.SET_CAPTCHA:
      return {
        ...state,
        ...{ captcha: action.captcha },
      };

    case actionTypes.SET_DENOM:
      return {
        ...state,
        ...{ denom: action.denom },
      };

    case actionTypes.SET_MOBILE:
      return {
        ...state,
        ...{ mobile: action.mobile },
      };

    default:
      return state;
  }
}

export default reducer;
