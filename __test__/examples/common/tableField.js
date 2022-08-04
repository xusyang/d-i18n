/**
 * @Copyright  DELOITTE
 * @description 人事表格字段配置 交通板块
 * @Date 2020年08月03日
 * @param menuii 就是pageCode 页面代码
 * @param taskType 任务类型
 * @returns {[]|*[]}
 */
import i18n from "@/lang"
import { pageCode } from "@/config/index.js"

export default function tableField(menuii, taskType) {
  let tableFieldObject = []
  /**
   * 入职
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PARZGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ICTXT", label: "证件类型", type: "String", width: 100, fixed: false },
      { prop: "IDNUM", label: "证件号码", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "MGTXT", label: "招聘来源", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ICTXT", label: "证件类型", type: "String", width: 100, fixed: false },
      { prop: "IDNUM", label: "证件号码", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "MGTXT", label: "招聘来源", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ICTXT", label: "证件类型", type: "String", width: 100, fixed: false },
      { prop: "IDNUM", label: "证件号码", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "MGTXT", label: "招聘来源", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }
  /**
   * 转正
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAZZGLJT] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: "right" },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: "right" },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: "right" },
    ],
  }

  /**
   * 调动
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PADPGLJT] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
  }
  tableFieldObject[pageCode.PADPGLSP] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "调入日期", type: "Date", width: 100, fixed: false },
      {
        prop: "ZDRGSM",
        label: "拟调入公司",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRBMM",
        label: "拟调入部门",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZDRGWM",
        label: "拟调入岗位",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZX_T",
        label: "拟任职级",
        type: "String",
        width: 120,
        fixed: false,
      },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
  }

  tableFieldObject[pageCode.PAJDGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "借调公司", type: "String", width: 100, fixed: false },
      {
        prop: "ZDRBMM",
        label: "借调部门",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGWM", label: "借调岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "借调公司", type: "String", width: 100, fixed: false },
      {
        prop: "ZDRBMM",
        label: "借调部门",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGWM", label: "借调岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "借调公司", type: "String", width: 100, fixed: false },
      {
        prop: "ZDRBMM",
        label: "借调部门",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGWM", label: "借调岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
  }

  /**
   * 晋升管理
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAJSGLJT] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 降级管理
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAJJGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "降级日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "降级原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "降级日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "降级原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "降级日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "降级原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 任免管理
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PARMGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "晋升日期", type: "String", width: 100, fixed: false },
      { prop: "MGTXT", label: "晋升原因", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 兼任管理
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAJRGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "兼任日期", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "兼任原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "兼任日期", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "兼任原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "兼任日期", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "兼任原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 100, fixed: false },
      {
        prop: "ZZZD_T",
        label: "拟任职等",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZZZX_T", label: "拟任职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 退休管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PATXGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "退休日期", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "退休日期", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "退休日期", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 离职管理
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PALZGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "Date", width: 120, fixed: false },
      { prop: "MNTXT", label: "离职类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "离职原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZGCGLG_T", label: "人员层级", type: "String", width: 150, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "Date", width: 120, fixed: false },
      { prop: "MNTXT", label: "离职类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "离职原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZGCGLG_T", label: "人员层级", type: "String", width: 150, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "Date", width: 120, fixed: false },
      { prop: "MNTXT", label: "离职类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "离职原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZGCGLG_T", label: "人员层级", type: "String", width: 150, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 信息采集
   * @type {({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}
   */
  tableFieldObject[pageCode.PAXXCJ] = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
    { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
    { prop: "ICTXT", label: "证件类型", type: "String", width: 100, fixed: false },
    { prop: "ICNUM", label: "证件号码", type: "String", width: 100, fixed: false },
    { prop: "ZCOMPNAME", label: "公司", type: "String", width: 100, fixed: false },
    { prop: "ZDEPTNAME", label: "部门", type: "String", width: 100, fixed: false },
    { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
    { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
    { prop: "ZSFZZ", label: "是否在职", type: "String", width: 100, fixed: false },
    { prop: "ZLZRQ", label: "离职日期", type: "Date", width: 100, fixed: false },
    { prop: "MGTXT", label: "离职类型", type: "String", width: 100, fixed: false },
    {
      prop: "ZLZYY",
      label: "离职原因",
      type: "String",
      width: 100,
      fixed: false,
    },
    { prop: "ZSFCRZ", label: "禁止录用", type: "String", width: 100, fixed: false },
    {
      prop: "ZSFBCJ",
      label: "是否支付离职补偿金",
      type: "String",
      width: 200,
      fixed: false,
    },
  ]
  /**
   * 员工下属转正
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.YGZZ] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      {
        prop: "ZKHJG",
        label: "试用期考核结果",
        type: "String",
        width: 160,
        fixed: false,
      },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      {
        prop: "ZKHJG",
        label: "试用期考核结果",
        type: "String",
        width: 160,
        fixed: false,
      },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      {
        prop: "ZKHJG",
        label: "试用期考核结果",
        type: "String",
        width: 160,
        fixed: false,
      },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 录用管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.LYGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  tableFieldObject[pageCode.ZPXQ] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 预入职管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.YRZGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "BEGDA", label: "到岗日期", type: "Date", width: 100, fixed: false },
      { prop: "GESCH", label: "性别", type: "String", width: 100, fixed: false },
      { prop: "AGE", label: "年龄", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "应聘岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 入职准备
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.RZZB] = {
    T: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      {
        prop: "ENAME",
        label: "拟入职员工",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false },
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
    D: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      {
        prop: "ENAME",
        label: "拟入职员工",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false },
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
    F: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      {
        prop: "ENAME",
        label: "拟入职员工",
        type: "String",
        width: 100,
        fixed: false,
      },
      /* {prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false}, */
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
  }

  /**
   * 离职手续待办
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.LZSXBL] = {
    T: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      { prop: "ENAME", label: "离职员工", type: "String", width: 100, fixed: false },
      { prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false },
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
    D: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      { prop: "ENAME", label: "离职员工", type: "String", width: 100, fixed: false },
      { prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false },
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
    F: [
      { prop: "ZLINE", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ZTASK_TITE", label: "任务标题", type: "String", width: 90, fixed: false },
      { prop: "ZTASK_NAME", label: "任务名称", type: "Date", width: 100, fixed: false },
      { prop: "ENAME", label: "离职员工", type: "String", width: 100, fixed: false },
      /* {prop: "ZSUR_DATE", label: "距离任务到期", type: "String", width: 100, fixed: false}, */
      {
        prop: "ZDEAL_STAT",
        label: "处理状态",
        type: "String",
        width: 100,
        fixed: false,
      },
    ],
  }

  /**
   * offer管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.OFGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "候选人姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "候选人姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 信息审核
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.RCKGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "候选人姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "ENAME", label: "候选人姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "拟报到日期", type: "Date", width: 120, fixed: false },
      { prop: "ZRZDW", label: "拟任公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "拟任部门", type: "String", width: 120, fixed: false },
      { prop: "PLSTX", label: "拟任岗位", type: "String", width: 120, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "ZZGJRCBS_T", label: "简历类型", type: "String", width: 100, fixed: false },
      {
        prop: "ZPQD_T",
        label: "招聘渠道",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 合同管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAHTGLJT] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 合同打印
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PAHTDY] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 证明开具
   * @type {({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}
   */
  tableFieldObject[pageCode.ZMKJ] = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 100, fixed: false },
    { prop: "SDATE", label: "申请日期", type: "Date", width: 100, fixed: false },
    { prop: "ZSTAT_T", label: "状态", type: "String", width: 100, fixed: false },
  ]

  /**
   * 证明管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.ZMGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      /* {prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false}, */
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 160, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 120, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      /* {prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false}, */
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 160, fixed: false },
    ],
  }

  tableFieldObject[pageCode.ZMGL_DC] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },

      {
        prop: "ZZZMYT",
        label: "申请原因",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 120, fixed: false },
      { prop: "CDATE", label: "办理日期", type: "String", width: 120, fixed: false },
      { prop: "ZSTAT_T", label: "状态", type: "String", width: 120, fixed: false },
      { prop: "CUSER", label: "办理人", type: "String", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },

      {
        prop: "ZZZMYT",
        label: "申请原因",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 120, fixed: false },
      { prop: "CDATE", label: "办理日期", type: "String", width: 120, fixed: false },
      { prop: "ZSTAT_T", label: "状态", type: "String", width: 120, fixed: false },
      { prop: "CUSER", label: "办理人", type: "String", width: 120, fixed: false },
    ],
  }

  /**
   * 证明管理 -
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.SPZMGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 90, fixed: false },
      { prop: "ZZZMBLXMT", label: "证明类型", type: "String", width: 120, fixed: false },
      { prop: "PERNR", label: "申请人员工编号", type: "String", width: 150, fixed: false },
      { prop: "ENAME", label: "申请人姓名", type: "String", width: 120, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "ZZZD_T", label: "职等", type: "String", width: 100, fixed: false },
      { prop: "SDATE", label: "申请日期", type: "Date", width: 120, fixed: false },
    ],
  }

  /**
   * 内退管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PANTGL] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "String", width: 120, fixed: false },
      { prop: "FUNCT", label: "内退类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "内退原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "String", width: 120, fixed: false },
      { prop: "FUNCT", label: "内退类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "内退原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "最后工作日", type: "String", width: 120, fixed: false },
      { prop: "FUNCT", label: "内退类型", type: "String", width: 100, fixed: false },
      {
        prop: "MGTXT",
        label: "内退原因",
        type: "String",
        width: 100,
        fixed: false,
      },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      /*{prop: "ZZGJRCBS_T", label: "关键人才", type: "String", width: 100, fixed: false},*/
      {
        prop: "ZZFQR",
        label: "操作负责人",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 轮岗
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.PALGGLJT] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "轮岗公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "轮岗部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "轮岗岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "轮岗公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "轮岗部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "轮岗岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "轮岗公司", type: "String", width: 100, fixed: false },
      { prop: "ZDRBMM", label: "轮岗部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "轮岗岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
  }

  /**
   * 用工管理
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  let yggl = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工编号", type: "String", width: 120, fixed: false },
    { prop: "ENAME", label: "姓名", type: "String", width: 120, fixed: false },
    { prop: "BEGDA", label: "转换日期", type: "Date", width: 120, fixed: false },
    { prop: "ZRZDW", label: "公司", type: "String", width: 120, fixed: false },
    { prop: "ZRZBM", label: "部门", type: "String", width: 120, fixed: false },
    { prop: "PLSTX", label: "岗位", type: "String", width: 120, fixed: false },
    { prop: "ZZZX_T", label: "职级", type: "String", width: 120, fixed: false },
    { prop: "ZZZD_T", label: "职等", type: "String", width: 120, fixed: false },
    {
      prop: "ZZGCGLG_T",
      label: "中高级管理人员",
      type: "String",
      width: 120,
      fixed: false,
    },
    { prop: "ZZGJRCBS_T", label: "关键人才", type: "String", width: 120, fixed: false },
    { prop: "PTEXT", label: "员工组", type: "String", width: 120, fixed: false },
    { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    { prop: "operation", label: "操作", type: "String", width: 120, fixed: false },
  ]

  tableFieldObject[pageCode.PAYGGL] = {
    T: yggl,
    D: yggl,
    F: yggl,
  }

  /**
   * 轮岗管理SP
   * @type {{C: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  let lgglsp = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
    { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
    { prop: "BEGDA", label: "开始日期", type: "Date", width: 140, fixed: false },
    { prop: "ENDDA", label: "结束日期", type: "String", width: 140, fixed: false },
    { prop: "MNTXT", label: "异动原因", type: "String", width: 120, fixed: false },
    { prop: "ZDRBMM", label: "部门", type: "String", width: 120, fixed: false },
    { prop: "ZDRGWM", label: "岗位", type: "String", width: 120, fixed: false },
    { prop: "NAME1", label: "人事范围", type: "String", width: 120, fixed: false },
    // {prop: 'BTEXT',label: "人事子范围",type: "String", width: 120, fixed: false},
    { prop: "ZZZX_T", label: "职衔", type: "String", width: 120, fixed: false },
    { prop: "ZZZD_T", label: "职等", type: "String", width: 120, fixed: false },
    { prop: "ZDJNAME", label: "轮岗导师", type: "String", width: 120, fixed: false },
    { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
  ]
  tableFieldObject[pageCode.PALGGLSP] = {
    T: lgglsp,
    C: lgglsp,
    D: lgglsp,
    F: lgglsp,
    B: lgglsp,
  }

  /**
   * 人事事件降档管理
   **/
  let PAJDDGLTITLE = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
    { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
    { prop: "BEGDA", label: "降档日期", type: "String", width: 120, fixed: false },
    { prop: "MGTXT", label: "降档原因", type: "String", width: 120, fixed: false },
    { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 120, fixed: false },
    { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 120, fixed: false },
    { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 120, fixed: false },
    {
      prop: "ZZZD_T",
      label: "拟任职级",
      type: "String",
      width: 120,
      fixed: false,
    },
    {
      prop: "ZZZX_T",
      label: "拟任职等",
      type: "String",
      width: 100,
      fixed: false,
    },
    { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
  ]
  tableFieldObject[pageCode.PAJDDGL] = {
    T: PAJDDGLTITLE,
    C: PAJDDGLTITLE,
    D: PAJDDGLTITLE,
  }

  /**
   * 人事事件离岗管理
   **/
  let PALGGLTITLE = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
    { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
    { prop: "BEGDA", label: "离职日期", type: "String", width: 120, fixed: false },
    { prop: "MGTXT", label: "离岗原因", type: "String", width: 120, fixed: false },
    { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 120, fixed: false },
    { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 120, fixed: false },
    { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 120, fixed: false },
    {
      prop: "ZZZD_T",
      label: "拟任职级",
      type: "String",
      width: 120,
      fixed: false,
    },
    {
      prop: "ZZZX_T",
      label: "拟任职等",
      type: "String",
      width: 100,
      fixed: false,
    },
    { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
  ]
  tableFieldObject[pageCode.PALGGL] = {
    T: PALGGLTITLE,
    C: PALGGLTITLE,
    D: PALGGLTITLE,
  }

  /**
   * 人事事件返岗管理
   **/
  let PAFGGLTITLE = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
    { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
    { prop: "BEGDA", label: "返岗日期", type: "String", width: 120, fixed: false },
    { prop: "MGTXT", label: "返岗原因", type: "String", width: 120, fixed: false },
    { prop: "ZDRGSM", label: "拟任公司", type: "String", width: 120, fixed: false },
    { prop: "ZDRBMM", label: "拟任部门", type: "String", width: 120, fixed: false },
    { prop: "ZDRGWM", label: "拟任岗位", type: "String", width: 120, fixed: false },
    {
      prop: "ZZZD_T",
      label: "拟任职级",
      type: "String",
      width: 120,
      fixed: false,
    },
    {
      prop: "ZZZX_T",
      label: "拟任职等",
      type: "String",
      width: 100,
      fixed: false,
    },
    { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
  ]
  tableFieldObject[pageCode.PAFGGL] = {
    T: PAFGGLTITLE,
    C: PAFGGLTITLE,
    D: PAFGGLTITLE,
  }

  /**
   * 新配置的人事事件 转正管理 PAZZGLCHB
   **/
  tableFieldObject[pageCode.PAZZGLCHB] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "员工姓名", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "转正日期", type: "Date", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZRQ", label: "入职日期", type: "Date", width: 100, fixed: false },
      { prop: "ZSYQ", label: "试用期", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "操作人", type: "String", width: 120, fixed: false },
      { prop: "TSTAT", label: "流程状态", type: "String", width: 120, fixed: false },
    ],
  }

  /*
    复制原晋升管理
    */
  tableFieldObject[pageCode.PAJSGL] = tableFieldObject[pageCode.PAJSGLJT]

  /*
    复制原轮岗管理
    */
  tableFieldObject[pageCode.PALGGLDC] = tableFieldObject[pageCode.PALGGLJT]

  /*
   * @Description 用工转换
   * @Author Peng Kang
   * @Date 2021/8/2 4:06 下午
   * @type {[{prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, null, null, null, null, null]}
   * @param
   * @return
   */
  let PAYGZH = [
    { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
    { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
    { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
    { prop: "BEGDA", label: "转换日期", type: "String", width: 100, fixed: false },
    { prop: "MGTXT", label: "操作原因", type: "String", width: 100, fixed: false },
    { prop: "ZDRGSM", label: "所在公司", type: "String", width: 100, fixed: false },
    { prop: "ZDRBMM", label: "所在部门", type: "String", width: 100, fixed: false },
    { prop: "ZDRGWM", label: "所在岗位", type: "String", width: 100, fixed: false },
    { prop: "ZZFQR", label: "操作负责人", type: "String", width: 120, fixed: false },
    { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
  ]

  tableFieldObject[pageCode.PAYGZH] = {
    T: PAYGZH,
    C: PAYGZH,
    D: PAYGZH,
  }
  /**
   * 合同变更-
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.SPHTBG] = {
    // 待盖章
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待签字
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 已办结
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 120, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待维护
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 110, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * 合同续签-
   * @type {{T: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], D: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[], F: ({prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string}|{prop: string, width: number, fixed: boolean, label: string, type: string})[]}}
   */
  tableFieldObject[pageCode.SPHTXQ] = {
    // 审批中
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待维护
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待盖章
    B: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待签字
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
    // 待完成
    F: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 90, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 150, fixed: false },
      { prop: "PLSTX", label: "岗位", type: "String", width: 150, fixed: false },
      { prop: "ZZZX_T", label: "职级", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "PKTXT", label: "员工子组", type: "String", width: 100, fixed: false },
      {
        prop: "ZHTXQCS",
        label: "合同续签次数",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQXLX_T",
        label: "合同期限类型",
        type: "String",
        width: 130,
        fixed: false,
      },
      {
        prop: "ZZHTQDZTI_T",
        label: "合同主体",
        type: "String",
        width: 120,
        fixed: false,
      },
      { prop: "ZHTQX", label: "合同期限(月)", type: "String", width: 120, fixed: false },
      { prop: "BEGDA", label: "合同开始日期", type: "Date", width: 130, fixed: false },
      { prop: "CTEDT", label: "合同结束日期", type: "Date", width: 130, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
    ],
  }

  /**
   * @Description 代培管理
   * @Author Peng Kang
   * @Date 2021/8/2 4:06 下午
   * @type {[{prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, {prop: string, width: number, fixed: boolean, label: string, type: string}, null, null, null, null, null]}
   * @param
   * @return
   */
  tableFieldObject[pageCode.DPSJ_SP] = {
    T: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "代培公司", type: "String", width: 100, fixed: false },
      { prop: "ZDPBM", label: "代培部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "代培岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    C: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "代培公司", type: "String", width: 100, fixed: false },
      { prop: "ZDPBM", label: "代培部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "代培岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
    D: [
      { prop: "index", label: "序号", type: "index", width: 50, fixed: false },
      { prop: "FUNCT", label: "任务类型", type: "String", width: 100, fixed: false },
      { prop: "BEGDA", label: "日期", type: "Date", width: 100, fixed: false },
      { prop: "PERNR", label: "员工编号", type: "String", width: 100, fixed: false },
      { prop: "ENAME", label: "姓名", type: "String", width: 100, fixed: false },
      { prop: "PTEXT", label: "员工组", type: "String", width: 100, fixed: false },
      { prop: "ZRZDW", label: "公司", type: "String", width: 100, fixed: false },
      { prop: "ZRZBM", label: "部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGSM", label: "代培公司", type: "String", width: 100, fixed: false },
      { prop: "ZDPBM", label: "代培部门", type: "String", width: 100, fixed: false },
      { prop: "ZDRGWM", label: "代培岗位", type: "String", width: 100, fixed: false },
      { prop: "TSTAT", label: "状态", type: "String", width: 100, fixed: false },
      { prop: "ZZFQR", label: "发起人", type: "String", width: 100, fixed: false },
      { prop: "ZCZRQ", label: "发起日期", type: "Date", width: 120, fixed: false },
    ],
  }

  if (tableFieldObject[menuii] && tableFieldObject[menuii][taskType]) {
    return tableFieldObject[menuii][taskType]
  } else if (tableFieldObject[menuii]) {
    return tableFieldObject[menuii]
  } else {
    return []
  }
}
