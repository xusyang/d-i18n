<template>
  {{ I18N.$fanyi('中国') }}
  <span>
    {{ I18N.$fanyi('中国人') }}
  </span>
  {{ I18N.$fanyi('你好') }}
  <p :title="I18N.$fanyi('中国')"></p>
</template>
