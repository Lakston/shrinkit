export const roundNumber = (num: number) => Math.round(num)

export const formatBytes: (bytes: number, decimals?: number) => string = (bytes: number, decimals?: number) => {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024

  const dm = decimals <= 0 ? 0 : decimals || 2

  const units = ['Bytes', 'kb', 'mb', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${units[i]}`
}
