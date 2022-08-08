<template>
  <Audit
    v-bind="{
      name: I18N.$fanyi('中国'),
      hometome: I18N.$fanyi('台湾')
    }"
    :aaa="I18N.$fanyi('台湾')"
    :bbb="I18N.$fanyi('重庆')"
    @success="handleSuccess"
    @cancel="handleClose"
  />
</template>
