<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.path,
          query: tag.query,
          fullPath: tag.fullPath
        }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          class="close-wrapper"
          v-if="!isAffix(tag)"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <close
            class="el-icon-close"
            style="width: 1em; height: 1em; vertical-align: middle"
          />
        </span>
      </router-link>
    </scroll-pane>

    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <close style="width: 1em; height: 1em" /> {{ I18N.$fanyi('关闭当前') }}
      </li>
      <li @click="closeOthersTags">
        <circle-close style="width: 1em; height: 1em" />
        {{ I18N.$fanyi('关闭其他') }}
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <back style="width: 1em; height: 1em" /> {{ I18N.$fanyi('关闭左侧') }}
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <right style="width: 1em; height: 1em" /> {{ I18N.$fanyi('关闭右侧') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        <circle-close style="width: 1em; height: 1em" />
        {{ I18N.$fanyi('全部关闭') }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import ScrollPane from './scroll-panel'
import { getNormalPath } from '@/utils/ruoyi'
const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref({})
const affixTags = ref([])
const scrollPaneRef = ref(null)
const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()
const router = useRouter()
const visitedViews = computed(() => store.state.tagsView.visitedViews)
const routes = computed(() => store.state.permission.routes)
const theme = computed(() => store.state.settings.theme)
watch(route, () => {
  addTags()
  moveToCurrentTag()
})
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
onMounted(() => {
  initTags()
  addTags()
})

function isActive(r) {
  return r.path === route.path
}

function activeStyle(tag) {
  if (!isActive(tag)) return {}
  return {
    'background-color': theme.value,
    'border-color': theme.value
  }
}

function isAffix(tag) {
  return tag.meta && tag.meta.affix
}

function isFirstView() {
  try {
    return (
      selectedTag.value.fullPath === visitedViews.value[1].fullPath ||
      selectedTag.value.fullPath === '/index'
    )
  } catch (err) {
    return false
  }
}

function isLastView() {
  try {
    return (
      selectedTag.value.fullPath ===
      visitedViews.value[visitedViews.value.length - 1].fullPath
    )
  } catch (err) {
    return false
  }
}

function filterAffixTags(routes, basePath = '') {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = getNormalPath(basePath + '/' + route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }

    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)

      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

function initTags() {
  const res = filterAffixTags(routes.value)
  affixTags.value = res

  for (const tag of res) {
    // Must have tag name
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}

function addTags() {
  const { name } = route

  if (name) {
    store.dispatch('tagsView/addView', route)
  }

  return false
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {
      if (r.path === route.path) {
        scrollPaneRef.value.moveToTarget(r) // when query is different then update

        if (r.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
      }
    }
  })
}

function refreshSelectedTag(view) {
  proxy.$tab.refreshPage(view)
}

function closeSelectedTag(view) {
  proxy.$tab.closePage(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

function closeRightTags() {
  proxy.$tab.closeRightPage(selectedTag.value).then((visitedViews) => {
    if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews)
    }
  })
}

function closeLeftTags() {
  proxy.$tab.closeLeftPage(selectedTag.value).then((visitedViews) => {
    if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews)
    }
  })
}

function closeOthersTags() {
  router.push(selectedTag.value).catch(() => {})
  proxy.$tab.closeOtherPage(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

function closeAllTags(view) {
  proxy.$tab.closeAllPage().then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === route.path)) {
      return
    }

    toLastView(visitedViews, view)
  })
}

function toLastView(visitedViews, view) {
  const latestView = visitedViews.slice(-1)[0]

  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,

    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({
        path: '/redirect' + view.fullPath
      })
    } else {
      router.push('/')
    }
  }
}

function openMenu(tag, e) {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left

  const offsetWidth = proxy.$el.offsetWidth // container width

  const maxLeft = offsetWidth - menuMinWidth // left boundary

  const l = e.clientX - offsetLeft + 15 // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = l
  }

  top.value = e.clientY - 50
  visible.value = true
  selectedTag.value = tag
}

function closeMenu() {
  visible.value = false
}

function handleScroll() {
  closeMenu()
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 36px;
  width: 100%;
  background: var(--base-menu-background);
  position: relative;

  .tags-view-wrapper {
    .tags-view-item {
      cursor: pointer;
      display: inline-block;
      position: relative;
      min-width: 100px;
      height: 36px;
      line-height: 26px;
      padding: 5px;
      box-sizing: border-box;
      border-right: 1px solid rgba(#fff, 0.1);
      background: var(--base-menu-background);
      color: var(--base-menu-text);
      font-size: 12px;
      text-align: center;
      &.active {
        background-color: var(--color-primary) !important;
        color: #fff;
        border-color: transparent !important;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
// reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    &:hover {
      .close-wrapper {
        opacity: 1;
      }
    }

    .close-wrapper {
      position: absolute;
      top: 0;
      right: -1px;
      width: 16px;
      height: 16px;

      // background: var(--base-menu-text-active);
      background: var(--tag-close-wrapper);
      border-bottom-left-radius: 999px;
      opacity: 0;
      transition: opacity 300ms ease-in-out;

      .el-icon-close {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        right: 0;
        color: var(--tag-close-text);
      }
    }
  }
}
</style>
