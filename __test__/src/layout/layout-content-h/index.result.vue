<template>
  <div class="app-container">
    <div class="container-left">
      <slot name="left"></slot>
    </div>

    <div class="container-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
const instance = getCurrentInstance()
const slots = instance.slots
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  .container-left {
    flex: 0 0 400px;
    overflow: hidden;
    background: var(--base-background-component);
  }

  .container-right {
    margin-left: 15px;
    flex: 1;
    overflow: hidden;
  }
}
</style>
