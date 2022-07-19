import { parse } from '@vue/compiler-sfc'

export function parseVueSfc(code: string) {
  const descriptor = parse(code).descriptor
  return descriptor
}
