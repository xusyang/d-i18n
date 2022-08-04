import glob from 'glob'
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
  const dir = './js/**/*.js'
  const files: string[] = await new Promise(resolve => {
    glob(path.join(__dirname, dir), (err, files) => {
      resolve(files.filter(x => x.includes('result.js')))
    })
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(file)
      const result = di18n(code, traverseOptions)
      await writeFile(filePathWithResult(file, 'reverse'), result)
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
