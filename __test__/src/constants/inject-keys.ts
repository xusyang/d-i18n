import { Ref, watch, WatchCallback } from 'vue'

/**
 * 法人模块
 */
export const SYSTEM_LEGAL = {
  REFRESH_LEGAL: Symbol('SYSTEM_LEGAL_REFRESH_LEGAL'),
  REFRESH_LEGALUSER: Symbol('SYSTEM_LEGAL_REFRESH_LEGALUSER'),
}

/**
 * 部门模块
 */
export const SYSTEM_DEPT = {
  REFRESH_DEPT: Symbol('SYSTEM_DEPT_REFRESH_DEPT'),
}

export interface INotice {
  tag: Ref<Number>
  notice: () => void
}

export function watchINotice(ref: INotice | undefined, callback: WatchCallback<Number> | undefined) {
  if (ref && ref.tag) {
    watch(ref.tag, callback)
  }
}
