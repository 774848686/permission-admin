import Cookies from 'js-cookie'

const TokenKey = 'e10adc3949ba59abbe56e057f20f883e';//Admin-Token md5加密
const menuKey = 'menu';
const userName = 'name'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setMenuCookie (menu) {
  return localStorage.setItem(menuKey, menu)
}
export function getMenuCookie () {
  return JSON.parse(localStorage.getItem(menuKey))
}
export function setuserName (name) {
  return Cookies.set(userName, name)
}
export function getuserName () {
  return Cookies.get(userName)
}
