const { app, Menu } = require('electron')

class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
    this.template = []
  }

  init() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevEnvironment()
    }
    const menuTemplate = this.buildMenu()

    const menu = Menu.buildFromTemplate(menuTemplate)
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
    this.template = [
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

    if (process.platform === 'darwin') {
      this.template.unshift({
        label: 'ShrinkIt',
        submenu: [
          {
            label: 'About ShrinkIt',
            role: 'about',
          },
          {
            type: 'separator',
          },
          {
            label: 'Hide ShrinkIt',
            accelerator: 'Command+H',
            role: 'hide',
          },
          {
            type: 'separator',
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit()
            },
          },
        ],
      })
    }

    // if (global.debug.devTools === 1) {
    //   template[0].submenu.push(
    //     { type: 'separator' },
    //     {
    //       label: 'Open Dev-Tools',
    //       click: (item, focusedWindow) => {
    //         if (focusedWindow) focusedWindow.toggleDevTools()
    //       },
    //     },
    //   )
    // }
    return this.template
  }
}

module.exports = MenuBuilder
