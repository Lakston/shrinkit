const { app, Menu } = require('electron')

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
      { role: 'selectall' }
    ]
  }
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
      }
    }
  )
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
