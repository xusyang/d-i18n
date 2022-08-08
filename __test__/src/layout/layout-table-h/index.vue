<template>
  <slot name="content" :height="tableH" v-if="tableH"></slot>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash'


const tableH = ref(0)

const resize = throttle(() => {
  const clientH = document.body.clientHeight || document.documentElement.clientHeight
  tableH.value = clientH - 390
}, 30)

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>