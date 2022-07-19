<template>
  {{ I18N.$fanyi('中国') }}
  <span>
    {{ I18N.$fanyi('中国') }}
  </span>
  {{ I18N.$fanyi('你好') }}
  <p :title="I18N.$fanyi('中国')"></p>
</template>

<script setup lang="ts">
let country = I18N.$fanyi('中国')
let city = I18N.$fanyi('重庆')
let address = I18N.$fanyi('渝中区')
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
