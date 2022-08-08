import config from '@/config'

const container = '#app-micro-container'

/**
 * 通过URL来判断是否激活路由
 * @param {*} location
 * @returns
 */
const activeRule = (url) => {
  return (location) => {
    const res = location.hash.startsWith(url)
    return res
  }
}

/**
 * 自动加载的APP
 */

const apps = [
  {
    name: 'capa',
    entry: config.LOWCODE_ENTRY,
    container,
    activeRule: activeRule(`#/${config.LOWCODE_PREFIX}`),
  },
  {
    name: 'flow',
    entry: config.FLOW_ENTRY,
    container,
    activeRule: activeRule(`#/${config.FLOW_PREFIX}`),
  },
]

export default apps
