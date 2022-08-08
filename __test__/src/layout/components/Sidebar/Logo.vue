<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground
    }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <h1
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark'
                ? variables.logoTitleColor
                : variables.logoLightTitleColor
          }"
        >
          {{ title }}
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark'
                ? variables.logoTitleColor
                : variables.logoLightTitleColor
          }"
        >
          <span> C </span> ost <span> P </span> er <span> S </span> pective
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import variables from '@/assets/styles/variables.module.scss'
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
const title = ref('CPS')
const store = useStore()
const sideTheme = computed(() => store.state.settings.sideTheme)
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  background: var(--base-menu-background);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: var(--base-menu-text);
      line-height: 30px;
      vertical-align: middle;
      font-size: 20px;
      font-weight: 800;
      span {
        color: #86bc25;
      }
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
