import { formatBytes } from '../utils/formatters'

const createEl = (el: string) => document.createElement(el)
const createText = (content: string) => document.createTextNode(content)

export const createFileList = (fileName: string, originalSize: number) => {
  // Status
  const statusEl: HTMLElement = createEl('div')
  statusEl.setAttribute('class', 'status-icon col-1 p-sm text-center')
  statusEl.appendChild(createText('✓'))

  // File Name
  const fileNameEl: HTMLElement = createEl('div')
  fileNameEl.setAttribute('class', 'file-name col-5 p-sm')
  fileNameEl.appendChild(createText(fileName))

  // Original Size
  const originalSizeEl: HTMLElement = createEl('div')
  originalSizeEl.setAttribute('class', 'file-orig-size col-2 p-sm text-right')
  originalSizeEl.appendChild(createText(formatBytes(originalSize)))

  // Compressed Size
  const compressedSizeEl: HTMLElement = createEl('div')
  compressedSizeEl.setAttribute('class', 'file-new-size col-2 p-sm text-right')

  // Saved
  const savedEl: HTMLElement = createEl('div')
  savedEl.setAttribute('class', 'savings col-2 p-sm text-right')

  const fragment = document.createDocumentFragment()
  ;[statusEl, fileNameEl, originalSizeEl, compressedSizeEl, savedEl].forEach(element => {
    fragment.appendChild(element)
  })

  return fragment
}
