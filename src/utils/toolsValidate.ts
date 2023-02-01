// Validation percentage (no decimal)
export function verifyNumberPercentage(val: string): string {
  let v = val.replace(/(^\s*)|(\s*$)/g, '')
  v = v.replace(/[^\d]/g, '')
  v = v.replace(/^0/g, '')
  v = v.replace(/^[1-9]\d\d{1,3}$/, '100')
  return v
}

// Remove Chinese and space
export function verifyCnAndSpace(val: string) {
  let v = val.replace(/[\u4e00-\u9fa5\s]+/g, '')
  v = v.replace(/(^\s*)|(\s*$)/g, '')
  return v
}

// Remove English and space
export function verifyEnAndSpace(val: string) {
  let v = val.replace(/[a-zA-Z]+/g, '')
  v = v.replace(/(^\s*)|(\s*$)/g, '')
  return v
}

// No spaces
export function verifyAndSpace(val: string) {
  const v = val.replace(/(^\s*)|(\s*$)/g, '')
  return v
}

// phone number
export function verifyPhone(val: string) {
  if (!/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(val))
    return false
  else return true
}

// IP address
export function verifyIPAddress(val: string) {
  if (
    !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
      val
    )
  )
    return false
  else return true
}
