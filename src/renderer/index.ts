import { ipcRenderer } from 'electron'
import * as fs from 'fs'
import '../../node_modules/gridlex/dist/gridlex.min.css'
import '../assets/shrinkit.css'
import { createFileList } from '../utils/dom-helpers'

interface IFileData {
  id: number
  name: string
  size: number
  status: string
}

const app = document.getElementById('app')
const results = document.getElementById('results')
const files: IFileData[] = []

app.onclick = e => {
  console.log(e)
}

document.addEventListener('drop', (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  Object.keys(e.dataTransfer.files).forEach((key: any, i) => {
    const path = e.dataTransfer.files[key].path
    const name = e.dataTransfer.files[key].name
    const size = fs.statSync(path).size

    const fileInfosEl: HTMLElement = document.createElement('div')
    fileInfosEl.setAttribute('class', 'grid')
    fileInfosEl.appendChild(createFileList(name, size))
    results.appendChild(fileInfosEl)

    ipcRenderer.send('dragged', name, path)

    files.push({ id: i, name, size, status: 'pending' })
    console.log(files)
  })
})

document.addEventListener('dragover', e => {
  e.preventDefault()
  e.stopPropagation()
})

ipcRenderer.on('fileinfos', (e: Event, fileName: string, originalSize: number, newSize: number, saved: number) => {
  // app.appendChild(fileInfosEl)
})
