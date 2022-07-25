<template>
  <p :label="country + I18N.$fanyi('重庆')"></p>
  <p :label="I18N.$fanyi('中国') + I18N.$fanyi('重庆')"></p>
  <p :label="province"></p>
  <p :label="2 + 3"></p>
  <p :label="2"></p>
  <p :label="country + province + city"></p>
  <p :label="'111' + country + province + city + '2222'"></p>
  <p
    :label="{
      name: I18N.$fanyi('重庆')
    }"
  ></p>
  <p
    :label="{
      中国: I18N.$fanyi('中国')
    }"
  ></p>
  <p :label="userinfo[`我的祖国`]"></p>
</template>
