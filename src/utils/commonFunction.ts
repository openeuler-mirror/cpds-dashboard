import { formatDate } from '/@/utils/formatTime'
export default function () {
  // Percent Format
  const percentFormat = (row: any, column: number, cellValue: any) => {
    return cellValue ? `${cellValue}%` : '-'
  }
  // List Date Time Format
  const dateFormatYMD = (row: any, column: number, cellValue: any) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd')
  }
  // List Date Time Format
  const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS')
  }
  // List Date Time Format
  const dateFormatHMS = (row: any, column: number, cellValue: any) => {
    if (!cellValue) return '-'
    let time = 0
    if (typeof row === 'number') time = row
    if (typeof cellValue === 'number') time = cellValue
    return formatDate(new Date(time * 1000), 'HH:MM:SS')
  }
  // Decimal Formatting
  const scaleFormat = (value: any = 0, scale = 4) => {
    return Number.parseFloat(value).toFixed(scale)
  }
  // Decimal Formatting
  const scale2Format = (value: any = 0) => {
    return Number.parseFloat(value).toFixed(2)
  }
  return {
    percentFormat,
    dateFormatYMD,
    dateFormatYMDHMS,
    dateFormatHMS,
    scaleFormat,
    scale2Format
  }
}
