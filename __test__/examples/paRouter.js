export default [
  {
    path: '/pa/event',
    name: 'pa/event',
    component: () => import('@/views/pa/personnelEvent'),
    meta: {
      title: '人事事件'
    }
  },
  {
    path: '/pa/getFileds',
    name: 'pa/getFileds',
    component: () => import('@/views/pa/personnelEvent/personnelEvent.vue'),
    meta: {
      title: '人事事件'
    }
  },
  {
    path: '/pa/xxcjksrz',
    name: '/pa/xxcjksrz',
    component: () => import('@/views/pa/personnelEvent/infoCollectionList.vue'),
    meta: {
      title: '信息采集'
    }
  },
  {
    path: '/pa/entryPreparation',
    name: 'pa/entryPreparation',
    component: () => import('@/views/pa/personnelEvent/entryPreparation.vue'),
    meta: {
      title: '招聘管理'
    }
  },
  {
    path: '/ess/getFileds',
    name: 'ess/getFileds',
    component: () => import('@/views/pa/personnelEvent/personnelEvent.vue'),
    meta: {
      title: '人事事件'
    }
  },
  {
    path: '/mss/getFileds',
    name: 'mss/getFileds',
    component: () => import('@/views/pa/personnelEvent/personnelEvent.vue'),
    meta: {
      title: '招聘管理'
    }
  },
  {
    path: '/ht/getFileds',
    name: 'ht/getFileds',
    component: () => import('@/views/pa/personnelEvent/personnelEvent.vue'),
    meta: {
      title: '合同管理'
    }
  },
  {
    path: '/ht/event',
    name: 'ht/event',
    component: () => import('@/views/pa/personnelEvent'),
    meta: {
      title: '人事事件'
    }
  },
  {
    path: '/ht/contractPrinting',
    name: 'ht/contractPrinting',
    component: () => import('@/views/pa/contract/contractPrinting.vue'),
    meta: {
      title: '人事事件'
    }
  },
  {
    path: '/ess/essProve',
    name: 'ess/essProve',
    component: () => import('@/views/pa/prove/proveApplicationList.vue'),
    meta: {
      title: 'DHR | 证明办理'
    }
  },
  {
    path: '/cm/essProve',
    name: 'cm/essProve',
    component: () => import('@/views/pa/prove/proveApplicationList.vue'),
    meta: {
      title: 'DHR | 证明管理'
    }
  },
  {
    path: '/contract/signature',
    name: 'contractSignature',
    component: () => import('@/views/pa/contract/signature.vue'),
    meta: {
      title: '人事事件'
    }
  },
  {
    //首页的人员搜索
    path: '/info/staffSearch',
    name: 'info/staffSearch',
    component: () => import('@/views/common/staff_search.vue')
  },
  {
    path: '/ess/styleDetail',
    name: 'ess/styleDetail',
    component: () => import('@/views/common/staffStyleDetail.vue'),
    meta: {
      title: '员工风采'
    }
  },
  {
    path: '/ess/myContract',
    name: 'ess/myContract',
    component: () => import('@/views/pa/myContract/myContract.vue')
  },
  {
    path: '/pa/infoRead',
    name: 'pa/infoRead',
    component: () => import('@/views/pa30/infoRead/infoRead.vue'),
    meta: {
      title: 'OA待阅'
    }
  }
]
