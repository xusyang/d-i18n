import fse from 'fs-extra'
import path from 'path'
import { describe, it } from 'vitest'
import { di18n } from '../src'
import { TraverseOptions } from '../src/types'
import {
  filePathWithResult,
  readFile,
  unFilePathWithResult,
  writeFile
} from '../src/utils'

const traverseOptions: TraverseOptions = {
  forwordOrReverse: false,
  fileType: 'javascript'
}

describe('ext js reverse, file', async () => {
  const dir = './examples/'

  const files = await fse
    .readdirSync(path.join(__dirname, dir))
    .filter(x => x.includes('index.js'))

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(dir + file, __dirname)
      const result = di18n(code, traverseOptions)
      await writeFile(
        filePathWithResult(dir + file, 'reverse'),
        result,
        __dirname
      )
    })
  }

  // it('2. 反向解析带参数-数组形式', () => {
  //   const code = `
  //     let str1 = I18N.$fanyi('{0} world', ['hello'])
  //     let str2 = I18N.$fanyi('{name} world', {name: 'hello'})
  //   `
  //   expect(di18n(code, traverseOptions)).toMatchSnapshot()
  // })
})
