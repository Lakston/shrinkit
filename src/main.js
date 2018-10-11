const { app, BrowserWindow } = require('electron')
const MenuClass = require('./menu/menu')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 600, height: 800 })

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
