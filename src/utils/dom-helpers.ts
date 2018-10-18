const createEl = (el: string) => document.createElement(el)
const createText = (content: string) => document.createTextNode(content)

export const createFileList = (fileName: string, originalSize: number, newSize: number, saved: number) => {
  // File Name
  const fileNameEl: HTMLElement = createEl('p')
  fileNameEl.setAttribute('class', 'file-name')
  fileNameEl.appendChild(createText(fileName))

  // Infos container
  const infoContainerEl = createEl('div')
  infoContainerEl.setAttribute('class', 'info-cont grid')

  // Original Size
  const originalSizeEl: HTMLElement = createEl('span')
  originalSizeEl.setAttribute('class', 'file-orig-size col-4')
  originalSizeEl.appendChild(createText(`Original size: ${originalSize}`))

  // Compressed Size
  const compressedSizeEl: HTMLElement = createEl('span')
  compressedSizeEl.setAttribute('class', 'file-new-size col-4')
  compressedSizeEl.appendChild(createText(`Compressed: ${newSize}`))

  // Saved
  const savedEl: HTMLElement = createEl('span')
  savedEl.setAttribute('class', 'savings col-4')
  savedEl.appendChild(createText(`Shrinked by: ${saved}%`))

  // Append all
  ;[originalSizeEl, compressedSizeEl, savedEl].forEach(element => {
    infoContainerEl.appendChild(element)
  })

  const fragment = document.createDocumentFragment()
  fragment.appendChild(fileNameEl)
  fragment.appendChild(infoContainerEl)

  return fragment
}

export const createFooter = () => {
  const footer = createEl('div')
  footer.setAttribute('class', 'footer')
  return footer
}
