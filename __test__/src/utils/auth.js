import Cookies from 'js-cookie'

const TokenKey = 'CAPA-Admin-Token'
const LegalKey = 'CAPA-LEGAL'
const removeKeys = [TokenKey, LegalKey]
const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getLegal() {
  return Cookies.get(LegalKey)
}

export function setLegal(id) {
  return Cookies.set(LegalKey, id)
}

export function removeToken() {
  removeKeys.forEach((key) => {
    Cookies.remove(key)
  })
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
