import generateBabel from '@babel/generator'
import babelTraverse, { Visitor } from '@babel/traverse'
import { default as template } from '@babel/template'
import * as t from '@babel/types'
import { consts } from '../../constants'
import { TraverseOptions } from '../../types'
import { isNeedTraslateNode, isNeedTraslateText } from '../../utils'

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
  options: TraverseOptions,
  translateTexts: Set<string>
) {
  const visitor = generateVisitor(translateTexts)
  return babelTraverse<TraverseOptions>(ast, visitor, undefined, options)
}

const createTemplateI18N = (text: string, translateTexts: Set<string>) => {
  if (isNeedTraslateText(text)) {
    translateTexts.add(text)
    return text ? `${consts.JS_I18N}('${text}')` : ''
  } else {
    return text ? `'${text}'` : ''
  }
}

function generateVisitor(translateTexts: Set<string> = new Set()) {
  const visitor: Visitor<TraverseOptions> = {
    // 入口的处理
    Program: {
      exit: (path, state) => {
        if (state.isNeedImportI18NModule) {
          path.unshiftContainer(
            'body',
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(consts.IMPORT_I18N_OBJ))],
              t.stringLiteral(consts.IMPORT_I18N_PATH)
            )
          )
          path.stop()
        }
      }
    },

    // 方法调用的处理
    CallExpression: (path, state) => {
      if (!state.forwordOrReverse) {
        const objectMethod = generateBabel(path.node.callee as t.Node).code
        if (state.di18nMethodsNames!.includes(objectMethod)) {
          if (path.node.arguments.length === 1) {
            path.replaceWith(
              t.stringLiteral((path.node.arguments[0] as t.StringLiteral).value)
            )
          } else if (path.node.arguments.length === 2) {
            let str = (path.node.arguments[0] as t.StringLiteral).value
            console.log('----------------', str)
          }
        }
      }
    },

    // 字符串的处理
    StringLiteral: (path, state) => {
      if (!path.node) {
        return
      }

      if (state.forwordOrReverse) {
        if (!isNeedTraslateNode(path)) return

        // TODO 空字符串的处理
        // t.isPatternLike(path.parent) ,  t.isExpression(path.parent) 才能 remove
        // if (path.node.value === '') {
        //   path.remove && path.remove()
        //   path.stop && path.stop()
        //   return
        // }

        /**
         * 1. let str = '' + 'abc' + ''
         * 2. let str = ''
         * 3. let str = ['', 'abc', '']
         */

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
            return !!parentComments.find(x =>
              x.value.includes(consts.DISABLE_SCOPE)
            )
          })?.node?.leadingComments ||
          []

        const text = path.node.value
        if (comments.length > 0) {
          path.skip()
        } else if (isNeedTraslateText(text)) {
          translateTexts.add(text)
          path.replaceWith(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(consts.IMPORT_I18N_OBJ),
                  t.identifier(consts.JS_I18N_FUNC)
                ),
                [t.stringLiteral(text)]
              )
            )
          )
          path.skip()
        } else {
          // console.log(`${JSON.stringify(path.node)} is not need traslate`)
        }
      }
    },

    // 模板字符串的处理
    TemplateLiteral: (path, state) => {
      if (!isNeedTraslateNode(path)) return

      /**
       * let str1 = `姓名：${username}, 地址：${address} `
       * let str2 = fanyi("姓名：%s, 地址：%s", [username, address])
       */
      const hasParams = path.node.expressions.length > 0
      if (hasParams) {
        const strs: string[] = path.node.quasis.map(item => item.value.raw)

        if (strs.length > 0) {
          let exp = ''

          for (let i = 0; i < strs.length; i++) {
            const str = strs[i]
            // 是否为 template params
            if (i === strs.length - 1) {
              exp += createTemplateI18N(str, translateTexts)
              exp = exp.replace(/(^\s\+\s|\s\+\s$)/g, '')
            } else {
              exp +=
                createTemplateI18N(str, translateTexts) +
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
        const text = path.node.quasis[0].value.raw
        if (isNeedTraslateText(text)) {
          translateTexts.add(text)
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier(consts.IMPORT_I18N_OBJ),
                t.identifier(consts.JS_I18N_FUNC)
              ),
              [t.stringLiteral(text)]
            )
          )
        }
      }
      path.skip()
    }
  }
  return visitor
}
