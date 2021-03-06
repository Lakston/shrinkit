import html from '../../node_modules/nanohtml'
import { formatBytes, roundNumber } from './formatters'

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

const displaySuccess = (fileName: string, originalSize: number, newSize: number) => {
  const saved = roundNumber(((originalSize - newSize) / originalSize) * 100)

  return html`
    <div>
      <p class="file-name">${fileName}</p>
      <div class="info-cont grid-noBottom">
        <span class="file-orig-size col-4">
          <span class="small-txt">original: </span><span>${formatBytes(originalSize)}</span>
        </span>
        <span class="file-new-size col-4">
          <span class="small-txt">compressed: </span><span>${formatBytes(newSize)}</span>
        </span>
        <span class="savings col-4">
          <span class="small-txt">shrinked by: </span><span>${saved}%</span>
        </span>
      </div>
    </div>
  `
}

const displayError = (fileName: string, err: string) => {
  return html`
    <div>
      <p class="file-name">${fileName}</p>
      <p class="error-text">${err}</p>
    </div>
  `
}

interface IRowArguments {
  fileName: string
  originalSize?: number
  newSize?: number
  errMsg?: string
}

export const createRow = (type: 'success' | 'error', args: IRowArguments) => {
  return html`
      <div class="row ${type}-row grid-noBottom">
        <div class="col">${
          type === 'success'
            ? displaySuccess(args.fileName, args.originalSize, args.newSize)
            : displayError(args.fileName, args.errMsg)
        }</div>
        <div class="col-1 image-container ${type}"></div>
      </div>
    `
}
