const roundNumber = number => Math.round(number)

/**
 * convert file size in byte to formatted file size with unit
 * @param  {number} bytes byte number to convert
 * @param  {number} decimals defines decimal precision, default 2
 * @return  {string} formatted size as (size + unit)
 */
const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024

  const dm = decimals <= 0 ? 0 : decimals || 2

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${units[i]}`
}

module.exports = {
  roundNumber,
  formatBytes,
}
