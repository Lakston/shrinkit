import { ipcRenderer } from 'electron'
import '../../node_modules/gridlex/dist/gridlex.min.css'

import '../assets/shrinkit.css'
import { addMultipleListeners, createRow } from '../utils/dom-helpers'

// const app = document.getElementById('app')
const dragArea = document.getElementById('drag-area')
const resultsTable = document.getElementById('table')

dragArea.addEventListener('dragover', (e: DragEvent) => {
  dragArea.style.border = '3px dashed #09f'
  dragArea.style.backgroundColor = 'rgba(0, 153, 255, .05)'
})

addMultipleListeners(dragArea, ['dragleave', 'dragend', 'mouseout', 'drop'], () => {
  dragArea.style.border = '3px dashed #DADFE3'
  dragArea.style.backgroundColor = 'transparent'
})

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

ipcRenderer.on('fileinfos', (e: Event, fileName: string, originalSize: number, newSize: number) => {
  resultsTable.appendChild(createRow('success', { fileName, originalSize, newSize }))
})

ipcRenderer.on('fileError', (e: Event, fileName: string, errMsg: string) => {
  resultsTable.appendChild(createRow('error', { fileName, errMsg }))
})
