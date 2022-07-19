<template>
  <hello-world :title="I18N.$fanyi('中国')" />
  <img src="中国" />
  <img :src="`中国${name}`" />
</template>
