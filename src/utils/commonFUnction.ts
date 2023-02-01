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
  // Decimal Formatting
  const scaleFormat = (value: any = 0, scale = 4) => {
    return Number.parseFloat(value).toFixed(scale)
  }
  return {
    percentFormat,
    dateFormatYMD,
    dateFormatYMDHMS,
    scaleFormat
  }
}
