import request from '@/utils/request'
import { parseStrEmpty } from '@/utils/ruoyi'

const service = '/system/legal'

// 新增法人
export function add(data) {
  return request({ url: `${service}`, method: 'post', data })
}

// 修改法人
export function update(data) {
  return request({ url: `${service}`, method: 'put', data })
}

// 根据法人编号获取详情信息
export function get(legalId) {
  return request({ url: `${service}/${parseStrEmpty(legalId)}`, method: 'get' })
}

// 删除法人
export function del(legalId) {
  return request({ url: `${service}/${parseStrEmpty(legalId)}`, method: 'delete' })
}

// 获取法人列表
export function list(params?: Object) {
  return request({ url: `${service}/list`, method: 'get', params })
}

// 获取法人树列表
export function tree() {
  return request({ url: `${service}/treeSelect`, method: 'get' })
}

// 新增法人管理员
export function addUser(data) {
  return request({ url: `${service}/userLegal`, method: 'post', data })
}

// 移除法人管理员
export function delUser(data) {
  return request({ url: `${service}/userLegal`, method: 'delete', data })
}

// 获取法人管理员列表
export function listUser(params) {
  return request({ url: `${service}/userLegal/list`, method: 'get', params })
}

// 获取法人与用户的关联列表
export function listUserRelation(params) {
  return request({ url: '/system/user/legalUser/list', method: 'get', params })
}
