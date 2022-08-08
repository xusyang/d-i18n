<template>
  <div style="text-align: center">
    <el-transfer
      v-model="value"
      filterable
      :left-default-checked="leftChecked"
      :right-default-checked="rightChecked"
      :render-content="renderFunc"
      :titles="['待选人', '已选人']"
      :button-texts="['删除', '添加']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    ></el-transfer>
  </div>
</template>

<script lang="tsx" setup>
import { inject, ref, watch } from 'vue'
import type { VNode, VNodeProps } from 'vue'
import * as ApiLegal from '@/api/system/legal'
import { legalTree } from '@/api/login'
import { INotice, SYSTEM_LEGAL } from '@/constants/inject-keys'
import { uniqBy } from 'lodash'
import { useStore } from 'vuex'
import { deepTree } from '@/utils/ruoyi'
import cache from '@/plugins/cache'

const store = useStore()
const { proxy } = getCurrentInstance()
const props = defineProps<{ legalId: Number }>()
interface Option {
  key: number
  label: string
  legalId: number
  disabled: boolean
}

const value = ref<Number[]>([])
const data = ref<Option[]>([])
const leftChecked = ref<Number[]>([])
const rightChecked = ref<Number[]>([])

const getData = async () => {
  const res = await ApiLegal.listUserRelation({
    legalId: props.legalId,
  })
  const resData = uniqBy(res.data, 'userId')
  data.value = resData.map((x) => {
    return {
      key: x.userId,
      label: x.nickName,
      legalId: x.legalId,
    }
  })

  value.value = data.value.filter((x) => x.legalId === props.legalId).map((x) => x.key)
}
getData()

const refresh = inject<INotice>(SYSTEM_LEGAL.REFRESH_LEGALUSER)

const renderFunc = (h: (type: string, props: VNodeProps | null, children?: string) => VNode, option: Option) => {
  return h('span', null, option.label)
}

const handleChange = async (value: number | string, direction: 'left' | 'right', movedKeys: string[] | number[]) => {
  const func = []
  const funcType = direction === 'left' ? 'delUser' : 'addUser'

  movedKeys.forEach((userId) => {
    const formData = {
      userId,
      legalId: props.legalId,
    }
    func.push(ApiLegal[funcType](formData))
  })

  await Promise.all(func)
  legalTree().then(res => {
    const first_legal = cache.local.getJSON('operate_legal_first') || []
    if (!res.data.find(item => item.id === first_legal[0])) {
      const operate_legal_first = deepTree([res.data[0]])
      store.dispatch('RefreshLegalFirst', operate_legal_first)
    }
    store.dispatch('RefreshLegalTree', res.data)
    store.dispatch('app/legalChange', first_legal[0])
    proxy.$modal.msgSuccess('操作成功')
  })

  refresh.notice()
}

defineExpose({
  refreshData: getData,
})
</script>

<style>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>
