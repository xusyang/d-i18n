<template>
  <div v-loading.fullscreen="loading" element-loading-text="加载中.....">
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <div class="ibox-content mt10 contract-box">
      <el-form
        size="mini"
        :model="pageForm"
        ref="pageForm"
        :rules="rules"
        label-width="200px"
        label-position="top"
      >
        <el-row style="margin-bottom: -25px; z-index: 1000">
          <el-col class="fr text-right el-col-sm-12">
            <el-button
              size="mini"
              type="primary"
              @click="submitContract('0')"
              v-if="baseParams.STAT === '0' || baseParams.STAT === 'Z'"
            >
              保存
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="getPdf('0')"
              v-if="baseParams.STAT === '0' || baseParams.STAT === 'Z'"
            >
              预览
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="getPdf('A')"
              v-if="baseParams.STAT === '0' || baseParams.STAT === 'Z'"
            >
              提交
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="viewContract(baseParams.ZVIEWURL)"
              v-if="baseParams.STAT === 'B'"
            >
              查看合同
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="getContract"
              v-if="baseParams.STAT === '5' || baseParams.STAT === 'C'"
            >
              下载合同
            </el-button>
            <el-button size="mini" @click="backing()"> 返回 </el-button>
          </el-col>
        </el-row>
        <div class="contract-field-heigth">
          <div class="">
            <h4><span class="li-bg-blue"></span> 劳动合同模版</h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZLDHTMB" label="劳动合同模版">
                <el-select
                  v-model="pageForm.ZLDHTMB"
                  :disabled="isEdit"
                  class="width90p"
                >
                  <el-option
                    v-for="(item, index) in ZLDHTMBList"
                    :value="item.ZHR_HTMBID"
                    :key="index"
                    :label="item.ZHR_HTMBMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="">
            <h4>
              <span class="li-bg-blue"></span>
              甲方（公司注册信息)
            </h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZZXYDM" label="用人单位名称">
                <el-select
                  v-model="pageForm.ZZXYDM"
                  filterable
                  :disabled="isEdit"
                  @change="getQYXX(pageForm.ZZXYDM)"
                  class="width90p"
                >
                  <el-option
                    v-for="(item, index) in ZZHTQDDWData"
                    :value="item.code"
                    :key="index"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZFR_NAME" label="法定代表人（主要负责人）">
                <el-input
                  v-model="pageForm.ZFR_NAME"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZQYJJLX" label="企业经济类型">
                <search-help
                  funccode="HT005"
                  :code.sync="pageForm.ZQYJJLX"
                  :text="pageForm.ZQYJJLX_T"
                  :disabled="isEdit"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZTXDZ_DW" label="通讯地址">
                <el-input
                  v-model="pageForm.ZTXDZ_DW"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZLXR" label="联系人">
                <pa-search-user
                  ref="paSearchUser"
                  :ipage="baseParams.MENUII"
                  @getEmployeeData="getEmployeeData"
                  :style="{ width: '90%' }"
                  :defaultValue="pageForm.ZLXR_NAME"
                  @emptValue="emptValue"
                  :disabled="isEdit"
                ></pa-search-user>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZPHONE_DW" label="电话号码">
                <el-input
                  v-model="pageForm.ZPHONE_DW"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZGZR" label="用章人">
                <pa-search-user
                  ref="paSearchUser"
                  :ipage="baseParams.MENUII"
                  @getEmployeeData="getEmployeeDataYZR"
                  :style="{ width: '90%' }"
                  :defaultValue="pageForm.ZGZR_NAME"
                  @emptValue="emptValueYZR"
                  :disabled="isEdit"
                ></pa-search-user>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="">
            <h4>
              <span class="li-bg-blue"></span>
              乙方（员工基本信息）
            </h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-6">
              <el-form-item prop="ENAME" label="姓名">
                <el-input
                  v-model="pageForm.ENAME"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-6">
              <el-form-item prop="ICNUM" label="身份证号">
                <el-input
                  v-model="pageForm.ICNUM"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-6">
              <el-form-item prop="ZHJDZ" label="户籍地址">
                <el-input
                  v-model="pageForm.ZHJDZ"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZTXDZ_GR" label="通讯地址">
                <el-input
                  v-model="pageForm.ZTXDZ_GR"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZPHONE_GR" label="联系电话">
                <el-input
                  v-model="pageForm.ZPHONE_GR"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZEMAIL_GR" label="邮箱地址">
                <el-input
                  v-model="pageForm.ZEMAIL_GR"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="">
            <h4><span class="li-bg-blue"></span> 合同期限</h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZZHTQXLX_T" label="合同期限类型">
                <el-input
                  v-model="pageForm.ZZHTQXLX_T"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="BEGDA" label="合同开始日期">
                <el-input
                  v-model="pageForm.BEGDA"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="CTEDT" label="合同结束日期">
                <el-input
                  v-model="pageForm.CTEDT"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <div class="col-md-4" v-if="pageForm.ZZHTQXLX === '03'">
              <el-form-item prop="ZHTZZBZ" label="合同终止标志">
                <el-input
                  v-model="pageForm.ZHTZZBZ"
                  class="width90p"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </div>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZSFSY" label="是否有试用期限">
                <el-input
                  v-model="pageForm.ZSFSY"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZZSYKSRQ" label="试用期开始日期">
                <el-input
                  v-model="pageForm.ZZSYKSRQ"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZZHTZZRQ" label="试用期结束日期">
                <el-input
                  v-model="pageForm.ZZHTZZRQ"
                  class="width90p"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="">
            <h4>
              <span class="li-bg-blue"></span>
              工作内容和工作地点
            </h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-24">
              <el-form-item prop="ZGZDD" label="乙方工作地点">
                <el-input
                  v-model="pageForm.ZGZDD"
                  :disabled="isEdit"
                  class="width-97-5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZGZNR" label="工种">
                <search-help
                  funccode="HT004"
                  :code.sync="pageForm.ZGZNR"
                  :text="pageForm.ZGZNR_T"
                  :disabled="isEdit"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZGZNR_M" label="乙方工作内容">
                <el-input
                  v-model="pageForm.ZGZNR_M"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="paddl10">
            <div class="">
              <h4>
                <span class="li-bg-blue"></span>
                工作时间和休息休假
              </h4>
              <hr />
            </div>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZGZZ" label="工作制">
                <search-help
                  funccode="HT001"
                  :code.sync="pageForm.ZGZZ"
                  :text="pageForm.ZGZZ_T"
                  :disabled="isEdit"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6" v-if="pageForm.ZGZZ != 2">
              <el-form-item
                prop="ZGZZJSZQ"
                label="工作制计算周期（综合计算工时工作制）"
              >
                <search-help
                  funccode="HT002"
                  :code.sync="pageForm.ZGZZJSZQ"
                  :text="pageForm.ZGZZJSZQ_T"
                  :disabled="isEdit"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="">
            <h4><span class="li-bg-blue"></span> 劳动报酬</h4>
            <hr />
          </div>
          <el-row class="paddl10">
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZGZBZXS" label="工资标准形式">
                <search-help
                  funccode="HT003"
                  :code.sync="pageForm.ZGZBZXS"
                  :text="pageForm.ZGZBZXS_T"
                  :disabled="isEdit"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZJSGZ" label="计时工资（元/月）">
                <el-input
                  v-model="pageForm.ZJSGZ"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZSYQGZ" label="试用期工资（元/月）">
                <el-input
                  v-model="pageForm.ZSYQGZ"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-6">
              <el-form-item prop="ZFXR" label="发薪日（每月_日）">
                <el-input
                  v-model="pageForm.ZFXR"
                  :disabled="isEdit"
                  class="width90p"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <send-email
      v-show="false"
      ref="emailID"
      :paContractList="baseParams.paContractList"
      :pageForm="pageForm"
    ></send-email>
  </div>
</template>

<script>
import PaSearchUser from '../components/paSearchUser'
import SendEmail from './sendEmail'
export default {
  name: 'contractPrinting',
  components: {
    PaSearchUser,
    SendEmail
  },

  data() {
    return {
      pageForm: {
        ZLDHTMB: '',
        ZFR_NAME: '',
        ZQYJJLX: '',
        ZTXDZ_DW: '',
        ZLXR: '',
        ZPHONE_DW: '',
        ZHTZZBZ: '',
        ZGZDD: '',
        ZGZNR: '',
        ZGZNR_M: '',
        ZGZZ: '',
        ZGZZJSZQ: '',
        ZGZBZXS: '',
        ZJSGZ: '',
        ZSYQGZ: '',
        ZFXR: '',
        ZGZR: '',
        ZGZR_NAME: ''
      },
      baseParams: {},
      loading: false,
      isEdit: false,
      isActive: false,
      rules: {},
      ZLDHTMBList: [],
      ZZHTQDDWData: [],
      pageData: {},
      isNRegister: false,
      user: JSON.parse(localStorage.CURRENT_USER_INFO) //登录人信息
    }
  },

  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description: 获取默认值
     * @date 2020年07月20日
     */
    getDefaultValue() {
      let params = {
        sapInterface: 'PE057',
        IV_USER: '',
        IV_PERNR: this.baseParams.PERNR,
        IV_GUID: this.baseParams.GUID
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let msg = response.ES_MESSAGE

        if (msg.MSGTY === 'S') {
          let es_output = response.ES_OUTPUT
          this.pageForm = es_output
          this.pageForm.ZHTZZBZ =
            !es_output.ZHTZZBZ && this.pageForm.ZZHTQXLX === '03'
              ? '已完成一定的工作为期限'
              : ''
          this.pageForm.ZLDHTMB = this.$isEmpty(es_output.ZLDHTMB)
            ? ' '
            : es_output.ZLDHTMB
          this.pageForm.ZLDHTMB_T = this.$isEmpty(es_output.ZLDHTMB_T)
            ? '上海市'
            : es_output.ZLDHTMB_T
          this.pageForm.ZGZDD = this.$isEmpty(es_output.ZGZDD)
            ? '甲方经营业务所在地（包括甲方分公司、子公司、合作项目公司所在地）'
            : es_output.ZGZDD
          this.pageForm.ZGZNR_M = this.$isEmpty(es_output.ZGZNR_M)
            ? '管理岗位'
            : es_output.ZGZNR_M
          this.pageForm.BEGDA = this.$formatDate(es_output.BEGDA, 'en') //合同开始日期

          this.pageForm.CTEDT = this.$formatDate(es_output.CTEDT, 'en') //合同结束日期

          this.pageForm.ZZHTZZRQ = this.$formatDate(es_output.ZZHTZZRQ, 'en') //合同结束日期

          this.pageForm.ZZSYKSRQ = this.$formatDate(es_output.ZZSYKSRQ, 'en') //合同结束日期

          this.pageForm.ZFXR = this.$isEmpty(es_output.ZFXR)
            ? '6'
            : es_output.ZFXR //用章人

          this.pageForm.ZGZR = es_output.ZGZR
          this.pageForm.ZGZR_NAME = es_output.ZGZR_NAME
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 提交合同操作
     * @date 2020年07月20日
     *
     * @param state [0 为保存，5 为生成 6拒绝受理 Z 待维护] C 撤销
     */
    submitContract(state) {
      if (state === '5') {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            this.$confirm('请选择下载完成的合同进行打印', '提示', {
              type: 'warning',
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              confirmButtonClass: 'confirmButtonClass',
              dangerouslyUseHTMLString: true,
              closeOnClickModal: false,
              center: true
            }).then(() => this.updateDataStatus(state))
          }
        })
      } else if (state === 'A') {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            let params = {
              sapInterface: 'PE063',
              IV_ZZXYDM: this.pageForm.ZZXYDM
            }
            this.$httpServer.sap.baseMethod(params).then((response) => {
              let ES_MESSAGE = response.ES_MESSAGE

              if (ES_MESSAGE.MSGTY === 'E') {
                this.updateDataStatus('C')
              } else {
                this.updateDataStatus('A')
              }
            })
          }
        })
      } else {
        this.updateDataStatus(state)
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 初始化
     * @update  08/04/2022
     * @returns {*}
     */
    initFunction() {
      this.settingRules()
      this.baseParams = this.$route.query
      this.isEdit = this.baseParams.STAT === '5' || this.baseParams.STAT === '6'
      this.getDefaultValue()
      this.getZLDHTMBList()
      this.getZZHTQDDWData()
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 返回两个日期相差的月数
     * @Date: 2020-11-16 16:43:23
     *
     * @param date1 日期
     * @param date2 日期
     */
    MonthsBetw(date1, date2) {
      // 用-分成数组
      date1 = date1.split('-')
      date2 = date2.split('-') //获取年,月数

      const year1 = parseInt(date1[0]),
        month1 = parseInt(date1[1]),
        year2 = parseInt(date2[0]),
        month2 = parseInt(date2[1]),
        // 通过年,月差计算月份差
        months = (year2 - year1) * 12 + (month2 - month1) + 1
      return months
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 更新合同数据
     * @date 2020年07月20日
     *
     * @param state [0 为保存，5 为生成 6拒绝受理 Z 待维护]
     */
    updateDataStatus(state) {
      let inputData = this.$deepClone(this.pageForm)
      inputData.BEGDA = this.$formatDate(inputData.BEGDA, 'num') //合同开始日期

      inputData.CTEDT = this.$formatDate(inputData.CTEDT, 'num') //合同结束日期

      inputData.ZZHTZZRQ = this.$formatDate(inputData.ZZHTZZRQ, 'num') //合同结束日期

      inputData.ZZSYKSRQ = this.$formatDate(inputData.ZZSYKSRQ, 'num') //试用期开始日期

      let params = {
        sapInterface: 'PE058',
        IV_USER: '',
        IV_GUID: this.baseParams.GUID,
        IS_INPUT: JSON.stringify(inputData),

        // IV_STATS:state === 'C' ? '0' : state////撤销传0
        IV_STATS: state
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let msg = response.ES_MESSAGE

        if (msg.MSGTY === 'S') {
          // 下载模版
          if (state === '5') {
            this.getDynamicTemplate()
            this.backing()
          } else {
            this.$message.success(msg.MSGTX)

            if (state === 'C' || state === '6') {
              this.backing()
            }

            if (state === 'A') {
              if (this.baseParams.paContractList.EMAIL) {
                if (this.pageForm.ZZSYKSRQ && this.pageForm.ZZHTZZRQ) {
                  this.pageForm.SYQ = this.MonthsBetw(
                    this.pageForm.ZZSYKSRQ.replace(
                      /(\d{4})(\d{2})(\d{2})/g,
                      '$1-$2-$3'
                    ),
                    this.pageForm.ZZHTZZRQ.replace(
                      /(\d{4})(\d{2})(\d{2})/g,
                      '$1-$2-$3'
                    )
                  )
                } else {
                  this.pageForm.SYQ = ''
                }

                this.$refs['emailID'].sendEmail()
                setTimeout(() => this.backing(), 500)
              } else {
                this.backing()
              }
            }
          }
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取word模版数据
     * @date 2020年07月20日
     */
    getDynamicTemplate() {
      let wordData = {} //word 填充的数据

      let params = {}
      wordData.HTBH =
        'YXDC-HT-' +
        this.$formatDate(this.pageForm.BEGDA, 'num') +
        '-' +
        this.baseParams.PERNR
      wordData.YRDWJF = this.pageForm.ZZHTQDDW //用人单位（甲方） *2

      wordData.YRDWJFS = this.pageForm.ZZHTQDDW //用人单位（甲方） *2

      wordData.DZJF = this.pageForm.ZZHTQDDW //地址（甲方）

      wordData.ZGYF = this.pageForm.ENAME //职工乙方 姓名 *2

      wordData.FDDBR = this.pageForm.ZFR_NAME //法定代表人（主要负责人）

      wordData.SFZHM = this.pageForm.ICNUM //身份证号码

      wordData.JJLX = this.pageForm.ZQYJJLX_T //经济类型

      wordData.HJDZ = this.pageForm.ZHJDZ //户籍地址

      wordData.TXDZJF = this.pageForm.ZTXDZ_DW //通讯地址甲方

      wordData.TXDZYF = this.pageForm.ZTXDZ_GR //通讯地址乙方

      wordData.LXRJF = this.pageForm.ZLXR_NAME //联系人甲方

      wordData.DHJF = this.pageForm.ZPHONE_DW //电话甲方

      wordData.LXDHYF = this.pageForm.ZPHONE_GR //联系电话乙方

      if (this.pageForm.ZZHTQXLX === '01') {
        wordData.DJZFS = 1 //甲、乙双方同意按以下第
      } else if (this.pageForm.ZZHTQXLX === '02') {
        wordData.DJZFS = 2 //甲、乙双方同意按以下第
      } else if (this.pageForm.ZZHTQXLX === '03') {
        wordData.DJZFS = 3 //甲、乙双方同意按以下第
      } else {
        wordData.DJZFS = '' //甲、乙双方同意按以下第
      } //如果是有固定期限，那么固定期限和工作为期限的开始日期和结束日期都是/

      if (this.pageForm.ZZHTQXLX === '01') {
        wordData.YGDQXNA = this.$formatDate(this.pageForm.BEGDA, 'Y') //有固定期限年

        wordData.YGDQXYA = this.$formatDate(this.pageForm.BEGDA, 'M') //有固定期限月

        wordData.YGDQXRA = this.$formatDate(this.pageForm.BEGDA, 'D') //有固定期限日

        wordData.YGDQXNB = this.$formatDate(this.pageForm.CTEDT, 'Y') //有固定期限结束年

        wordData.YGDQXYB = this.$formatDate(this.pageForm.CTEDT, 'M') //有固定期限结束月

        wordData.YGDQXRB = this.$formatDate(this.pageForm.CTEDT, 'D') //有固定期限结束日

        wordData.WGDQXNA = '/' //无固定期限年

        wordData.WGDQXYA = '/' //无固定期限月

        wordData.WGDQXRA = '/' //无固定期限日

        wordData.GZQXN = '/' //工作期限年

        wordData.GZQXY = '/' //工作期限月

        wordData.GZQXR = '/' //工作期限日
      } //如果是无固定期限，那么固定期限和工作为期限的开始日期和结束日期都是/

      if (this.pageForm.ZZHTQXLX === '02') {
        wordData.GZQXN = '/' //工作期限年

        wordData.GZQXY = '/' //工作期限月

        wordData.GZQXR = '/' //工作期限日

        wordData.WGDQXNA = this.$formatDate(this.pageForm.BEGDA, 'Y') //无固定期限年

        wordData.WGDQXYA = this.$formatDate(this.pageForm.BEGDA, 'M') //无固定期限月

        wordData.WGDQXRA = this.$formatDate(this.pageForm.BEGDA, 'D') //无固定期限日

        wordData.YGDQXNA = '/' //有固定期限年

        wordData.YGDQXYA = '/' //有固定期限月

        wordData.YGDQXRA = '/' //有固定期限日

        wordData.YGDQXNB = '/' //有固定期限结束年

        wordData.YGDQXYB = '/' //有固定期限结束月

        wordData.YGDQXRB = '/' //有固定期限结束日
      } //如果是工作为期限，那么固定期限和无固定期限的开始日期和结束日期都是/

      if (this.pageForm.ZZHTQXLX === '03') {
        wordData.YGDQXNA = '/' //有固定期限年

        wordData.YGDQXYA = '/' //有固定期限月

        wordData.YGDQXRA = '/' //有固定期限日

        wordData.YGDQXNB = '/' //有固定期限结束年

        wordData.YGDQXYB = '/' //有固定期限结束月

        wordData.YGDQXRB = '/' //有固定期限结束日

        wordData.WGDQXNA = '/' //无固定期限年

        wordData.WGDQXYA = '/' //无固定期限月

        wordData.WGDQXRA = '/' //无固定期限日

        wordData.GZQXN = this.$formatDate(this.pageForm.BEGDA, 'Y') //工作期限年

        wordData.GZQXY = this.$formatDate(this.pageForm.BEGDA, 'M') //工作期限月

        wordData.GZQXR = this.$formatDate(this.pageForm.BEGDA, 'D') //工作期限日
      }

      wordData.GZBZ = this.pageForm.ZHTZZBZ || '' //工作标志

      // 试用期结束日期有值就是2没值就是1

      wordData.SYQDJZFS =
        this.pageForm.ZZHTZZRQ !== '00000000' && this.pageForm.ZZHTZZRQ ? 2 : 1 //试用期限双方同意按以下第

      wordData.SYQNKS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZSYKSRQ, 'Y')
      ) //试用期开始年

      wordData.SYQYKS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZSYKSRQ, 'M')
      ) //试用期开始月

      wordData.SYQRKS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZSYKSRQ, 'D')
      ) //试用期开始日

      wordData.SYQNJS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZHTZZRQ, 'Y')
      ) //试用期结束年

      wordData.SYQYJS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZHTZZRQ, 'M')
      ) //试用期结束月

      wordData.SYQRJS = this.returnSlash(
        this.$formatDate(this.pageForm.ZZHTZZRQ, 'D')
      ) //试用期结束日

      wordData.YFGZNR = this.pageForm.ZGZNR_M //乙方的工作内容

      wordData.YFGZNRLXA = this.pageForm.ZGZNR === '1' ? '是' : '/' //乙方工作内容确定为（填“是”）

      wordData.YFGZNRLXB = this.pageForm.ZGZNR === '2' ? '是' : '/' //乙方工作内容确定为（填“是”）

      wordData.YFGZDD = this.pageForm.ZGZDD //乙方工作地点

      wordData.JYDJZFS = this.pageForm.ZGZZ //（甲、乙双方同意按以下第

      wordData.JYN = this.pageForm.ZGZZJSZQ === '1' ? '年' : '/' //综合计算工时工作制，即经劳动行政部门审批，乙方所在岗位实行以（填“是”）：年

      wordData.JYBN = this.pageForm.ZGZZJSZQ === '2' ? '半年' : '/' //半年

      wordData.JYJ = this.pageForm.ZGZZJSZQ === '3' ? '季' : '/' //季

      wordData.JYY = this.pageForm.ZGZZJSZQ === '4' ? '月' : '/' //月

      wordData.JSGZY = this.pageForm.ZJSGZ //计时工资

      wordData.YFSYQGZ = this.pageForm.ZSYQGZ //乙方试用期工资为

      wordData.YFFFGZSJ = this.pageForm.ZFXR //甲方给乙方发放工资的时间为：每月

      wordData.QMRQ = this.$formatDate(this.pageForm.BEGDA, 'ch')
      wordData.QMRQS = this.$formatDate(this.pageForm.BEGDA, 'ch')
      wordData.DZYJYF = this.pageForm.ZEMAIL_GR //电子邮件乙方

      if (this.pageForm.ZLDHTMB === '1') {
        params.templateName = 'ldht.ftl'
      } else if (this.pageForm.ZLDHTMB === '2') {
        params.templateName = 'nsldht.ftl'
      } else if (this.pageForm.ZLDHTMB === '3') {
        params.templateName = 'wzqyldht.ftl'
      } else {
        return this.$message.warning('暂无匹配的劳动合同模版')
      }

      params.fileName = '劳动合同'
      params.wordParams = wordData //下载word

      this.downloadWord(params)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 下载合同
     * @date 2020年07月20日
     *
     * @param params 合同参数
     */
    downloadWord(params) {
      this.$httpServer.file.downloadCommonTemplate(params)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 返回斜杠
     *
     * @param value
     * @returns {string|*}
     */
    returnSlash(value) {
      return value || '/'
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 返回
     * @date 2020年07月20日
     */
    backing() {
      this.$router.push({
        path: '/ht/event/',
        query: {
          MENUII: this.baseParams.MENUII
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 查询员工回调
     * @date 2020年07月20日
     *
     * @param empObject 人员对象
     */
    getEmployeeData(empObject) {
      this.pageForm.ZLXR = empObject.employeeNum
      this.pageForm.ZLXR_NAME = empObject.employeeName
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 查询员工回调
     * @date 2020年07月20日
     *
     * @param empObject 人员对象
     */
    getEmployeeDataYZR(empObject) {
      this.pageForm.ZGZR_NAME = empObject.employeeName
      this.pageForm.ZGZR = empObject.employeeNum
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 清空选择的人员
     * @date 2020年07月20日
     */
    emptValue() {
      this.pageForm.ZLXR = ''
      this.pageForm.ZLXR_NAME = ''
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 清空选择的人员
     * @date 2020年07月20日
     */
    emptValueYZR() {
      this.pageForm.ZGZR = ''
      this.pageForm.ZGZR_NAME = ''
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 设置字段必填规则
     * @date 2020年07月20日
     */
    settingRules() {
      for (let i in this.pageForm) {
        this.rules[i] = [
          {
            required: true,
            trigger: 'blur',
            message: '该项为必填'
          }
        ]
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 劳动合同模版下拉帮助 获取合同模板列表 PE061 ZFM_DHR_GET_HTMB 获取合同模板
     * @date 2020年11月12日
     */
    getZLDHTMBList() {
      let params = {
        sapInterface: 'PE061',
        IV_USER: '',
        IV_PAGE: this.pageCode
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        this.ZLDHTMBList = response.ET_DATA
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 用人单位名称下拉帮助
     * @date 2020年11月12日
     */
    getZZHTQDDWData() {
      this.$httpServer.sap
        .getDicts({
          type: 'HT006'
        })
        .then((res) => {
          this.ZZHTQDDWData = res.data
        })
    },

    /**
     * @Copyright: DELOITTE
     * @Description: PE063 ZFM_DHR_GET_QYXX 合同打印-选择用人单位后校验用人单位以及获取地址法人信息
     * @Date: 2020-11-13 09:57:05
     *
     * @param code key
     */
    getQYXX(code) {
      let obj = {}
      obj = this.ZZHTQDDWData.find((item) => item.code === code)
      this.pageForm.ZZHTQDDW = obj.name
      let params = {
        sapInterface: 'PE063',
        IV_ZZXYDM: code
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        const ES_MESSAGE = response.ES_MESSAGE
        this.pageForm.ZFR_NAME = response.EV_FRDB
        this.pageForm.ZTXDZ_DW = response.EV_BGDZ

        if (ES_MESSAGE.MSGTY === 'E') {
          this.isNRegister = true
          this.$message({
            offset: '200',
            message: this.$i18n.t(
              'parc_personnelEvent.THEEMPLOYERYOUSELECTEDHASNOTBEENREGISTEREDINFADAELECTRONICSIGNATURESYSTEMYETE'
            ),
            type: 'warning'
          })
        }
      })
    },

    /**
     * @Copyright: DELOITTE
     * @Description:预览
     * @Date: 2020-11-13 10:18:56
     *
     * @param state 状态
     */
    getPdf(state) {
      this.$refs['pageForm'].validate((valid) => {
        if (valid) {
          if (this.isNRegister) {
            state = 'C'
          }

          let wordData = {} //word 填充的数据

          wordData.isSubmit = state // 是否需要上传阿里云

          wordData.HTMBID = this.pageForm.ZLDHTMB // 合同模板ID

          wordData.HTBH = this.baseParams.GUID
          wordData.YRDWJF = this.pageForm.ZZHTQDDW //用人单位（甲方） *2

          wordData.YRDWJFS = this.pageForm.ZZHTQDDW //用人单位（甲方） *2

          wordData.DZJF = this.pageForm.ZTXDZ_DW //地址（甲方）

          wordData.ZGYF = this.pageForm.ENAME //职工乙方 姓名 *2

          wordData.FDDBR = this.pageForm.ZFR_NAME //法定代表人（主要负责人）

          wordData.SFZHM = this.pageForm.ICNUM //身份证号码

          wordData.JJLX = this.pageForm.ZQYJJLX_T //经济类型

          wordData.HJDZ = this.pageForm.ZHJDZ //户籍地址

          wordData.TXDZJF = this.pageForm.ZTXDZ_DW //通讯地址甲方

          wordData.TXDZYF = this.pageForm.ZTXDZ_GR //通讯地址乙方

          wordData.LXRJF = this.pageForm.ZLXR_NAME //联系人甲方

          wordData.DHJF = this.pageForm.ZPHONE_DW //电话甲方

          wordData.LXDHYF = this.pageForm.ZPHONE_GR //联系电话乙方

          wordData.DZYJYF = this.pageForm.ZEMAIL_GR // 电子邮箱（必填）

          if (this.pageForm.ZZHTQXLX === '01') {
            wordData.DJZFS = 1 //甲、乙双方同意按以下第
          } else if (this.pageForm.ZZHTQXLX === '02') {
            wordData.DJZFS = 2 //甲、乙双方同意按以下第
          } else if (this.pageForm.ZZHTQXLX === '03') {
            wordData.DJZFS = 3 //甲、乙双方同意按以下第
          } else {
            wordData.DJZFS = '' //甲、乙双方同意按以下第
          } //如果是有固定期限，那么固定期限和工作为期限的开始日期和结束日期都是/

          if (this.pageForm.ZZHTQXLX === '01') {
            wordData.YGDQXNA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'Y')
            ) //有固定期限年

            wordData.YGDQXYA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'M')
            ) //有固定期限月

            wordData.YGDQXRA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'D')
            ) //有固定期限日

            wordData.YGDQXNB = this.returnSlash(
              this.$formatDate(this.pageForm.CTEDT, 'Y')
            ) //有固定期限结束年

            wordData.YGDQXYB = this.returnSlash(
              this.$formatDate(this.pageForm.CTEDT, 'M')
            ) //有固定期限结束月

            wordData.YGDQXRB = this.returnSlash(
              this.$formatDate(this.pageForm.CTEDT, 'D')
            ) //有固定期限结束日

            wordData.WGDQXNA = '/' //无固定期限年

            wordData.WGDQXYA = '/' //无固定期限月

            wordData.WGDQXRA = '/' //无固定期限日

            wordData.GZQXN = '/' //工作期限年

            wordData.GZQXY = '/' //工作期限月

            wordData.GZQXR = '/' //工作期限日
          } //如果是无固定期限，那么固定期限和工作为期限的开始日期和结束日期都是/

          if (this.pageForm.ZZHTQXLX === '02') {
            wordData.GZQXN = '/' //工作期限年

            wordData.GZQXY = '/' //工作期限月

            wordData.GZQXR = '/' //工作期限日

            wordData.WGDQXNA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'Y')
            ) //无固定期限年

            wordData.WGDQXYA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'M')
            ) //无固定期限月

            wordData.WGDQXRA = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'D')
            ) //无固定期限日

            wordData.YGDQXNA = '/' //有固定期限年

            wordData.YGDQXYA = '/' //有固定期限月

            wordData.YGDQXRA = '/' //有固定期限日

            wordData.YGDQXNB = '/' //有固定期限结束年

            wordData.YGDQXYB = '/' //有固定期限结束月

            wordData.YGDQXRB = '/' //有固定期限结束日
          } //如果是工作为期限，那么固定期限和无固定期限的开始日期和结束日期都是/

          if (this.pageForm.ZZHTQXLX === '03') {
            wordData.YGDQXNA = '/' //有固定期限年

            wordData.YGDQXYA = '/' //有固定期限月

            wordData.YGDQXRA = '/' //有固定期限日

            wordData.YGDQXNB = '/' //有固定期限结束年

            wordData.YGDQXYB = '/' //有固定期限结束月

            wordData.YGDQXRB = '/' //有固定期限结束日

            wordData.WGDQXNA = '/' //无固定期限年

            wordData.WGDQXYA = '/' //无固定期限月

            wordData.WGDQXRA = '/' //无固定期限日

            wordData.GZQXN = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'Y')
            ) //工作期限年

            wordData.GZQXY = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'M')
            ) //工作期限月

            wordData.GZQXR = this.returnSlash(
              this.$formatDate(this.pageForm.BEGDA, 'D')
            ) //工作期限日
          } //工作标志

          wordData.GZBZ = this.pageForm.ZHTZZBZ || '' //试用期结束日期有值就是2没值就是1

          wordData.SYQDJZFS =
            this.pageForm.ZZHTZZRQ !== '00000000' && this.pageForm.ZZHTZZRQ
              ? 2
              : 1 //试用期限双方同意按以下第

          wordData.SYQNKS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZSYKSRQ, 'Y')
          ) //试用期开始年

          wordData.SYQYKS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZSYKSRQ, 'M')
          ) //试用期开始月

          wordData.SYQRKS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZSYKSRQ, 'D')
          ) //试用期开始日

          wordData.SYQNJS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZHTZZRQ, 'Y')
          ) //试用期结束年

          wordData.SYQYJS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZHTZZRQ, 'M')
          ) //试用期结束月

          wordData.SYQRJS = this.returnSlash(
            this.$formatDate(this.pageForm.ZZHTZZRQ, 'D')
          ) //试用期结束日

          wordData.YFGZNR = this.pageForm.ZGZNR_M //乙方的工作内容

          wordData.YFGZNRLXA = this.pageForm.ZGZNR === '1' ? '是' : '/' //乙方工作内容确定为（填“是”）

          wordData.YFGZNRLXB = this.pageForm.ZGZNR === '2' ? '是' : '/' //乙方工作内容确定为（填“是”）

          wordData.YFGZDD = this.pageForm.ZGZDD //乙方工作地点

          wordData.JYDJZFS = this.pageForm.ZGZZ //（甲、乙双方同意按以下第

          wordData.JYN = this.pageForm.ZGZZJSZQ === '1' ? '年' : '/' //综合计算工时工作制，即经劳动行政部门审批，乙方所在岗位实行以（填“是”）：年

          wordData.JYBN = this.pageForm.ZGZZJSZQ === '2' ? '半年' : '/' //半年

          wordData.JYJ = this.pageForm.ZGZZJSZQ === '3' ? '季' : '/' //季

          wordData.JYY = this.pageForm.ZGZZJSZQ === '4' ? '月' : '/' //月

          wordData.JSGZY = this.pageForm.ZJSGZ //计时工资

          wordData.YFSYQGZ = this.pageForm.ZSYQGZ //乙方试用期工资为

          wordData.YFFFGZSJ = this.pageForm.ZFXR.replace(/\D/gi, '') //甲方给乙方发放工资的时间为：每月

          wordData.QMRQ = this.pageForm.ZFR_NAME // 甲方

          wordData.QMRQS = this.pageForm.ENAME // 乙方

          let data = this.$deepClone(wordData)
          this.$httpServer.file.createHt2Ufs(data).then((response) => {
            if (response.MSGTY === 'S') {
              this.pageForm.ZHTWJ = response.ALIYUNOSS
              this.submitContract(state)

              if (state !== 'A') {
                window.open(response.ALIYUNOSS_PRE_URL)
              }
            }
          })
        }
      })
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 下载合同
     * @Date: 2020-11-13 10:49:27
     */
    getContract() {
      if (this.pageForm.ZHTWJ.indexOf('https') !== -1) {
        const a = document.createElement('a')
        a.setAttribute('href', this.pageForm.ZHTWJ)
        a.setAttribute('target', '_blank')
        a.setAttribute('id', 'camnpr')
        document.body.appendChild(a)
        a.click()
      } else {
        window.open(
          'dhrDownloadService/aliyunoss/download?ossPath=' +
            this.pageForm.ZHTWJ +
            '&fileName=' +
            '劳动合同' +
            '.pdf'
        )
      }
    },

    /**
     * @Copyright: DELOITTE
     * @Description: HR 员工签字后查看合同
     * @Date: 2020-11-26 10:49:27
     *
     * @param url 地址
     */
    viewContract(url) {
      window.open(url)
    }
  },

  created() {
    this.initFunction()
  }
}
</script>

<style scoped>
.ibox-content {
  padding-top: 10px;
}

.contract-box label {
  font-size: 12px;
  color: #4a4a4a;
}

h4 {
  font-size: larger;
}

.width-97-5 {
  width: 97.5%;
}

.contract-field-heigth .el-col {
  height: 70px;
}
</style>
