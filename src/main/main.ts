import { execFile } from 'child_process'
import { app, BrowserWindow, ipcMain } from 'electron'
import * as fs from 'fs'
import * as mozjpeg from 'mozjpeg'
import * as path from 'path'
import * as pngquant from 'pngquant-bin'
import * as SVGO from 'svgo'
import { format as formatUrl } from 'url'
import MenuClass from '../menu/menu'
import { formatBytes, roundNumber } from '../utils/formatters'

const isDevelopment = process.env.NODE_ENV !== 'production'
let mainWindow: Electron.BrowserWindow | null
const svgo = new SVGO()

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 800 })

  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      }),
    )
  }

  const menu = new MenuClass(mainWindow)
  menu.init()

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
const sendToView = (fileName: string, fileSize: number, newSize: number) => {
  const saved = roundNumber(((fileSize - newSize) / fileSize) * 100)
  mainWindow.webContents.send('fileinfos', fileName, formatBytes(fileSize), formatBytes(newSize), saved)
}

/**
 * Process files
 * @param  {string} fileName File name
 * @param  {string} filePath File path
 */
const processFiles = (fileName: string, filePath: string) => {
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
        fs.readFile(filePath, { encoding: 'utf8' }, (err: NodeJS.ErrnoException, data: string) => {
          svgo.optimize(data).then(result => {
            fs.writeFile(newFilePath, result.data, error => {
              if (error) {
                console.log(error)
              }
              const newSize = fs.statSync(newFilePath).size
              sendToView(fileName, originalSize, newSize)
            })
          })
        })
      }
      break
    default:
      console.log('non supported')
  }
}

// process files on dragged
ipcMain.on('dragged', (e: any, fileName: string, filePath: string) => {
  processFiles(fileName, filePath)
})
