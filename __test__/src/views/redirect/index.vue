<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { params, query } = route
const { path } = params

setTimeout(() => {
  router.replace({ path: '/' + path, query })
}, 0)
</script>
