import { formatBytes } from '../utils/formatters'

const createDiv = () => document.createElement('div')
const createText = (content: string) => document.createTextNode(content)

export const createFileList = (fileName: string, originalSize: number) => {
  // Status
  const statusEl: HTMLElement = createDiv()
  statusEl.setAttribute('class', 'status-icon col-1 p-sm text-center')
  statusEl.appendChild(createText('✓'))

  // File Name
  const fileNameEl: HTMLElement = createDiv()
  fileNameEl.setAttribute('class', 'file-name col-5 p-sm')
  fileNameEl.appendChild(createText(fileName))

  // Original Size
  const originalSizeEl: HTMLElement = createDiv()
  originalSizeEl.setAttribute('class', 'file-orig-size col-2 p-sm text-right')
  originalSizeEl.appendChild(createText(formatBytes(originalSize)))

  // Compressed Size
  const compressedSizeEl: HTMLElement = createDiv()
  compressedSizeEl.setAttribute('class', 'file-new-size col-2 p-sm text-right')

  // Saved
  const savedEl: HTMLElement = createDiv()
  savedEl.setAttribute('class', 'savings col-2 p-sm text-right')

  const fragment = document.createDocumentFragment()
  ;[statusEl, fileNameEl, originalSizeEl, compressedSizeEl, savedEl].forEach(element => {
    fragment.appendChild(element)
  })

  return fragment
}
