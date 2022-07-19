<template>
  <hello-world
    :username="I18N.$fanyi('中国1') + name"
    :title="I18N.$fanyi('中国2')"
  />
  <hello-world
    :[username]="I18N.$fanyi('中国3')"
    :title="I18N.$fanyi('中国4')"
  />
</template>
