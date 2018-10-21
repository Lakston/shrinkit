declare const __static: string

function getStaticPath() {
  // eslint-disable-next-line no-process-env
  const isDevelopment = process.env.NODE_ENV === 'development'
  const staticPath = isDevelopment ? __static : __dirname.replace(/app\.asar$/, 'static')
  return staticPath
}

module.exports = getStaticPath
