import {
  AttributeNode,
  DirectiveNode,
  SimpleExpressionNode
} from '@vue/compiler-core'
import prettier from 'prettier'
import { consts } from '../../constants'
import { generateJavascript } from '../../generator'
import { parseJavascript } from '../../parse'
import { traverseJavascript } from '../../traverse'
import { NodeTypes, TraverseOptions } from '../../types'
import {
  isNeedTraslateText,
  isRawHtmlAttribute,
  isStringLiteral
} from '../../utils'

function createI18nTextNode(content: string, options: TraverseOptions) {
  options = Object.assign({}, options, {
    isNeedImportI18NModule: false
  })

  /*
   * if only one line string, that will parsed strict mode
   * suggestion:
   * https://github.com/babel/babel/discussions/14789
   */

  let ast

  if (content.trim().indexOf('{') === 0 || content.trim().indexOf('`') === 0) {
    ast = parseJavascript(content.trim())
  } else {
    ast = parseJavascript('(' + content.trim() + ')')
  }

  traverseJavascript(ast, options)

  let code = generateJavascript(ast, options)

  code = prettier.format(code, {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: 'babel'
  })

  // FIX 特殊情况
  code = code.replace(consts.FIX_VUE_TEMPLATE_DIRECTIVE_OBJECT, '')
  return code
}

function createI18nDirectiveNode(
  content: string,
  bind: string,
  options: TraverseOptions,
  bindIsStatic: boolean = true
) {
  try {
    const node = createI18nTextNode(content, options)
    bind = bindIsStatic ? bind : `[${bind}]`
    if (isStringLiteral(node) && bindIsStatic) {
      return `${bind}=${node}`
    } else {
      return `:${bind}="${node}"`
    }
  } catch (error) {
    return 'createI18nDirectiveNode is error'
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
  if (isStringLiteral(node)) {
    return {
      type: NodeTypes.TEXT as any as number,
      loc: {
        source: `${node.replaceAll("'", '')}`
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

  attrs.forEach(attr => {
    // const attrText = `'${attr.value?.content || ''}'`
    const attrText = attr.value?.loc.source || ''
    if (isNeedTraslateText(attrText)) {
      const node = createI18nDirectiveNode(attrText, attr.name, options)
      attr.loc.source = node
    }
  })

  // TODO directive.arg as CompoundExpressionNode 的分支为进行处理
  directives.forEach(directive => {
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
