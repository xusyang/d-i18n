<template>
  <layout-panel age="age">
    <layout-panel age="age"></layout-panel>
    <layout-panel :age="I18N.$fanyi('中国')"></layout-panel>
    <layout-panel age="age">
      <layout-panel age="age"></layout-panel>
      <layout-panel :age="I18N.$fanyi('重庆')"></layout-panel>
      <layout-panel age="age"></layout-panel>
    </layout-panel>
  </layout-panel>
</template>
