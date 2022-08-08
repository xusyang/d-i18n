<template>
  <el-dialog title="绑定法人管理员" v-model="show" width="700px" :before-close="handleClose" append-to-body>
    <DTransferUser :legalId="legalId" ref="transferUserRef" />
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import DTransferUser from './d-transfer-user.vue'

const show = ref(false)
const legalId = ref(0)
const transferUserRef = ref(null)

/**
 * 打开对话框
 */
const open = (id) => {
  show.value = true
  legalId.value = id

  nextTick(() => {
    transferUserRef.value && transferUserRef.value.refreshData()
  })
}

const handleClose = () => {
  show.value = false
}

defineExpose({
  open,
})
</script>
