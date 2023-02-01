/* eslint-disable no-useless-escape */
import { ElMessage } from 'element-plus'

// Hex color to rgb color
export function hexToRgb(str: any) {
  let hexs: any = ''
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

// Deepen Color Value
export function getDarkColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
// Lighten Color Value
export function getLightColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
