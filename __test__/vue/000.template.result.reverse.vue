<template>
  '中国'
  <span> '中国' </span>
  '你好'
  <p :title="中国"></p>
</template>

<script setup lang="ts">
let country = '中国'
let city = '重庆'
let address = '渝中区'
</script>

<style>
div {
  color: red;
}
</style>

<style lang="scss">
div {
  color: yellow;
}
</style>
