<template>
  <div class="main-header">
    <DSelectLegal />

    <RightMenu />
  </div>
</template>

<script lang="ts" setup>
import DSelectLegal from '@/components-custom/d-select-legal/index.vue'
import RightMenu from './right-menu.vue'
</script>

<style lang="scss" scoped>
.main-header {
  width: 100%;
  height: var(--base-header-height);
  background: var(--base-menu-background);
  padding: 0 10px;
  box-sizing: border-box;
  color: var(--base-menu-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
