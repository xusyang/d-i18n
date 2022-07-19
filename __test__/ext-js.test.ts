import fse from 'fs-extra'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { di18n } from '../src'
import { TraverseOptions } from '../src/types'
import { filePathWithResult, readFile, writeFile } from '../src/utils'

const traverseOptions: TraverseOptions = {
  forwordOrReverse: true,
  fileType: 'javascript'
}

describe('ext js, file', async () => {
  const dir = './js/'

  const files = await fse
    .readdirSync(path.join(__dirname, dir))
    .filter(x => !x.includes('result'))

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(dir + file, __dirname)
      let result = di18n(code, traverseOptions)
      writeFile(filePathWithResult(dir + file), result, __dirname)
      expect(result).toMatchSnapshot()
    })
  }
})
