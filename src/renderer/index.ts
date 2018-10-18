import { ipcRenderer } from 'electron'
import '../../node_modules/gridlex/dist/gridlex.min.css'
import '../assets/shrinkit.css'
import { createFileList, createFooter } from '../utils/dom-helpers'

const app = document.getElementById('app')
const resultsTable = document.getElementById('table')

app.onclick = e => {
  console.log(e)
}

document.addEventListener('drop', (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  Object.keys(e.dataTransfer.files).forEach((key: any, i) => {
    const path = e.dataTransfer.files[key].path
    const name = e.dataTransfer.files[key].name

    ipcRenderer.send('dragged', name, path)
  })
})

document.addEventListener('dragover', e => {
  e.preventDefault()
  e.stopPropagation()
})

ipcRenderer.on('fileinfos', (e: Event, fileName: string, originalSize: number, newSize: number, saved: number) => {
  // Row
  const rowEl: HTMLElement = document.createElement('div')
  rowEl.setAttribute('class', 'row p-m')
  rowEl.appendChild(createFileList(fileName, originalSize, newSize, saved))

  resultsTable.appendChild(rowEl)
})
