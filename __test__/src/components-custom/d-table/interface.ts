import { Component } from 'vue'

type TypeTableColumnAlign = 'left' | 'right' | 'center'
type TypeButton = 'primary' | 'danger' | 'warn'
type TypeTableFixed = 'left' | 'right' | ''

export interface IDTableColumn {
  label: String
  prop: String
  align: TypeTableColumnAlign
  width?: Number | String
  fixed?: TypeTableFixed
  formatter?: Function
  component?: Component
  hidden?: Boolean
  // 原始字段
  showOverflowTooltip?: Boolean
}

export interface IDTableOperator {
  name: String
  func: Function
  type?: TypeButton
  isConfirm?: Boolean
  confirmTitle?: String
}
