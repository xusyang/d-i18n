<template>
  <div class="demo-a">
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <div
      class="bt-box-p"
      v-if="
        buttonList.length > 0 &&
        isShowButtn &&
        MENUII !== pageCode.RCKGL &&
        MENUII !== pageCode.XXCJYJ
      "
    >
      <el-button
        class="pa-but-mgtb"
        size="mini"
        :type="item.COLOR"
        v-for="(item, index) in buttonList"
        :key="index"
        :loading="otherOperationLoading"
        @click="buttonEvent(item)"
        v-if="item.FUNCT"
      >
        {{ item.FUNCT }}
      </el-button>
    </div>
    <div class="ibox-content mt10">
      <el-row>
        <el-form
          class="mt20"
          size="mini"
          ref="queryForm"
          :model="queryForm"
          label-width="120px"
        >
          <el-row justify="space-between">
            <el-col
              class="el-col-sm-8"
              v-if="
                MENUII === pageCode.ZPXQ ||
                MENUII === pageCode.RWGL ||
                MENUII === pageCode.FBGG
              "
            ></el-col>
            <el-col
              class="el-col-sm-8"
              v-else-if="
                MENUII !== pageCode.LYGL &&
                MENUII !== pageCode.RZZB &&
                MENUII !== pageCode.LZSXBL &&
                MENUII !== pageCode.YRZGL &&
                MENUII !== pageCode.PARZGL &&
                MENUII !== pageCode.PAXXCJ &&
                MENUII !== pageCode.OFGL &&
                MENUII !== pageCode.RCKGL
              "
            >
              <el-form-item label="员工姓名：" prop="employeeNum">
                <pa-search-user
                  ref="paSearchUser"
                  :ipage="MENUII"
                  @getEmployeeData="getEmployeeData"
                  :default-value="defaultEmployeeValue"
                  @emptValue="emptValue"
                ></pa-search-user>
              </el-form-item>
            </el-col>
            <el-col
              class="el-col-sm-8"
              v-else-if="MENUII !== pageCode.RZZB && MENUII !== pageCode.LZSXBL"
            >
              <el-form-item label="员工姓名：" prop="employeeName">
                <el-input
                  v-model="queryForm.employeeName"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="el-col-sm-8">
              <el-form-item
                label="单位"
                prop="orgID"
                v-if="MENUII !== pageCode.RZZB && MENUII !== pageCode.LZSXBL"
              >
                <Tree
                  :readonly="true"
                  :pagecode="MENUII"
                  :text="queryForm.orgName"
                  :value.sync="queryForm.orgID"
                  :treestyle="{
                    top: '28px'
                  }"
                  :callback="getTreeCallback"
                ></Tree>
              </el-form-item>
            </el-col>
            <el-col
              class="el-col-sm-8"
              v-if="
                MENUII === pageCode.ZPXQ ||
                MENUII === pageCode.RWGL ||
                MENUII === pageCode.FBGG
              "
            >
              <el-form-item label="岗位" prop="plansID">
                <el-input
                  v-if="!isPLANS"
                  placeholder="请选择岗位"
                  v-model="queryForm.plansID"
                  readonly
                ></el-input>
                <Tree
                  v-if="isPLANS"
                  :readonly="true"
                  treetype="YS"
                  :text="queryForm.plansName"
                  :parameter="{
                    czbs: 'YS',
                    id: queryForm.orgID
                  }"
                  :value.sync="queryForm.plansID"
                  :treestyle="{
                    top: '28px'
                  }"
                ></Tree>
              </el-form-item>
            </el-col>
            <template v-if="MENUII === pageCode.RZZB">
              <el-col class="el-col-sm-12">
                <el-form-item label="拟入职员工" prop="employeeName">
                  <el-input
                    v-model="queryForm.employeeName"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="任务标题" prop="employeeName">
                  <el-input
                    v-model="queryForm.titeName"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="待办接收开始日期" prop="beginDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="queryForm.beginDate"
                    style="width: 100%"
                    @change.native="(e) => $dateMask(e, queryForm, 'beginDate')"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="待办接收结束日期" prop="endDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="queryForm.endDate"
                    style="width: 100%"
                    @change.native="(e) => $dateMask(e, queryForm, 'endDate')"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </template>

            <template v-if="MENUII === pageCode.LZSXBL">
              <el-col class="el-col-sm-12">
                <el-form-item label="离职员工" prop="employeeName">
                  <el-input
                    v-model="queryForm.employeeName"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="任务标题" prop="employeeName">
                  <el-input
                    v-model="queryForm.titeName"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="待办接收开始日期" prop="beginDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="queryForm.beginDate"
                    style="width: 100%"
                    @change.native="(e) => $dateMask(e, queryForm, 'beginDate')"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="el-col-sm-12">
                <el-form-item label="待办接收结束日期" prop="endDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="queryForm.endDate"
                    style="width: 100%"
                    @change.native="(e) => $dateMask(e, queryForm, 'endDate')"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </template>

            <el-col
              class="el-col-sm-8"
              v-if="MENUII !== pageCode.RZZB && MENUII !== pageCode.LZSXBL"
            >
              <el-form-item label="开始日期" prop="beginDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="queryForm.beginDate"
                  style="width: 100%"
                  @change.native="(e) => $dateMask(e, queryForm, 'beginDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="el-col-sm-8"
              v-if="MENUII !== pageCode.RZZB && MENUII !== pageCode.LZSXBL"
            >
              <el-form-item label="结束日期" prop="endDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="queryForm.endDate"
                  style="width: 100%"
                  @change.native="(e) => $dateMask(e, queryForm, 'endDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <div class="fr">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-search"
                :loading="loading"
                @click="queryDataList('X')"
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

      <el-tabs
        v-model="activeCode"
        @tab-click="queryDataList"
        v-loading="loading"
        stripe
        element-loading-text="加载中....."
      >
        <el-tab-pane
          v-for="tableSheet in tableSheetList"
          :label="tableSheet.LDESC"
          :name="tableSheet.LISTT"
          :key="tableSheet.LISTT"
        >
          <div class="clearfix" v-show="tableFieldList.length > 0">
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
                :cell-style="handleCellStyle"
                @cell-click="handleCellClick"
              >
                <el-table-column
                  show-overflow-tooltip
                  sortable
                  v-for="(field, fieldIndex) in tableFieldList"
                  header-align="center"
                  :key="fieldIndex"
                  :fixed="field.fixed"
                  :prop="field.prop"
                  :label="field.label"
                  :min-width="field.width"
                  :type="field.type === 'index' ? 'index' : ''"
                  :index=";(index) => $settingTableSerialNum(index, currentPage, pageSize)
"
                  align="center"
                  :formatter=";(row, column, cellValue) => formatter(row, column, cellValue, field)
"
                >
                  <template slot-scope="scope">
                    <template
                      v-if="
                        MENUII === pageCode.RZZB &&
                        field.prop === 'ZSUR_DATE' &&
                        scope.row.ZRED === 'X'
                      "
                    >
                      <div class="redLabel">
                        {{ scope.row[field.prop] }}
                      </div>
                    </template>
                    <template
                      v-else-if="
                        MENUII === pageCode.LZSXBL &&
                        field.prop === 'ZSUR_DATE' &&
                        scope.row.ZRED === 'X'
                      "
                    >
                      <div class="redLabel">
                        {{ scope.row[field.prop] }}
                      </div>
                    </template>
                    <template v-else-if="field.type === 'index'">
                      {{ scope.$index + 1 }}
                    </template>
                    <template v-else>
                      {{ scope.row[field.prop] }}
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="operation"
                  label="操作"
                  :width="operationWiidth"
                  header-align="center"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div>
                      <template v-if="MENUII === pageCode.RZZB">
                        <el-link
                          @click.native="operationEvent(scope.row, 'ENTRY')"
                          type="primary"
                          v-show="
                            MENUII === pageCode.RZZB && activeCode === 'F'
                          "
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          查看
                        </el-link>
                        <el-link
                          @click.native="operationEvent(scope.row, 'ENTRY')"
                          type="primary"
                          v-show="
                            MENUII === pageCode.RZZB && activeCode === 'T'
                          "
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          处理
                        </el-link>
                      </template>
                      <template
                        v-else-if="
                          MENUII === pageCode.PAHTGLJT &&
                          scope.row.ZSTAT === 'F'
                        "
                      >
                        <el-link
                          @click.native="sign(scope.row)"
                          type="primary"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          签署
                        </el-link>
                      </template>
                      <template v-else-if="MENUII === pageCode.LZSXBL">
                        <el-link
                          @click.native="operationEvent(scope.row, 'LZSXBL')"
                          type="primary"
                          v-show="
                            MENUII === pageCode.LZSXBL && activeCode === 'F'
                          "
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          查看
                        </el-link>
                        <el-link
                          @click.native="operationEvent(scope.row, 'LZSXBL')"
                          type="primary"
                          v-show="
                            MENUII === pageCode.LZSXBL && activeCode === 'T'
                          "
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          处理
                        </el-link>
                      </template>
                      <template v-else>
                        <el-link
                          @click.native="operationEvent(scope.row, 'VIEW')"
                          type="primary"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          查看
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'F' &&
                            MENUII === pageCode.PALZGL &&
                            scope.row.UFSFILEID
                          "
                          @click.native="resignationDownload(scope.row)"
                          type="primary"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          下载
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'D' && MENUII === pageCode.PAHTDY
                          "
                          @click.native="paUrging(scope.row)"
                          type="danger"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          催办
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'B' && MENUII === pageCode.PALGGLSP
                          "
                          @click.native="palgUrging(scope.row)"
                          type="danger"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          催办
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'T' && MENUII === pageCode.ZPXQ
                          "
                          @click.native="operationEvent(scope.row, 'EDIT')"
                          type="primary"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          编辑
                        </el-link>
                        <el-link
                          v-show="
                            MENUII === pageCode.PAZZGLJT &&
                            activeCode === 'T' &&
                            (scope.row.ZSTAT === '0' || scope.row.ZSTAT === '1')
                          "
                          @click.native="operationEvent(scope.row, 'TODO')"
                          type="warning"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          推送员工待办
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'T' &&
                            scope.row.ZSTAT === '0' &&
                            MENUII === pageCode.RWGL
                          "
                          @click.native="operationEvent(scope.row, 'ASSIGN')"
                          type="warning"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          分配
                        </el-link>
                        <el-link
                          v-show="
                            activeCode === 'T' &&
                            scope.row.ZSTAT === '0' &&
                            MENUII === pageCode.FBGG
                          "
                          @click.native="operationEvent(scope.row, 'EDIT')"
                          type="warning"
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          编辑
                        </el-link>

                        <el-link
                          v-show="
                            activeCode === 'T' &&
                            (scope.row.ZSTAT === '0' ||
                              scope.row.ZSTAT === '1' ||
                              scope.row.ZSTAT === 'V') &&
                            MENUII !== pageCode.RCKGL &&
                            MENUII !== pageCode.YRZGL &&
                            MENUII !== pageCode.PAJDDGL &&
                            MENUII !== pageCode.PAFGGL &&
                            MENUII !== pageCode.PALGGL &&
                            MENUII !== pageCode.PAZZGLCHB
                          "
                          @click.native="operationEvent(scope.row, 'DEL')"
                          type="danger"
                          :underline="false"
                          size="mini"
                        >
                          删除
                        </el-link>
                        <el-link
                          v-show="activeCode === 'T' && scope.row.ZSTAT === 'R'"
                          @click.native="operationEvent(scope.row, 'GET')"
                          type="danger"
                          :underline="false"
                          size="mini"
                        >
                          重新审批
                        </el-link>
                        <el-link
                          v-show="
                            MENUII === pageCode.OFGL &&
                            activeCode === 'D' &&
                            (scope.row.ZSTAT === 'B' ||
                              scope.row.ZSTAT === 'C' ||
                              scope.row.ZSTAT === 'D')
                          "
                          @click.native="
                            operationEvent(scope.row, 'RESEND_OFFER')
                          "
                          type="primary"
                          :disabled="
                            scope.row.ZSTAT === 'C' ||
                            scope.row.ZSTAT === 'D' ||
                            (scope.row.ZCZRQ &&
                              scope.row.ZCZRQ !== '00000000' &&
                              new Date() -
                                new Date(
                                  scope.row.ZCZRQ.replace(
                                    /(\d{4})(\d{2})(\d{2})/g,
                                    '$1\/$2\/$3'
                                  )
                                ) >
                                30 * 1000 * 60 * 60 * 24)
                          "
                          :style="
                            scope.row.ZSTAT === 'C' ||
                            scope.row.ZSTAT === 'D' ||
                            (scope.row.ZCZRQ &&
                              scope.row.ZCZRQ !== '00000000' &&
                              new Date() -
                                new Date(
                                  scope.row.ZCZRQ.replace(
                                    /(\d{4})(\d{2})(\d{2})/g,
                                    '$1\/$2\/$3'
                                  )
                                ) >
                                30 * 1000 * 60 * 60 * 24)
                              ? 'color:#a1a1a1'
                              : ''
                          "
                          :underline="false"
                          size="mini"
                          class="mr5"
                        >
                          重新发送
                        </el-link>
                      </template>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="paddT10 text-center">
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :width="dialogWidth"
      :before-close="handleClose"
    >
      <batch-event-import
        :parentData="parentData"
        v-if="showDialog === 'import'"
        @closeDialog="closeDialog"
      ></batch-event-import>
      <batch-employment
        :parentData="parentData"
        v-if="showDialog === 'batchEmployment'"
        @closeDialog="closeDialog"
      ></batch-employment>
      <resume-import
        :parentData="parentData"
        v-if="showDialog === 'resume'"
        @closeDialog="closeDialog"
      ></resume-import>
      <send-offer
        :parentData="parentData"
        v-if="showDialog === 'offer'"
        @closeDialog="closeDialog"
      ></send-offer>
      <pa-event-urging
        :parentData="parentData"
        v-if="showDialog === 'urging'"
        @closeDialog="closeDialog"
      ></pa-event-urging>
    </el-dialog>
    <el-dialog
      title="支付宝扫描二维码，签署合同"
      :visible="signVisible"
      class="sign-dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :append-to-body="true"
      :before-close=";() => signClose()
"
    >
      <div class="select-title">选择待签合同</div>
      <el-select v-model="signUrl">
        <el-option
          v-for="item in ET_DZQZINFO"
          :key="item.SIGNURL"
          :label="item.FILENAME"
          :value="item.SIGNURL"
        ></el-option>
      </el-select>
      <div v-if="signVisible" id="qrcode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signClose"> 取 消 </el-button>
        <el-button type="primary" @click="signFile"> 签署完成 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 人员搜索
import paSearchUser from '../../pa/components/paSearchUser'
import BatchEventImport from './batchEventImport'
import BatchEmployment from './batchEmployment' //批导录用

// 表格字段 start

import tableField from '../../pa/common/tableField' //表格字段 end

import ResumeImport from '@/views/pa/personnelEvent/resumeImport'
import SendOffer from '../../rc/offer/sendOffer'
import PaEventUrging from './paEventUrging.vue' //表格字段 end

export default {
  name: 'index',
  components: {
    ResumeImport,
    BatchEventImport,
    BatchEmployment,
    paSearchUser,
    SendOffer,
    PaEventUrging
  },

  data() {
    return {
      signVisible: false,
      signUrl: '',
      signGUID: '',
      ET_DZQZINFO: [],
      queryForm: {
        beginDate: '',

        // 开始日期
        endDate: '',

        // 结束日期
        employeeName: '',

        // 员工姓名
        titeName: '',

        // 任务标题
        employeeNum: '',

        // 员工编号
        orgID: '',

        // 组织ID
        orgName: '',

        // 组织名称
        plansID: '',
        plansName: ''
      },
      loading: false,
      exportLoading: false,
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO),
      activeCode: '',

      // 当前table页签code
      searchContent: '',

      // 表格搜索内容
      tableData: [],

      // 表格数据
      currentPage: 1,

      // 当前页
      pageSize: 10,

      // 每页多少条
      MENUII: '',

      // pageCode
      buttonList: [],

      // 页面button数组
      isShowButtn: false,
      tableSheetList: [],

      // 待办table页签数组
      tableFieldList: [],

      // 表格字段数组
      parentData: {},

      // 父页面数据（当前页面，用于弹框）
      showDialog: '',

      // 显示弹框
      dialogVisible: false,

      // 弹框控制参数
      dialogTitle: '',

      // 弹框标题
      defaultEmployeeValue: '',

      // 默认的员工值,
      operationWiidth: 100,

      // 操作列的宽度
      isPLANS: false,
      otherOperationLoading: false,

      // 其他操作loading 比如同步大易数据
      currentAppEnv: import.meta.env,
      dialogWidth: '1000px'
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
      if (newVal.fullPath === oldVal.fullPath) return
      this.initFunction()
    }
  },
  methods: {
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
     * @Description: 监听当前页变更
     * @update  07/04/2022
     * @param val currentPage
     * @returns {*}
     */
    handleCurrentChange(val) {
      this.currentPage = val
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取查询参数
     * @date 2020年07月20日
     * @returns {*}
     */
    getQueryParams() {
      let sapInterface = ''
      let activeCode = {}

      if (this.pageCode.YRZGL === this.MENUII) {
        sapInterface = 'PE064'
        activeCode = {
          IV_DBLX: this.activeCode
        }
      } else if (this.pageCode.RZZB === this.MENUII) {
        sapInterface = 'PE066'
        activeCode = {
          IV_TOCHECK: this.activeCode,
          IV_TITE: this.queryForm.titeName //任务标题
        }
      } else if (this.pageCode.LZSXBL === this.MENUII) {
        sapInterface = 'PE087'
        activeCode = {
          IV_TOCHECK: this.activeCode,
          IV_TITE: this.queryForm.titeName,

          // 任务标题
          IV_USER: JSON.parse(localStorage.getItem('CURRENT_USER_INFO')).PERNR
        }
      } else if (this.pageCode.PALGGLSP === this.MENUII) {
        sapInterface = 'PE099'
        activeCode = {
          IV_DBLX: this.activeCode
        }
      } else {
        activeCode = {
          IV_DBLX: this.activeCode
        }
        sapInterface = 'PE005'
      }

      let params = {
        sapInterface: sapInterface,
        IV_USER: '',
        IV_ORGEH: this.queryForm.orgID,
        IV_BEGDA: this.$isEmpty(this.queryForm.beginDate)
          ? ''
          : new Date(this.queryForm.beginDate).Format('yyyyMMdd'),
        IV_ENDDA: this.$isEmpty(this.queryForm.endDate)
          ? ''
          : new Date(this.queryForm.endDate).Format('yyyyMMdd'),
        IV_ENAME: this.queryForm.employeeName,
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
     * @Description: 查询公共的事件待办列表
     * @date 2020年07月20日
     * @param isClickQuery 是否点击按钮 查询，【X->是】
     * @returns {*}
     */
    queryDataList(isClickQuery) {
      this.currentPage = 1
      this.tableData = [] // 更新公共的table表头

      isClickQuery !== 'X' && this.getTableField()
      let params = {}

      if (
        this.MENUII === this.pageCode.ZPXQ ||
        this.MENUII === this.pageCode.RWGL ||
        this.MENUII === this.pageCode.FBGG
      ) {
        params = {
          sapInterface: 'RC042',
          IV_USER: JSON.parse(localStorage.getItem('CURRENT_USER_INFO')).PERNR,
          IV_IPAGE: this.MENUII,
          IV_DBLX: this.activeCode,
          IV_ORGEH: this.queryForm.orgID,
          IV_PLANS: this.queryForm.plansID,
          IV_BEGDA: this.$isEmpty(this.queryForm.beginDate)
            ? ''
            : new Date(this.queryForm.beginDate).Format('yyyyMMdd'),
          IV_ENDDA: this.$isEmpty(this.queryForm.endDate)
            ? ''
            : new Date(this.queryForm.endDate).Format('yyyyMMdd')
        }
      } else {
        params = this.getQueryParams()
      } //降档 离岗 返岗查询不同接口

      if (
        this.MENUII === this.pageCode.PAFGGL ||
        this.MENUII === this.pageCode.PALGGL ||
        this.MENUII === this.pageCode.PAJDDGL ||
        this.MENUII === this.pageCode.PAZZGLCHB
      ) {
        params.sapInterface = 'PA046'
      }

      this.$httpServer.sap.baseMethod(params).then((response) => {
        let et_data = []

        if (
          this.MENUII === this.pageCode.RZZB ||
          this.MENUII === this.pageCode.LZSXBL
        ) {
          et_data = response.ET_LIST
        } else if (
          this.MENUII === this.pageCode.PALGGLSP ||
          this.MENUII === this.pageCode.PAFGGL ||
          this.MENUII === this.pageCode.PALGGL ||
          this.MENUII === this.pageCode.PAJDDGL ||
          this.MENUII === this.pageCode.PAHTGLJT
        ) {
          et_data = response.ET_OUTPUT
        } else {
          et_data = response.ET_DATA
        }

        if (!this.$isEmpty(et_data)) {
          this.tableData = et_data
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 重置form表单
     * @date 2020年07月20日
     * @update  1、2020-09-14 DELOITTE-PengKang 增加清空人员字段
     */
    restForm() {
      this.$refs['queryForm'].resetFields() //手动清空人员和组织

      this.queryForm.orgID = ''
      this.queryForm.orgName = ''
      this.queryForm.plansName = ''
      this.queryForm.plansID = ''
      this.queryForm.employeeName = ''
      this.queryForm.employeeNum = ''
      this.queryForm.beginDate = ''
      this.queryForm.endDate = '' //清空组件的value

      this.$refs.paSearchUser && this.$refs.paSearchUser.emptMyValue()
    },

    /**
     * @Copyright DELOITTE
     * @Description: 人员查询回调
     * @date 2020年07月20日
     * @param obj 人员对象
     */
    getEmployeeData(obj) {
      this.queryForm.employeeName = obj.employeeName
      this.queryForm.employeeNum = obj.employeeNum
    },

    /**
     * @Copyright DELOITTE
     * @Description: 清空选择的人员
     * @date 2020年07月20日
     */
    emptValue() {
      this.queryForm.employeeName = ''
      this.queryForm.employeeNum = ''
    },

    /**
     * @Copyright DELOITTE
     * @Description: 树的回调函数
     * @date 2020年07月20日
     * @param nodeObject 节点对象
     */
    getTreeCallback(nodeObject) {
      this.queryForm.plansName = ''
      this.queryForm.plansID = ''
      this.isPLANS = false
      setTimeout(() => (this.isPLANS = true), 0)
    },

    /**
     * @Copyright DELOITTE
     * @Description: 页面初始化函数 统一入口
     * @date 2020年07月20日
     */
    initFunction() {
      this.MENUII = this.$route.query.MENUII //清空组件的value

      this.$refs.paSearchUser && this.$refs.paSearchUser.emptMyValue()
      this.defaultEmployeeValue = ''
      this.queryForm = {
        content: '',
        beginDate: '',
        endDate: '',
        orgName: '',
        orgID: '',
        employeeNum: '',
        employeeName: ''
      }
      this.isShowButtn = false
      this.buttonList = [] //合同管理初始化时间范围：为前一月到现在；

      if (this.MENUII === this.pageCode.LZSXBL) {
        this.queryForm.beginDate = ''
        this.queryForm.endDate = ''
      } else {
        this.queryForm.beginDate = this.$settingDefaultDate(2, 'first')
        this.queryForm.endDate = this.$settingDefaultDate(2, 'after')
      }

      let backingQueryParams = this.$route.query.backingQueryParams

      if (this.$route.query && backingQueryParams) {
        try {
          backingQueryParams = JSON.parse(backingQueryParams)
          Object.assign(this.queryForm, backingQueryParams)

          if (this.queryForm.employeeName) {
            this.defaultEmployeeValue = this.queryForm.employeeName
          }
        } catch (e) {
          console.warn('查询参数JSON转换异常', e)
        }
      }

      this.getEventOprationButton()
      this.getTableSheet()
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取事件操作按钮
     * @date 2020年07月20日
     */
    getEventOprationButton() {
      this.$httpServer.sap
        .baseMethod({
          sapInterface: 'PE051',
          IV_USER: '',
          IV_MENUID: this.MENUII
        })
        .then((response) => {
          let et_funcs = response.ET_FUNCS

          if (!this.$isEmpty(et_funcs)) {
            this.buttonList = et_funcs
            this.$sortInfoList(this.buttonList, 'SORTID', 'asc')

            for (let s in et_funcs) {
              if (et_funcs[s].FUNCT) {
                this.isShowButtn = true
                break
              }
            }
          } //保存操作日志

          this.$commitLog({
            parentModuleCode: 'HOME_HR',
            moduleName: localStorage.getItem('currentPageText'),
            moduleCode: this.MENUII,
            subModule: 'QUERY',
            subModuleName: '查询',
            describe:
              this.currentUserInfo.ENAME +
              '获取' +
              localStorage.getItem('currentPageText') +
              '界面的操作按钮',
            viewPernr: ''
          })
        })
    },

    /**
     * @Copyright DELOITTE
     * @Description:  button事件
     * @date 2020年07月20日
     * @param param 参数
     */
    buttonEvent(param) {
      if (param.ZBATCH === 'X') {
        this.openBatchImportPage(param)
      } else if (
        (this.pageCode.PARZGL === this.MENUII && param.FUNC === 'FC10') ||
        (this.pageCode.LYGL === this.MENUII && param.FUNC === 'FC05') ||
        (this.pageCode.YRZGL === this.MENUII && param.FUNC === 'FC05')
      ) {
        // 入职管理获取校招人员数据，录用管理获取候选人信息
        this.synchBigEasyData(this.pageCode.PARZGL === this.MENUII ? 'D' : 'N')
      } else {
        let url = ''

        if (this.pageCode.WDGZ === this.MENUII) {
          url = '/ess/getFileds'
        } else if (
          this.pageCode.PASXRZ === this.MENUII ||
          this.pageCode.PASXLZ === this.MENUII ||
          this.pageCode.PASXXY === this.MENUII
        ) {
          url = '/sx/getFileds'
        } else if (
          this.pageCode.LYGL === this.MENUII ||
          this.pageCode.YRZGL === this.MENUII ||
          this.pageCode.OFGL === this.MENUII ||
          this.pageCode.RCKGL === this.MENUII
        ) {
          url = '/rc/getFileds'
        } else if (this.pageCode.PAHTGL === this.MENUII) {
          url = '/ht/getFileds'
        } else if (this.pageCode.YGZZ === this.MENUII) {
          url = '/mss/getFileds'
        } else if (this.pageCode.ZPXQ === this.MENUII) {
          url = '/rc/sendNewNeed'
        } else if (
          this.pageCode.PALGGLSP === this.MENUII &&
          param.FUNC === 'LG3'
        ) {
          url = '/sp/workshift'
        } else if (
          this.pageCode.PALGGLSP === this.MENUII &&
          param.FUNC === 'LG6'
        ) {
          url = '/sp/batchFixed'
        } else if (
          this.pageCode.PALGGLSP === this.MENUII &&
          param.FUNC === 'LG5'
        ) {
          url = '/sp/fixedResult'
        } else {
          url = '/pa/getFileds'
        }

        param.MENUII = this.MENUII
        param.STAT = ''
        this.$router.push({
          path: url,
          query: param
        })
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description:  获取table 页签
     * @date 2020年07月20日
     */
    getTableSheet() {
      this.$httpServer.sap
        .baseMethod({
          sapInterface: 'PE052',
          IV_USER: JSON.parse(localStorage.getItem('CURRENT_USER_INFO')).PERNR,
          IV_MENUID: this.MENUII
        })
        .then((response) => {
          let et_list = response.ET_LIST

          if (!this.$isEmpty(et_list)) {
            et_list = this.$sortInfoList(et_list, 'SORTID', 'asc')
            this.activeCode = this.$isEmpty(this.queryForm.activeCode)
              ? et_list[0]['LISTT']
              : this.queryForm.activeCode
            this.getTableField()
            this.tableSheetList = et_list
            this.queryDataList()
          } else {
            this.tableSheetList = []
          }
        })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 签署合同
     * @update  07/04/2022
     * @param row 行
     * @returns {*}
     */
    sign(row) {
      this.currentRow = row
      this.$httpServer.sap
        .baseMethod({
          sapInterface: 'DZ004',
          IV_GUID: row.GUID
        })
        .then((response) => {
          this.ET_DZQZINFO = response.ET_DZQZINFO
          if (this.ET_DZQZINFO.length === 0)
            return this.$message.error('暂无可签署合同')
          this.signUrl = this.ET_DZQZINFO[0].SIGNURL
          this.signGUID = this.ET_DZQZINFO[0].GUID
          this.signVisible = true
          this.$nextTick(() => {
            new QRCode('qrcode').makeCode(this.signUrl)
          })
        })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 关闭签署弹窗
     * @update  07/04/2022
     * @returns {*}
     */
    signClose() {
      this.signVisible = false
    },

    /**
     * @Copyright DELOITTE
     * @Description: 签署完成
     * @update  07/04/2022
     * @returns {*}
     */
    async signFile() {
      try {
        let params = {}
        params.IV_GUID = this.signGUID
        params.IV_STATUS = 'H'
        params.sapInterface = 'DZ002'
        const res = await this.$httpServer.sap.baseMethod(params)
        let ES_MESSAGE = res.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'S') {
          // 成功
          this.$message.success('签署完成')
          this.signVisible = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description:  表格列表操作事件
     * @date 2020年07月20日
     * @param rowobject 行数据
     * @param operationType 操作类型 VIEW=>查看 , DEL=> 删除
     */
    operationEvent(rowobject, operationType) {
      switch (operationType) {
        case 'LZSXBL':
          this.openPage(rowobject, operationType)
          break

        case 'VIEW':
          this.openPage(rowobject, operationType)
          break

        case 'ENTRY':
          // 入职模式
          this.openPage(rowobject, operationType)
          break

        case 'DEL':
          this.$confirm('是否确定删除？', '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmButtonClass',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            center: true
          }).then(() => {
            // 删除
            this.operationData(rowobject, operationType)
          })
          break

        case 'TODO':
          // 发送待办
          this.sendTODO(rowobject)
          break

        case 'ASSIGN':
          // 发送待办
          this.openPage(rowobject, operationType)
          break

        case 'EDIT':
          // 发送待办
          this.openPage(rowobject, operationType)
          break

        case 'VIEWK2':
          this.$openWorkflowPage(rowobject.GUID, 'RecruitmentNeed', 'ViewUrl')
          break

        case 'RESEND_OFFER':
          this.changeOfferStatus(rowobject)
          break

        case 'GET':
          this.changeSendStatus(rowobject)
          break

        default:
          break
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description:  操作数据
     * @date 2020年07月20日
     * @param rowobject 行数据
     * @param operationType 操作类型 VIEW=>查看 , DEL=> 删除
     */
    operationData(rowobject, operationType) {
      let params = {}

      if (this.pageCode.ZPXQ === this.MENUII) {
        params = {
          sapInterface: 'RC040',
          IV_USER: JSON.parse(localStorage.getItem('CURRENT_USER_INFO')).PERNR,
          IV_IPAGE: this.MENUII,
          IV_STATS: 'X',
          IS_INPUT: JSON.stringify(rowobject)
        }
      } else {
        params = {
          sapInterface: 'PE014',
          IV_USER: '',
          IV_GUID: rowobject.GUID,
          IV_OPERA: operationType
        }
      }

      this.$httpServer.sap.baseMethod(params).then((response) => {
        let ES_MESSAGE = response.ES_MESSAGE //保存操作日志

        this.$commitLog({
          parentModuleCode: 'HOME_HR',
          moduleName: localStorage.getItem('currentPageText'),
          moduleCode: this.MENUII,
          subModule: 'DELETE',
          subModuleName: '删除',
          viewPernr: rowobject.PERNR,
          describe:
            this.currentUserInfo.ENAME +
            '删除' +
            rowobject.ENAME +
            localStorage.getItem('currentPageText') +
            '的待办数据'
        })

        if (ES_MESSAGE.MSGTY === 'S') {
          this.$message.success(ES_MESSAGE.MSGTX || '操作成功')
          this.queryDataList()
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description:  打开事件操作页面
     * @date 2020年07月20日
     * @param rowobject 行数据
     * @param operationType 操作类型 VIEW=>查看 , DEL=> 删除
     */
    openPage(rowobject, operationType) {
      let url = ''
      let params = {
        GUID: rowobject.GUID,
        MENUII: this.MENUII,
        SUBKEY: rowobject.SUBKEY,
        STAT: rowobject.ZSTAT
      }
      this.MENUII === this.pageCode.PARZGL && (params.REHIRE = rowobject.RHIRE)

      if (this.pageCode.WDGZ === this.MENUII) {
        url = '/ess/getFileds'
      } else if (
        this.pageCode.PASXRZ === this.MENUII ||
        this.pageCode.PASXLZ === this.MENUII ||
        this.pageCode.PASXXY === this.MENUII
      ) {
        url = '/sx/getFileds'
      } else if (
        this.pageCode.LYGL === this.MENUII ||
        this.pageCode.YRZGL === this.MENUII ||
        this.pageCode.OFGL === this.MENUII ||
        this.pageCode.RCKGL === this.MENUII
      ) {
        url = '/rc/getFileds'
      } else if (this.pageCode.PAHTGL === this.MENUII) {
        url = '/ht/getFileds'
        params.PERNR = rowobject.PERNR
      } else if (this.pageCode.YGZZ === this.MENUII) {
        url = '/mss/getFileds'
      } else if (this.pageCode.PAXXCJ === this.MENUII) {
        params.PERNR = ''
        params.ICNUM = ''
        params.ICTYP = ''
        params.REHIRE = rowobject.RHIRE
      } else if (this.pageCode.PAHTDY === this.MENUII) {
        params.PERNR = rowobject.PERNR
        params.paContractList = rowobject
        url = '/ht/contractPrinting'
      } else if (
        operationType === 'ASSIGN' &&
        this.pageCode.RWGL === this.MENUII
      ) {
        url = '/rc/taskAssign'
      } else if (
        (this.pageCode.ZPXQ === this.MENUII ||
          this.pageCode.RWGL === this.MENUII ||
          this.pageCode.FBGG === this.MENUII) &&
        operationType === 'VIEW'
      ) {
        params.isSee = true
        url = '/rc/sendNewNeed'
      } else if (
        (this.pageCode.ZPXQ === this.MENUII ||
          this.pageCode.FBGG === this.MENUII) &&
        operationType === 'EDIT'
      ) {
        url = '/rc/sendNewNeed'
      } else if (operationType === 'ENTRY') {
        // 入职模式
        params.isEntry = '1' //判断只读还是可改

        if (this.activeCode === 'F') {
          // 1只读
          params.isEntry = '1'
        } else {
          // 2可改
          params.isEntry = '2'
        }

        url = '/pa/entryPreparation'
      } else if (operationType === 'LZSXBL') {
        params.LZSX = rowobject.ZAPPROVAL_ROLE
        url = '/qm/quitProcedures'
      } else if (
        this.pageCode.PALGGLSP === this.MENUII &&
        rowobject.FUNC === 'LG3' &&
        rowobject.ZZHTQXLX_T
      ) {
        // 批量轮岗申请
        url = '/sp/workshift'
        params.GUID = rowobject.ZZHTQXLX_T
      } else if (
        this.pageCode.PALGGLSP === this.MENUII &&
        rowobject.FUNC === 'LG5' &&
        rowobject.ZZHTQXLX_T
      ) {
        // 定岗结果审批
        url = '/sp/fixedResult'
        params.GUID = rowobject.ZZHTQXLX_T
      } else if (
        this.pageCode.PALGGLSP === this.MENUII &&
        rowobject.FUNC === 'LG6' &&
        rowobject.ZZHTQXLX_T
      ) {
        // 批量定岗申请
        url = '/sp/batchFixed'
        params.GUID = rowobject.ZZHTQXLX_T
      } else if (
        this.pageCode.SPHTXQ === this.MENUII ||
        this.pageCode.SPHTBG === this.MENUII
      ) {
        params.PERNR = rowobject.PERNR
        url = '/pa/getFileds'
      } else {
        url = '/pa/getFileds'
      } //记录返回参数

      let backingQueryParams = this.queryForm
      backingQueryParams.activeCode = this.activeCode //记录定位sheet页

      params.backingQueryParams = JSON.stringify(backingQueryParams)
      this.$router.push({
        path: url,
        query: params
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description:  打开事件操作页面
     * @date 2020年07月20日
     * @param paramObject 按钮参数对象
     */
    openBatchImportPage(paramObject) {
      if (
        this.MENUII === this.pageCode.LYGL ||
        this.MENUII === this.pageCode.YRZGL
      ) {
        // 简历导入
        this.showDialog = 'resume'
      } else {
        // 事件导入
        this.showDialog = 'import'
      } //批导录用

      if (paramObject.FUNC === 'FC06') {
        this.showDialog = 'batchEmployment'
      }

      this.dialogTitle =
        this.MENUII === this.pageCode.LYGL
          ? '正式员工简历导入'
          : paramObject.FUNCT
      this.dialogTitle =
        this.MENUII === this.pageCode.YRZGL
          ? '正式员工简历导入'
          : paramObject.FUNCT
      this.dialogVisible = true
      this.parentData = paramObject
      this.parentData.pageCode = this.MENUII //快速入职

      if (paramObject.FUNC === 'FC03') {
        this.parentData.displayFlag = 'IDcard'
      } //批量导入入职数据

      if (paramObject.FUNC === 'FC02') {
        this.parentData.displayFlag = 'batch'
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: button事件
     * @date 2020年11月12日
     * @param flag
     */
    batchImportData(flag) {
      this.showDialog = flag

      if (this.MENUII === this.pageCode.XXCJYJ) {
        this.dialogTitle = '发送信息采集链接'
      } else {
        this.dialogTitle = '信息录入'
      }

      this.dialogVisible = true
      this.dialogWidth = '1000px'
      this.parentData.pageCode = this.MENUII
      this.parentData.pageCode = this.MENUII
    },

    /**
     * @Copyright DELOITTE
     * @Description: button事件
     * @date 2020年11月12日
     * @param data
     */
    infoCollectionEmail(data) {
      this.batchImportData('offer')
      this.parentData.offerData = data
      this.parentData.offerData.ZCONTENT = ''
      this.parentData.offerData.pageCode = this.MENUII
    },

    /**
     * @Copyright DELOITTE
     * @Description: 合同打印催办功能
     * @Date: 2020-11-26 11:33:54
     * @param {*} data
     */
    paUrging(data) {
      this.parentData = data
      this.showDialog = 'urging'
      this.dialogWidth = '625px'
      this.dialogVisible = true
    },

    /**
     * @Copyright DELOITTE
     * @Description: 轮岗管理催办
     * @Date: 2021-06-28 11:33:54
     * @param {*} data
     */
    palgUrging(data) {
      this.$httpServer.sap
        .baseMethod({
          IV_EMAIL: 'X',
          IV_GUID: data.GUID,
          IV_STATS: 'G',
          sapInterface: 'PE103'
        })
        .then((response) => {
          let ES_MESSAGE = response.ES_MESSAGE

          if (ES_MESSAGE.MSGTY === 'S') {
            this.queryDataList()
            this.$message.success(ES_MESSAGE.MSGTX)
          }
        })
    },

    /**
     * @Copyright DELOITTE
     * @Description:  打开批量导入页面
     * @date 2020年07月20日
     * @param state 关闭dialog 标识
     */
    closeDialog(state) {
      this.handleClose()
      if (state === 'Q') this.queryDataList()
    },

    /**
     * @Copyright DELOITTE
     * @Description:  弹框关闭事件
     * @date 2020年07月20日
     * @param done 关闭回调参数
     */
    handleClose(done) {
      this.dialogVisible = false
      this.showDialog = ''
      done && done()
    },

    /**
     * @Copyright DELOITTE
     * @Description:  同步大易数据
     * @date 2020年07月20日
     * @param state N 拟录用（录用管理） D 信息审核待办数据
     */
    synchBigEasyData(state) {
      let reqParams = {
        IV_USER: ''
      }
      reqParams.sapInterface = state === 'N' ? 'RC046' : 'RC047'
      this.$httpServer.sap.baseMethod(reqParams).then((response) => {
        let ES_MESSAGE = response.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'S') {
          this.queryDataList()
          this.$message.success(ES_MESSAGE.MSGTX)
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description:  格式化表格数据
     * @date 2020年07月20日
     * @param row
     * @param column
     * @param cellValue
     * @param field
     * @returns {*}
     */
    formatter(row, column, cellValue, field) {
      return field.type === 'Date' && cellValue === '00000000' ? '' : cellValue
    },

    /**
     * @Copyright DELOITTE
     * @Description:  页面监听查询
     * @date 2020年07月20日
     *
     */
    addEventListener() {
      this.$eventVisibility(this.queryDataList)
    },

    /**
     * @Copyright DELOITTE
     * @Description:  单元格点击事件 跳转k2页面
     *  流程 ZSTAT  4=>审批中 5=>审批通过 6=>审批不通过 v=>待发起K2审批  D=>作废
     * @date 2020年07月20日
     * @param row
     * @param column
     * @param event
     * @param cell
     */
    handleCellClick(row, column, event, cell) {
      let processCode = row.ZWFNO //流程processCode

      let guid = row.GUID //业务GUID

      let isShowLink = false

      if (row.ZSTAT === '4' || row.ZSTAT === '5' || row.ZSTAT === '6') {
        isShowLink = true
      }

      if (
        this.MENUII === this.pageCode.PARZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 入职
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PAZZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PADPGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'C' ||
          this.activeCode === 'D' ||
          this.activeCode === 'F' ||
          isShowLink)
      ) {
        // 调配
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PAJDGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'C' || this.activeCode === 'D' || isShowLink)
      ) {
        // 借调
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PATXGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 退休
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PALZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 离职
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PADPGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 调动
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PADPGLSP &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 调动
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PAZZGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.LYGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      }

      if (
        this.MENUII === this.pageCode.YRZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PALGGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PALGGLSP &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 轮岗
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      } else if (
        this.MENUII === this.pageCode.PAYGGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        this.$openWorkflowPage(guid, processCode, 'ViewUrl')
      }
    },

    /**
     * @Copyright DELOITTE
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
      let isShowLink = false

      if (row.ZSTAT === '6') {
        isShowLink = true
      }

      let linkStyle = 'color:#009fdf;cursor:pointer;'

      if (
        this.MENUII === this.pageCode.PARZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 入职
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PAZZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PADPGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'C' ||
          this.activeCode === 'D' ||
          this.activeCode === 'F' ||
          isShowLink)
      ) {
        // 调配
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PAJDGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'C' || this.activeCode === 'D' || isShowLink)
      ) {
        // 借调
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PATXGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 退休
        styleObj = 'color:#009fdf;cursor:pointer;'
      } else if (
        this.MENUII === this.pageCode.PALZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 离职
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PADPGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 调配交通
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PADPGLSP &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 调配
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PAZZGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 转正交通
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PAJSGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 晋升交通
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.LYGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 录用
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.YRZGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 录用
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PALGGLJT &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 录用
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PALGGLSP &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        // 轮岗
        styleObj = linkStyle
      } else if (
        this.MENUII === this.pageCode.PAYGGL &&
        column.property === 'TSTAT' &&
        (this.activeCode === 'D' || this.activeCode === 'F' || isShowLink)
      ) {
        styleObj = linkStyle
      }

      return styleObj
    },

    /**
     * @Copyright DELOITTE
     * @Description: 导出表格数据
     * @date 2020年07月20日
     */
    handleDownload() {
      this.exportLoading = true
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
        fileName
      }
      this.$httpServer.file.customHeaderExportExcel(params)
      this.exportLoading = false
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取表格的字段
     * @date 2020年07月20日
     * @returns {*}
     */
    getTableField() {
      this.settingOperationWiidth()
      this.tableFieldList = []
      this.tableFieldList = tableField(this.MENUII, this.activeCode)
    },

    /**
     * @Copyright DELOITTE
     * @Description: 设置操作列的宽度
     * @date 2020年07月20日
     * @returns {*}
     */
    settingOperationWiidth() {
      this.operationWiidth = 100

      if (
        (this.MENUII === this.pageCode.PAZZGL ||
          this.MENUII === this.pageCode.PAZZGLJT) &&
        this.activeCode === 'T'
      ) {
        this.operationWiidth = 200
      }

      if (
        (this.MENUII === this.pageCode.FBGG ||
          this.MENUII === this.pageCode.ZPXQ ||
          this.MENUII === this.pageCode.RWGL) &&
        this.activeCode === 'T'
      ) {
        this.operationWiidth = 200
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 设置操作列的宽度
     * @date 2020年07月20日
     * @param rowobject 行数据
     * @returns {*}
     */
    sendTODO(rowobject) {
      let params = {
        sapInterface: 'JT001',
        IV_USER: '',
        IV_GUID: rowobject.GUID,
        IV_STATS: rowobject.ZSTAT,
        IV_CZLX: 'FSYG',
        IV_IPAGE: this.MENUII
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let message = response.ES_MESSAGE

        if (!this.$isEmpty(message)) {
          if (message['MSGTY'] === 'S') {
            this.queryDataList()
            this.$message.success(message['MSGTX'])
          } else if (message['MSGTY'] === 'E') {
            this.$message.error(message['MSGTX'])
          }
        } else {
          this.$message.error('发送错误，请重试！')
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 修改已发送的offer待办状态为A，后刷新页面
     * @date 2021年05月20日
     * @param rowobject 行数据
     */
    changeOfferStatus(rowobject) {
      let pageCode = this.MENUII
      if (pageCode !== 'OFGL' || !rowobject || rowobject.ZSTAT !== 'B') return
      let saveParams = {
        sapInterface: 'PE080',
        IV_GUID: rowobject.GUID,
        IV_STATS: 'A'
      }
      this.$httpServer.sap.baseMethod(saveParams).then((response) => {
        let ES_MESSAGE = response.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'S') {
          location.reload()
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 修改已发送的邮件待办状态为Y，后刷新页面
     * @date 2021年05月20日
     * @param rowobject 行数据
     */
    changeSendStatus(rowobject) {
      console.log(rowobject)
      let pageCode = this.MENUII
      if (pageCode !== 'PARZGL' || !rowobject || rowobject.ZSTAT !== 'R') return
      let saveParams = {
        sapInterface: 'PE080',
        IV_GUID: rowobject.GUID,
        IV_STATS: 'Y'
      }
      this.$httpServer.sap.baseMethod(saveParams).then((response) => {
        let ES_MESSAGE = response.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'S') {
          location.reload()
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 离职证明下载
     * @update  07/04/2022
     * @param row 行数据
     * @returns {*}
     */
    resignationDownload(row) {
      let fileName = row.ENAME + '_' + row.FILENAME + '.pdf'
      this.$downloadFile({
        fileId: row.UFSFILEID,
        fileName: fileName
      })
    }
  },

  created() {
    // 初始化函数
    this.initFunction() //页面监听

    this.addEventListener()
  }
}
</script>

<style lang="less" scoped>
.bt-box-p {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
}

.ibox-content {
  padding-top: 10px;
}

.redLabel {
  color: red;
}

.sign-dialog {
  /deep/ .select-title {
    padding: 0 0 10px 10px;
  }

  /deep/ .el-select {
    margin-left: 10px;
    width: 256px;
  }

  /deep/ #qrcode {
    img {
      margin: 20px auto 0 auto;
    }
  }
}
</style>
