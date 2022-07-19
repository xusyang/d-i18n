const { parse } = require('@babel/parser')
const generate = require('@babel/generator')A
const core = require('@babel/core')

const a = 'var a = 1;'
const b = 'var b = 2;'
const astA = parse(a, { sourceFilename: 'a.js' })
const astB = parse(b, { sourceFilename: 'b.js' })
const ast = {
  type: 'Program',
  body: [].concat(astA.program.body, astB.program.body)
}

const { code, map } = generate.default(
  ast,
  { sourceMaps: true },
  {
    'a.js': a,
    'b.js': b
  }
)

const { codeFrameColumns } = require('@babel/code-frame')

try {
  throw new Error('xxx 错误')
} catch (err) {
  console.error(
    codeFrameColumns(
      `const name = guang`,
      {
        start: { line: 1, column: 1 }
      },
      {
        highlightCode: true,
        message: err.message
      }
    )
  )
}
