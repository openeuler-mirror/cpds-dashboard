/**
 * window.localStorage
 * @method set
 * @method get
 * @method remove
 * @method clear
 */
export const Local = {
  // set localStorage
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  // get localStorage by key
  get(key: string) {
    const json: any = window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  // remove localStorage by key
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  // remove all localStorage
  clear() {
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage
 * @method set
 * @method get
 * @method remove
 * @method clear
 */
export const Session = {
  // set sessionStorage
  set(key: string, val: any) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // get sessionStorage by key
  get(key: string) {
    const json: any = window.sessionStorage.getItem(key)
    return JSON.parse(json)
  },
  // remove sessionStorage by key
  remove(key: string) {
    window.sessionStorage.removeItem(key)
  },
  // clear all sessionStorage
  clear() {
    window.sessionStorage.clear()
  }
}
