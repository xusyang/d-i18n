import { login, logout, getInfo, refreshToken, legalTree } from '@/api/login'
import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'
import { deepTree } from '@/utils/ruoyi'
import defAva from '@/assets/images/profile.jpg'
import Cookies from 'js-cookie'
import cache from '@/plugins/cache'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user_roles: [],
    permissions: [],
    operate_legal: cache.local.getJSON('operate_legal') || [],
    operate_legal_first: cache.local.getJSON('operate_legal_first') || [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expires_in = time
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ROLES: (state, roles) => {
      state.user_roles = roles.map((item) => item.roleName)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_OPERATE_LEGAL: (state, data) => {
      state.operate_legal = data
      cache.local.setJSON('operate_legal', data)
    },
    SET_OPERATE_LEGAL_FIRST: (state, data) => {
      state.operate_legal_first = data
      cache.local.setJSON('operate_legal_first', data)
    },
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            let data = res.data
            setToken(data.access_token)
            commit('SET_TOKEN', data.access_token)
            setExpiresIn(data.expires_in)
            commit('SET_EXPIRES_IN', data.expires_in)
            legalTree().then(res => {
              const legal_first = deepTree([res.data[0]])
              commit('SET_OPERATE_LEGAL', res.data)
              commit('SET_OPERATE_LEGAL_FIRST', legal_first)
              dispatch('app/legalChange', legal_first[0])
              resolve()
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar = user.avatar == '' ? defAva : user.avatar
            Cookies.set('sys_user', JSON.stringify({
              userName: user.userName,
              userId: user.id,
              deptCode: user.deptCode || user.dept.deptCode,
              deptName: user.deptName || user.dept.deptName,
            }))
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', res.roles)
              commit('SET_PERMISSIONS', res.permissions)
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT'])
            }
            if (res.user && res.user.roles && res.user.roles.length) {
              commit('SET_USER_ROLES', res.user.roles)
            } else {
              commit('SET_USER_ROLES', [])
            }
            commit('SET_NAME', user.userName)
            commit('SET_AVATAR', avatar)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.token)
          .then((res) => {
            setExpiresIn(res.data)
            commit('SET_EXPIRES_IN', res.data)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USER_ROLES', [])
            commit('SET_PERMISSIONS', [])
            commit('SET_OPERATE_LEGAL', [])
            removeToken()
            localStorage.clear()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    RefreshLegalTree({ commit }, data) {
      commit('SET_OPERATE_LEGAL', data)
    },
    RefreshLegalFirst({ commit }, data) {
      commit('SET_OPERATE_LEGAL_FIRST', data)
    },
  },
}

export default user
