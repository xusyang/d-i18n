import { ref, toRefs } from 'vue'
import { getDicts } from '@/api/system/dict/data'

/**
 * 模型的操作类型
 */
export const MODEL_OPERATOR_TYPE = {
  新增: 1,
  编辑: 2,
}

export const DEPT_TYPE = {
  前台: 1,
  中台: 2,
  后台: 3,
}

export const DICT_KEYS = {
  DEPT_TYPE: 'DEPT_TYPE',
  MODEL_OPERATOR_TYPE: 'MODEL_OPERATOR_TYPE',
}

/**
 * 获取字典数据
 */
export function useDict(...args) {
  // 是否需要做缓存
  const res = ref({})
  return (() => {
    args.forEach((d) => {
      res.value[d] = []
      getDicts(d).then((resp) => {
        res.value[d] = resp.data.map((p) => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass }))
      })
    })
    return toRefs(res.value)
  })()
}
