import axios from 'axios'
import CryptoJS from 'crypto-js'
import { gateAuth } from './PhoenixGateAuth'
import { getStore } from './secure'
import moment from 'moment'

const API_URL = process.env.API_URL
const REDIRECT_URL = process.env.REDIRECT_URL
const GET_SETTINGS = { headers: { 'Content-Type': 'application/json' } }

const getHeaders = () => {
  return {
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getStore().auth },
  }
}

const getSk = () => {
  const sk = CryptoJS.enc.Base64.parse(getStore().sk)
  return CryptoJS.enc.Utf8.stringify(sk)
}

let current = moment().format('YYYY-MM-DD')

export const getProductList = (category, subcategory) => {
  let params = '?enabled=true&'
  if (subcategory === null) {
    params += 'category=' + category
  } else {
    params += 'category=' + category + '&subcategory=' + subcategory
  }
  const PRODUCT = API_ROOT + API_URL.GET_PRODUCT + params
  return axios.get(PRODUCT, getHeaders())
}

export const getSpecificProduct = (sku) => {
  const PRODUCT = API_ROOT + API_URL.GET_PRODUCT + '?sku=' + sku
  return axios.get(PRODUCT, getHeaders())
}

export const getTransactions = () => {
  const TRANSACTIONS =
    API_ROOT +
    API_URL.GET_TRANSACTIONS +
    `?includeItems=true&orderBy=createdAt&desc=true&from=${current} 00:00:00&to=${current}`
  return axios.get(TRANSACTIONS, getHeaders())
}

export const getCommissions = () => {
  const COMMISSION = API_ROOT + API_URL.GET_COMMISSIONS
  return axios.get(COMMISSION, getHeaders())
}

export const getSales = () => {
  const SALES = API_ROOT + API_URL.GET_SALES + `?from=${current} 00:00:00&to=${current}`
  return axios.get(SALES, getHeaders())
}

export const getWallet = () => {
  const WALLET = process.env.NEXT_PUBLIC_API_ROOT + process.env.NEXT_PUBLIC_API_WALLET
  return axios.get(WALLET, getHeaders())
}

export const getAccount = () => {
  const ACCOUNT = API_ROOT + API_URL.GET_ACCOUNT
  return axios.get(ACCOUNT, getHeaders())
}

export const postOrder = (payload, paymentMethod) => {
  let data = {}
  if (payload.accountBox === '') {
    data = {
      recipientName: 'gate-tester',
      recipientMobile: payload.mobile,
      sku: payload.productName,
      paymentMethod,
    }
  } else {
    data = {
      recipientName: 'gate-tester',
      recipientMobile: payload.mobile,
      sku: payload.productName,
      paymentMethod: 'paymiah',
      // accountBox: payload.accountBox,
    }
  }

  // if (payload.amount !== '') {
  //   data['amount'] = payload.amount
  // }
  let holder = gateAuth(data, getSk())
  data['signature'] = holder

  const ORDER = process.env.NEXT_PUBLIC_API_ROOT + process.env.NEXT_PUBLIC_API_POST_ORDER
  return axios.post(ORDER, data, getHeaders())
}

export const setPassword = (payload) => {
  let data = { oldPassword: payload.oldPass, newPassword: payload.confirmPass }
  let holder = gateAuth(data, getSk())
  data['signature'] = holder

  const PASS = API_ROOT + API_URL.SET_PASSWORD
  return axios.post(PASS, data, getHeaders())
}

export const loginOtp = (payload) => {
  let data = { username: payload.email, password: payload.password }
  if (payload.otp !== '') {
    data['otp'] = payload.otp
  }

  const LOGIN = process.env.NEXT_PUBLIC_API_ROOT + process.env.NEXT_PUBLIC_API_LOGIN
  return axios.post(LOGIN, data)
}

export const requestReset = (payload) => {
  let data = { email: payload.forgotEmail, redirectUrl: REDIRECT_URL }

  const REQUEST_RESET = API_ROOT + API_URL.REQUEST_RESET
  return axios.post(REQUEST_RESET, data, GET_SETTINGS)
}

export const resetPass = (newPassword, token) => {
  let data = { newPassword, token }

  const RESET_PASS = API_ROOT + API_URL.RESET_PASS
  return axios.post(RESET_PASS, data, GET_SETTINGS)
}
