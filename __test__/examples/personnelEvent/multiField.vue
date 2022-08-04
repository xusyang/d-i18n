<template>
  <el-form-item
    :prop="fieldItem.FIELD + infoTypeItem.INFTY + infoTypeItem.SUBTY + group.ACGRP + sonGroup.ACBLK"
    :show-message="false"
  >
    <!--文本框-->
    <el-input
      :type="fieldItem.FTYPE === 'P' || fieldItem.FTYPE === 'N' ? 'number' : 'text'"
      autocomplete="off"
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      v-model="fieldItem.value"
      :maxlength="fieldItem.FLENG"
      :disabled="fieldItem.ZZDIS === 'X'"
      @change="fieldItem.ZZDIS !== 'X' ? dataVerification(group, infoTypeItem, fieldItem) : ''"
      @blur="
        fieldItem.ZZDIS !== 'X'
          ? change(
              fieldItem.EVEN,
              fieldItem.value,
              fieldItem.FIELD,
              infoTypeItem.INFTY,
              infoTypeItem.SUBTY,
              group.ACGRP,
              sonGroup.ACBLK,
              fieldItem,
            )
          : ''
      "
      v-if="
        fieldItem.ZZSHM !== 'D' &&
        fieldItem.ZZSHM !== 'T' &&
        fieldItem.FTYPE !== 'D' &&
        fieldItem.ZKJLX !== 'TXT' &&
        fieldItem.ZKJLX !== 'BUT' &&
        fieldItem.ZKJLX !== 'MON' &&
        fieldItem.ZKJLX !== 'PIC' &&
        fieldItem.ZZSHM !== 'B' &&
        fieldItem.ZZSHM !== 'Z' &&
        fieldItem.ZZSHM !== 'S'
      "
    ></el-input>
    <!-- 日期 -->
    <el-date-picker
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      :disabled="fieldItem.ZZDIS === 'X'"
      :name="fieldItem.FIELD"
      v-model="fieldItem.value"
      type="date"
      placeholder="请选择日期"
      value-format="yyyyMMdd"
      @blur="
        fieldItem.ZZDIS !== 'X'
          ? change(
              fieldItem.EVEN,
              fieldItem.value,
              fieldItem.FIELD,
              infoTypeItem.INFTY,
              infoTypeItem.SUBTY,
              group.ACGRP,
              sonGroup.ACBLK,
              fieldItem,
            )
          : ''
      "
      v-if="fieldItem.FTYPE === 'D'"
    ></el-date-picker>
    <!--下拉选择-->
    <el-select
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      filterable
      v-model="fieldItem.value"
      value-key="KEY"
      @click.native="
        fieldItem.ZZDIS !== 'X'
          ? searchPe(
              fieldItem.FIELD,
              infoTypeItem.INFTY,
              infoTypeItem.SUBTY,
              group.ACGRP,
              sonGroup.ACBLK,
              fieldItem,
              infoTypeItem,
            )
          : ''
      "
      :name="fieldItem.FIELD"
      :disabled="fieldItem.ZZDIS === 'X'"
      @change="
        $forceUpdate(),
          change(
            fieldItem.EVEN,
            fieldItem.value,
            fieldItem.FIELD,
            infoTypeItem.INFTY,
            infoTypeItem.SUBTY,
            group.ACGRP,
            sonGroup.ACBLK,
            fieldItem,
          )
      "
      v-if="fieldItem.ZZSHM === 'D'"
    >
      <el-option
        v-for="options in fieldItem.valueList"
        :key="options.KEY"
        :label="options.VALUE"
        :value="options"
      ></el-option>
    </el-select>
    <!--多行文本-->
    <el-input
      type="textarea"
      rows="5"
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      v-model="fieldItem.value"
      :maxlength="fieldItem.FLENG"
      show-word-limit
      :disabled="fieldItem.ZZDIS === 'X'"
      v-if="fieldItem.ZKJLX === 'TXT'"
    ></el-input>
    <!--人员搜索-->
    <pa-search-user
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      :disabled="fieldItem.ZZDIS === 'X'"
      :defaultValue="fieldItem.value ? fieldItem.value.VALUE : ''"
      :ipage="baseParams.MENUII"
      :cheAuth="fieldItem.ZZSHF === 'A' ? 'Z' : ''"
      @getEmployeeData="(dataObject) => employeeCallback(dataObject, fieldItem)"
      @changed="(dataObject) => selectPaUserCallback(dataObject, fieldItem, infoTypeItem, group, sonGroup)"
      @emptValue="() => emptEmployeeValue(fieldItem)"
      v-if="fieldItem.ZZSHM === 'S'"
    ></pa-search-user>
    <paSelectBank
      :class="
        (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
          ? 'width98-5'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
          ? 'width90'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
          ? 'width95'
          : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
          ? 'width97'
          : 'width97-5'
      "
      v-model="fieldItem.value"
      :disabled="fieldItem.ZZDIS === 'X'"
      :clearable="true"
      @change="fieldItem.ZZDIS !== 'X' ? dataVerification(group, infoTypeItem, fieldItem) : ''"
      :inattrs="{ BANKL: 'KEY', BANKA: 'VALUE' }"
      placeholder="请选择银行名称"
      v-if="fieldItem.ZZSHM === 'B'"
    ></paSelectBank>
    <template v-if="fieldItem.ZZSHM === 'T'">
      <paSelectTree
        :class="
          (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 4
            ? 'width98-5'
            : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 6
            ? 'width90'
            : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 12
            ? 'width95'
            : (24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL === 18
            ? 'width97'
            : 'width97-5'
        "
        v-model="fieldItem.value"
        type="tree"
        :dic="fieldItem.treeData"
        @focus="
          fieldItem.ZZDIS !== 'X'
            ? searchPe(
                fieldItem.FIELD,
                infoTypeItem.INFTY,
                infoTypeItem.SUBTY,
                group.ACGRP,
                sonGroup.ACBLK,
                fieldItem,
                infoTypeItem,
              )
            : ''
        "
        @change="(nodeObject) => selectNodeCallback(nodeObject, fieldItem, infoTypeItem, group, sonGroup)"
        :typeformat="customizedLabel"
        :disabled="fieldItem.ZZDIS === 'X'"
        :clearable="false"
      ></paSelectTree>
    </template>

    <div class="el-form-item__error" v-if="fieldItem.isShowText">
      非法的{{ fieldItem.FIELN }}
    </div>
  </el-form-item>
</template>

<script>
import paSearchUser from "../components/paSearchUser"
import paSelectBank from "../components/paSelectBank"
import paSelectTree from "../components/paSelectTree"

export default {
  name: "MultiField",
  components: {
    paSearchUser,
    paSelectBank,
    paSelectTree,
  },
  props: {
    baseParams: { type: Object },
    fieldItem: { type: Object },
    infoTypeItem: { type: Object },
    group: { type: Object },
    sonGroup: { type: Object },
    groupList: { type: Array },
    verificationList: { type: Array },
    getData: Function,
  },
  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description: 通用搜索帮助
     * @date 2020年07月20日
     * @param field
     * @param infty
     * @param subty
     * @param acgrp
     * @param acblk
     * @param fieldItem
     * @param infoTypeItem
     * @param event
     * @param like
     */
    searchPe(field, infty, subty, acgrp, acblk, fieldItem, infoTypeItem, event, like) {
      // 清除数据
      if (fieldItem.ZZSHM === "D" && fieldItem.valueList && fieldItem.valueList.length > 1) {
        if (fieldItem.emptyFields) {
          this.emptyField(fieldItem.emptyFields, fieldItem, infoTypeItem) //清空字段的value
        }
        return
      }
      let param = {
        sapInterface: "PE003",
        IV_PERNR: this.baseParams.employeeNum,
        IV_INFTY: infty, //信息类型
        IV_SUBTY: subty, //信息子类型
        IV_FIELD: field, //字段名称
        IV_ZACTI: this.baseParams.zaction, //事件编号
        IV_ACGRP: acgrp, //信息组
        IV_USER: "",
        IV_ACBLK: acblk, //人员信息模板
        IV_IPAGE: this.baseParams.MENUII,
        IV_DATA: fieldItem.ZZZJL === "X" ? JSON.stringify(this.getDataSearch(fieldItem, infoTypeItem)) : "", //是级联数据 否则 为空
        IV_LIKE: like || "",
      }
      this.$httpServer.sap.baseMethod(param, null, true).then((response) => {
        let GonsiList = [],
          et_org = [],
          et_list = [],
          et_fields = []
        let ES_MESSAGE = response.ES_MESSAGE
        if (ES_MESSAGE.MSGTY === "E") return
        //下拉框的value
        et_list = response.ET_LIST
        this.$set(fieldItem, "valueList", et_list)
        GonsiList = et_list
        et_org = response.ET_ORG
        //需要清空字段的值
        et_fields = response.ET_FIELDS
        this.$set(fieldItem, "emptyFields", et_fields) // 字段里面保存一份需要清空的字段 备用
        // 需要清空的字段
        if (et_fields.length > 0) {
          this.emptyField(et_fields, fieldItem, infoTypeItem) // 清空字段的value
        }
        // 初始化树结构
        let treeList = [] // 树结构转换前的数组
        let treeData = [] // 树结构专用
        let treeMap = {}
        if (et_org.length > 0) {
          for (let i in et_org) {
            let obj = {
              id: "",
              parent: "",
              label: "",
              __uiNodeId: 1,
              disabled: "",
              value: "",
              leaf: false,
            }
            obj.id = et_org[i].OBJID + "-" + et_org[i].OTYPE
            obj.parent = !et_org[i].SOBID ? "#" : et_org[i].SOBID + "-" + et_org[i].SCLAS
            obj.label = et_org[i].STEXT + (et_org[i].HR_CJ ? "(" + et_org[i].HR_CJ + ")" : "")
            obj.value = et_org[i].OBJID + "-" + obj.label
            obj.label = obj.value
            obj.__uiNodeId = i
            obj.disabled = et_org[i].ZZSEL !== "X"
            obj.leaf = et_org[i].ZLEAF
            treeList.push(obj)
          }
          treeList.forEach((item) => {
            treeMap[item.id] = item
          })
          treeList.forEach((item) => {
            let parent = treeMap[item.parent]
            if (parent) {
              (parent.children || (parent.children = [])).push(item)
            } else {
              treeData.push(item)
            }
          })

          this.$set(fieldItem, "treeData", treeData)
        }
        return GonsiList
      })
    },
    /**
     * @Copyright  DELOITTE
     * @Description: Change事件，实现类似级联时功能
     * @date 2020年07月20日
     * @param event
     * @param value
     * @param field
     * @param infty
     * @param subty
     * @param ACGRP
     * @param ACBLK
     * @param fieldItem
     */
    change(event, value, field, infty, subty, ACGRP, ACBLK, fieldItem) {
      if (event !== "X") return
      this.buttonLoading = true
      let defValue = ""
      if (fieldItem.ZZSHM === "T") {
        defValue = JSON.stringify({ KEY: value.split("-")[0], VALUE: value.split("-")[1] })
      } else if (fieldItem.ZZSHM === "D") {
        defValue = JSON.stringify(value)
      } else if (fieldItem.FTYPE === "D") {
        const df = !isNaN(new Date(value).getTime()) ? new Date(value).Format("yyyyMMdd") : value
        defValue = this.$isEmpty(value) ? "" : df
      } else {
        defValue = value
      }
      let param = {
        sapInterface: "PE009",
        IV_PERNR: this.baseParams.employeeNum,
        IV_ZACTI: this.baseParams.zaction,
        IV_GUID: this.baseParams.GUID,
        IV_IPAGE: this.baseParams.MENUII,
        IV_DATA: JSON.stringify(this.getData()),
        IS_FIELD: JSON.stringify({
          ACGRP: ACGRP,
          ACBLK: ACBLK,
          INFTY: infty,
          SUBTY: subty,
          FIELD: field,
          ZZDEF: defValue,
        }),
      }
      this.$httpServer.sap.baseMethod(param).then((response) => {
        this.buttonLoading = false
        let jsonList = "", jsonInftyList = "",
          ES_MESSAGE = response.ES_MESSAGE
        if (ES_MESSAGE.MSGTY === "E") return
        if(response.EV_CONFIRM === "A") {
          this.$confirm(response.EV_TEXT, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/pa/xxcjksrz',
              query: {
                credentialsType: response.EV_ICTYP,
                credentialsNum: response.EV_ICNUM,
                MENUII:"PAXXCJ"
              }
            })
          }).catch(() => {});
        }
        jsonList = response.ET_FIELD
        jsonInftyList = response.ET_INFTY
        let groupList = this.groupList
        let sonGroup
        /**信息类型级联事件 start **/
        for (let i in jsonInftyList) {
          for (let j in groupList) {
            if (groupList[j].ACGRP === jsonInftyList[i].ACGRP) {
              sonGroup = groupList[j].ACBLK
              for (let k in sonGroup) {
                if (sonGroup[k].ACBLK === jsonInftyList[i].ACBLK) {
                  let inftyList = sonGroup[k].INFTY
                  for (let o in inftyList) {
                    if (
                      inftyList[o].INFTY === jsonInftyList[i].INFTY &&
                      inftyList[o].SUBTY === jsonInftyList[i].SUBTY
                    ) {
                      inftyList[o].ZZHID = jsonInftyList[i].ZZHID //是否隐藏
                      inftyList[o].ACTIO = jsonInftyList[i].ACTIO //多条数据的操作类型，控制按钮
                      inftyList[o].ZZREQ = jsonInftyList[i].ZZREQ //是否必填
                    }
                  }
                }
              }
            }
          }
        }
        /**信息类型级联事件 end **/

        /**字段级联事件start**/
        for (let i in jsonList) {
          for (let j in groupList) {
            if (groupList[j].ACGRP === jsonList[i].ACGRP) {
              sonGroup = groupList[j].ACBLK
              for (let k in sonGroup) {
                if (sonGroup[k].ACBLK === jsonList[i].ACBLK) {
                  let inftyList = sonGroup[k].INFTY
                  for (let o in inftyList) {
                    if (inftyList[o].INFTY === jsonList[i].INFTY && inftyList[o].SUBTY === jsonList[i].SUBTY) {
                      let fieldList = inftyList[o].ZZTAB === "X" ? inftyList[o].models[i] : inftyList[o].FIELD
                      for (let n in fieldList) {
                        try {
                          if (fieldList[n].FIELD === jsonList[i].FIELD) {
                            fieldList[n].ZZDIS = jsonList[i].ZZDIS //是否可输入
                            fieldList[n].ZZREQ = jsonList[i].ZZREQ //是否必填
                            fieldList[n].ZZHID = jsonList[i].ZZHID //是否隐藏

                            if (fieldList[n].ZZSHM === "T") {
                              if (!jsonList[i].ZZDEF) {
                                fieldList[n].value = ""
                              } else {
                                let obj = JSON.parse(jsonList[i].ZZDEF)
                                fieldList[n].value = obj.KEY + "-" + obj.VALUE
                              }
                            } else if (fieldList[n].ZZSHM === "D") {
                              if (!jsonList[i].ZZDEF) {
                                fieldList[n].value = ""
                                fieldList[n].valueList = []
                              } else {
                                let obj = JSON.parse(jsonList[i].ZZDEF)
                                fieldList[n].value = obj
                                fieldList[n].valueList = [] //清空原有选项
                                fieldList[n].valueList.push(JSON.parse(jsonList[i].ZZDEF))
                              }
                            } else if (fieldList[n].FTYPE === "D") {
                              fieldList[n].value =
                                jsonList[i].ZZDEF && jsonList[i].ZZDEF !== "00000000" ? jsonList[i].ZZDEF : ""
                            } else {
                              fieldList[n].value = jsonList[i].ZZDEF
                              fieldList[n].ZZBDS = new RegExp(jsonList[i].ZZBDS.replace(/\s/g, "")) //处理正则表达式
                            }
                          }
                        } catch (e) {
                          console.error(fieldList[n]["FIELN"], fieldList[n]["FIELD"], "String To JSON error", e)
                          return
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        /**字段级联事件 end**/
      })
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 数据校验
     * @date 2020年07月20日
     * @param infoGroupDetail   信息分组
     * @param infoTypeDetail    信息类型
     * @param fieldItem 字段
     */
    dataVerification(infoGroupDetail, infoTypeDetail, fieldItem) {
      //fieldKey 字段key
      let fieldKey = infoTypeDetail.INFTY + "_" + fieldItem.FIELD
      if (fieldItem.ZZBDS !== "" && fieldItem.value !== "") {
        //值不符合规则
        if (!fieldItem.ZZBDS.test(fieldItem.value)) {
          if (!fieldItem.isShowText) {
            this.verificationList.push({
              groupKey: infoGroupDetail.ACGRP,
              groupText: infoGroupDetail.ACGRN,
              infoTypeKey: infoTypeDetail.INFTY,
              infoTypeText: infoTypeDetail.INFTX,
              fieldKey: fieldKey,
              fieldText: fieldItem.FIELN,
            })
          }
          this.$set(fieldItem, "isShowText", true)
        } else {
          //符合规则
          if (fieldItem.isShowText) {
            let dataList = this.verificationList
            for (let i in dataList) {
              if (dataList[i]["fieldKey"] === fieldKey) {
                this.verificationList.splice(i, 1)
              }
            }
          }
          this.$set(fieldItem, "isShowText", false)
        }
      } else {
        if (fieldItem.isShowText) {
          let dataList = this.verificationList
          for (let i in dataList) {
            if (dataList[i]["fieldKey"] === fieldKey) {
              this.verificationList.splice(i, 1)
            }
          }
        }
        this.$set(fieldItem, "isShowText", false)
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 当前信息类型的value
     * @date 2020年07月20日
     * @param field
     * @param typeItem
     */
    getDataSearch(field, typeItem) {
      let iv_data = []
      let obj2 = {}
      let fields = []

      let model,
        f,
        df,
        b = false
      if (typeItem.ZZTAB === "X") {
        for (model of typeItem.models) {
          for (f of model) {
            if (f === field) {
              b = true
              fields = model
              break
            }
          }
          if (b) {
            break
          }
        }
      } else {
        fields = typeItem.FIELD
      }

      for (f of fields) {
        if (f.FTYPE === "D") {
          // 日期类型转换格式
          df = !isNaN(new Date(f.value).getTime()) ? new Date(f.value).Format("yyyyMMdd") : f.value
          obj2[f.FIELD] = this.$isEmpty(f.value) ? "" : df
        } else if (f.ZZSHM === "D" || f.ZZSHM === "Z" || f.ZZSHM === "B" || f.ZZSHM === "S") {
          //下拉列表转换格式
          obj2[f.FIELD] = (f.value || {}).KEY ? JSON.stringify(f.value) : ""
        } else if (f.ZZSHM === "T") {
          //树转换格式
          let values = f.value.split("-")
          if (f.value) {
            obj2[f.FIELD] = JSON.stringify({
              KEY: values[0],
              VALUE: values[values.length - 1],
            })
          } else {
            obj2[f.FIELD] = JSON.stringify({
              KEY: "",
              VALUE: "",
            })
          }
        } else {
          obj2[f.FIELD] = f.value || ""
        }
      }

      iv_data.push(obj2)
      return iv_data
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 清空字段的value
     * @date 2020年07月20日
     * @param emptyfields  需要清空value字段集合
     * @param field
     * @param typeItem
     */
    emptyField(emptyfields, field, typeItem) {
      if (emptyfields.length < 1) return

      let fields = []
      let model,
        f,
        ef,
        b = false
      if (typeItem.ZZTAB === "X") {
        for (model of typeItem.models) {
          for (f of model) {
            if (f === field) {
              b = true
              fields = model
              break
            }
          }
          if (b) {
            break
          }
        }
      } else {
        fields = typeItem.FIELD
      }

      for (f of fields) {
        for (ef of emptyfields) {
          if (f.FIELD === ef.FIELD) {
            //如果是树value = ""
            if (f.ZZSHM === "T") {
              this.$set(f, "value", "")
              this.$set(f, "orgList", [])
            } else {
              this.$set(f, "value", { KEY: "", VALUE: "" })
              this.$set(f, "valueList", [])
            }
          }
        }
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 树的选择回调
     * @date 2020年07月20日
     * @param nodeObject 节点对象
     * @param fieldItem 字段
     * @param infoTypeItem 信息类型
     * @param group 分组
     * @param sonGroup
     */
    selectNodeCallback(nodeObject, fieldItem, infoTypeItem, group, sonGroup) {
      fieldItem.treeData = []
      this.change(
        fieldItem.EVEN,
        fieldItem.value,
        fieldItem.FIELD,
        infoTypeItem.INFTY,
        infoTypeItem.SUBTY,
        group.ACGRP,
        sonGroup.ACBLK,
        fieldItem,
      )
    },
    /**
     * @Copyright  DELOITTE
     * @Description: Tree选中的文本
     * @update  22/04/2022
     * @param nodeData
     */
    customizedLabel(nodeData) {
      return nodeData.value
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 人员回调
     * @update  07/04/2022
     * @param data
     * @param fieldItem
     */
    employeeCallback(data, fieldItem) {
      fieldItem.value = {
        KEY: data.employeeNum,
        VALUE: data.employeeName + "(" + data.employeeNum + ")",
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 清空历史选中的人员
     * @update  07/04/2022
     * @param fieldItem
     */
    emptEmployeeValue(fieldItem) {
      fieldItem.value = { KEY: "", VALUE: "" }
    },
    /**
     * @Copyright  DELOITTE
     * @Description: 选择人员回调
     * @Date 2022年04月13日
     * @param nodeObject
     * @param fieldItem
     * @param infoTypeItem
     * @param group
     * @param sonGroup
     * @returns {*}
     */
    selectPaUserCallback(nodeObject, fieldItem, infoTypeItem, group, sonGroup) {
      fieldItem.value = nodeObject ? nodeObject.employeeNum : ""
      this.change(
        fieldItem.EVEN,
        fieldItem.value,
        fieldItem.FIELD,
        infoTypeItem.INFTY,
        infoTypeItem.SUBTY,
        group.ACGRP,
        sonGroup.ACBLK,
        fieldItem,
      )
    },
  },
}
</script>
