<template>
  <div>
    <div>
      <el-form label-width="115px" size="mini">
        <el-row>
          <el-col class="el-col-sm-4">
            <el-button size="mini" type="primary" @click="downloadTemp()">
              下载采集模版
            </el-button>
          </el-col>
          <el-col class="el-col-sm-9">
            <el-form-item label="文件路径">
              <el-input
                type="text"
                disabled
                style="width: 100%"
                v-model="filename"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="el-col-sm-4 m-l-xs">
            <el-button
              size="mini"
              type="warning"
              :loading="loading"
              @click="selectFile"
            >
              浏览
            </el-button>
            <input
              type="file"
              name="fileName"
              v-show="false"
              @change="uploading"
            />
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div v-if="previewList.length > 0 && !isShowErrorTable">
      <table-util
        :search-content="searchContent"
        :id="'export'"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :tableData="$filterTableContent(searchContent, tableData)"
      ></table-util>
      <el-table
        header-cell-class-name="tableHeaderStyle"
        id="export"
        :data="
          $filterTableContent(searchContent, previewList).slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%"
        size="small"
      >
        <el-table-column
          show-overflow-tooltip
          v-for="(field, index) in tableHeaderList"
          :key="index"
          :prop="field.prop"
          :label="field.label"
          :width="field.width"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="block" style="padding-top: 10px; text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes=";[10, 20, 50, 100]
"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="$filterTableContent(searchContent, previewList).length"
        ></el-pagination>
      </div>
    </div>

    <div class="pd20 text-center">
      <el-col>
        <el-button
          size="mini"
          type="primary"
          v-if="previewList.length > 0 && !isShowErrorTable"
          :loading="loading"
          @click="entryImport()"
        >
          确认导入
        </el-button>
        <el-button size="mini" @click="closeDialog"> 取消 </el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resumeImport',
  props: {
    parentData: {
      type: Object
    }
  },

  data() {
    return {
      filename: '',
      searchContent: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      excelData: '',
      isShowErrorTable: false,
      tableHeaderList: [],
      previewList: [],
      errorTableDataList: [],
      errorTableHeaderList: [],
      loading: false
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
    $route() {
      this.initFunction()
    }
  },
  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description: 下载事件模版
     * @date 2020年07月20日
     *
     */
    downloadTemp() {
      let url = ''

      if (this.parentData.pageCode === this.pageCode.LYGL) {
        url = 'staticFile/员工简历下载模板.xlsx'
      } else {
        return this.$message.warning('未找到对应的下载模版')
      }

      this.$downloadStaticFile(url)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 选择导入文件
     * @date 2020年07月20日
     *
     */
    selectFile() {
      document.getElementsByName('fileName')[0].value = ''
      document.getElementsByName('fileName')[0].click()
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 解析excel文件返回数据
     * @date 2020年07月20日
     *
     */
    uploading() {
      let index = 2 //从第几行开始解析

      let file = document.querySelector('input[type=file]').files[0] //展示界面文件名

      this.filename = file.name
      let formData = new FormData()
      formData.append('file', file) //从第几行开始解析

      formData.append('rowIndex', index)
      this.$httpServer.file.getResumeData(formData).then((response) => {
        let result = response.data //保存一份数据,用于调用sap接口传值

        this.excelData = JSON.stringify(result) //解析excel返回的数据

        this.previewList = result
      })
    },

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
     * @Description: 比如关闭弹窗是否需要进行查询
     * @date 2020年07月20日
     * @param state 关闭窗口标识
     */
    closeDialog(state) {
      this.$emit('closeDialog', state || '')
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 确认导入
     * @date 2020年07月20日
     */
    entryImport() {
      let parentData = this.parentData
      let reqParams = {
        sapInterface: 'PE800',
        IV_USER: '',
        IT_DATA: this.excelData,
        IV_IPAGE: parentData.pageCode,
        IV_CZLX: 'IMPORT'
      }
      this.$httpServer.sap.baseMethod(reqParams).then((response) => {
        let message = response.ES_MESSAGE

        if (message.MSGTY === 'S') {
          this.$message.success(message.MSGTX)
          this.closeDialog('Q')
        } else {
          this.$message.error(message.MSGTX || '导入错误，请重试！')
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 组装表格字段
     * @date 2020年07月20日
     */
    settingTableField() {
      this.tableHeaderList = [
        {
          label: '姓名',
          prop: 'ENAME',
          width: 100
        },
        {
          label: '性别',
          prop: 'GESCH',
          width: 100
        },
        {
          label: '出生日期',
          prop: 'GBDAT',
          width: 120
        },
        {
          label: '民族',
          prop: 'RACKY',
          width: 100
        },
        {
          label: '健康状况',
          prop: 'ZZJKZK',
          width: 120
        },
        {
          label: '婚姻状况',
          prop: 'FATXT',
          width: 120
        },
        {
          label: '手机号码',
          prop: 'ZSJ_NUM',
          width: 120
        },
        {
          label: '微信号',
          prop: 'ZVX_NUM',
          width: 120
        },
        {
          label: '籍贯',
          prop: 'ZZJGSZSF',
          width: 100
        },
        {
          label: '户口所在地',
          prop: 'ZZHKSZS',
          width: 150
        },
        {
          label: '政治面貌',
          prop: 'PCODE',
          width: 120
        },
        {
          label: '入党日期',
          prop: 'BEGDA',
          width: 120
        },
        {
          label: '现住地址',
          prop: 'ZADDRS',
          width: 120
        },
        {
          label: '邮政编码',
          prop: 'PSTLZ',
          width: 120
        },
        {
          label: '身份证号',
          prop: 'ICNUM',
          width: 120
        },
        {
          label: '邮箱地址',
          prop: 'ZEMAIL',
          width: 120
        }
      ]
    }
  },

  created() {
    this.settingTableField()
  }
}
</script>

<style scoped>
.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 10px 25px 30px;
}
</style>
