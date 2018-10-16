import { app, BrowserWindow, Menu } from 'electron'

export default class MenuBuilder {
  public mainWindow: Electron.BrowserWindow
  private template: Electron.MenuItemConstructorOptions[]

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
    this.template = []
  }

  public init() {
    const menuTemplate = this.buildMenu()

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  }

  private buildMenu() {
    this.template = [
      {
        label: 'Edit',
        submenu: [
          {
            accelerator: 'Cmd+R',
            label: 'Reload',
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
    return this.template
  }
}
