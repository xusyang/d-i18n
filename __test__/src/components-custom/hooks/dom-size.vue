<template>
  <div ref="refDomSize">
    <slot></slot>
  </div>
</template>

<script lang="ts" scoped>
import { onMounted, onUpdated, ref } from 'vue'
const refDomSize = ref(null)
setTimeout(() => {
  console.log('refDomSize: ', refDomSize)
}, 3000)

// TODO 未执行

onMounted(() => {
  console.log('mounted')
})
onUpdated(() => {
  console.log('onUpdated')
})
</script>
