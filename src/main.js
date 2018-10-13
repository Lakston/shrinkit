const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const mozjpeg = require('mozjpeg')
const pngquant = require('pngquant-bin')
const { execFile } = require('child_process')
const SVGO = require('svgo')
const { roundNumber, formatBytes } = require('./utils/formatters')
const MenuClass = require('./menu/menu')

let mainWindow
const svgo = new SVGO()

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 800 })

  mainWindow.loadFile('./src/index.html')
  const menu = new MenuClass(mainWindow)
  menu.init()
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Send data back to renderer
 * @param  {string} fileName File name
 * @param  {number} fileSize Original file size
 * @param  {number} newSize Compressed file size
 */
const sendToView = (fileName, fileSize, newSize) => {
  const saved = roundNumber(((fileSize - newSize) / fileSize) * 100)
  mainWindow.webContents.send(
    'fileinfos',
    fileName,
    formatBytes(fileSize),
    formatBytes(newSize),
    saved,
  )
}

/**
 * Process files
 * @param  {string} fileName File name
 * @param  {string} filePath File path
 */
const processFiles = (fileName, filePath) => {
  mainWindow.focus()

  const originalSize = fs.statSync(filePath).size
  const extension = path.extname(filePath)

  const currentFolder = path.dirname(filePath)
  const shrinkedFolder = path.join(currentFolder, '/shrinked')

  if (!fs.existsSync(shrinkedFolder)) {
    fs.mkdirSync(shrinkedFolder)
  }

  const newFilePath = path.join(shrinkedFolder, fileName)

  switch (extension) {
    case '.jpg':
    case '.jpeg':
      execFile(mozjpeg, ['-outfile', newFilePath, filePath], err => {
        if (err) {
          console.log(err)
        }
        const newSize = fs.statSync(newFilePath).size
        sendToView(fileName, originalSize, newSize)
      })
      break
    case '.png':
      execFile(pngquant, ['-fo', newFilePath, filePath], err => {
        if (err) {
          console.log(err)
        }
        const newSize = fs.statSync(newFilePath).size
        sendToView(fileName, originalSize, newSize)
      })
      break
    case '.svg':
      {
        const file = fs.readFileSync(filePath, 'utf8', (err, data) => data)
        svgo.optimize(file).then(result => {
          fs.writeFile(newFilePath, result.data, err => {
            if (err) {
              console.log(err)
            }
            const newSize = fs.statSync(newFilePath).size
            sendToView(fileName, originalSize, newSize)
          })
        })
      }
      break
    default:
      console.log('non supported')
  }
}

// process files on dragged
ipcMain.on('dragged', (e, fileName, filePath) => {
  processFiles(fileName, filePath)
})
