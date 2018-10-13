const { ipcRenderer } = require('electron')

const dragZone = document.getElementById('dragzone')
const infoEl = document.getElementById('fileinfos')

dragZone.onclick = e => {
  console.log(e)
}

document.addEventListener('drop', e => {
  e.preventDefault()
  e.stopPropagation()

  for (const file of e.dataTransfer.files) {
    ipcRenderer.send('dragged', file.name, file.path)
  }
})

document.addEventListener('dragover', e => {
  e.preventDefault()
  e.stopPropagation()
})

ipcRenderer.on('fileinfos', (e, fileName, fileExtension, oldSize, newSize) => {
  const parag = document.createElement('p')
  const text = document.createTextNode(
    `name: ${fileName}, extension: ${fileExtension}, oldsize: ${oldSize},  newsize: ${newSize}`,
  )
  parag.appendChild(text)
  infoEl.appendChild(parag)
})
