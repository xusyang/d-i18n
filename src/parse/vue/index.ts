import { parse } from '@vue/compiler-sfc'
import { cloneDeep } from 'lodash'

export function parseVueSfc(code: string) {
  const descriptor = cloneDeep(parse(code).descriptor)
  return descriptor
}
