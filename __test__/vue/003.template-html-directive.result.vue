<template>
  <p :label="country + '重庆'"></p>
  <p :label="'中国' + '重庆'"></p>
  <p :label="province"></p>
  <p :label="2 + 3"></p>
  <p :label="`${2}`"></p>
  <p :label="`${city}`"></p>
  <p :label="`111${country + province + city}2222`"></p>
  <p :label="{ name: '重庆' }"></p>
  <p :label="{ 中国: '中国' }"></p>
  <p :label="userinfo[`我的祖国`]"></p>
</template>
