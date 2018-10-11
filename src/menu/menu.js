const { app, Menu } = require('electron')

export default class menuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
  }

  init() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevEnvironment()
    }
    const template = this.buildMenu()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  setupDevEnvironment() {
    this.mainWindow.openDevTools()
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y)
          },
        },
      ]).popup(this.mainWindow)
    })
  }

  buildMenu() {
    const template = [
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Cmd+R',
            role: 'reload',
          },
        ],
      },
      {
        role: 'window',
        submenu: [{ role: 'minimize' }, { role: 'close' }],
      },
    ]
  }
}

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  },
]

if (process.platform === 'darwin') {
  template.unshift({})
}

if (global.debug.devTools === 1) {
  template[0].submenu.push(
    { type: 'separator' },
    {
      label: 'Open Dev-Tools',
      click: (item, focusedWindow) => {
        if (focusedWindow) focusedWindow.toggleDevTools()
      },
    },
  )
}
