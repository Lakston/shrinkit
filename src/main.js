const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const mozjpeg = require('mozjpeg')
const { execFile } = require('child_process')
const MenuClass = require('./menu/menu')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1000, height: 800 })

  mainWindow.loadFile('./src/index.html')
  const menu = new MenuClass(mainWindow)
  menu.init()
  // mainWindow.webContents.openDevTools()

  // require('./src/menu/menu.js');

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

const sendInfoToRenderer = (fileName, fileExtension, fileSize, newSize) => {
  mainWindow.webContents.send(
    'fileinfos',
    fileName,
    fileExtension,
    fileSize,
    newSize,
  )
}

/**
 * Process files
 * @param  {string} name Filename
 * @param  {string} path Filepath
 * @param  {string} size Filesize
 */
const processFiles = (fileName, filePath) => {
  /** Focus main window on drag */
  !mainWindow || mainWindow.focus()

  const originalSize = fs.statSync(filePath).size / 1024
  const extension = path.extname(filePath)

  const currentFolder = path.dirname(filePath)
  const outDir = path.join(currentFolder, '/shrinked')

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

  const newFilePath = path.join(outDir, fileName)

  switch (extension) {
    case '.jpg':
    case '.jpeg':
      execFile(mozjpeg, ['-outfile', newFilePath, filePath], err => {
        if (err) {
          console.log(err)
        }
        console.log(newFilePath)
        console.log(fs.statSync(newFilePath).size / 1024)
        const newSize = fs.statSync(newFilePath).size / 1024
        sendInfoToRenderer(fileName, extension, originalSize, newSize)
      })
      break
    case '.png':
      console.log('this is a png')
      break
    case '.svg':
      console.log('this is a jpg')
      break
    default:
      console.log('non supported')
  }
}

// process requests
ipcMain.on('dragged', (e, name, filePath, size) => {
  processFiles(name, filePath, size)
})
