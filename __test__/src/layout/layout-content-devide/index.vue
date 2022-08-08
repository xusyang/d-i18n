<template>
  <el-scrollbar class="content-devide-wrapper">
    <slot name="content"></slot>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'

const instance = getCurrentInstance()
const slots = instance.slots
</script>

<style lang="scss" scoped>
.content-devide-wrapper {
  :deep(.panel) {
    margin-bottom: 20px;
  }
  :deep(.el-steps) {
    padding: 14px;
  }
}
</style>
