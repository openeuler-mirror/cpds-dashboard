import { ElMessage } from 'element-plus'

// Hex color to rgb color
export function hexToRgb(str: any) {
  let hexs: any = ''
  // eslint-disable-next-line no-useless-escape
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(str)) return ElMessage.warning('输入错误的hex')
  str = str.replace('#', '')
  hexs = str.match(/../g)
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)
  return hexs
}

// Rgb color to Hex color
export function rgbToHex(r: any, g: any, b: any) {
  const reg = /^\d{1,3}$/
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning('输入错误的rgb颜色值')
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  return `#${hexs.join('')}`
}
