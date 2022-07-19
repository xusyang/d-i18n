import { TraverseOptions } from '../types'
import { parseJavascript } from './javascript'
import { parseVueSfc } from './vue'

export * from './javascript'
export * from './vue'

export function parse(code: string, options: TraverseOptions) {
  if (options.fileType === 'vue-sfc') {
    return parseVueSfc(code)
  } else if (options.fileType === 'javascript' || options.fileType === 'jsx') {
    return parseJavascript(code)
  } else {
    throw new Error('fileType is not supported')
  }
}
