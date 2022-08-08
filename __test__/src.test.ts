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

describe('ext src, file', async () => {
  const dir = './src/**/*.vue'
  const files: string[] = await new Promise(resolve => {
    glob(path.join(__dirname, dir), (err, files) => {
      resolve(files.filter(x => !x.includes('result')))
      // resolve(files.filter(x => x.includes('multiField.vue')))
    })
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    it(file, async () => {
      const words = new Set<string>()
      const code = await readFile(file)
      const result = di18n(code, traverseOptions, words)
      writeFile(filePathWithResult(file), result)
      if ([...words].length > 0)
        writeFile(
          filePathWithResult(file, 'result.words'),
          [...words].join('|')
        )
    })
  }
})
