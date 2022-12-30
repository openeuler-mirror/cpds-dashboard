export function formatDate(date: Date, format: string) {
  const we = date.getDay()
  const qut = Math.floor((date.getMonth() + 3) / 3).toString()
  const opt: any = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString(),
    'q+': qut
  }
  const week: any = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  const quarter: any = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四'
  }
  if (/(W+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' + week[we] : '周' + week[we]) : week[we]
    )
  if (/(Q+)/.test(format))
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]
    )
  for (const k in opt) {
    const r = new RegExp('(' + k + ')').exec(format)
    if (r)
      format = format.replace(
        r[1],
        RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0')
      )
  }
  return format
}

export function formatPast(param: any, format = 'YYYY-mm-dd') {
  let t: any, s: any
  let time: any = new Date().getTime()
  typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param)
  time = Number.parseInt(`${time - t}`)
  if (time < 10000) {
    return '刚刚'
  } else if (time < 60000 && time >= 10000) {
    s = Math.floor(time / 1000)
    return `${s}秒前`
  } else if (time < 3600000 && time >= 60000) {
    s = Math.floor(time / 60000)
    return `${s}分钟前`
  } else if (time < 86400000 && time >= 3600000) {
    s = Math.floor(time / 3600000)
    return `${s}小时前`
  } else if (time < 259200000 && time >= 86400000) {
    s = Math.floor(time / 86400000)
    return `${s}天前`
  } else {
    const date = typeof param === 'string' || 'object' ? new Date(param) : param
    return formatDate(date, format)
  }
}

/**
 * formatAxis(new Date())
 */
export function formatAxis(param: any) {
  const hour: number = new Date(param).getHours()
  if (hour < 6) return '凌晨好'
  else if (hour < 9) return '早上好'
  else if (hour < 12) return '上午好'
  else if (hour < 14) return '中午好'
  else if (hour < 17) return '下午好'
  else if (hour < 19) return '傍晚好'
  else if (hour < 22) return '晚上好'
  else return '夜里好'
}
