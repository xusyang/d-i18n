<template>
  <List :legalId="legalId" />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { INotice, SYSTEM_DEPT } from '@/constants/inject-keys'
import List from './list.vue'

provide<INotice>(SYSTEM_DEPT.REFRESH_DEPT, {
  tag: ref(0),
  notice: function () {
    this.tag.value++
  },
})

const legalId = ref(-1)
</script>
