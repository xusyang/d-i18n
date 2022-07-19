<template>
  <hello-world v-if="name === '中国'" />
  <hello-world v-show="name === '中国'" />
</template>
