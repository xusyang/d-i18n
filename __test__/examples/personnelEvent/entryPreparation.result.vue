<template>
  <div
    v-loading.fullscreen="loading"
    :element-loading-text="I18N.$fanyi('加载中.....')"
  >
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <div class="ibox-content mt10" v-if="isEntry">
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div align="center" class="leave-avter">
            <img
              src="../../../assets/image/user_male_l.png"
              alt=""
              v-if="photo == ''"
              class="img-lg img-circle"
            />
            <img :src="photo" class="img-lg img-circle" v-else />
          </div>
        </el-col>
        <el-col :span="19">
          <el-form label-width="115px" size="mini">
            <el-row>
              <el-col class="el-col-sm-12" style="height: 35px">
                <el-form-item :label="I18N.$fanyi('员工姓名：')">
                  <strong>
                    {{ headerDataListStruce.params.ENAME }}
                  </strong>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12" style="height: 35px">
                <el-form-item :label="I18N.$fanyi('岗位：')">
                  <strong>
                    {{ headerDataListStruce.params.POS_STEXT }}
                  </strong>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12" style="height: 35px">
                <el-form-item :label="I18N.$fanyi('组织单位：')">
                  <strong>
                    {{ headerDataListStruce.params.ORG_STEXT }}
                  </strong>
                </el-form-item>
              </el-col>

              <el-col class="el-col-sm-12" style="height: 35px">
                <el-form-item :label="I18N.$fanyi('拟报到日期：')">
                  <strong>
                    {{ headerDataListStruce.params.BEGDA }}
                  </strong>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <div v-if="isEntry">
      <el-form size="mini" class="pa-form-tabs">
        <div class="ibox-content mt10" style="padding-top: 10px">
          <el-row
            style="text-align: right; margin-bottom: -27px; z-index: 1000"
          >
            <el-button
              v-if="isEntry === '2'"
              type="warning"
              size="mini"
              @click="saveEntry('B')"
              :loading="buttonLoading"
            >
              {{ I18N.$fanyi('保存') }}
            </el-button>
            <el-button
              v-if="isEntry === '2'"
              type="warning"
              size="mini"
              @click="saveEntry('T')"
              :loading="buttonLoading"
            >
              {{ I18N.$fanyi('提交') }}
            </el-button>
            <el-button size="mini" @click="backing()">
              {{ I18N.$fanyi('返回') }}
            </el-button>
          </el-row>
          <el-tabs v-model="headerDataListStruce.headerDataListStrucefirst">
            <el-tab-pane
              :label="I18N.$fanyi('基本信息')"
              :name="headerDataListStruce.headerDataListStrucefirst"
            >
              <div>
                <div class="main-content-box">
                  <h4 class="clearfix m-t-md">
                    <span class="li-bg-blue"></span>
                    {{ I18N.$fanyi('人事事件') }}
                  </h4>
                  <hr />
                  <div class="infoType-content-box">
                    <el-row>
                      <div>
                        <el-col :span="8">
                          <div style="padding-bottom: 2px">
                            <label style="font-size: 13px">
                              <span style="color: red"> * </span>
                              <span>
                                {{ I18N.$fanyi('入职日期：') }}
                              </span>
                            </label>
                          </div>
                          <el-form-item>
                            <el-date-picker
                              v-model="headerDataListStruce.params.BEGDA"
                              class="width90"
                              type="date"
                              :disabled="true"
                              value-format="yyyyMMdd"
                              :placeholder="I18N.$fanyi('请选择日期')"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </div>
                    </el-row>
                  </div>

                  <template
                    v-if="headerDataListStruce.params.ZROLETYPE == '03'"
                  >
                    <h4 class="clearfix m-t-md">
                      <span class="li-bg-blue"></span>
                      {{ I18N.$fanyi('办理事项') }}
                    </h4>
                    <hr />
                    <div class="infoType-content-box">
                      <el-row>
                        <div>
                          <el-col>
                            <el-form-item>
                              <el-checkbox-group
                                v-model="headerDataListStruce.checkList"
                              >
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZMECH"
                                >
                                  {{ I18N.$fanyi('办公工位') }}
                                </el-checkbox>
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZWORKCARD"
                                >
                                  {{ I18N.$fanyi('工卡') }}
                                </el-checkbox>
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZMECARD"
                                >
                                  {{ I18N.$fanyi('餐卡') }}
                                </el-checkbox>
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZLIFEART"
                                >
                                  {{ I18N.$fanyi('办公用品') }}
                                </el-checkbox>
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZDODEBS"
                                >
                                  {{ I18N.$fanyi('宿舍') }}
                                </el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>

                          <el-col>
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span style="color: red"> * </span>
                                <span>
                                  {{ I18N.$fanyi('是否准备完毕：') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-radio-group
                                v-model="headerDataListStruce.params.ZSTAT"
                              >
                                <el-radio :disabled="isEntry === '1'" label="1">
                                  {{ I18N.$fanyi('是') }}
                                </el-radio>
                                <el-radio :disabled="isEntry === '1'" label="2">
                                  {{ I18N.$fanyi('否') }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col>
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span>
                                  {{ I18N.$fanyi('备注说明：') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-input
                                :disabled="isEntry === '1'"
                                v-model="headerDataListStruce.params.ZREMARK"
                                maxlength="255"
                                type="textarea"
                                :rows="4"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </template>

                  <template
                    v-if="headerDataListStruce.params.ZROLETYPE == '02'"
                  >
                    <h4 class="clearfix m-t-md">
                      <span class="li-bg-blue"></span>
                      {{ I18N.$fanyi('办理事项') }}
                    </h4>
                    <hr />
                    <div class="infoType-content-box">
                      <el-row>
                        <div>
                          <el-col>
                            <el-form-item>
                              <el-checkbox-group
                                v-model="headerDataListStruce.checkList"
                              >
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZCOMPUTER"
                                >
                                  {{ I18N.$fanyi('电脑') }}
                                </el-checkbox>
                                <el-checkbox
                                  :disabled="isEntry === '1'"
                                  label="ZSOFT_INSTALL"
                                >
                                  {{ I18N.$fanyi('软件安装') }}
                                </el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                          <el-col>
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span style="color: red"> * </span>
                                <span>
                                  {{ I18N.$fanyi('是否准备完毕：') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-radio-group
                                v-model="headerDataListStruce.params.ZSTAT"
                              >
                                <el-radio :disabled="isEntry === '1'" label="1">
                                  {{ I18N.$fanyi('是') }}
                                </el-radio>
                                <el-radio :disabled="isEntry === '1'" label="2">
                                  {{ I18N.$fanyi('否') }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col>
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span>
                                  {{ I18N.$fanyi('备注说明：') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-input
                                :disabled="isEntry === '1'"
                                v-model="headerDataListStruce.params.ZREMARK"
                                maxlength="255"
                                type="textarea"
                                :rows="4"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </div>
                      </el-row>
                    </div>

                    <h4 class="clearfix m-t-md">
                      <span class="li-bg-blue"></span>
                      {{ I18N.$fanyi('候选人信息') }}
                    </h4>
                    <hr />
                    <div class="infoType-content-box">
                      <el-row :gutter="24">
                        <div>
                          <el-col :md="6">
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span>
                                  {{ I18N.$fanyi('姓名') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-input
                                :disabled="true"
                                v-model="headerDataListStruce.params.ENAME"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :md="6">
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span>
                                  {{ I18N.$fanyi('联系方式') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-input
                                :disabled="true"
                                v-model="headerDataListStruce.params.ZPHONE"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :md="6">
                            <div style="padding-bottom: 2px">
                              <label style="font-size: 13px">
                                <span>
                                  {{ I18N.$fanyi('个人邮箱') }}
                                </span>
                              </label>
                            </div>
                            <el-form-item>
                              <el-input
                                :disabled="true"
                                v-model="headerDataListStruce.params.ZEMAIL_PER"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </template>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'entryPreparation',

  data() {
    return {
      loading: false,
      buttonLoading: false,
      photo: '',
      baseParams: {},
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO),
      isEntry: false,
      BCOptions: [],
      headerDataListStruce: {
        params: {},
        checkList: [],
        ZLITT_TEC_OBJ: {
          value: {
            KEY: '',
            VALUE: ''
          }
        },
        headerDataListStrucefirst: 'headerDataListStrucefirst'
      }
    }
  },

  watch: {
    headerDataListStruce: {
      // 监听的对象
      deep: true,

      // 深度监听设置为 true
      handler: function (newV, oldV) {
        if (newV.ZLITT_TEC_OBJ.value.KEY && newV.ZLITT_TEC_OBJ.value.VALUE) {
          // 人员工号
          newV.params.PERNR = newV.ZLITT_TEC_OBJ.value.KEY //人员名称

          newV.params.ZLITT_TEC = newV.ZLITT_TEC_OBJ.value.VALUE
        }
      }
    }
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 入职提交
     * @Date: 2021-04-26 16:30:19
     * @LastEditTime: Do not edit
     * @param {*} type
     */
    saveEntry(type) {
      this.loading = true

      if (type) {
        // 提交
        this.loading = false //选择否的情况默认为保存不提交

        if (this.headerDataListStruce.params.ZSTAT === '2') {
          type = 'B'
        }

        this.getEntryreadyData(type)
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 返回 通过pageCode 判断返回到哪里
     * @date 2020年07月20日
     * @update  [序号][日期YYYY-MM-DD][公司-更改人姓名][变更描述]
     * @returns {*}
     */
    backing() {
      let pageCode = this.baseParams.MENUII
      let params = {
        MENUII: pageCode
      }
      let backing

      if (this.baseParams.backingQueryParams) {
        params.backingQueryParams = this.baseParams.backingQueryParams
        backing = JSON.parse(this.baseParams.backingQueryParams)
      }

      if (
        pageCode === this.pageCode.YGZZ ||
        ((pageCode === this.pageCode.LYGL ||
          pageCode === this.pageCode.YRZGL ||
          pageCode === this.pageCode.PAZZGL ||
          pageCode === this.pageCode.PARZGL) &&
          this.$isEmpty(this.baseParams.backingQueryParams)) ||
        (backing && backing.back === 'history')
      ) {
        window.history.back()
      } else if (pageCode === this.pageCode.WYLZ) {
        this.$router.push({
          path: '/blocHome'
        })
      } else if (
        pageCode === this.pageCode.OFGL ||
        pageCode === this.pageCode.RCKGL
      ) {
        this.$router.push({
          path: '/rc/event/',
          query: params
        })
      } else if (pageCode === this.pageCode.PAHTGL) {
        this.$router.push({
          path: '/ht/event/',
          query: params
        })
      } else {
        this.$router.push({
          path: '/pa/event/',
          query: params
        })
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 员工查询 (抬头数据)
     * @date 2020年07月20日
     * @update  [序号][日期YYYY-MM-DD][公司-更改人姓名][变更描述]
     *
     * @param obj
     */
    getEmployeeData(obj) {
      this.photo = ''
      this.baseParams.employeeName = obj.employeeName
      this.baseParams.employeeNum = obj.employeeNum
      this.getPersonnelBaseData()
      this.initFunction(obj.employeeNum)
    },

    /**
     * @Copyright DELOITTE
     * @description 清空历史选中的人员 （抬头数据）
     * @param fieldItem
     */
    emptValue() {
      this.baseParams.employeeName = ''
      this.baseParams.employeeNum = ''
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取抬头信息 ZFM_DHR_GET_HEAD_DATA
     * @date 2020年07月20日
     * @update  [序号][日期YYYY-MM-DD][公司-更改人姓名][变更描述]
     */
    getPersonnelBaseData() {
      let param = {
        sapInterface: 'PA007',
        IV_USER: '',

        // 登录人员编号
        IV_PERNR: this.baseParams.employeeNum,
        IV_IPAGE: this.baseParams.MENUII,
        IV_DATUM: new Date().Format('yyyyMMdd')
      }
      this.$httpServer.sap.baseMethod(param).then((response) => {
        this.headerDataList = response.ET_DATA
        this.photo = response.EV_PHOTO

        if (this.photo !== '') {
          this.photo = 'data:image/png;base64,' + this.photo
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 人员回调
     * @date 2020年07月20日
     * @update  [序号][日期YYYY-MM-DD][公司-更改人姓名][变更描述]
     *
     * @param data
     * @param fieldItem
     */
    employeeCallback(data, fieldItem) {
      let obj = {
        KEY: data.employeeNum,
        VALUE: data.employeeName + '(' + data.employeeNum + ')'
      }
      this.$set(fieldItem, 'value', obj)
    },

    /**
     * @Copyright DELOITTE
     * @Description: 清空历史选中的人员
     * @update  07/04/2022
     * @returns {*}
     */
    emptEmployeeValue(fieldItem) {
      let obj = {
        KEY: '',
        VALUE: ''
      }
      this.$set(fieldItem, 'value', obj)
    },

    /**
     * @Copyright DELOITTE
     * @Description: 初始化函数
     * @date 2020年07月20日
     * @update  [序号][日期YYYY-MM-DD][公司-更改人姓名][变更描述]
     * @returns {*}
     */
    initFunction() {
      // start==========清空上一个表单的主要信息
      this.baseParams.STAT = ''
      this.baseParams.GUID = '' //end============清空上一个表单的主要信息

      if (this.$route.query) {
        // base64解密
        let baseParams = this.$route.query //新建获取按钮的时候用到

        baseParams.EV_FUNC = baseParams.FUNC
        baseParams.ICNUM = baseParams.ICNUM
          ? Base64.decode(baseParams.ICNUM)
          : ''
        this.baseParams = baseParams //是否是入职

        this.isEntry = baseParams.isEntry

        if (this.isEntry) {
          this.getEntryreadyData()
        }
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取班次下拉
     * @update  11/04/2022
     * @returns {*}
     */
    getBCOptions(ZBASE) {
      const params = {
        sapInterface: 'PA054',
        IV_DATUM: new Date().Format('yyyyMMdd'),
        IT_SHH_CONDITION: JSON.stringify([
          {
            FIELD: 'ZBASE',
            VALUE: ZBASE
          }
        ])
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        this.BCOptions = response.ET_SHH_DATA
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 入职准备数据
     * @Date: 2021-04-26 09:29:09
     * @LastEditTime: Do not edit
     * @param {*} LV_BUTTON 接口模式
     */
    getEntryreadyData(LV_BUTTON) {
      let params = {
        sapInterface: 'PE067',
        IV_GUID: this.baseParams.GUID,
        IV_USER: this.currentUserInfo.PERNR,
        IV_IPAGE: this.baseParams.MENUII,
        LV_BUTTON: LV_BUTTON || 'C' //默认提交T 保存B 查询进入C
      }

      if (params.LV_BUTTON !== 'C') {
        let ES_STRUCE = {
          ES_STRUCE: this.headerDataListStruce.params
        } //转checkList

        let checkObj = {
          ZMECH: '',
          ZWORKCARD: '',
          ZMECARD: '',
          ZLIFEART: '',
          ZDODEBS: '',
          ZSOFT_INSTALL: '',
          ZCOMPUTER: ''
        }

        for (let i in this.headerDataListStruce.checkList)
          checkObj[this.headerDataListStruce.checkList[i]] = 'X'

        Object.assign(ES_STRUCE.ES_STRUCE, checkObj)
        Object.assign(params, ES_STRUCE) //删除入职日期

        delete this.headerDataListStruce.params.BEGDA
      }

      this.loading = true
      this.$httpServer.sap
        .baseMethod(params, null, true)
        .then((response) => {
          this.loading = false
          let et_struce = response.ES_STRUCE //消息文本

          let message = response.E_MESSAGE //消息类型S成功 E错误 W警告 I消息 A中

          let et_type = response.E_TYPE

          if (et_type !== 'S' && et_type) {
            if (message) this.$message.error(message)
            return
          }

          if (message) this.$message.success(message) //判断提交成功后返回列表

          if (params.LV_BUTTON === 'T') this.backing() //判断ZSTAT是否为0空值 0为默认值手动改1是

          if (et_struce.ZSTAT === '0') et_struce.ZSTAT = '1' //展示个人信息

          this.headerDataListStruce.params = et_struce

          if (et_struce.ZROLETYPE === '03') {
            this.getBCOptions(et_struce.ZBASE)
          } //回显小师傅数据结构 headerDataListStruce.ZLITT_TEC_OBJ - 不确定是否需要

          if (!et_struce.PERNR && et_struce.PERNR !== '00000000') {
            this.employeeCallback(
              {
                employeeNum: et_struce.PERNR,
                employeeName: et_struce.ZLITT_TEC
              },
              this.headerDataListStruce.ZLITT_TEC_OBJ
            )
          } //日期格式化

          if (this.headerDataListStruce.params.BEGDA) {
            this.headerDataListStruce.params.BEGDA =
              this.headerDataListStruce.params.BEGDA.replace(
                /^(\d{4})(\d{2})(\d{2})$/,
                '$1-$2-$3'
              )
          } //复选数据

          let {
            ZMECH,
            ZOFF_SUP,
            ZWORKCARD,
            ZMECARD,
            ZLIFEART,
            ZDODEBS,
            ZSOFT_INSTALL,
            ZCOMPUTER
          } = et_struce
          let checkListObj = {
            ZMECH,
            ZOFF_SUP,
            ZWORKCARD,
            ZMECARD,
            ZLIFEART,
            ZDODEBS,
            ZSOFT_INSTALL,
            ZCOMPUTER
          }
          let checkList = []

          for (let i in checkListObj)
            if (checkListObj[i] === 'X') checkList.push(i) //复选框值

          this.headerDataListStruce.checkList = checkList
        })
        .catch((error) => {
          this.loading = false
        })
    }
  },

  mounted() {
    this.initFunction()
  }
}
</script>

<style scoped>
h4 {
  font-size: larger;
  display: flex;
  align-items: center;
}

.infoType-content-box {
  padding: 5px 10px 5px 10px;
}

.width90 {
  width: 90%;
  min-width: 90%;
  max-width: 90%;
}

.width95 {
  width: 95%;
  min-width: 95%;
  max-width: 95%;
}

.width97-5 {
  width: 97.5%;
  min-width: 97.5%;
  max-width: 97.5%;
}

.width97 {
  width: 97%;
  min-width: 97%;
  max-width: 97%;
}

.width98-5 {
  width: 98.5%;
  min-width: 98.5%;
  max-width: 98.5%;
}

.add-button-event-box {
  padding-bottom: 5px;
  text-align: right;
  width: 97.5%;
}

.add-button-event-box .el-button--mini,
.el-button--mini.is-round {
  padding: 5px 10px;
}

.file-item-border-box {
  background-color: #fbfdff;
  border: 1px dashed #9e9e9efc;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 170px;
  vertical-align: top;
  margin: 10px;
  padding: 5px;
  /*max-width: 18%;
        min-width: 18%;*/
  width: 212px;
  max-width: 212px;
  min-width: 212px;
}

.upload-file-img-box {
  text-align: center;
  padding-top: 12px;
}

.upload-file-img-box img {
  height: 30px;
}

.file-down-box {
  color: #709dea;
  padding: 2px;
  cursor: pointer;
}

.pa-file-text {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-down-operation-box {
  color: #709dea;
  padding: 2px;
  cursor: pointer;
}

.file-down-operation-box .el-icon-bottom {
  padding-left: 2px;
  padding-right: 3px;
  font-weight: bold;
}

.file-down-operation-box .el-icon-delete-solid {
  color: #ff0000;
  font-weight: bold;
}

.delete-span {
  text-align: right;
  margin-left: 202px;
  /*margin-top: -14px;*/
}

.pa-model-tree {
  width: 90%;
  top: 29px;
  left: 0px;
  z-index: 1000;
  border-radius: 4px;
  border: 1px solid #ececec;
  background-color: #fff;
  position: absolute;
  overflow: auto;
  max-height: 300px;
}

.infoType-content-box .field-height {
  height: 66px;
}

/deep/ .pa-form-tabs .el-tabs__content {
  overflow: visible !important;
}

.opacity5 {
  opacity: 0.5;
}
</style>
