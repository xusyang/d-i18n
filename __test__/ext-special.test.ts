import glob from 'glob'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { TraverseOptions } from '../src/types'
import { filePathWithResult, readFile, writeFile } from '../src/utils'
import { di18n } from '../src'

const traverseOptions: TraverseOptions = {
  forwordOrReverse: true,
  fileType: 'vue-sfc'
}

describe('ext-special', async () => {
  const dir = './special/**/*.vue'
  const files: string[] = await new Promise(resolve => {
    glob(path.join(__dirname, dir), (err, files) => {
      resolve(files.filter(x => !x.includes('result')))
      // resolve(files.filter(x => x.includes('multiField.vue')))
    })
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(file)
      const result = di18n(code, traverseOptions)
      await writeFile(filePathWithResult(file, 'result'), result)
    })
  }
})
