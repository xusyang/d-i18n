<template>
  <div class="height100">
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <el-row class="m-t">
      <el-form
        class="ibox-content"
        size="mini"
        ref="queryForm"
        label-width="120px"
      >
        <div class="ibox-content-title fs14">
          {{ I18N.$fanyi('查询条件') }}
        </div>
        <el-row justify="space-between">
          <el-col :md="8">
            <el-form-item :label="I18N.$fanyi('合同类型')" prop="CTTYP">
              <search-help
                funccode="00338"
                :code.sync="queryData.CTTYP"
              ></search-help>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item
              :label="I18N.$fanyi('开始日期')"
              prop="receiveStartDate"
            >
              <el-date-picker
                type="date"
                :placeholder="I18N.$fanyi('选择开始日期')"
                v-model="queryData.BEGDA"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item
              :label="I18N.$fanyi('结束日期')"
              prop="receiveEndDate"
            >
              <el-date-picker
                type="date"
                :placeholder="I18N.$fanyi('选择结束日期')"
                v-model="queryData.ENDDA"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="16" :md="8">
            <el-form-item class="clearfix">
              <el-button class="fr" size="mini" @click="restForm('queryForm')">
                {{ I18N.$fanyi('重置') }}
              </el-button>
              <el-button
                class="fr mr10"
                type="primary"
                size="mini"
                icon="el-icon-search"
                @click="queryDataList('Q')"
              >
                {{ I18N.$fanyi('查询') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="m-t-sm">
      <el-col class="ibox-content">
        <el-tabs v-model="activeName" @tab-click="queryDataList(activeName)">
          <el-tab-pane :label="I18N.$fanyi('劳动合同')" name="X">
            <table-util
              :search-content="searchContent"
              :id="'todo'"
              :currentPage="currentPage"
              :pageSize="pageSize"
              :tableData="$filterTableContent(searchContent, tableData)"
              :tableField="tableField"
            ></table-util>
            <el-table
              size="mini"
              id="todo"
              header-cell-class-name="tableHeaderStyle"
              :data="
                $filterTableContent(searchContent, tableData).slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
            >
              <el-table-column
                type="index"
                :index=";(index) => $settingTableSerialNum(index, currentPage, pageSize)
"
                :label="I18N.$fanyi('序号')"
                width="80"
                sortable
              ></el-table-column>
              <el-table-column
                prop="CTTYP"
                :label="I18N.$fanyi('合同类型')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="ZZHTQXLX"
                :label="I18N.$fanyi('期限类型')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="ZHTQX"
                :label="I18N.$fanyi('合同期限')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="ZZHTQDZTI"
                :label="I18N.$fanyi('合同主体')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="BEGDA"
                :label="I18N.$fanyi('合同开始日期')"
                width="140px"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="CTEDT"
                :label="I18N.$fanyi('合同结束日期')"
                width="140px"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="PRBZT"
                :label="I18N.$fanyi('试用期')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="ZZHTZZRQ"
                :label="I18N.$fanyi('试用结束日期')"
                width="140px"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="ZSTAT"
                :label="I18N.$fanyi('状态')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                :label="I18N.$fanyi('操作')"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    class="text-info"
                    size="mini"
                    type="text"
                    v-if="scope.row.ZSTAT == '未签字'"
                    @click="openQRCode()"
                  >
                    {{ I18N.$fanyi('签字') }}
                  </el-button>
                  <el-button
                    class="text-success"
                    size="mini"
                    type="text"
                    v-if="scope.row.ZSTAT == '已生效'"
                    @click="downDetail(scope.row)"
                  >
                    {{ I18N.$fanyi('下载') }}
                  </el-button>
                  <el-button
                    class="text-primary"
                    size="mini"
                    type="text"
                    @click="toDetail(scope.row)"
                  >
                    {{ I18N.$fanyi('查看') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="text-center mt10">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="prev,pager,next,jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="$filterTableContent(searchContent, tableData).length"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="I18N.$fanyi('已办列表')" name="" v-if="false">
            <table-util
              :search-content="searchContent2"
              :id="'done'"
              :currentPage="currentPage"
              :pageSize="pageSize"
              :tableData="tableData"
              :tableField="tableField2"
            ></table-util>
            <el-table
              size="mini"
              id="done"
              header-cell-class-name="tableHeaderStyle"
              :data="
                $filterTableContent(searchContent2, tableData).slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%; text-align: center"
              v-loading="loading"
            >
              <el-table-column
                type="index"
                :label="I18N.$fanyi('序号')"
                :index=";(index) => $settingTableSerialNum(index, currentPage, pageSize)
"
                width="80"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="TITLE"
                :label="I18N.$fanyi('任务标题')"
                width="450"
                align="center"
                sortable
              >
                <template slot-scope="scope">
                  <a
                    class="text-success m-r-xs"
                    size="mini"
                    @click="toDetail(scope.row)"
                  >
                    {{ scope.row.TITLE }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="ZTEXT"
                :label="I18N.$fanyi('任务名称')"
                width="350"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                prop="RECDT"
                :label="I18N.$fanyi('接收日期')"
                align="center"
                sortable
                :formatter="formatterDate"
              ></el-table-column>
              <el-table-column
                prop="PRODT"
                :label="I18N.$fanyi('处理日期')"
                align="center"
                sortable
                :formatter="formatterDate"
              ></el-table-column>
              <el-table-column
                prop="PROTT"
                :label="I18N.$fanyi('处理状态')"
                align="center"
                sortable
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="ENAME"
                :label="I18N.$fanyi('提交人')"
                align="center"
                sortable
              ></el-table-column>
            </el-table>
            <div class="text-center mt10">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="prev,pager,next,jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="$filterTableContent(searchContent, tableData).length"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog
      title=""
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      width="400px"
      :before-close="handleClose"
    >
      <div class="ibox-content1">
        <div id="qrcode" ref="qrCodeUrl"></div>
        <div style="color: #eb3222; font-size: 24px; padding: 15px 0 0 30px">
          {{ I18N.$fanyi('扫一扫，签订合同') }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'empInstitQuery',

  data() {
    return {
      activeName: 'X',
      currentPage: 1,
      pageSize: 10,
      queryData: {
        CTTYP: '',

        // 合同类型
        BEGDA: '',

        // 开始时间
        ENDDA: ''

        // 结束时间
      },
      searchContent: '',
      searchContent2: '',
      tableData: [],
      loading: false,
      treeValue: '',
      orgInfoData: {
        orgBaseInfo: {},
        E_ZZFC: {},
        EV_ZZBZ: {},
        EV_ZZFZR: {},
        EV_ZZJX: {}

        // EV_ZZJX: {},
      },
      treeSelectionId: '',
      user: JSON.parse(localStorage.CURRENT_USER_INFO),
      showMore: false,
      tableField: ['index', 'TITLE', 'ZTEXT', 'RECDT', 'ENAME'],
      tableField2: [
        'index',
        'TITLE',
        'ZTEXT',
        'ZTEXT',
        'RECDT',
        'PRODT',
        'PROTT',
        'ENAME'
      ],
      dialogVisible: false,
      parentData: {}
    }
  },

  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 弹框关闭事件
     * @update  08/04/2022
     *
     * @param done fun
     * @returns {*}
     */
    handleClose(done) {
      this.dialogVisible = false
      done && done()
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 生成二维码
     * @Date: 2020-12-01 11:47:54
     */
    creatCode() {
      this.$refs['qrCodeUrl'].innerHTML = ''
    },

    /**
     * @Copyright DELOITTE
     * @Description: 打开二维码弹窗
     * @update  08/04/2022
     * @returns {*}
     */
    openQRCode() {
      setTimeout(() => this.creatCode(), 200)
      this.dialogVisible = true
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 变更当页显示数量时调用
     * @param val 每页显示数量
     * @date 2020年07月20日
     */
    handleSizeChange(val) {
      this.pageSize = val
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 变更换页时调用
     * @param val 当前页
     * @date 2020年07月20日
     */
    handleCurrentChange(val) {
      this.currentPage = val
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 重置查询条件
     * @param queryForm form名称
     * @date 2020年07月20日
     */
    restForm(queryForm) {
      this.$refs[queryForm].resetFields()
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 格式化日期
     * @param row 行
     * @param column 列
     * @param cellValue 值
     * @date 2020年07月20日
     */
    formatterDate(row, column, cellValue) {
      return cellValue === '00000000' ? '' : this.$strToDate(cellValue)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 查询列表
     * @param status 状态
     * @date 2020年07月20日
     */
    queryDataList(status) {
      if ('Q' !== status) {
        this.status = status
      }

      var params = {}
      params.sapInterface = 'PE062'
      params.IV_USER = this.user.PERNR
      params.IV_USER = '00065155'
      params.IV_IPAGE = localStorage.currentPagecode
      params.IV_CTTYP = this.queryData.CTTYP
      params.IV_BEGDA = this.queryData.BEGDA
        ? new Date(this.queryData.BEGDA).Format('yyyyMMdd')
        : ''
      params.IV_ENDDA = this.queryData.ENDDA
        ? new Date(this.queryData.ENDDA).Format('yyyyMMdd')
        : ''
      this.$httpServer.sap.baseMethod(params).then((response) => {
        this.tableData = response.ET_DATA
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 通过点击标题，跳转功能界面
     * @param row 行数据对象
     * @date 2020年07月20日
     */
    toDetail(row) {
      if (row.ZHTWJ.indexOf('https') !== -1) {
        window.open(row.ZHTWJ)
      } else {
        this.ossPreview(row.ZHTWJ)
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 下载详情附件
     * @update  08/04/2022
     * @param row 行数据对象
     * @returns {*}
     */
    downDetail(row) {
      if (row.ZHTWJ.indexOf('https') !== -1) {
        const a = document.createElement('a')
        a.setAttribute('href', row.ZHTWJ)
        a.setAttribute('target', '_blank')
        a.setAttribute('id', 'camnpr')
        document.body.appendChild(a)
        a.click()
      } else {
        window.open(
          'dhrDownloadService/aliyunoss/download?ossPath=' +
            row.ZHTWJ +
            '&fileName=' +
            '劳动合同.pdf'
        )
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 预览服务器上的文件
     * @update  26/04/2022
     * @returns {*}
     */
    ossPreview(ossPath) {
      if (!ossPath) return
      const newWind = window.open()
      this.$httpServer.file
        .aliPreviewFile({
          ossPath: ossPath
        })
        .then((res) => (newWind.location.href = res.data))
    }
  },

  created() {
    this.queryDataList('X')
  }
}
</script>

<style scoped>
.ibox-content1 {
  margin-left: 47px;
}
</style>
