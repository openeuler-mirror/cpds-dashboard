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
