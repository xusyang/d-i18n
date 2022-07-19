import { TraverseOptions } from '../../types'
import { Node } from '@babel/types'
import generateBabel from '@babel/generator'

/**
 * 生成 javascript
 * @param ast
 * @param options
 * @returns
 */
export function generateJavascript(ast: Node, options: TraverseOptions) {
  // TODO options 支持 jsescOption
  const program = generateBabel(ast, {
    jsescOption: { minimal: true, quotes: 'single' }
  })
  return program.code
}
