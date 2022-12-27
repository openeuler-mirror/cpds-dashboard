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
