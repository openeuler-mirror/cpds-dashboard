// Validation percentage (no decimal)
export function verifyNumberPercentage(val: string): string {
  let v = val.replace(/(^\s*)|(\s*$)/g, '')
  v = v.replace(/[^\d]/g, '')
  v = v.replace(/^0/g, '')
  v = v.replace(/^[1-9]\d\d{1,3}$/, '100')
  return v
}
