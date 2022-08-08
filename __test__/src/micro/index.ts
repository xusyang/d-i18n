import { start, registerMicroApps } from 'qiankun'
import NProgress from 'nprogress'

import apps from './apps'

/**
 * 开启微前端
 */
export const startMicroApp = function () {
  console.log('register micro app')
  registerMicroApps(apps, {
    beforeLoad: () => {
      console.log('beforeLoad')
      NProgress.start()
      return Promise.resolve()
    },

    afterMount: () => {
      console.log('afterMount')
      NProgress.done()
      return Promise.resolve()
    },
  })
}
