<template>
  <div
    class="sidebar"
    :class="{ 'has-logo': showLogo }"
    :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />

    <header-search id="header-search" class="right-menu-item" />

    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <div style="width: 95%; margin: auto">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
          :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
          :unique-opened="true"
          :active-text-color="theme"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="(route, index) in sidebarRouters"
            :key="route.path + index"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
    </el-scrollbar>

    <div class="sidebar-bg"></div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo'

import HeaderSearch from '@/components/HeaderSearch'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'

const route = useRoute()
const store = useStore()

const sidebarRouters = computed(() => store.getters.sidebarRouters)
const showLogo = computed(() => store.state.settings.sidebarLogo)
const sideTheme = computed(() => store.state.settings.sideTheme)
const theme = computed(() => store.state.settings.theme)
const isCollapse = computed(() => !store.state.app.sidebar.opened)

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped>
.sidebar {
  .sidebar-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    // background-image: url('./../../../assets/images/sidebar-bg.png');
    background-size: contain;
    background-position: center bottom;
    background-repeat: no-repeat;
    pointer-events: none;
  }
}
</style>
