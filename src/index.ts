import prettier from 'prettier'
import { flatten } from 'lodash'
import { parse } from './parse'
import { generate } from './generator'
import { traverse } from './traverse'
import { TraverseOptions } from './types'

function mergeOptions(options: TraverseOptions) {
  return Object.assign(
    {
      di18nMethodsNames: ['I18N.$fanyi', '$fanyi', '$t'],
      isTranslationScope: {
        functionParams: true
      }
    },
    options
  )
}

export function di18n(
  code: string,
  options: TraverseOptions,
  translateTexts: Set<string> = new Set()
) {
  options = mergeOptions(options)
  options.di18nMethodsNames = flatten(
    options.di18nMethodsNames!.map(x => ['this.' + x, x])
  )

  const ast = parse(code, options)
  traverse(ast, options, translateTexts)

  let result = generate(ast, options)
  result = result.replace(/^\s*(\/\/)\s*/gm, '\n$1 ')
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
