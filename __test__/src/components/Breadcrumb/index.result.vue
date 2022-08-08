<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
      @click="handleLink(item)"
    >
      <span
        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <a v-else>
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const levelList = ref([])

function getBreadcrumb() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0] // 判断是否为首页

  if (!isDashboard(first)) {
    matched = [
      {
        path: '/index',
        meta: {
          title: '首页'
        }
      }
    ].concat(matched)
  }

  const filterMatched = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )

  for (let i = 1; i < filterMatched.length; i++) {
    const currMatch = filterMatched[i - 1]
    const nextMatch = filterMatched[i]
    currMatch.meta = nextMatch.meta?.parent?.meta || currMatch.meta
  }

  levelList.value = filterMatched
}

function isDashboard(route) {
  const name = route && route.name

  if (!name) {
    return false
  }

  return name.trim() === 'Index'
}

function handleLink(item) {
  const { redirect, path } = item

  if (path === '/task') {
    router.push('/task/audit/list')
  } // if (redirect) {

  // router.push(redirect)

  // return

  // }

  // router.push(path)
}

watchEffect(() => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }

  getBreadcrumb()
})
getBreadcrumb()
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #000;
    cursor: text;
    font-weight: 800;
  }
}
</style>
