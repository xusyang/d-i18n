import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 待审核列表
export function taskTodoList(data) {
  return request({
    headers: {
      repeatSubmit: false,
    },
    baseURL: import.meta.env.VITE_APP_FLOW_BASE_API,
    url: '/workflow/task/pageList',
    method: 'post',
    data: data,
  })
}

// 已审核列表
export function taskDidList(data) {
  return request({
    headers: {
      repeatSubmit: false,
    },
    baseURL: import.meta.env.VITE_APP_FLOW_BASE_API,
    url: '/workflow/history/task/pageList',
    method: 'post',
    data: data,
  })
}

// 查询节点信息
export function targetProcessNode(data) {
  return request({
    headers: {
      repeatSubmit: false,
    },
    baseURL: import.meta.env.VITE_APP_FLOW_BASE_API,
    url: '/workflow/processDeployment/targetProcessNode',
    method: 'post',
    data: data,
  })
}

// 审核
export function taskComplete(data) {
  return request({
    headers: {
      repeatSubmit: false,
    },
    baseURL: import.meta.env.VITE_APP_FLOW_BASE_API,
    url: '/workflow/task/complete',
    method: 'post',
    data: data,
  })
}

// 流程状态，所有节点，包括未经过的
export function processStatus(params) {
  return request({
    headers: {
      repeatSubmit: false,
    },
    baseURL: import.meta.env.VITE_APP_FLOW_BASE_API,
    url: '/workflow/processInstance/process/status',
    method: 'get',
    params: params,
  })
}

export function getViewDefineById(id) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: `/api/v1/viewDefine/${id}`,
    method: 'get',
  })
}

export function selectObjectDataPage(code, data) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: `/api/v1/object/${code}/query`,
    method: 'post',
    data,
  })
}

export function treeLazy(type, data) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: `api/v1/object/ca_${type}/tree/roots?lazy=false`,
    method: 'post',
    data,
  })
}
