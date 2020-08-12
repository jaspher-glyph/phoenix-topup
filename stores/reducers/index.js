import { actionTypes } from "../actions";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  accountNo: undefined,
  amount: undefined,
  otp: undefined,
  captcha: undefined,
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

    default:
      return state;
  }
}

export default reducer;
