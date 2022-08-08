<template>
  <section class="container-app">
    <div :class="{ card: route.name !== 'Index' }" class="content">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="cachedViews">
          <component :is="handleComponent(Component, route)" :key="route.path" />
        </keep-alive>
      </router-view>
      <div class="app-micro-container" >
        <div id="app-micro-container">加载中...</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { start } from 'qiankun'
import { useStore } from 'vuex'
import { useRoute, RouteRecordNormalized, RouteRecordName } from 'vue-router'
import config from '@/config'

let store = useStore()
const route = useRoute()

store.dispatch('tagsView/addCachedView', route)
const cachedViews = computed(() => {
  return store.state.tagsView.cachedViews
})

const isActiveQianKun = computed(() => {
  return [config.LOWCODE_PREFIX, config.FLOW_PREFIX].some((item) => route.path.indexOf(item) > -1)
  // return route.path.indexOf(config.FLOW_PREFIX) > -1
})

// 给组件添加name，使keep-alive生效
const handleComponent = (
  component: Record<'type', { name: RouteRecordName | undefined }>,
  route: RouteRecordNormalized,
) => {
  if (component) {
    component.type.name = route.name
    // 子应用直接return
    if (
      route.path.indexOf('lowcode') > -1 || 
      route.path.indexOf('flow') > -1
    ) {
      return
    }
  }
  return component
}

onMounted(() => {
  if (!(window as any).qiankunStarted) {
    console.log('qiankun start')
    ;(window as any).qiankunStarted = true
    start()
  }
})
</script>

<style lang="scss" scoped>
.container-app {
  box-sizing: content-box;
  /* 50= navbar  50  */
  min-height: calc(100vh - 136px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--base-background);
  .content {
    padding: 14px;
  }
  .card {
    background: #fff;
    margin: 0 15px;
    padding: calc(var(--base-gutter-width) * 4);
    height: calc(100vh - 136px);
    overflow: hidden;
    box-sizing: border-box;
    border-top-left-radius: var(--base-radius);
    border-top-right-radius: var(--base-radius);
  }
}

.fixed-header + .container-app {
  padding-top: 136px;
}

.hasTagsView {
  .container-app {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 136px);
  }

  .fixed-header + .container-app {
    padding-top: 136px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}

.app-micro-container {
  height: 100%;

  #app-micro-container {
    height: 100%;
  }

  #__qiankun_microapp_wrapper_for_capa__ {
    height: 100%;
    #lowcode-app {
      height: 100%;
      .app-main {
        height: 100%;
      }
    }
  }
}
</style>
