import store from 'store'
const KEYS = process.env.NEXT_PUBLIC_KEYS

const CryptoJS = require('crypto-js')

export const encryptKey = (obj) => {
  let data = JSON.stringify(obj)

  const ciphertext = CryptoJS.AES.encrypt(data, KEYS).toString()
  return ciphertext
}

export const decryptKey = (key) => {
  let bytes = CryptoJS.AES.decrypt(key, '4be8cf6a-683b-9a26-de53-8e0e3dbba044c')
  let plaintext = bytes.toString(CryptoJS.enc.Utf8)

  return JSON.parse(plaintext)
}

export const getStore = () => {
  return decryptKey(store.get('_tsl:pa'))
}

export const getAccount = () => {
  return decryptKey(store.get('_dt:usc'))
}

export const getProfile = () => {
  return decryptKey(store.get('_sp:stn'))
}

export const getAccountData = () => {
  return decryptKey(store.get('_dt:usc')).user.data
}
