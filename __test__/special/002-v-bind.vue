<template>
  <Audit
    v-bind="{ name: '中国', hometome: '台湾' }"
    :aaa="'台湾'"
    :bbb="'重庆'"
    @success="handleSuccess"
    @cancel="handleClose"
  />
</template>
