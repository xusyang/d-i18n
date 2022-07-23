import fse from 'fs-extra'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { TraverseOptions } from '../src/types'
import { filePathWithResult, readFile, writeFile } from '../src/utils'
import { di18n } from '../src'

const traverseOptions: TraverseOptions = {
  forwordOrReverse: true,
  fileType: 'vue-sfc'
}

describe('ext vue, file', async () => {
  const dir = './vue/'

  const files = await fse
    .readdirSync(path.join(__dirname, dir))
    .filter(x => !x.includes('result'))
  // .filter(x => x.includes('00.vue'))

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(dir + file, __dirname)
      const result = di18n(code, traverseOptions)
      await writeFile(
        filePathWithResult(dir + file, 'result'),
        result,
        __dirname
      )
    })
  }
})
