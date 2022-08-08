import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'

import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    async GenerateRoutes({ commit }) {
      const res = await getRouters()

      const sdata = JSON.parse(JSON.stringify(res.data))
      const rdata = JSON.parse(JSON.stringify(res.data))
      const defaultData = JSON.parse(JSON.stringify(res.data))
      const sidebarRoutes = filterAsyncRouter(sdata)
      let rewriteRoutes = filterAsyncRouter(rdata, false, true)
      const defaultRoutes = filterAsyncRouter(defaultData)

      /**
       *
       * normalizeRoutes
       *
       * @param {*} routes
       * @returns
       */
      function normalizeRoutes(routes) {
        const res = []
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i]
          const existRoute = res.find((x) => x.name === route.name)
          if (route.children) {
            route.children.forEach((x) => (x.meta.parent = route))
          }
          if (existRoute) {
            existRoute.children.push(...route.children)
          } else {
            res.push(route)
          }
        }
        return res
      }
      rewriteRoutes = normalizeRoutes(rewriteRoutes)

      commit('SET_ROUTES', rewriteRoutes)
      commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
      commit('SET_DEFAULT_ROUTES', sidebarRoutes)
      commit('SET_TOPBAR_ROUTES', defaultRoutes)

      return rewriteRoutes
    },
  },
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param {*} asyncRouterMap
 * @param {*} lastRouter
 * @param {*} type
 * @returns
 */
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  const res = asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })

  return res
}

/**
 *
 * @param {*} childrenMap
 * @param {*} lastRouter
 * @returns
 */
function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

/**
 * 通过字符串加载组件，返回组件对象
 * @param {*} view
 * @returns
 */
export const loadView = (view) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default permission
