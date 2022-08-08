import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 分摊方案执行情况
export function allocatePerform() {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: '/home/statistics/allocatePerform',
    method: 'get',
  })
}

// 分摊结果异常情况
export function allocateException() {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: '/home/statistics/allocateException',
    method: 'get',
  })
}

// 本月平均分摊时长
export function avgExecTime() {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: '/home/statistics/avgExecTime',
    method: 'get',
  })
}

// 近一年分摊执行平均时长统计
export function avgExecTimeLineChart(data) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: '/home/statistics/avgExecTimeLineChart',
    method: 'post',
    data: data,
  })
}

export function noticeList(data) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: '/api/v1/object/ca_message/query',
    method: 'post',
    data: data,
  })
}

export function noticeReadUnread(id, data) {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: `/api/v1/object/ca_message/updateSelectiveById/${id}`,
    method: 'post',
    data: data,
  })
}

export function noticeClear() {
  return request({
    headers: {
      isToken: false,
      Authorization: getToken()
    },
    baseURL: import.meta.env.VITE_APP_LOWCODE_BASE_API,
    url: `/home/message/readAll`,
    method: 'get',
  })
}

