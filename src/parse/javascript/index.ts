import { parse } from '@babel/parser'
import { consts } from '../../constants'

export function parseJavascript(code: string) {
  if (code.trim().indexOf('{') === 0) {
    code = `${consts.FIX_VUE_TEMPLATE_DIRECTIVE_OBJECT}${code}`
  }

  return parse(code, {
    sourceType: 'module',
    strictMode: false,
    plugins: ['jsx', 'typescript']
  })
}
