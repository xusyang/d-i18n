<template>
  <el-dialog title="删除提示" v-model="show" width="600px" append-to-body>
    <span>{{title}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleComfirm"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs, defineExpose, defineEmits } from 'vue'
const emits = defineEmits(['delete'])
const data = reactive({
  show: false,
  title: '',
  query: {}
})
const { show, title, query } = toRefs(data)

const open = (msg, queryArg) => {
  show.value = true
  title.value = msg
  query.value = queryArg
}

const handleCancel = () => {
  show.value = false
}

const handleComfirm = () => {
  emits('delete', query.value)
  show.value = false
}

defineExpose({
  open,
})
</script>
<style scoped>

</style>