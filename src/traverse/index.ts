import * as t from '@babel/types'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { TraverseOptions } from '../types'
import { traverseJavascript } from './javacript'
import { traverseVueSfc } from './vue'

/**
 * 转换ast
 * @param ast
 * @param options
 * @returns
 */
export function traverse(
  ast: t.Node | t.Node[] | SFCDescriptor,
  options: TraverseOptions = {
    forwordOrReverse: false,
    fileType: 'javascript'
  },
  translateTexts: Set<string>
) {
  if (options.fileType === 'javascript') {
    return traverseJavascript(ast as t.Node | t.Node[], options, translateTexts)
  } else if (options.fileType === 'vue-sfc') {
    return traverseVueSfc(ast as SFCDescriptor, options, translateTexts)
  } else {
    throw new Error('fileType is not supported')
  }
}
