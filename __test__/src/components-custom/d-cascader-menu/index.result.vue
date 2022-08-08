<template>
  <el-cascader
    v-model="value"
    :options="menuOptions"
    :props="{
      label: 'menuName',
      value: 'id',
      checkStrictly: true
    }"
    :show-all-levels="false"
    clearable
  ></el-cascader>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  defineExpose,
  defineProps,
  getCurrentInstance
} from 'vue'
import { listMenu } from '@/api/system/menu'
import { normalizeTree } from '@/utils/common' // 1.菜单初始化

const menuOptions = ref([])

async function getData() {
  const res = await listMenu()
  menuOptions.value = normalizeTree(0, res.data)
}

getData() // 2. 设置model的双向绑定

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    if (Array.isArray(value)) {
      const len = value.length
      emit('update:modelValue', value[len - 1])
    } else {
      emit('update:modelValue', '')
    }
  }
})
defineExpose({
  getData,
  refreshData: getData
})
</script>
