import type { Node } from '@babel/types'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { TraverseOptions } from '../types'
import { generateJavascript } from './javascript'
import { generateVueSfc } from './vue'

export * from './vue'
export * from './javascript'

export function generate(
  ast: Node | SFCDescriptor,
  options: TraverseOptions
): string {
  if (options.fileType === 'vue-sfc') {
    return generateVueSfc(ast as SFCDescriptor)
  } else if (options.fileType === 'javascript' || options.fileType === 'jsx') {
    return generateJavascript(ast as Node, options)
  } else {
    throw new Error('fileType is not supported')
  }
}
