import CryptoJS from 'crypto-js'
export const gateAuth = (request, signKey) => {
  const bodyParams = request

  const paramKeys = Object.keys(bodyParams).sort()

  if (paramKeys.length > 0) {
    let computedSign = ''
    for (let i = 0; i < paramKeys.length; i++) {
      const paramKey = paramKeys[i]
      const paramValue = bodyParams[paramKey]

      if (paramKey !== 'signature') {
        computedSign += `${paramKey}+${paramValue}`

        if (i < paramKeys.length - 1) {
          computedSign += '='
        }
      }
    }
    computedSign = signKey + computedSign

    computedSign = CryptoJS.SHA512(computedSign).toString(CryptoJS.enc.Hex).toLowerCase()

    let cutSignKey = signKey.substring(0, 4)
    cutSignKey = CryptoJS.enc.Utf8.parse(cutSignKey).toString(CryptoJS.enc.Base64)
    cutSignKey = cutSignKey.substring(2)

    computedSign = computedSign + cutSignKey
    computedSign = CryptoJS.SHA512(computedSign).toString(CryptoJS.enc.Hex).toUpperCase()

    return computedSign
  }
}
