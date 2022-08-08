<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path, onlyOneChild.query)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            :icon-class="
              onlyOneChild.meta.icon || (item.meta && item.meta.icon)
            "
          />
          <template #title>
            {{ onlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span>
          {{ item.meta.title }}
        </span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import { getNormalPath } from '@/utils/ruoyi'
import AppLink from './Link'
import { ENUM_MENU_DIRECT_TYPE } from '@/constants/enum'
import config from '@/config'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
/**
 * TODO onlyOneChild 可能会有问题
 */

const onlyOneChild = ref<any>({})
/**
 * TODO 针对一个子菜单的特殊处理
 *
 * @param children
 * @param parent
 */

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = []
  }

  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  }) // When there is only one child router, the child router is displayed by default

  if (showingChildren.length === 1) {
    return true
  } // Show parent if there are no child router to display

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function resolvePath(routePath, routeQuery?: any) {
  const item = props.item
  let res // TODO  routePath and onlyChild

  if (item.meta && item.meta.isFrame === ENUM_MENU_DIRECT_TYPE.外部链接) {
    res = routePath
  } else if (
    item.meta &&
    item.meta.isFrame === ENUM_MENU_DIRECT_TYPE.低代码链接
  ) {
    res = '/' + config.LOWCODE_PREFIX + '/' + item.path
  } else {
    if (routeQuery) {
      let query = JSON.parse(routeQuery)
      res = {
        path: getNormalPath(props.basePath + '/' + routePath),
        query: query
      }
    }

    res = getNormalPath(props.basePath + '/' + routePath)
  } // TODO 针对子应用的处理

  if (res === '/lowcode/lowcode') {
    res += Math.random()
  }

  return res
}
</script>
