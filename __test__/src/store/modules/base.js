import { listMenu } from '@/api/system/menu'
import { handleTree } from '@/utils/ruoyi'

const state = {
  menus: [],
}

const mutations = {
  SET_MENUS: (state, payload) => {
    state.menus = payload || []
  },
}

const actions = {
  async refreshMenu({ commit }) {
    const res = await listMenu()
    const menus = handleTree(res.data, 'menuId')
    commit('SET_MENUS', menus)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
