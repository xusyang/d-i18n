import {
  AttributeNode,
  DirectiveNode,
  SimpleExpressionNode
} from '@vue/compiler-core'
import { generateJavascript } from '../../generator'
import { parseJavascript } from '../../parse'
import { traverseJavascript } from '../../traverse'
import { NodeTypes, TraverseOptions } from '../../types'
import { isRawHtmlAttribute } from '../../utils'

function createI18nTextNode(content: string, options: TraverseOptions) {
  options = Object.assign({}, options, {
    isNeedImportI18NModule: false
  })

  /*
   * if only one line string, that will parsed strict mode
   * suggestion:
   * https://github.com/babel/babel/discussions/14789
   */
  const ast = parseJavascript('(' + content.trim() + ')')

  traverseJavascript(ast, options)

  // TODO babel 生成代码，如何取消后面的分号
  return generateJavascript(ast, options).replace(';', '')
}

function createI18nDirectiveNode(
  content: string,
  bind: string,
  options: TraverseOptions,
  bindIsStatic: boolean = true
) {
  const node = createI18nTextNode(content, options)

  // TODO node 如何优雅的来判断是一个 expression or static text node
  bind = bindIsStatic ? bind : `[${bind}]`
  if (node.startsWith("'")) {
    return `:${bind}=${node}`
  } else {
    return `:${bind}="${node}"`
  }
}

/**
 * 创建插值文本
 */
export function generateTraverseNodeInterpolation(
  content: string,
  options: TraverseOptions
) {
  const node = createI18nTextNode(content, options)
  if (node.startsWith("'")) {
    return {
      type: NodeTypes.TEXT as any as number,
      loc: {
        source: `${node}`
      }
    }
  } else {
    return {
      type: NodeTypes.INTERPOLATION as any as number,
      loc: {
        source: `{{ ${node} }}`
      }
    }
  }
}

/**
 * 创建属性节点
 *
 * @param child
 * @returns
 */
export function generateTraverseNodeProps(
  attributes: (AttributeNode | DirectiveNode)[],
  options: TraverseOptions
) {
  const attrs = attributes.filter(
    attr =>
      attr.type === (NodeTypes.ATTRIBUTE as number) &&
      !isRawHtmlAttribute(attr.name)
  ) as AttributeNode[]

  const directives = attributes.filter(
    attr =>
      attr.type === (NodeTypes.DIRECTIVE as number) &&
      attr.name === 'bind' &&
      !isRawHtmlAttribute((attr as any as DirectiveNode)?.arg?.content)
  ) as DirectiveNode[]

  attrs.map(attr => {
    const node = createI18nDirectiveNode(
      // TODO 不够优雅
      '`' + (attr.value?.content || '') + '`',
      attr.name,
      options
    )
    attr.loc.source = node
  })

  // TODO directive.arg as CompoundExpressionNode 的分支为进行处理
  directives.map(directive => {
    const sArg = directive.arg as SimpleExpressionNode
    const sExp = directive.exp as SimpleExpressionNode

    const node = createI18nDirectiveNode(
      sExp.content || '',
      sArg.content || '',
      options,
      sArg.isStatic
    )
    directive.loc.source = node
  })

  return attributes
}
