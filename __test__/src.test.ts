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
  let files: string[] = await new Promise(resolve => {
    glob(path.join(__dirname, dir), (err, files) => {
      // resolve(files.filter(x => !x.includes('result')))
      resolve(files.filter(x => x.includes('Settings/index.vue')))
    })
  })

  files = [files[0], files[1]]
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const words = new Set<string>()
      let code = await readFile(file)
      const result = await di18n(code, traverseOptions, words)
      await writeFile(filePathWithResult(file), result)
      if ([...words].length > 0)
        await writeFile(
          filePathWithResult(file, 'result.words'),
          [...words].join('|')
        )
    })
  }
})
