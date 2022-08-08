<template>
  <el-select
    v-model="value"
    filterable
    allow-create
    default-first-option
    :reserve-keyword="false"
    placeholder="请选择法人所属集团"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as ApiLegal from '@/api/system/legal'

const props = defineProps<{ groupId: Number | String; groupName: String }>()
const emit = defineEmits(['update:groupId', 'update:groupName'])

const options = ref([])
const getData = async () => {
  const res = await ApiLegal.list({ groupId: 0 })
  options.value = res.data.map((x) => {
    return {
      value: x.id,
      label: x.legalName,
    }
  })
}
getData()

const value = computed({
  get() {
    if (props.groupId === '') {
      return props.groupName
    }
    return props.groupId
  },
  set(value) {
    if (typeof value === 'number') {
      emit('update:groupId', value)
      emit('update:groupName', '')
    } else {
      emit('update:groupId', '')
      emit('update:groupName', value)
    }
  },
})
</script>
