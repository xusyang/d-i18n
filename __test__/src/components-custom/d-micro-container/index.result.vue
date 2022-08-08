<template>
  <div class="container-micro-app">
    <div id="app-micro-container">
      {{ I18N.$fanyi('加载中...') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { start } from 'qiankun'
onMounted(() => {
  if (!(window as any).qiankunStarted) {
    console.log('qiankun start')
    ;(window as any).qiankunStarted = true
    start()
  }
})
</script>
