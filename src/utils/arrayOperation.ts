// Judge whether two array strings are the same
export function judementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
  const news = removeDuplicate(newArr)
  const olds = removeDuplicate(oldArr)
  let count = 0
  const leng = olds.length
  for (const i in olds) {
    for (const j in news) {
      if (olds[i] === news[j]) count++
    }
  }
  return count === leng
}

// Judge whether two objects are the same
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
  if (!a || !b) return false
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) return false
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    const propA = a[propName]
    const propB = b[propName]
    if (!Object.prototype.hasOwnProperty.call(b, propName)) return false
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}

// Array and array object de duplication
export function removeDuplicate(arr: any, attr?: string) {
  if (!arr && !arr.length) {
    return arr
  } else {
    if (attr) {
      const obj: any = {}
      const newArr = arr.reduce((cur: any, item: any) => {
        obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item))
        return cur
      }, [])
      return newArr
    } else {
      return Array.from(new Set([...arr]))
    }
  }
}
