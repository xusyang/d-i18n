<template>
  <div>
    <el-row>
      <el-form
        size="mini"
        ref="queryForm"
        label-width="125px"
        :model="pageData"
      >
        <div class="">
          <div v-if="parentData.proveId === '40'">
            <el-col class="el-col-sm-24">
              <el-form-item
                label="户口迁入地公安局"
                prop="psb"
                :class="{
                  'has-input-error': isValidationActive && !pageData.psb
                }"
              >
                <el-input
                  v-model="pageData.psb"
                  name="psb"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-24">
              <el-form-item
                label="详细地址"
                prop="detailAddress"
                :class="{
                  'has-input-error':
                    isValidationActive && !pageData.detailAddress
                }"
              >
                <el-input
                  v-model="pageData.detailAddress"
                  name="detailAddress"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </div>

          <div v-if="parentData.proveId === '99'">
            <el-col class="el-col-md-17 mr10">
              <el-form-item label="文件路径" label-width="100px">
                <el-input
                  type="text"
                  size="mini"
                  disabled
                  style="width: 100%"
                  v-model="filename"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-md-4">
              <el-upload
                :action="
                  $VUE_BASE + 'dhrDownloadService/utility/file/dfs/upload'
                "
                class="avatar-uploader"
                :on-success=";(response, file) => handleSuccess(response, file)
"
                :before-upload=";(file) => handleBefore(file)
"
                :on-error=";(err, file) => handleError(err, file)
"
                :show-file-list="false"
                multiple
                :with-credentials="true"
                name="file"
              >
                <el-button size="mini" type="success" :loading="loading">
                  上传自定义证明
                </el-button>
              </el-upload>
            </el-col>
          </div>

          <div
            v-if="parentData.proveId === '12' || parentData.proveId === '14'"
            class="text-center"
          >
            <el-col class="el-col-sm-17">
              <el-form-item label="旅游国家" label-width="100px">
                <el-input
                  type="text"
                  size="mini"
                  style="width: 100%"
                  v-model="pageData.gj"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-md-17">
              <el-form-item label="旅游开始日期" label-width="100px">
                <el-date-picker
                  v-model="pageData.begda"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  size="mini"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="el-col-md-17">
              <el-form-item label="旅游返程日期" label-width="100px">
                <el-date-picker
                  v-model="pageData.endda"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  size="mini"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </div>

          <el-col
            class="el-col-sm-24 text-center"
            v-if="parentData.proveId === '99'"
          >
            <el-button
              type="info"
              size="mini"
              :loading="loading"
              @click="customProveOperation('Y')"
            >
              预览
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :loading="loading"
              @click="customProveOperation('T')"
              v-if="parentData.MENUII === pageCode.ZMKJ"
            >
              提交
            </el-button>
            <el-button
              type="warning"
              size="mini"
              :loading="loading"
              v-if="parentData.MENUII === pageCode.ZMGL"
              @click="customProveOperation('D')"
            >
              下载打印
            </el-button>
            <el-button
              type="danger"
              size="mini"
              :loading="loading"
              @click="closeDialog"
            >
              关闭
            </el-button>
          </el-col>
          <el-col class="el-col-sm-24 text-center" v-else>
            <el-button
              type="info"
              size="mini"
              :loading="loading"
              @click="submit('Y')"
            >
              预览
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :loading="loading"
              @click="submit('T')"
              v-if="parentData.MENUII === pageCode.ZMKJ"
            >
              提交
            </el-button>
            <el-button
              type="warning"
              size="mini"
              :loading="loading"
              v-if="parentData.MENUII === pageCode.ZMGL"
              @click="submit('D')"
            >
              下载打印
            </el-button>
            <el-button
              type="danger"
              size="mini"
              :loading="loading"
              @click="closeDialog"
            >
              关闭
            </el-button>
          </el-col>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'proveApplication',
  components: {},
  props: {
    parentData: {
      type: Object
    }
  },

  data() {
    return {
      pageData: {
        begda: '',
        endda: '',
        gj: ''
      },
      filename: '',
      loading: false,
      isValidationActive: false,
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO),
      customProveFile: {}
    }
  },

  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: closeDialog
     * @update  11/04/2022
     * @param state 标识
     * @returns {*}
     */
    closeDialog(state) {
      this.$emit('closeDialog', state)
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  提交
     * @date 2020年07月20日
     * @param state 提交标识
     * @returns {*}
     */
    submit(state) {
      this.isValidationActive = true

      // 迁出证明需要验证必填项  【40表示为迁出证明】

      if (
        this.parentData.proveId === '40' &&
        (!this.pageData.psb || !this.pageData.detailAddress)
      )
        return
      let req = {
        sapInterface: 'SH031',
        IV_PERNR:
          this.parentData.MENUII === this.pageCode.ZMKJ
            ? this.currentUserInfo.PERNR
            : this.parentData.employeeNum,
        IV_ZMLXBM: this.parentData.proveId,
        IV_IPAGE: this.parentData.MENUII,
        IV_USER: ''
      }
      this.$httpServer.sap.baseMethod(req).then((response) => {
        let respData = response.ES_OUTPUT
        let msgData = response.ES_MESSAGE

        if (msgData.MSGTY === 'S') {
          let params = {}
          let wordData = {}

          // 增加默认取值（因为大部分的模版的字段都是一样的）	20201105 hwj

          wordData.NAME = respData.ENAME

          // 姓名

          wordData.ZJHM = respData.ICNUM

          // 身份证号码

          wordData.KSN = this.subStringDate(respData.BEGDA, 'Y')

          // 开始年

          wordData.KSY = this.subStringDate(respData.BEGDA, 'M')

          // 开始月

          wordData.KSR = this.subStringDate(respData.BEGDA, 'D')

          // 开始日

          wordData.PLANS = respData.PLANS

          // 职位

          wordData.ZRZBM = respData.ZRZBM

          // 部门

          wordData.LKBM = respData.ZLKBM

          // 落款部门

          wordData.NSR = respData.ZNX

          // 年薪

          wordData.YSR = respData.ZYX

          // 月薪

          wordData.ZMRQ = this.strDateToChineseDate(
            new Date().Format('yyyy-MM-dd')
          )

          // 证明日期

          wordData.FILEDATE = new Date().Format('yyyy-MM-dd')
          // fileDate

          // 保留BK=SP

          wordData.COMPANY = respData.WERKS_T

          // 公司

          if (this.parentData.proveId === '11') {
            // 在职证明-公司抬头纸模版
            wordData.NAME = respData.ENAME

            // 姓名

            wordData.ZJHM = respData.ICNUM

            // 身份证号码

            wordData.KSN = this.subStringDate(respData.BEGDA, 'Y')

            // 开始年

            wordData.KSY = this.subStringDate(respData.BEGDA, 'M')

            // 开始月

            wordData.PLANS = respData.PLANS

            // 职位

            wordData.NSR = respData.ZYX

            // 月薪

            wordData.ZRZBM = respData.ZLKBM

            // 部门

            wordData.ZMRQ = this.strDateToChineseDate(
              new Date().Format('yyyy-MM-dd')
            )

            // 证明日期

            params.templateName = 'zzzm_sp.ftl'
            params.wordName =
              '在职证明' + '_' + wordData.NAME + '_' + wordData.FILEDATE
            params.wordParams = wordData
          } else if (this.parentData.proveId === '12') {
            // 在职证明-出国旅游
            wordData.NAME = respData.ENAME

            // 姓名

            wordData.ZJHM = respData.ICNUM

            // 身份证号码

            wordData.KSN = this.subStringDate(respData.BEGDA, 'Y')

            // 开始年

            wordData.KSY = this.subStringDate(respData.BEGDA, 'M')

            // 开始月

            wordData.PLANS = respData.PLANS

            // 职位

            wordData.NSR = respData.ZYX

            // 月薪

            wordData.BEGDA = this.$moment(this.pageData.begda).format(
              'YYYY/MM/DD'
            )

            // 旅游开始日期

            wordData.ENDDA = this.$moment(this.pageData.endda).format(
              'YYYY/MM/DD'
            )

            // 旅游结束日期

            wordData.GJ = this.pageData.gj

            // 国家

            wordData.ZMRQ = this.strDateToChineseDate(
              new Date().Format('yyyy-MM-dd')
            )

            // 证明日期

            params.templateName = 'zzzm_cgly_sp.ftl'
            params.wordName =
              '在职证明-出国旅游' +
              '_' +
              wordData.NAME +
              '_' +
              wordData.FILEDATE
            params.wordParams = wordData
          } else if (this.parentData.proveId === '13') {
            // 收入证明-公司抬头纸模版
            wordData.NAME = respData.ENAME

            // 姓名

            wordData.ZJHM = respData.ICNUM

            // 身份证号码

            wordData.KSN = this.subStringDate(respData.BEGDA, 'Y')

            // 开始年

            wordData.KSY = this.subStringDate(respData.BEGDA, 'M')

            // 开始月

            wordData.PLANS = respData.PLANS

            // 职位

            wordData.ZRZBM = respData.ZLKBM

            // 部门

            wordData.NSR = respData.ZYX

            // 月薪

            wordData.ZBZ = respData.ZBZMC

            // 币种

            wordData.ZMRQ = this.strDateToChineseDate(
              new Date().Format('yyyy-MM-dd')
            )

            // 证明日期

            params.templateName = 'srzm_sp.ftl'
            params.wordName =
              '收入证明' + '_' + wordData.NAME + '_' + wordData.FILEDATE
            params.wordParams = wordData
          } else if (this.parentData.proveId === '14') {
            // 出入国境证明
            wordData.ENAME = respData.ENAME

            // 姓名

            wordData.ZJHM = respData.ICNUM

            // 身份证号码

            wordData.BEGDA = this.$isEmpty(respData.BEGDA)
              ? ''
              : new Date(
                  respData.BEGDA.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
                ).Format('yyyy/MM/dd')
            wordData.ZNX = respData.ZNX_YEAR

            // 年薪

            wordData.PLANS = respData.PLANS

            // 职位

            wordData.GJ = this.pageData.gj

            // 国家

            wordData.KSRQ = this.$isEmpty(this.pageData.begda)
              ? ''
              : new Date(this.pageData.begda).Format('yyyy/MM/dd')

            // 开始日期

            wordData.JSRQ = this.$isEmpty(this.pageData.endda)
              ? ''
              : new Date(this.pageData.endda).Format('yyyy/MM/dd')

            // 结束日期

            params.templateName = 'cglyzm_sp.ftl'
            params.wordName =
              'Letter of Guarantee_' + wordData.NAME + '_' + wordData.FILEDATE
            params.wordParams = wordData
          }

          if (!this.$isEmpty(params)) {
            if (state === 'T') {
              this.$confirm(
                '是否确定提交' + params.wordName + '开具申请？',
                '提示',
                {
                  type: 'warning',
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  confirmButtonClass: 'confirmButtonClass',
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal: false,
                  center: true
                }
              ).then(() => this.generateProve(params, state))
            } else if (state === 'D') {
              let tips = '是否确定下载打印' + params.wordName + '开具申请？'
              this.$confirm(tips, '提示', {
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmButtonClass',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: false,
                center: true
              }).then(() => this.generateProve(params, state))
            } else {
              this.generateProve(params, state)
            }
          } else {
            this.$message.warning('没有获取到对应的证明模版')
            console.info('没有获取到对应的证明模版......')
          }
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  截取日期字符串
     * @date 2020年07月20日
     * @param strDate
     * @param state
     * @returns {string}
     */
    subStringDate(strDate, state) {
      let value = ''

      if (state && strDate && strDate.length >= 8 && strDate !== '00000000') {
        switch (state) {
          case 'Y':
            // 年
            value = strDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1')
            break

          case 'M':
            // 月
            value = strDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$2')
            break

          case 'D':
            // 日
            value = strDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$3')
            break

          default:
            break
        }
      }

      return value
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  生成证明
     * @date 2020年07月20日
     * @param params 生成证明所需要的参数
     * @param state 提交标识【Y ==》预览  T ==》提交  D ==》下载打印】
     */
    generateProve(params, state) {
      this.$httpServer.base.generateProve(params).then((res) => {
        let result = res.data

        if (state === 'Y') {
          this.$previewFile(result.id, result.name)
        } else if (state === 'T' || state === 'D') {
          this.submitProve(result.id, result.name, state)
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  提交证明更新数据 ，交通板块提交后需要发起流程
     * @date 2020年07月20日
     * @param fileId
     * @param fileName
     * @param state 提交标识【Y ==》预览  T ==》提交  D ==》下载打印】
     */
    submitProve(fileId, fileName, state) {
      let params = {
        sapInterface: 'SH032',
        IV_GUID: '',
        IV_PERNR:
          this.parentData.MENUII === this.pageCode.ZMKJ
            ? this.currentUserInfo.PERNR
            : this.parentData.employeeNum,
        IV_ZMLXBM: this.parentData.proveId,
        IV_STATS: state === 'D' ? '1' : '0',
        IV_FILEID: fileId,
        IV_FILENAME: fileName,
        IV_IPAGE: this.parentData.MENUII,
        IV_USER: ''
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let es_message = response.ES_MESSAGE
        let ev_action = response.EV_ACTION
        let ev_guid = response.EV_GUID
        let ev_title = response.EV_TITLE
        let e_zwfno = response.E_ZWFNO

        if (es_message.MSGTY === 'S') {
          this.$message.success(es_message.MSGTX)

          // 关闭弹框

          this.closeDialog('Q')
          // 发起流程

          // 增加板块的流程

          // 后判断，只有板块的不需要发起流程

          if (ev_action === 'K') {
            this.$startWorkFlow({
              guid: ev_guid,
              processType: e_zwfno,
              workflowSubject: ev_title
            })
          }
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  字符串日期转中文日期
     * @date 2020年07月20日
     * @param strDate 日期字符串（2020-09-29） 或8位数字（'20200929'）
     */
    strDateToChineseDate(strDate) {
      let chinese = [
        '〇',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十'
      ]
      let numStr = strDate.replace(/\D+/g, '')
      let year =
        chinese[numStr[0]] +
        chinese[numStr[1]] +
        chinese[numStr[2]] +
        chinese[numStr[3]]
      const chStr =
        numStr[5] === '0' ? chinese[10] : chinese[10] + chinese[numStr[5]]
      let month = numStr[4] === '0' ? chinese[numStr[5]] : chStr
      let nDay = ''

      if (numStr[6] === '0') {
        nDay = chinese[numStr[7]]
      } else if (numStr[6] === '1') {
        if (numStr[7] === '0') {
          nDay = chinese[10]
        } else {
          nDay = chinese[10] + chinese[numStr[7]]
        }
      } else if (numStr[6] === '2' || numStr[6] === '3') {
        if (numStr[7] === '0') {
          nDay = chinese[numStr[6]] + chinese[10]
        } else {
          nDay = chinese[numStr[6]] + chinese[10] + chinese[numStr[7]]
        }
      }

      return year + ' 年 ' + month + ' 月 ' + nDay + ' 日 '
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传成功钩子函数
     * @date 2020年07月20日
     * @param response
     * @param file
     * @returns {[]}
     */
    handleSuccess(response, file) {
      this.loading = false
      this.customProveFile = {}

      if (response.status === 'success') {
        this.filename = file.name
        this.customProveFile = response
        this.$message.success('上传' + '【' + file.name + '】' + '成功')
      } else {
        this.$message.error('上传文件错误，请重新上传')
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传前的钩子函数
     * @date 2020年07月20日
     * @param file
     * @returns {ElMessageComponent}
     */
    handleBefore(file) {
      let fileType = ['doc', 'docx']
      let postf = file.name.substring(file.name.lastIndexOf('.') + 1)

      if (fileType.indexOf(postf.toLowerCase()) === -1) {
        this.$message.warning('请选择正确的文件类型，如' + '：.doc, .docx')
        return false
      }

      // 不能大于10M

      if (file.size > 10485760) {
        this.$message.warning('证明不能大于10M')
        return false
      }

      this.loading = true
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传失败的钩子函数
     * @date 2020年07月20日
     * @param error
     * @param file
     */
    handleError(error, file) {
      this.loading = false
      this.$message.error('上传' + file.name + '出现错误，请重新上传')
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 自定义证明操作
     * @date 2020年07月20日
     * @param state Y=>预览，T=>提交，D=>下载
     */
    customProveOperation(state) {
      if (
        !this.$isEmpty(this.customProveFile) &&
        JSON.stringify(this.customProveFile) !== '{}'
      ) {
        if (state === 'Y') {
          this.$previewFile(this.customProveFile.id, this.customProveFile.name)
        } else if (state === 'T' || state === 'D') {
          if (state === 'T') {
            this.$confirm(
              '是否确定提交' + this.parentData.proveText + '开具申请？',
              '提示',
              {
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmButtonClass',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: false,
                center: true
              }
            ).then(() => {
              // 提交证明更改状态
              this.submitProve(
                this.customProveFile.id,
                this.customProveFile.name,
                state
              )
            })
          } else if (state === 'D') {
            this.$confirm(
              '是否确定下载打印' + this.parentData.proveText + '开具申请？',
              '提示',
              {
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmButtonClass',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: false,
                center: true
              }
            ).then(() => {
              // 提交证明更改状态
              this.submitProve(
                this.customProveFile.id,
                this.customProveFile.name,
                state
              )
            })
          }
        } else {
          this.$message.warning('请先上传自定义证明！')
        }
      } else {
        this.$message.warning('请上传证明文件！')
      }
    }
  }
}
</script>
