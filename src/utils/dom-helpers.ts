import { formatBytes, roundNumber } from './formatters'

const createEl = (el: string) => document.createElement(el)
const createText = (content: string) => document.createTextNode(content)

export const addMultipleListeners = (el: HTMLElement, events: string[], callback: () => void) => {
  if (!(events instanceof Array)) {
    throw new Error(`addMultipleListeners:  
    please supply an array of eventstrings (ex: ["drag","mouseleave"])`)
  } else {
    for (const event of events) {
      el.addEventListener(event, callback)
    }
  }
}

const createFileList = (fileName: string, originalSize: number, newSize: number) => {
  const saved = roundNumber(((originalSize - newSize) / originalSize) * 100)

  // File Name
  const fileNameEl: HTMLElement = createEl('p')
  fileNameEl.setAttribute('class', 'file-name')
  fileNameEl.appendChild(createText(fileName))

  // Infos container
  const infoContainerEl = createEl('div')
  infoContainerEl.setAttribute('class', 'info-cont grid-noBottom')

  // Original Size
  const originalSizeEl: HTMLElement = createEl('span')
  originalSizeEl.setAttribute('class', 'file-orig-size col-4')
  const original = createEl('span')
  original.setAttribute('class', 'small-txt')
  original.textContent = 'original: '
  originalSizeEl.appendChild(original)
  originalSizeEl.appendChild(createText(`${formatBytes(originalSize)}`))

  // Compressed Size
  const compressedSizeEl: HTMLElement = createEl('span')
  compressedSizeEl.setAttribute('class', 'file-new-size col-4')
  const compressed = createEl('span')
  compressed.setAttribute('class', 'small-txt')
  compressed.textContent = 'compressed: '
  compressedSizeEl.appendChild(compressed)
  compressedSizeEl.appendChild(createText(`${formatBytes(newSize)}`))

  // Saved
  const savedEl: HTMLElement = createEl('span')
  savedEl.setAttribute('class', 'savings col-4')
  const shrinked = createEl('span')
  shrinked.setAttribute('class', 'small-txt')
  shrinked.textContent = 'shrinked by: '
  savedEl.appendChild(shrinked)
  savedEl.appendChild(createText(`${saved}%`))

  // Append all
  ;[originalSizeEl, compressedSizeEl, savedEl].forEach(element => {
    infoContainerEl.appendChild(element)
  })

  const fragment = document.createDocumentFragment()
  fragment.appendChild(fileNameEl)
  fragment.appendChild(infoContainerEl)

  return fragment
}

const displayError = (fileName: string, err: string) => {
  const fileNameEl: HTMLElement = createEl('p')
  fileNameEl.setAttribute('class', 'file-name')
  fileNameEl.appendChild(createText(fileName))

  const errEl: HTMLElement = createEl('p')
  errEl.setAttribute('class', 'error-text')
  errEl.appendChild(createText(err))

  const fragment = document.createDocumentFragment()
  fragment.appendChild(fileNameEl)
  fragment.appendChild(errEl)

  return fragment
}

interface IRowArguments {
  fileName: string
  originalSize?: number
  newSize?: number
  errMsg?: string
}

export const createRow = (type: 'success' | 'error', args: IRowArguments) => {
  const rowEl: HTMLElement = createEl('div')
  rowEl.setAttribute('class', `row ${type}-row grid-noBottom`)

  const InfosEl: HTMLElement = createEl('div')
  InfosEl.setAttribute('class', 'col')
  if (type === 'success') {
    InfosEl.appendChild(createFileList(args.fileName, args.originalSize, args.newSize))
  }
  if (type === 'error') {
    InfosEl.appendChild(displayError(args.fileName, args.errMsg))
  }

  const iconEl: HTMLElement = createEl('div')
  iconEl.setAttribute('class', `col-1 image-container ${type}`)

  rowEl.appendChild(InfosEl)
  rowEl.appendChild(iconEl)

  return rowEl
}
