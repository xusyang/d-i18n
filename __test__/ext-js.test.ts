import glob from 'glob'
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
  const dir = './examples/**/*.js'
  const files: string[] = await new Promise(resolve => {
    glob(path.join(__dirname, dir), (err, files) => {
      resolve(files.filter(x => !x.includes('result')))
    })
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    it(file, async () => {
      const code = await readFile(file)
      let result = di18n(code, traverseOptions)
      writeFile(filePathWithResult(file), result)
    })
  }
})
