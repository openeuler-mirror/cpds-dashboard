export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}
