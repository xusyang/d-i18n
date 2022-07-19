import prettier from 'prettier'
import { parse } from './parse'
import { generate } from './generator'
import { traverse } from './traverse'
import { TraverseOptions } from './types'

function mergeOptions(options: TraverseOptions) {
  return Object.assign(
    {
      di18nMethodsNames: ['I18N.$fanyi', '$t'],
      isTranslationScope: {
        functionParams: true
      }
    },
    options
  )
}

export function di18n(code: string, options: TraverseOptions) {
  options = mergeOptions(options)
  const ast = parse(code, options)
  traverse(ast, options)
  let result = generate(ast, options)
  result = result.replace(/(\/\/)\s*/gm, '\n$1 ')
  result = result.replace(/^(\/\/[\s\S].*)\n$/gm, '\n$1\n')
  return prettier.format(result, {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: options.fileType === 'vue-sfc' ? 'vue' : 'babel'
  })
}
