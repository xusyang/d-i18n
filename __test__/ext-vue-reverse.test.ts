import fse from 'fs-extra'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { di18n } from '../src'
import { TraverseOptions } from '../src/types'
import { filePathWithResult, readFile, writeFile } from '../src/utils'

const traverseOptions: TraverseOptions = {
  forwordOrReverse: false,
  fileType: 'vue-sfc'
}

describe('ext vue reverse, file', async () => {
  const dir = './vue/'

  const files = await fse
    .readdirSync(path.join(__dirname, dir))
    .filter(x => x.includes('result.vue'))
  // .filter(x => x.includes('002.template-html.result.vue'))

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
})
