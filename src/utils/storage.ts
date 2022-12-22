import Cookies from 'js-cookie'

// window.localStorage
export const Local = {
  // set
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  // get
  get(key: string) {
    const json: any = window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  // remove
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  // remove all
  clear() {
    window.localStorage.clear()
  }
}

// window.sessionStorage
export const Session = {
  // set
  set(key: string, val: any) {
    if (key === 'token') return Cookies.set(key, val)
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // get
  get(key: string) {
    if (key === 'token') return Cookies.get(key)
    const json: any = window.sessionStorage.getItem(key)
    return JSON.parse(json)
  },
  // remove
  remove(key: string) {
    if (key === 'token') return Cookies.remove(key)
    window.sessionStorage.removeItem(key)
  },
  // remove all
  clear() {
    Cookies.remove('token')
    window.sessionStorage.clear()
  }
}
