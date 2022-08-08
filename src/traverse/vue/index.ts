import {
  AttributeNode,
  DirectiveNode,
  SimpleExpressionNode,
  TemplateChildNode
} from '@vue/compiler-core'
import { SFCDescriptor } from '@vue/compiler-sfc'
import prettier from 'prettier'
import { consts } from '../../constants'
import { generateJavascript } from '../../generator'
import { parseJavascript } from '../../parse'
import {
  isElement,
  isInterpolation,
  isText,
  NodeTypes,
  TraverseOptions
} from '../../types'
import {
  isNeedTraslateText,
  isRawHtmlAttribute,
  isStringLiteral
} from '../../utils'
import { traverseJavascript } from '../javacript'

function createI18nTextNode(
  content: string,
  options: TraverseOptions,
  translateTexts: Set<string>
) {
  options = Object.assign({}, options, {
    isNeedImportI18NModule: false
  })

  let ast

  content = content.trim().replace(/^;*/gm, '')
  if (content.trim().indexOf('{') === 0 || content.trim().indexOf('`') === 0) {
    ast = parseJavascript(content.trim())
  } else {
    /*
     * if only one line string, that will parsed strict mode
     * suggestion:
     * https://github.com/babel/babel/discussions/14789
     */
    ast = parseJavascript('(' + content.trim() + ')')
  }

  traverseJavascript(ast, options, translateTexts)

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
  translateTexts: Set<string>,
  bindIsStatic: boolean = true
) {
  try {
    const node = createI18nTextNode(content, options, translateTexts)
    if (bind) {
      bind = bindIsStatic ? bind : `[${bind}]`
      if (isStringLiteral(node) && bindIsStatic) {
        return `${bind}=${node}`
      } else {
        return `:${bind}="${node}"`
      }
    } else {
      return `v-bind="${node}"`
    }
  } catch (error) {
    console.log('error', content)
    return 'createI18nDirectiveNode is error'
  }
}

/**
 * 创建插值文本
 */
function generateTraverseNodeInterpolation(
  content: string,
  options: TraverseOptions,
  translateTexts: Set<string>
) {
  const node = createI18nTextNode(content, options, translateTexts)
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
 */
function generateTraverseNodeProps(
  attributes: (AttributeNode | DirectiveNode)[],
  options: TraverseOptions,
  translateTexts: Set<string>
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
    const attrText = attr.value?.loc.source || ''
    if (isNeedTraslateText(attrText)) {
      const node = createI18nDirectiveNode(
        attrText,
        attr.name,
        options,
        translateTexts
      )
      attr.loc.source = node
    }
  })

  // TODO directive.arg as CompoundExpressionNode 的分支为进行处理
  directives.forEach(directive => {
    const sArg = directive.arg as SimpleExpressionNode
    const sExp = directive.exp as SimpleExpressionNode
    const node = createI18nDirectiveNode(
      sExp.content || '',
      (sArg && sArg.content) || '',
      options,
      translateTexts,
      sArg && sArg.isStatic
    )
    directive!.loc!.source = node || ''
  })

  return attributes
}

function generateTraverseNodeElements(
  children: TemplateChildNode[],
  options: TraverseOptions,
  translateTexts: Set<string>
) {
  children.forEach((child, index) => {
    if (isElement(child)) {
      child.props = generateTraverseNodeProps(
        child.props,
        options,
        translateTexts
      )
      generateTraverseNodeElements(child.children, options, translateTexts)
    } else if (isText(child)) {
      if (isNeedTraslateText(child.content)) {
        // TODO 原则上应该是不需要对字符串做trim的操作
        children[index] = generateTraverseNodeInterpolation(
          '`' + child.content.trim() + '`',
          options,
          translateTexts
        ) as TemplateChildNode
      }
    } else if (isInterpolation(child)) {
      // TODO child.content ExpressionNode
      try {
        children[index] = generateTraverseNodeInterpolation(
          (child.content as any).content,
          options,
          translateTexts
        ) as TemplateChildNode
      } catch (error) {
        // console.log(child)
        console.log('error', child)
      }
    }
  })
}

export function traverseVueSfc(
  descriptor: SFCDescriptor,
  options: TraverseOptions,
  translateTexts: Set<string>
) {
  if (descriptor?.template) {
    generateTraverseNodeElements(
      descriptor.template.ast.children,
      options,
      translateTexts
    )
  }

  // TODO
  // 1. 语法糖的处理
  // 2. jsx / tsx 的处理
  if (descriptor?.script) {
    const ast = parseJavascript(descriptor.script.content)
    traverseJavascript(ast, options, translateTexts)
    descriptor.script.content = generateJavascript(ast, options)
  }

  if (descriptor?.scriptSetup) {
    const ast = parseJavascript(descriptor.scriptSetup.content)
    traverseJavascript(ast, options, translateTexts)
    descriptor.scriptSetup.content = generateJavascript(ast, options)
  }

  return descriptor
}
