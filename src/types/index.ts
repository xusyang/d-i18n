import {
  TemplateChildNode,
  ElementNode,
  TextNode,
  InterpolationNode
} from '@vue/compiler-core'

export type TraverseOptions = {
  isNeedImportI18NModule?: boolean
  /**
   * 翻译方向
   * true：正向翻译
   * false：反向翻译
   */
  forwordOrReverse: boolean
  /**
   * 文件类型
   */
  fileType: 'javascript' | 'vue-sfc' | 'jsx'
  /**
   * di18n的翻译方法的名称
   */
  di18nMethodsNames?: string[]
  /**
   * 翻译的scope有哪些
   */
  isTranslationScope?: {
    functionParams: boolean
  }
  [key: string]: any
}

export type VueSfcAst = {
  template?: string
  script?: string
  styles?: string[]
  scriptSetup?: string
}

export const enum NodeTypes {
  ROOT,
  ELEMENT,
  TEXT,
  COMMENT,
  SIMPLE_EXPRESSION,
  INTERPOLATION,
  ATTRIBUTE,
  DIRECTIVE,
  // containers
  COMPOUND_EXPRESSION,
  IF,
  IF_BRANCH,
  FOR,
  TEXT_CALL,
  // codegen
  VNODE_CALL,
  JS_CALL_EXPRESSION,
  JS_OBJECT_EXPRESSION,
  JS_PROPERTY,
  JS_ARRAY_EXPRESSION,
  JS_FUNCTION_EXPRESSION,
  JS_CONDITIONAL_EXPRESSION,
  JS_CACHE_EXPRESSION,

  // ssr codegen
  JS_BLOCK_STATEMENT,
  JS_TEMPLATE_LITERAL,
  JS_IF_STATEMENT,
  JS_ASSIGNMENT_EXPRESSION,
  JS_SEQUENCE_EXPRESSION,
  JS_RETURN_STATEMENT
}

export function isElement(node: TemplateChildNode): node is ElementNode {
  return node.type === (NodeTypes.ELEMENT as number)
}

export function isAttribute(node: TemplateChildNode): node is TextNode {
  return node.type === (NodeTypes.ATTRIBUTE as number)
}

export function isText(node: TemplateChildNode): node is TextNode {
  return node.type === (NodeTypes.TEXT as number)
}

export function isInterpolation(
  node: TemplateChildNode
): node is InterpolationNode {
  return node.type === (NodeTypes.INTERPOLATION as number)
}
