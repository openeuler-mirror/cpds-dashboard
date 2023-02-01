export default function () {
  // Percent Format
  const percentFormat = (row: any, column: number, cellValue: any) => {
    return cellValue ? `${cellValue}%` : '-'
  }
  return {
    percentFormat
  }
}
