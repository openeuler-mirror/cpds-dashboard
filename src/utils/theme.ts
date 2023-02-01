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
