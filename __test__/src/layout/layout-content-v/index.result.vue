<template>
  <div class="app-container">
    <div class="container-query">
      <slot name="query"></slot>
    </div>

    <div class="container-tools" v-if="slots.tool">
      <slot name="tool"></slot>
    </div>

    <div class="container-content" ref="refContainerContent">
      <el-scrollbar height="100%">
        <slot name="content" :height="contentHeight"></slot>
      </el-scrollbar>
    </div>

    <div class="container-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash'
const instance = getCurrentInstance()
const slots = instance.slots
const refContainerContent = ref(null)
const contentHeight = ref(0) // BUG: 这里采用节流的形式来包装方法后，导致 d-table 高度塌陷

const resize = throttle(() => {
  if (refContainerContent && refContainerContent.value) {
    const res = refContainerContent.value.getBoundingClientRect()
    contentHeight.value = res.height
  }
}, 30) // const resize = () => {

// // if (refContainerContent && refContainerContent.value) {

// const res = refContainerContent.value.getBoundingClientRect()

// contentHeight.value = res.height

// // }

// }

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.container-tools {
  border-top: 1px solid rgba(230, 230, 230, 0.4);
  padding-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-content {
  flex: 1;
  overflow: hidden;
}
</style>
