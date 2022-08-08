/**
 * 状态类型
 */
export enum ENUM_STATUE_TYPE {
  启用 = '0',
  禁用 = '1',
}

/**
 * 部门类型
 */
export enum ENUM_DEPT_TYPE {
  前台 = '1',
  中台 = '2',
  后台 = '3',
}

/**
 * 菜单的类型
 */
export enum ENUM_MENU_TYPE {
  目录 = 'M',
  菜单 = 'C',
  按钮 = 'F',
}

/**
 * 菜单的跳转类型
 */
export enum ENUM_MENU_DIRECT_TYPE {
  外部链接 = '0',
  内部链接 = '1',
  低代码链接 = '2',
}

export enum AGREE_STATUS {
  全部 = '',
  同意 = '1',
  拒绝 = '3',
}

export enum CPS_AUDIT_TYPE {
  费用单据 = 'FYDJ',
  动因定义 = 'DYDY',
  分成单策略审核 = 'CPS_PROFIT_BILL_STRATEGY',
}

export enum CPS_VIEW_ID {
  FYDJ = 380,
  DYDY = 376,
  CPS_PROFIT_BILL_STRATEGY = 499, // 分成策略列表
}

export enum CPS_VIEW_QUERY_CODE {
  FYDJ = 'cost_group_code',
  DYDY = 'factor_code',
  CPS_PROFIT_BILL_STRATEGY = 'ca_share_strategy',
}

/**
 * 把 enum 转换成 [{value: '', label}] 的数组
 * @param data
 */
export function convertEnumToOptions(data) {
  return Object.keys(data)
    .filter((x) => isNaN(Number(x)))
    .map((x) => {
      return {
        label: x,
        value: data[x],
      }
    })
}

/**
 * 把 enum 的 value 转换成 label
 *
 * 注意：enum 中如果 value 不是 Number 类型，会导致 enum 的反向映射失效
 * @param data
 * @param value
 * @returns
 */
export function convertEnumValueToLabel(data, value, noPrefix = false) {
  try {
    var [name, _] = Object.entries(data).filter((x) => x[1] === value)[0]
    return name || '-'
  } catch (error) {
    return !noPrefix ? `数据异常：${value}` : `${value}`
  }
}
