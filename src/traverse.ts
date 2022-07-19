import generateBabel from '@babel/generator'
import { default as template } from '@babel/template'
import type { Visitor } from '@babel/traverse'
import babelTraverse from '@babel/traverse'
import * as t from '@babel/types'
import { TemplateChildNode } from '@vue/compiler-core'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { generateJavascript } from './generator'
import { parseJavascript } from './parse'
import { judgeNeedTraslateNode } from './traverse/utils'
import {
  generateTraverseNodeInterpolation,
  generateTraverseNodeProps
} from './traverse/vue/index'
import { isElement, isText, TraverseOptions } from './types'
import { isInterpolation } from './types/index'
import { isNeedTraslate } from './utils'

const IMPORT_I18N_PATH = '@/i18n'
const IMPORT_I18N_OBJ = 'I18N'
const JS_I18N_FUNC = '$fanyi'
const JS_I18N = `${IMPORT_I18N_OBJ}.${JS_I18N_FUNC}`
const JS_I18N_TEMPLATE_JS = JS_I18N
const JS_I18N_TEMPLATE_HTMl = JS_I18N
const DISABLE_FILE = '@d-i18n-disable-file'
const DISABLE_SCOPE = '@d-i18n-disable'

const createTemplateI18N = (text: string) => {
  return text ? `${JS_I18N}("${text}")` : ''
}

function generateVisitor() {
  const visitor: Visitor<TraverseOptions> = {
    Program: {
      exit: (path, state) => {
        if (state.isNeedImportI18NModule) {
          path.unshiftContainer(
            'body',
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(IMPORT_I18N_OBJ))],
              t.stringLiteral(IMPORT_I18N_PATH)
            )
          )
          path.stop()
        }
      }
    },

    CallExpression: (path, state) => {
      if (!state.forwordOrReverse) {
        // TODO 翻译的方法名称和对象
        const objectMethod = generateBabel(path.node.callee as t.Node).code
        if (state.di18nMethodsNames!.includes(objectMethod)) {
          if (path.node.arguments.length === 1) {
            path.replaceWith(
              t.stringLiteral((path.node.arguments[0] as t.StringLiteral).value)
            )
          } else if (path.node.arguments.length === 2) {
            let str = (path.node.arguments[0] as t.StringLiteral).value
            // const params = (
            //   path.node.arguments[1] as t.ArrayExpression
            // ).elements.map(x => (x as t.StringLiteral).value)

            // Object.keys(params).forEach((key: number | string) => {
            //   str = str.replace(`{${key}}`, params[key as number])
            // })
            // path.replaceWith(t.stringLiteral(str))
          }
        }
      }
    },

    StringLiteral: (path, state) => {
      if (!path.node) {
        return
      }

      if (state.forwordOrReverse) {
        if (path.node.value === '') {
          // TODO path.stop difference with path.skip
          path.remove()
          path.stop()
        }

        const isNestedFunction = path.findParent(p => {
          if (p.isCallExpression()) {
            if (!state?.isTranslationScope?.functionParams) {
              return true
            }

            const objectMethod = generateBabel(p.node.callee as t.Node).code
            return state.di18nMethodsNames!.includes(objectMethod)
          }
          return false
        })

        if (!!isNestedFunction) {
          path.stop()
          return
        }

        const comments =
          path.node.leadingComments ||
          path.findParent(p => {
            const parentComments = p.node?.leadingComments || []
            return !!parentComments.find(x => x.value.includes(DISABLE_SCOPE))
          })?.node?.leadingComments ||
          []

        if (comments.length > 0) {
          path.skip()
        } else if (judgeNeedTraslateNode(path)) {
          path.replaceWith(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(IMPORT_I18N_OBJ),
                  t.identifier(JS_I18N_FUNC)
                ),
                [t.stringLiteral(path.node.value)]
              )
            )
          )
          path.skip()
        } else {
          // console.log(`${JSON.stringify(path.node)} is not need traslate`)
        }
      }
    },

    TemplateLiteral: (path, state) => {
      /**
       * let str1 = `姓名：${username}, 地址：${address} `
       * let str2 = fanyi("姓名：%s, 地址：%s", [username, address])
       * let str3 = fanyi.translate("姓名：%s, 地址：%s", [username, address])
       * let str4 = "姓名：" + username + " 地址：" + address
       */
      if (judgeNeedTraslateNode(path)) {
        const hasParams = path.node.expressions.length > 0
        if (hasParams) {
          const strs: string[] = path.node.quasis.map(item => item.value.raw)

          if (strs.length > 0) {
            let exp = ''

            for (let i = 0; i < strs.length; i++) {
              const str = strs[i]
              // 是否为 template params
              if (i === strs.length - 1) {
                exp += createTemplateI18N(str)
                exp = exp.replace(/(^\s\+\s|\s\+\s$)/g, '')
              } else {
                exp +=
                  createTemplateI18N(str) +
                  ' + ' +
                  generateBabel(path.node.expressions[i] as t.Node).code +
                  ' + '
              }
            }

            path.replaceWith(
              template.statement(exp, {
                placeholderPattern: false
              })({})
            )
          }
        } else {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier(IMPORT_I18N_OBJ),
                t.identifier(JS_I18N_FUNC)
              ),
              [t.stringLiteral(path.node.quasis[0].value.raw)]
            )
          )
        }
        path.skip()
      }
    }

    // FunctionDeclaration: path => {
    //   path.insertBefore(
    //     t.expressionStatement(
    //       t.stringLiteral("Because I'm easy come, easy go.")
    //     )
    //   )
    //   path.insertAfter(
    //     t.expressionStatement(t.stringLiteral('A little high, little low.'))
    //   )
    // }

    // BinaryExpression: {
    //   enter(path) {
    //     if (
    //       t.isStringLiteral(path.node.left) &&
    //       t.isStringLiteral(path.node.right)
    //     ) {
    //       path.replaceWith(
    //         t.stringLiteral(path.node.left.value + path.node.right.value)
    //       )
    //     }
    //   }
    // },
  }
  return visitor
}

/**
 *
 * 针对 javascript 的翻译
 *
 * @param ast
 * @param options
 * @returns
 */
export function traverseJavascript(
  ast: t.Node | t.Node[],
  options: TraverseOptions
) {
  const visitor = generateVisitor()
  return babelTraverse<TraverseOptions>(ast, visitor, undefined, options)
}

/**
 * 针对 vue sfc 的翻译
 *
 * 1. template 的处理
 * 2. script 的处理
 * 3. scriptSetup 的处理
 * 4. style 的处理
 *
 * @param ast
 * @param options
 */
export function traverseVueSfc(
  descriptor: SFCDescriptor,
  options: TraverseOptions
) {
  if (descriptor?.template) {
    generateTraverseNodeElements(descriptor.template.ast.children, options)
  }

  // TODO
  // 1. 语法糖的处理
  // 2. jsx / tsx 的处理
  if (descriptor?.script) {
    const ast = parseJavascript(descriptor.script.content)
    traverseJavascript(ast, options)
    descriptor.script.content = generateJavascript(ast, options)
  }

  if (descriptor?.scriptSetup) {
    const ast = parseJavascript(descriptor.scriptSetup.content)
    traverseJavascript(ast, options)
    descriptor.scriptSetup.content = generateJavascript(ast, options)
  }

  return descriptor
}

export function generateTraverseNodeElements(
  children: TemplateChildNode[],
  options: TraverseOptions
) {
  children.forEach((child, index) => {
    if (isElement(child)) {
      child.props = generateTraverseNodeProps(child.props, options)
      generateTraverseNodeElements(child.children, options)
    } else if (isText(child)) {
      if (isNeedTraslate(child.content)) {
        // TODO 原则上应该是不需要对字符串做trim的操作
        children[index] = generateTraverseNodeInterpolation(
          '`' + child.content.trim() + '`',
          options
        ) as TemplateChildNode
      }
    } else if (isInterpolation(child)) {
      // TODO child.content ExpressionNode
      children[index] = generateTraverseNodeInterpolation(
        (child.content as any).content,
        options
      ) as TemplateChildNode
    }
  })
}

/**
 * 转换ast
 * @param ast
 * @param options
 * @returns
 */

export function traverse(
  ast: t.Node | t.Node[] | SFCDescriptor,
  options: TraverseOptions = { forwordOrReverse: false, fileType: 'javascript' }
) {
  if (options.fileType === 'javascript') {
    return traverseJavascript(ast as t.Node | t.Node[], options)
  } else if (options.fileType === 'vue-sfc') {
    return traverseVueSfc(ast as SFCDescriptor, options)
  } else {
    throw new Error('fileType is not supported')
  }
}
