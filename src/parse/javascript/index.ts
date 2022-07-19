import { parse } from '@babel/parser'

export function parseJavascript(code: string) {
  return parse(code, {
    sourceType: 'module',
    strictMode: false,
    plugins: ['jsx', 'typescript']
  })
}
