<template>
  <div>
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <div class="ibox-content mt10" style="padding-top: 0px; padding-bottom: 10px">
      <el-row>
        <el-form class="mt20" size="mini" ref="queryForm" :model="pageData" label-width="120px">
          <h4>
            <span class="li-bg-blue"></span>
            新建申请
          </h4>
          <hr />
          <div class="paddT10">
            <el-col class="el-col-sm-8">
              <el-form-item
                prop="zmlx"
                label="证明类型"
                :show-message="false"
                :class="{ 'has-input-error': isActive && pageData.zmlx === '' }"
              >
                <search-help
                  funccode="90005"
                  :initcond="baseParams.MENUII === pageCode.ZMGL ? 'ZZHR' : 'ZZEE'"
                  :code.sync="pageData.zmlx"
                  :text.sync="pageData.zmlx_t"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-8" v-if="baseParams.MENUII === pageCode.ZMGL">
              <el-form-item
                prop="employeeNum"
                label="员工姓名"
                :show-message="false"
                :class="{ 'has-input-error': isActive && pageData.employeeNum === '' }"
              >
                <pa-search-user
                  :ipage="baseParams.MENUII"
                  @getEmployeeData="(obj) => getEmployeeData(obj, 'P')"
                  @emptValue="() => emptValue('P')"
                  class="width90p"
                ></pa-search-user>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-8">
              <el-button type="warning" size="mini" @click="newApplication">
                {{ baseParams.buttonName }}
              </el-button>
            </el-col>
          </div>
        </el-form>
      </el-row>
    </div>
    <!--员工页面-->
    <div class="ibox-content mt10" v-if="baseParams.MENUII === pageCode.ZMKJ">
      <!--证明开具-->
      <div class="clearfix">
        <h4>
          <span class="li-bg-blue"></span>
          历史申请
        </h4>
        <hr />
        <div class="paddT20" v-loading="loading" :element-loading-text="'加载中......'">
          <table-util
            :search-content.sync="searchContent"
            :id="'export'"
            :currentPage.sync="currentPage"
            :pageSize.sync="pageSize"
            :tableData="$filterTableContent(searchContent, tableData)"
          ></table-util>
          <el-table
            header-cell-class-name="tableHeaderStyle"
            id="export"
            :data="
              $filterTableContent(searchContent, tableData).slice((currentPage - 1) * pageSize, currentPage * pageSize)
            "
            style="width: 100%"
            size="small"
            :cell-style="handleCellStyle"
            @cell-click="handleCellClick"
          >
            <el-table-column
              show-overflow-tooltip
              v-for="(field, index) in tableFieldList"
              :key="index"
              :fixed="field.fixed"
              :type="field.type === 'index' ? 'index' : ''"
              :index="(index) => $settingTableSerialNum(index, currentPage, pageSize)"
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
                <template>
                  <!--审批中-->
                  <el-link
                    @click.native="$previewFile(scope.row.FILEID, scope.row.FILENAME)"
                    v-show="scope.row.ZSTAT === '4'"
                    type="primary"
                    class="mr5"
                    size="mini"
                    :underline="false"
                  >
                    预览
                  </el-link>
                  <!--待处理 提交没有在k2界面点击提交的情况-->
                  <el-link
                    @click.native="startk2Workflow(scope.row)"
                    v-show="scope.row.ZSTAT === '0'"
                    type="primary"
                    class="mr5"
                    size="mini"
                    :underline="false"
                  >
                    提交
                  </el-link>
                  <el-link
                    @click.native="deleteProve(scope.row)"
                    v-show="scope.row.ZSTAT === '0'"
                    type="danger"
                    class="mr5"
                    size="mini"
                    :underline="false"
                  >
                    删除
                  </el-link>
                  <!--集团 -->
                  <el-link
                    @click.native="$previewFile(scope.row.FILEID, scope.row.FILENAME)"
                    v-show="scope.row.ZSTAT === '5' || scope.row.ZSTAT === '7'"
                    type="primary"
                    class="mr5"
                    size="mini"
                    :underline="false"
                  >
                    预览
                  </el-link>
                  <el-link
                    @click.native="$downloadFile(scope.row.FILEID, scope.row.FILENAME)"
                    v-show="scope.row.ZSTAT === '5' || scope.row.ZSTAT === '7'"
                    type="warning"
                    size="mini"
                    :underline="false"
                  >
                    下载
                  </el-link>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div class="el-table-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="$filterTableContent(searchContent, tableData).length"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--HR 页面-->
    <div
      class="ibox-content mt10"
      style="padding-top: 0px; padding-bottom: 10px"
      v-if="baseParams.MENUII === pageCode.ZMGL"
    >
      <el-row>
        <el-form class="mt20" size="mini" ref="queryForm" :model="pageData" label-width="120px">
          <h4>
            <span class="li-bg-blue"></span>
            查询条件
          </h4>
          <hr />
          <el-row class="paddT10">
            <el-col class="el-col-sm-8">
              <el-form-item label="员工姓名" prop="employeeName">
                <pa-search-user
                  :ipage="baseParams.MENUII"
                  @getEmployeeData="(obj) => getEmployeeData(obj, 'Q')"
                  ref="paSearchUser"
                  @emptValue="() => emptValue('Q')"
                  class="width90p"
                ></pa-search-user>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-8">
              <el-form-item label="单位" prop="orgID" style="width: 93%">
                <Tree
                  :readonly="true"
                  :pagecode="baseParams.MENUII"
                  :text.sync="queryData.orgName"
                  :treestyle="{ top: '28px' }"
                  :callback="getTreeCallback"
                ></Tree>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-8">
              <el-form-item
                prop="zmlxs"
                label="证明类型"
                :class="{ 'has-input-error': isActive && queryData.zmlx === '' }"
              >
                <search-help
                  funccode="90005"
                  :initcond="baseParams.MENUII === pageCode.ZMGL ? 'ZZHR' : 'ZZEE'"
                  :code.sync="queryData.zmlx"
                  :text.sync="queryData.zmlx_t"
                  class="width90p"
                ></search-help>
              </el-form-item>
            </el-col>

            <el-col class="el-col-sm-8">
              <el-form-item label="开始日期" prop="beginDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="queryData.beginDate"
                  style="width: 90%"
                />
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-8">
              <el-form-item label="结束日期" prop="beginDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="queryData.endDate"
                  style="width: 90%"
                />
              </el-form-item>
            </el-col>
            <div class="fr mr25">
              <el-button type="primary" size="mini" icon="el-icon-search" :loading="loading" @click="queryDataList">
                查询
              </el-button>
              <el-button size="mini" icon="el-icon-refresh-right" @click="restForm">
                重置
              </el-button>
            </div>
          </el-row>
          <div class="paddT10" v-loading="loading" :element-loading-text="'加载中......'">
            <el-tabs v-model="activeCode" @tab-click="clickSheet">
              <el-tab-pane label="待办列表" name="T"></el-tab-pane>
              <el-tab-pane label="已办列表" name="D"></el-tab-pane>
            </el-tabs>
            <table-util
              :search-content.sync="searchContent"
              :id="'exportId'"
              :currentPage.sync="currentPage"
              :pageSize.sync="pageSize"
              :tableData="$filterTableContent(searchContent, tableData)"
            ></table-util>
            <el-table
              header-cell-class-name="tableHeaderStyle"
              id="exportId"
              :data="
                $filterTableContent(searchContent, tableData).slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize,
                )
              "
              style="width: 100%"
              size="small"
              :default-sort="{ prop: 'default' }"
            >
              <el-table-column
                show-overflow-tooltip
                v-for="(field, index) in tableFieldList"
                :key="index"
                sortable
                :fixed="field.fixed"
                :type="field.type === 'index' ? 'index' : ''"
                :index="(index) => $settingTableSerialNum(index, currentPage, pageSize)"
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
                :min-width="activeCode === 'T' ? '200' : '150'"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <div>
                    <template>
                      <el-link
                        @click.native="opreationProveData(scope.row, '0')"
                        :underline="false"
                        class="mr5"
                        type="primary"
                        size="mini"
                      >
                        预览
                      </el-link>
                      <el-link
                        @click.native="opreationProveData(scope.row, '7')"
                        :underline="false"
                        type="warning"
                        class="mr5"
                        size="mini"
                        v-if="scope.row.ZSTAT === '5' || scope.row.ZSTAT === '7'"
                      >
                        下载打印
                      </el-link>
                    </template>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="el-table-pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="$filterTableContent(searchContent, tableData).length"
              ></el-pagination>
            </div>
          </div>
        </el-form>
      </el-row>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :width="dialogWidth"
      :before-close="handleClose"
    >
      <prove-application :parentData="parentData" v-if="dialogVisible" @closeDialog="closeDialog"></prove-application>
    </el-dialog>
  </div>
</template>

<script>
import tableField from "../../pa/common/tableField"
import searchHelp from "../../../components/common/SearchHelp"
import ProveApplication from "./proveApplication"
import paSearchUser from "../components/paSearchUser"

export default {
  name: "proveApplicationList",
  components: {
    paSearchUser,
    ProveApplication,
    searchHelp,
  },
  data() {
    return {
      pageData: {
        zmlx: "",
        zmlx_t: "",
        employeeNum: "",
        employeeName: "",
      },
      queryData: {
        employeeNum: "",
        employeeName: "",
      },
      loading: false,
      activeCode: "",
      searchContent: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      tableFieldList: [],
      dialogTitle: "",
      dialogVisible: false,
      parentData: {},
      dialogWidth: "550px",
      baseParams: {},
      isActive: false,
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO) ? {} : JSON.parse(localStorage.CURRENT_USER_INFO),
      processEnv: import.meta.env,
      rowData: {}, //-证明列表-行数据，用于dialog显示
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
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 每页显示多少条
     * @update  08/04/2022
     * @param val pageSize
     * @returns {*}
     */
    handleSizeChange(val) {
      this.pageSize = val
    },
    /**
     * @Copyright DELOITTE
     * @Description: 当前页
     * @update  08/04/2022
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
    queryDataList() {
      this.currentPage = 1
      this.tableData = []
      let params = {
        sapInterface: "SH033",
        IV_USER: "",
        IV_PERNR:
          this.baseParams.MENUII === this.pageCode.ZMKJ ? this.currentUserInfo.PERNR : this.queryData.employeeNum,
        IV_ORGEH: this.queryData.orgID,
        IV_ZMLXBM: this.queryData.zmlx,
        IV_BEGDA: this.$formatDate(this.queryData.startDate, "num"),
        IV_ENDDA: this.$formatDate(this.queryData.endDate, "num"),
        IV_IPAGE: this.baseParams.MENUII,
        IV_TYPE: this.activeCode,
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        this.tableData = response.ET_OUTPUT || []
      })
    },
    /**
     * @Copyright DELOITTE
     * @Description: 重置表单
     * @update  08/04/2022
     * @returns {*}
     */
    restForm() {
      this.queryData = {}
      //清空组件的value
      this.$refs.paSearchUser.emptMyValue()
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  页面初始化函数
     * @date 2020年07月20日
     */
    initFunction() {
      this.baseParams = this.$route.query
      if (this.baseParams.MENUII === this.pageCode.ZMGL) {
        this.activeCode = "T"
        this.baseParams.buttonName = "新建办理"
        this.tableFieldList = tableField(this.baseParams.MENUII, this.activeCode)
      } else {
        this.activeCode = ""
        this.baseParams.buttonName = "新建申请"
        this.tableFieldList = tableField(this.baseParams.MENUII)
      }
      this.queryDataList()
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  点击sheet页更新表格相关数据
     * @date 2020年07月20日
     */
    clickSheet() {
      this.tableFieldList = tableField(this.baseParams.MENUII, this.activeCode)
      this.queryDataList()
    },
    /**
     * @Copyright DELOITTE
     * @Description: 关闭弹框
     * @update  08/04/2022
     * @param state 关闭弹框标识
     */
    closeDialog(state) {
      this.dialogVisible = false
      if (state === "Q") {
        this.queryDataList()
      }
    },
    /**
     * @Copyright DELOITTE
     * @Description: 弹框关闭事件
     * @update  08/04/2022
     * @param done
     * @returns {*}
     */
    handleClose(done) {
      this.dialogVisible = false
      done && done()
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  申请证件
     * @date 2020年07月20日
     */
    newApplication() {
      this.isActive = true
      this.rowData = {}
      //员工
      if (this.pageData.zmlx === "" && this.baseParams.MENUII === this.pageCode.ZMKJ) return
      //HR
      if ((!this.pageData.employeeName || !this.pageData.zmlx) && this.baseParams.MENUII === this.pageCode.ZMGL) return
      this.parentData = this.baseParams
      this.parentData.proveId = this.pageData.zmlx
      this.parentData.proveText = this.pageData.zmlx_t
      this.dialogTitle = this.pageData.zmlx_t
      this.dialogVisible = true

      this.parentData.employeeNum = this.pageData.employeeNum
      this.parentData.employeeName = this.pageData.employeeName
      this.parentData.company = this.pageData.company

      this.parentData.isNew = true
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  员工查询回调
     * @date 2020年07月20日
     * @param obj 人员对象
     * @param state
     */
    getEmployeeData(obj, state) {
      if (state === "P") {
        this.pageData.employeeName = obj.employeeName
        this.pageData.employeeNum = obj.employeeNum
        this.pageData.company = obj.company
      } else if (state === "Q") {
        this.queryData.employeeName = obj.employeeName
        this.queryData.employeeNum = obj.employeeNum
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  清空选择的人员
     * @date 2020年07月20日
     * @param state
     */
    emptValue(state) {
      if (state === "P") {
        this.pageData.employeeName = ""
        this.pageData.employeeNum = ""
      } else if (state === "Q") {
        this.queryData.employeeName = ""
        this.queryData.employeeNum = ""
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  树的回调函数
     * @date 2020年07月20日
     * @param nodeObject 节点对象
     */
    getTreeCallback(nodeObject) {
      this.queryData.orgName = nodeObject.text
      this.queryData.orgID = nodeObject.id
    },
    /**
     * @Copyright DELOITTE
     * @Description: 打开链接
     * @update  08/04/2022
     * @param url
     * @param type
     * @returns {*}
     */
    wopen(url, type) {
      window.open(url, type ? type : "_blank")
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  操作证明数据
     * @date 2020年07月20日
     * @param item 证明数据
     * @param state 操作标识
     */
    opreationProveData(item, state) {
      if (state === "1" || state === "2" || state === "7") {
        this.$confirm(
          state === "1"
            ? "请选择下载完成的证明进行打印"
            : "是否确认操作",
          "提示",
          {
            type: "info",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            confirmButtonClass: "confirmButtonClass",
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            center: true,
          },
        ).then(() => {
          this.handleOpreationProveData(item, state)
        })
      } else if (item && state === "0") {
        this.$previewFile(item.FILEID, item.FILENAME)
      }
    },
    /**
     * @Copyright DELOITTE
     * @Description:
     * @update  11/04/2022
     * @param item 证明数据
     * @param state 操作标识
     * @returns {*}
     */
    handleOpreationProveData(item, state) {
      //下载证明，并且更改证明状态
      if (state === "1" || state === "7") {
        this.$downloadFile(item.FILEID, item.FILENAME)
      }
      //7是已下载打印的状态 所以不需要在更改状态
      if (item.ZSTAT !== "7") {
        let params = {
          sapInterface: "SH032",
          IV_GUID: item.GUID,
          IV_PERNR: item.PERNR,
          IV_ZMLXBM: item.ZMLXBM,
          IV_STATS: state,
          IV_FILEID: item.FILEID,
          IV_FILENAME: item.FILENAME,
          IV_IPAGE: this.baseParams.MENUII,
          IV_USER: "",
        }
        this.$httpServer.sap.baseMethod(params).then((response) => {
          let es_message = response.ES_MESSAGE
          if (es_message.MSGTY === "S") {
            this.$message.success(es_message.MSGTX)
            //关闭弹框
            this.queryDataList()
            if (state === "D") {
              this.$downloadFile(item.FILEID, item.FILENAME)
            }
          }
        })
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  页面监听查询
     * @date 2020年07月20日
     */
    addEventListener() {
      this.$eventVisibility(() => this.queryDataList())
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  单元格样式
     *  流程 ZSTAT  4=>审批中 5=>审批通过 6=>审批不通过 v=>待发起K2审批  D=>作废
     * @date 2020年07月20日
     * @param row
     * @param column
     * @param rowIndex
     * @param columnIndex
     * @returns {{}}
     */
    handleCellStyle({ row, column, rowIndex, columnIndex }) {
      let styleObj = {}
      if (column.property === "ZSTAT_T" && (row.ZSTAT === "4" || row.ZSTAT === "5" || row.ZSTAT === "6")) {
        styleObj = "color:#009fdf;cursor:pointer;"
      }
      return styleObj
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  单元格点击事件 跳转k2页面
     *  流程 ZSTAT  4=>审批中 5=>审批通过 6=>审批不通过 v=>待发起K2审批  D=>作废
     * @date 2020年07月20日
     * @param row
     * @param column
     */
    handleCellClick(row, column) {
      let processCode = row.ZWFNO //流程processCode
      let guid = row.GUID //业务GUID
      if (column.property === "ZSTAT_T" && (row.ZSTAT === "4" || row.ZSTAT === "5" || row.ZSTAT === "6")) {
        this.$openWorkflowPage(guid, processCode, "ViewUrl")
      }
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  发起k2流程
     * @date 2020年07月20日
     * @param rowObject 行数据
     */
    startk2Workflow(rowObject) {
      this.$startWorkFlow({
        guid: rowObject.GUID,
        processType: rowObject.ZWFNO,
        workflowSubject: rowObject.TITLE,
      })
    },
    /**
     * @Copyright  DELOITTE
     * @Description:  发起k2流程
     * @date 2020年07月20日
     * @param rowObject 行数据
     */
    deleteProve(rowObject) {
      this.$confirm("是否确定删除", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        confirmButtonClass: "confirmButtonClass",
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        center: true,
      }).then(() => {
        let params = {
          IV_USER: "",
          IV_PERNR: rowObject.PERNR,
          IV_IPAGE: this.baseParams.MENUII,
          IV_GUID: rowObject.GUID,
          sapInterface: "SH034",
        }
        this.$httpServer.sap.baseMethod(params).then((response) => {
          let ES_MESSAGE = response.ES_MESSAGE
          if (ES_MESSAGE.MSGTY === "E") return
          this.$message.success(ES_MESSAGE.MSGTX || "删除成功！")
          this.queryDataList()
        })
      })
    },
  },
  created() {
    this.initFunction()
    this.addEventListener()
  },
}
</script>

<style scoped>
.ibox-content {
  padding-top: 10px;
}
</style>
