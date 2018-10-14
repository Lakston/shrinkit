import { app, BrowserWindow, Menu } from 'electron'

export default class MenuBuilder {
  public mainWindow: Electron.BrowserWindow
  private template: any[]

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
    this.template = []
  }

  public init() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevEnvironment()
    }
    const menuTemplate = this.buildMenu()

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  }

  private setupDevEnvironment() {
    // mainWindow.webContents.openDevTools()
  }

  private buildMenu() {
    this.template = [
      {
        label: 'Edit',
        submenu: [
          {
            accelerator: 'Cmd+R',
            label: 'Reload',
            role: 'reload'
          }
        ]
      },
      {
        role: 'window',
        submenu: [{ role: 'minimize' }, { role: 'close' }]
      }
    ]

    if (process.platform === 'darwin') {
      this.template.unshift({
        label: 'ShrinkIt',
        submenu: [
          {
            label: 'About ShrinkIt',
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide ShrinkIt',
            accelerator: 'Command+H',
            role: 'hide'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit()
            }
          }
        ]
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
