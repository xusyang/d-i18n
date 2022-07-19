<template>
  <hello-world :username="'中国1' + name" title="中国2" />
  <hello-world :[username]="'中国3'" title="中国4" />
</template>
