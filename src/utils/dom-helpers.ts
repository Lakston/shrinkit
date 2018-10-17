import { formatBytes } from '../utils/formatters'

const createDiv = () => document.createElement('div')
const createText = (content: string) => document.createTextNode(content)

export const createFileList = (fileName: string, originalSize: number) => {
  // File Infos
  const fileInfosEl: HTMLElement = createDiv()
  fileInfosEl.setAttribute('class', 'grid')

  // Status
  const statusEl: HTMLElement = createDiv()
  statusEl.setAttribute('class', 'status-icon col-1 p-sm')
  statusEl.appendChild(createText('✓'))

  // File Name
  const fileNameEl: HTMLElement = createDiv()
  fileNameEl.setAttribute('class', 'file-name col p-sm')
  fileNameEl.appendChild(createText(fileName))

  // Original Size
  const originalSizeEl: HTMLElement = createDiv()
  originalSizeEl.setAttribute('class', 'file-orig-size col-1 p-sm')
  originalSizeEl.appendChild(createText(formatBytes(originalSize)))

  // Compressed Size
  const compressedSizeEl: HTMLElement = createDiv()
  compressedSizeEl.setAttribute('class', 'file-new-size col-1 p-sm')

  // Saved
  const savedEl: HTMLElement = createDiv()
  savedEl.setAttribute('class', 'savings col-1 p-sm')

  const fragment = document.createDocumentFragment()
  ;[statusEl, fileNameEl, originalSizeEl, compressedSizeEl, savedEl].forEach(element => {
    fragment.appendChild(element)
  })

  return fragment
}
