<template>
  <div>
    <breadcrumb :key="$route.fullPath"></breadcrumb>

    <div class="ibox-content mt10">
      <el-row>
        <el-form
          class="mt20"
          size="mini"
          :rules="rules"
          ref="queryForm"
          :model="queryForm"
          label-width="120px"
        >
          <el-row justify="space-between">
            <el-col class="el-col-sm-8">
              <el-form-item
                prop="credentialsType"
                label="证件类型"
                :show-message="false"
                :class="{
                  'has-input-error':
                    isActive && queryForm.credentialsType === ''
                }"
              >
                <el-select
                  v-model="queryForm.credentialsType"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in credentialsTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-8">
              <el-form-item
                prop="credentialsNum"
                label="证件号码"
                :show-message="false"
                :class="{
                  'has-input-error': isActive && queryForm.credentialsNum === ''
                }"
              >
                <el-input
                  v-model="queryForm.credentialsNum"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <div class="fr">
              <el-button
                icon="el-icon-search"
                type="primary"
                size="mini"
                :loading="loading"
                @click="queryDataList"
              >
                查询
              </el-button>
              <el-button
                size="mini"
                icon="el-icon-refresh-right"
                @click="restForm"
              >
                重置
              </el-button>
            </div>
          </el-row>
        </el-form>
      </el-row>

      <div class="clearfix mt20">
        <div class="block" style="padding-top: 10px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes=";[10, 20, 50, 100]
"
            :page-size="pageSize"
            layout="total, sizes"
            :total="$filterTableContent(searchContent, tableData).length"
          ></el-pagination>
        </div>
        <div style="margin-top: -30px; text-align: right">
          <el-input
            size="mini"
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            v-model="searchContent"
            class="table-input-serarch"
          ></el-input>
          <el-button
            @click="handleDownload"
            class="table-buttons-down ml10"
            size="mini"
            :loading="exportLoading"
            round
          >
            下载表格内容
          </el-button>
        </div>
        <div class="mt10">
          <el-table
            header-cell-class-name="tableHeaderStyle"
            :data="
              $filterTableContent(searchContent, tableData).slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
            size="small"
            :default-sort="{
              prop: 'default'
            }"
          >
            <el-table-column
              show-overflow-tooltip
              sortable
              v-for="(field, index) in tableFieldList"
              :key="index"
              :fixed="field.fixed"
              :type="field.type === 'index' ? 'index' : ''"
              :index=";(index) => $settingTableSerialNum(index, currentPage, pageSize)
"
              :prop="field.prop"
              :label="field.label"
              :min-width="field.width"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed="right"
              prop="operation"
              label="操作"
              width="100"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  <el-button
                    @click.native="openDialog(scope.row, 'X')"
                    type="text"
                    size="mini"
                    v-if="
                      scope.row.ZZHRJZLY !== 'X' &&
                      scope.row.ZSFZZ === '否' &&
                      scope.row.ZSFCRZ === '否'
                    "
                  >
                    重入职
                  </el-button>
                  <el-button
                    @click.native="checkEmployeeInfo(scope.row)"
                    type="text"
                    size="mini"
                  >
                    查看
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="padding-top: 10px; text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes=";[10, 20, 50, 100]
"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="$filterTableContent(searchContent, tableData).length"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :width="dialogWidth"
      :before-close="handleClose"
    >
      <select-entry-template
        :parentData="parentData"
        v-if="showDialog === 'selTemp'"
        @closeDialog="closeDialog"
      ></select-entry-template>
      <batch-event-import
        :parentData="parentData"
        v-if="showDialog === 'import'"
        @closeDialog="closeDialog"
      ></batch-event-import>
    </el-dialog>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import tableField from '../../pa/common/tableField'
import selectEntryTemplate from './selectEntryTemplate'
import batchEventImport from './batchEventImport'
import { IdentityCodeValid } from '@/utils/valid'
export default {
  name: 'infoCollectionList',
  components: {
    batchEventImport,
    selectEntryTemplate
  },

  data() {
    return {
      queryForm: {
        credentialsType: '',
        credentialsNum: ''
      },
      loading: false,
      exportLoading: false,
      activeCode: '',
      searchContent: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      MENUII: '',
      buttonList: [],
      tableFieldList: [],
      dialogTitle: '',
      dialogVisible: false,
      parentData: {},
      showDialog: '',
      dialogWidth: '1000px',
      rules: {
        credentialsType: [
          {
            required: true,
            trigger: 'blur',
            message: '请选择证件类型'
          }
        ],
        credentialsNum: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入证件号码'
          }
        ]
      },
      credentialsTypeList: [],
      isActive: false,
      rPath: this.$route.path
    }
  },

  watch: {
    /**
     * @Copyright DELOITTE
     * @Description: 查询条件变更重置当前页
     * @update  07/04/2022
     * @returns {*}
     */
    searchContent() {
      this.currentPage = 1
    },

    /**
     * @Copyright DELOITTE
     * @Description: 监听路由变化，进行初始化
     * @update  07/04/2022
     * @returns {*}
     */
    $route(oldVal, newVal) {
      this.rPath = this.$route.path
      if (newVal.fullPath === oldVal.fullPath) return
      this.initFunction()
    }
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 获取查询参数
     * @date 2022年04月29日
     * @returns {*}
     */
    getQueryParams() {
      let sapInterface = 'PE005'
      let activeCode = {
        IV_DBLX: this.activeCode
      }
      let params = {
        sapInterface: sapInterface,
        IV_USER: '',
        IV_ORGEH: this.queryForm.orgID,
        IT_PERNRS: this.$isEmpty(this.queryForm.employeeNum)
          ? ''
          : JSON.stringify([this.queryForm.employeeNum]),
        IV_IPAGE: this.MENUII
      }
      Object.assign(params, activeCode)
      return params
    },

    /**
     * @Copyright DELOITTE
     * @Description: 每页显示多少条
     * @update  07/04/2022
     * @param val pageSize
     * @returns {*}
     */
    handleSizeChange(val) {
      this.pageSize = val
    },

    /**
     * @Copyright DELOITTE
     * @Description: 当前页变更
     * @update  07/04/2022
     * @param val currentPage
     * @returns {*}
     */
    handleCurrentChange(val) {
      this.currentPage = val
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 列表查询
     * @date 2020年07月20日
     * @returns {*}
     */
    async queryDataList() {
      if (this.queryForm.credentialsType === '01') {
        let params = {
          sapInterface: 'PE100',
          IV_ICTYP: this.queryForm.credentialsType,
          IV_ICNUM: this.queryForm.credentialsNum
        }
        await this.$httpServer.sap.baseMethod(params)
        if (res.ES_MESSAGE.MSGTY === 'E') return
      }

      this.isActive = true
      if (!this.queryForm.credentialsType || !this.queryForm.credentialsNum)
        return
      this.currentPage = 1
      this.tableData = [] //更新表头

      this.tableFieldList = tableField(this.MENUII, this.activeCode)
      let params = {
        sapInterface: 'PE056',
        IV_USER: '',
        IV_ICTYP: this.queryForm.credentialsType,
        IV_ICNUM: this.queryForm.credentialsNum,
        IV_IPAGE: this.MENUII
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        console.log('response', response)
        let ES_MESSAGE = response.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'Y') {
          this.$confirm(ES_MESSAGE.MSGTX, '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmButtonClass',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            center: true
          }).then(() => this.openDialog())
        }

        if (ES_MESSAGE.MSGTY === 'E') return
        this.tableData = response.ET_DATA || []
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 重置查询条件
     * @update  07/04/2022
     * @returns {*}
     */
    restForm() {
      this.$refs['queryForm'].resetFields()
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 页面初始化函数
     * @date 2020年07月20日
     */
    initFunction() {
      let querySourse = this.$route.query
      this.MENUII = querySourse.MENUII
      this.tableFieldList = tableField(this.MENUII)
      this.getCredentialsTypeList()

      if (
        querySourse &&
        (querySourse.credentialsType || querySourse.credentialsNum)
      ) {
        this.queryForm = {
          credentialsType: querySourse.credentialsType,
          credentialsNum: querySourse.credentialsNum
        }
        this.queryDataList()
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: button事件
     * @date 2020年07月20日
     * @param displayFlag
     */
    batchImportData(displayFlag) {
      this.showDialog = 'import'
      this.dialogTitle = '事件导入'
      this.dialogVisible = true
      this.dialogWidth = '1000px'
      this.parentData.pageCode = this.MENUII
      this.parentData.displayFlag = displayFlag
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 查看员工信息
     * @date 2020年07月20日
     * @param rowobject 行数据
     */
    checkEmployeeInfo(rowobject) {
      let url = ''
      let params = {}
      url = '/ess/maintain'
      params = {
        MENUII: this.MENUII,
        PERNR: rowobject.PERNR
      }
      this.$router.push({
        path: url,
        query: params
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 打开选择入职模版页面
     * @date 2020年07月20日
     * @param rowobject 行数据
     * @param flag 重入职标识 X为重入职
     */
    openDialog(rowObject, flag) {
      this.showDialog = 'selTemp'
      this.dialogTitle = '选择入职模版'
      this.dialogVisible = true
      this.dialogWidth = '650px'
      this.parentData.pageCode = this.MENUII //证件类型

      this.parentData.credentialsType = this.queryForm.credentialsType //证件号码 进行base64加密

      this.parentData.credentialsNum = Base64.encode(
        this.queryForm.credentialsNum
      )

      if (flag === 'X') {
        this.parentData.isRhire = 'X'
        this.parentData.PERNR = rowObject.PERNR
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 关闭弹框
     * @update  07/04/2022
     * @returns {*}
     */
    closeDialog() {
      this.dialogVisible = false
      this.showDialog = ''
    },

    /**
     * @Copyright DELOITTE
     * @Description: 弹框关闭事件回调
     * @update  07/04/2022
     * @param done
     * @returns {*}
     */
    handleClose(done) {
      this.closeDialog()
      done && done()
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  获取证件类型
     * @date 2020年07月20日
     */
    getCredentialsTypeList() {
      this.$httpServer.sap
        .getDicts({
          type: '9003',
          _t: Date.parse(new Date()) / 1000
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            this.$set(this, 'credentialsTypeList', res.data)
          } else {
            this.$set(this, 'credentialsTypeList', [])
          }
        })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 导出表格数据
     * @date 2020年07月20日
     */
    handleDownload() {
      let tableFieldList = this.$deepClone(this.tableFieldList)
      tableFieldList.splice(0, 1) //去掉序号字段

      let fileName = localStorage.getItem('currentPageText') + '.xlsx'
      let tableData = this.$filterTableContent(
        this.searchContent,
        this.tableData
      ) //参数1=>table表头 参数2=>接口输出字段 参数3=>接口参数 参数4=>自定义表格数据 参数5=>文件名称

      let params = {
        HEAD_FIELD: null,
        EXCEL_HEAD: JSON.stringify(tableFieldList),
        OUTPUT_FIELD: 'ET_DATA',
        CUSTOM_DATA: JSON.stringify(tableData),

        // 前台传入导出数据
        sapParams: JSON.stringify(this.getQueryParams()),
        fileName: fileName
      }
      this.$httpServer.file.customHeaderExportExcel(params)
    }
  },

  created() {
    // 页面初始化函数入口
    this.initFunction()
  }
}
</script>

<style scoped>
.bt-box-p {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
