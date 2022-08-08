<template>
  <el-cascader
    v-model="value"
    :options="data"
    :props="{ label: 'deptName', value: 'id', checkStrictly: true }"
    :show-all-levels="false"
    clearable
  ></el-cascader>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import * as ApiDept from '@/api/system/dept'

const { proxy } = getCurrentInstance()

const data = ref([])
const getData = async (legalId) => {
  const res = await ApiDept.listDept({
    legalId,
  })
  data.value = proxy.handleTree(res.rows, 'id')
}

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: [] | null) {
    let res = Array.isArray(value) && value.length > 0 ? value[value.length - 1] : 0
    emit('update:modelValue', res)
  },
})

defineExpose({
  getData,
  refreshData: getData,
})
</script>
