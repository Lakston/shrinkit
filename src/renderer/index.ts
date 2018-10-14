import { ipcRenderer } from 'electron'

const dragZone = document.getElementById('app')
dragZone.setAttribute('style', 'height:100vh')
// const infoEl = document.getElementById('fileinfos')

dragZone.onclick = e => {
  console.log(e)
}

document.addEventListener('drop', (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  Object.keys(e.dataTransfer.files).forEach((key: any) => {
    ipcRenderer.send('dragged', e.dataTransfer.files[key].name, e.dataTransfer.files[key].path)
  })
})

document.addEventListener('dragover', e => {
  e.preventDefault()
  e.stopPropagation()
})

ipcRenderer.on('fileinfos', (e: Event, fileName: string, originalSize: number, newSize: number, saved: number) => {
  const parag = document.createElement('p')
  const text = document.createTextNode(
    `name: ${fileName}, oldsize: ${originalSize},  newsize: ${newSize}, shrinked by ${saved}% !`
  )
  parag.appendChild(text)
  dragZone.appendChild(parag)
})