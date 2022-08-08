<template>
  <div>
    <div>
      <el-form label-width="115px" size="mini">
        <el-row>
          <el-col class="el-col-sm-12">
            <el-button size="mini" type="primary" @click="downloadTemp()">
              {{ I18N.$fanyi('下载采集模版') }}
            </el-button>
          </el-col>
          <el-col class="el-col-sm-9">
            <el-form-item :label="I18N.$fanyi('文件路径')">
              <el-input
                type="text"
                disabled
                style="width: 100%"
                v-model="filename"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="el-col-sm-2 m-l-xs">
            <el-button size="mini" type="warning" @click="selectFile">
              {{ I18N.$fanyi('浏览') }}
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
      <el-table
        header-cell-class-name="tableHeaderStyle"
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
          :prop="field.field"
          :label="field.fieldName"
          align="center"
          min-width="120"
        ></el-table-column>
      </el-table>
      <div class="block" style="padding-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes=";[10, 20, 50, 100]
"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="$filterTableContent(searchContent, previewList).length"
        ></el-pagination>
      </div>
    </div>

    <div v-if="errorTableDataList.length > 0 && isShowErrorTable">
      <el-table
        header-cell-class-name="tableHeaderStyle"
        :data="
          $filterTableContent(searchContent, errorTableDataList).slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%"
        size="small"
        :row-style="rowStyle"
      >
        <el-table-column
          show-overflow-tooltip
          v-for="(field, index) in errorTableHeaderList"
          :key="index"
          :prop="field.field"
          :label="field.fieldName"
          align="center"
          min-width="120"
        ></el-table-column>
      </el-table>
      <div class="block" style="padding-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes=";[10, 20, 50, 100]
"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="$filterTableContent(searchContent, errorTableDataList).length"
        ></el-pagination>
      </div>
    </div>
    <div class="pd20 text-center">
      <el-col>
        <el-button
          size="mini"
          type="primary"
          v-if="previewList.length > 0 && !isShowErrorTable"
          @click="entryImport()"
        >
          {{ I18N.$fanyi('确认导入') }}
        </el-button>
        <el-button size="mini" @click="closeDialog">
          {{ I18N.$fanyi('取消') }}
        </el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'batchEventImport',
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
      excelData: [],
      isShowErrorTable: false,
      tableHeaderList: [],
      previewList: [],
      errorTableDataList: [],
      errorTableHeaderList: [],
      isShowPreviewTable: false,
      cardList: [],
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO)
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
     * @Copyright DELOITTE
     * @Description: 下载事件模版
     * @date 2020年07月20日
     *
     */
    downloadTemp() {
      let url = ''

      if (
        this.parentData.pageCode === this.pageCode.PAXXCJ ||
        this.parentData.pageCode === this.pageCode.PARZGL
      ) {
        url = 'staticFile/' + I18N.$fanyi('入职批量导入模版') + '.xlsx'
      } else if (
        this.parentData.pageCode === this.pageCode.PAZZGL ||
        this.parentData.pageCode === this.pageCode.PAZZGLJT
      ) {
        url = 'staticFile/' + I18N.$fanyi('转正批量导入模版') + '.xlsx'
      } else if (
        this.parentData.pageCode === this.pageCode.PAJSGL ||
        this.parentData.pageCode === this.pageCode.PAJSGLJT
      ) {
        url = 'staticFile/' + I18N.$fanyi('晋升批量导入模版') + '.xlsx'
      } else if (this.parentData.pageCode === this.pageCode.PADPGL) {
        url = 'staticFile/' + I18N.$fanyi('调动批量导入模版') + '.xlsx'
      } else if (this.parentData.pageCode === this.pageCode.PADPGLJT) {
        url = 'staticFile/' + I18N.$fanyi('调动批量导入模版') + '_v2.xlsx'
      } else {
        return this.$message.warning(I18N.$fanyi('未找到对应的下载模版'))
      }

      this.$downloadStaticFile(url)
    },

    /**
     * @Copyright DELOITTE
     * @Description: 选择导入文件
     * @date 2020年07月20日
     *
     */
    selectFile() {
      document.getElementsByName('fileName')[0].value = ''
      document.getElementsByName('fileName')[0].click()
    },

    /**
     * @Copyright DELOITTE
     * @Description: 解析excel文件返回数据
     * @date 2020年07月20日
     *
     */
    uploading() {
      this.previewList = []
      let index = 1 //从第几行开始解析

      if (
        this.parentData.pageCode === this.pageCode.PAXXCJ ||
        this.parentData.pageCode === this.pageCode.PADPGL ||
        this.parentData.pageCode === this.pageCode.PADPGLJT ||
        this.parentData.pageCode === this.pageCode.PARZGL
      ) {
        index = 2
      }

      let file = document.querySelector('input[type=file]').files[0] //展示界面文件名

      this.filename = file.name
      let formData = new FormData()
      formData.append('file', file) //传入json表头

      formData.append('excelHeadData', JSON.stringify(this.getExcelTitle())) //从第几行开始解析

      formData.append('rowIndex', index)
      this.$httpServer.file.getExcelData(formData).then((response) => {
        this.excelData = response.data //保存一份数据,用于调用sap接口传值

        this.assembleTableData(response.data) //解析excel返回的数据
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 组装table表格数据
     * @date 2020年07月20日
     *
     * @param list 组装数据
     */
    assembleTableData(list) {
      // 是否显示错误消息table
      this.isShowErrorTable = false //表头

      this.tableHeaderList = this.getExcelTitle() //处理数据动态展示界面

      let previewList = []
      list.forEach((item) => {
        let valueList = [] //通过表头组装value值

        this.tableHeaderList.forEach((data) => {
          for (let key in item) {
            data['field'] === key &&
              valueList.push({
                value: item[key],
                key: key
              })
          }
        })
        previewList.push({
          tr: valueList
        })
      })
      previewList.forEach((data) => {
        let itemjson = {}
        data.tr.forEach((item) => (itemjson[item.key] = item.value))
        this.previewList.push(itemjson)
      })
      this.isShowPreviewTable = true
    },

    /**
     * @Copyright DELOITTE
     * @Description: 获取excel表头
     * @date 2020年07月20日
     * @update  [序号][日期2020-11-17][DELOITTE-Zhong li][信息采集页表头字段更新]
     * @returns {*}
     */
    getExcelTitle() {
      let pageCode = this.parentData.pageCode
      let fieldList = []

      if (
        pageCode === this.pageCode.PAXXCJ ||
        pageCode === this.pageCode.PARZGL
      ) {
        fieldList = [
          {
            field: '0002-NACHN',
            fieldName: I18N.$fanyi('姓'),
            fieldType: 'String'
          },
          {
            field: '0002-VORNA',
            fieldName: I18N.$fanyi('姓名'),
            fieldType: 'String'
          },
          {
            field: '0185-ICNUM',
            fieldName: I18N.$fanyi('证件号码'),
            fieldType: 'String'
          },
          {
            field: '0185-AUTH1',
            fieldName: I18N.$fanyi('发证机关'),
            fieldType: 'String'
          },
          {
            field: '0185-USEFR',
            fieldName: I18N.$fanyi('有效开始日期'),
            fieldType: 'Date'
          },
          {
            field: '0185-USETO',
            fieldName: I18N.$fanyi('有效结束日期'),
            fieldType: 'Date'
          },
          {
            field: '0002-GBDAT',
            fieldName: I18N.$fanyi('出生日期'),
            fieldType: 'Date'
          },
          {
            field: '0002-GESCH',
            fieldName: I18N.$fanyi('性别'),
            fieldType: 'String'
          },
          {
            field: '0002-FAMST',
            fieldName: I18N.$fanyi('婚姻状况'),
            fieldType: 'String'
          },
          {
            field: '0002-GBLND',
            fieldName: I18N.$fanyi('出生国家'),
            fieldType: 'String'
          },
          {
            field: '0002-NATIO',
            fieldName: I18N.$fanyi('国籍'),
            fieldType: 'String'
          },
          {
            field: '0002-GBDEP',
            fieldName: I18N.$fanyi('户籍(省)'),
            fieldType: 'String'
          },
          {
            field: '0002-ZZHKSZS',
            fieldName: I18N.$fanyi('户籍(市)'),
            fieldType: 'String'
          },
          {
            field: '0002-ZZHKSZX',
            fieldName: I18N.$fanyi('户籍(县)'),
            fieldType: 'String'
          },
          {
            field: '0002-ZZHUKOT',
            fieldName: I18N.$fanyi('户口类型'),
            fieldType: 'String'
          },
          {
            field: '0000-BEGDA',
            fieldName: I18N.$fanyi('入职日期'),
            fieldType: 'Date'
          },
          {
            field: '0000-MASSG',
            fieldName: I18N.$fanyi('入职原因'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSG',
            fieldName: I18N.$fanyi('员工组'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSK',
            fieldName: I18N.$fanyi('员工子组'),
            fieldType: 'String'
          },
          {
            field: '0001-PLANS',
            fieldName: I18N.$fanyi('岗位'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZGWCJ',
            fieldName: I18N.$fanyi('人员层级(本单位)'),
            fieldType: 'String'
          },
          {
            field: '0529-RACKY',
            fieldName: I18N.$fanyi('民族'),
            fieldType: 'String'
          },
          {
            field: '0534-PCODE',
            fieldName: I18N.$fanyi('政治面貌'),
            fieldType: 'String'
          },
          {
            field: '0105-USRID',
            fieldName: I18N.$fanyi('手机号码'),
            fieldType: 'String'
          },
          {
            field: '0006-ANSSA',
            fieldName: I18N.$fanyi('地址类型'),
            fieldType: 'String'
          },
          {
            field: '0006-LAND1',
            fieldName: I18N.$fanyi('国家/地区'),
            fieldType: 'String'
          },
          {
            field: '0006-LOCAT',
            fieldName: I18N.$fanyi('详细地址'),
            fieldType: 'String'
          },
          {
            field: '0021-FAMSA',
            fieldName: I18N.$fanyi('关系类型'),
            fieldType: 'String'
          },
          {
            field: '0021-FANAM',
            fieldName: I18N.$fanyi('姓名'),
            fieldType: 'String'
          },
          {
            field: '0021-ZZSFJJLXR',
            fieldName: I18N.$fanyi('是否紧急联系人'),
            fieldType: 'String'
          },
          {
            field: '0021-ZZDHHM',
            fieldName: I18N.$fanyi('电话号码'),
            fieldType: 'String'
          },
          {
            field: '0022-SLART',
            fieldName: I18N.$fanyi('学历'),
            fieldType: 'String'
          },
          {
            field: '0022-SLABS',
            fieldName: I18N.$fanyi('学位'),
            fieldType: 'String'
          },
          {
            field: '0022-ZRXRQ',
            fieldName: I18N.$fanyi('入学日期'),
            fieldType: ''
          },
          {
            field: '0022-BEGDA',
            fieldName: I18N.$fanyi('毕业日期'),
            fieldType: 'Date'
          },
          {
            field: '0022-INSTI',
            fieldName: I18N.$fanyi('毕业院校'),
            fieldType: 'String'
          },
          {
            field: '0022-ZZSXZY',
            fieldName: I18N.$fanyi('所学专业'),
            fieldType: 'String'
          },
          {
            field: '0022-ZZSFDYXL',
            fieldName: I18N.$fanyi('是否第一学历'),
            fieldType: 'String'
          },
          {
            field: '0022-ZZSFZGXL',
            fieldName: I18N.$fanyi('是否最高学历'),
            fieldType: 'String'
          },
          {
            field: '0023-BEGDA',
            fieldName: I18N.$fanyi('开始日期'),
            fieldType: 'Date'
          },
          {
            field: '0023-ENDDA',
            fieldName: I18N.$fanyi('结束日期'),
            fieldType: 'Date'
          },
          {
            field: '0023-ARBGB',
            fieldName: I18N.$fanyi('工作单位'),
            fieldType: 'String'
          },
          {
            field: '0023-ZZW',
            fieldName: I18N.$fanyi('岗位'),
            fieldType: 'String'
          },
          {
            field: '0041-DAT01',
            fieldName: I18N.$fanyi('参加工作日期'),
            fieldType: 'Date'
          },
          {
            field: '0041-DAT04',
            fieldName: I18N.$fanyi('工龄起算日期'),
            fieldType: 'Date'
          },
          {
            field: '0016-CTTYP',
            fieldName: I18N.$fanyi('合同类型'),
            fieldType: 'String'
          },
          {
            field: '0016-BEGDA',
            fieldName: I18N.$fanyi('合同开始日期'),
            fieldType: 'Date'
          },
          {
            field: '0016-CTEDT',
            fieldName: I18N.$fanyi('合同结束日期'),
            fieldType: 'Date'
          },
          {
            field: '0016-ZZHTQDDW',
            fieldName: I18N.$fanyi('合同签订主体'),
            fieldType: 'String'
          },
          {
            field: '0016-ZZHTQXLX',
            fieldName: I18N.$fanyi('合同期限类型'),
            fieldType: 'String'
          },
          {
            field: '0016-ZZHTQDZT',
            fieldName: I18N.$fanyi('合同签订状态'),
            fieldType: 'String'
          },
          {
            field: '0016-PRBZT',
            fieldName: I18N.$fanyi('试用期(月)'),
            fieldType: 'String'
          },
          {
            field: '0009-BANKL',
            fieldName: I18N.$fanyi('开户银行'),
            fieldType: 'String'
          },
          {
            field: '0009-ZWECK',
            fieldName: I18N.$fanyi('银行账户'),
            fieldType: 'String'
          }
        ]
      } else if (
        pageCode === this.pageCode.PAZZGL ||
        pageCode === this.pageCode.PAZZGLJT
      ) {
        fieldList = [
          {
            field: '0000-PERNR',
            fieldName: I18N.$fanyi('员工编号'),
            fieldType: 'String'
          },
          {
            field: '0000-BEGDA',
            fieldName: I18N.$fanyi('转正日期'),
            fieldType: 'Date'
          },
          {
            field: '0000-MASSG',
            fieldName: I18N.$fanyi('转正原因'),
            fieldType: 'String'
          }
        ]
      } else if (
        pageCode === this.pageCode.PAJSGL ||
        pageCode === this.pageCode.PAJSGLJT
      ) {
        fieldList = [
          {
            field: '0000-PERNR',
            fieldName: I18N.$fanyi('员工编号'),
            fieldType: 'String'
          },
          {
            field: '0000-BEGDA',
            fieldName: I18N.$fanyi('晋升日期'),
            fieldType: 'Date'
          },
          {
            field: '0000-MASSG',
            fieldName: I18N.$fanyi('晋升原因'),
            fieldType: 'String'
          },
          {
            field: '0001-PLANS',
            fieldName: I18N.$fanyi('晋升岗位'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZGWCJ',
            fieldName: I18N.$fanyi('人员层级'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZX_ID',
            fieldName: I18N.$fanyi('职级（衔）'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZD_ID',
            fieldName: I18N.$fanyi('职等'),
            fieldType: 'String'
          }
        ]
      } else if (pageCode === this.pageCode.PADPGL) {
        fieldList = [
          {
            field: '0000-PERNR',
            fieldName: I18N.$fanyi('员工编号'),
            fieldType: 'String'
          }
        ]
        fieldList.push(
          {
            field: '0000-BEGDA',
            fieldName: I18N.$fanyi('调动日期'),
            fieldType: 'Date'
          },
          {
            field: '0000-MASSG',
            fieldName: I18N.$fanyi('调动原因'),
            fieldType: 'String'
          },
          {
            field: '0001-PLANS',
            fieldName: I18N.$fanyi('岗位'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZGWCJ',
            fieldName: I18N.$fanyi('人员层级(本单位)'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZX_ID',
            fieldName: I18N.$fanyi('职级'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZD_ID',
            fieldName: I18N.$fanyi('职等'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSG',
            fieldName: I18N.$fanyi('员工组'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSK',
            fieldName: I18N.$fanyi('员工子组'),
            fieldType: 'String'
          },
          {
            field: '0016-FLAG4',
            fieldName: I18N.$fanyi('是否变更合同'),
            fieldType: 'String'
          },
          {
            field: '0016-CTTYP',
            fieldName: I18N.$fanyi('合同类型'),
            fieldType: 'String'
          },
          {
            field: '0016-BEGDA',
            fieldName: I18N.$fanyi('合同开始日期'),
            fieldType: 'Date'
          },
          {
            field: '0016-CTEDT',
            fieldName: I18N.$fanyi('合同结束日期'),
            fieldType: 'Date'
          },
          {
            field: '0016-ZZHTQDDW',
            fieldName: I18N.$fanyi('合同签订主体'),
            fieldType: 'String'
          },
          {
            field: '0016-ZZHTQXLX',
            fieldName: I18N.$fanyi('合同期限类型'),
            fieldType: 'String'
          },
          {
            field: '0016-ZZHTQDZT',
            fieldName: I18N.$fanyi('合同签订状态'),
            fieldType: 'String'
          },
          {
            field: '0016-ZZBZ',
            fieldName: I18N.$fanyi('备注'),
            fieldType: 'String'
          }
        )
      } else if (pageCode === this.pageCode.PADPGLJT) {
        fieldList = [
          {
            field: '0000-PERNR',
            fieldName: I18N.$fanyi('员工编号'),
            fieldType: 'String'
          },
          {
            field: '0000-BEGDA',
            fieldName: I18N.$fanyi('调动日期'),
            fieldType: 'Date'
          },
          {
            field: '0000-MASSG',
            fieldName: I18N.$fanyi('调动原因'),
            fieldType: 'String'
          },
          {
            field: '0001-PLANS',
            fieldName: I18N.$fanyi('岗位'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZGWCJ',
            fieldName: I18N.$fanyi('人员层级(本单位)'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZX_ID',
            fieldName: I18N.$fanyi('职级'),
            fieldType: 'String'
          },
          {
            field: '0001-ZZZD_ID',
            fieldName: I18N.$fanyi('职等'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSG',
            fieldName: I18N.$fanyi('员工组'),
            fieldType: 'String'
          },
          {
            field: '0001-PERSK',
            fieldName: I18N.$fanyi('员工子组'),
            fieldType: 'String'
          }
        ]
      }

      return fieldList
    },

    /**
     * @Copyright DELOITTE
     * @Description: 封装接口数据
     * @date 2020年07月20日
     * @param list
     * @returns {*}
     */
    assembInterfaceData(list) {
      this.in_data = []
      list.forEach((item) => {
        if (
          this.parentData.pageCode === this.pageCode.PAXXCJ ||
          this.parentData.pageCode === this.pageCode.PARZGL
        ) {
          this.in_data.push({
            PERNR: '',
            ICNUM: item['0185-ICNUM'],

            // 入职专用
            ZDATA: this.sortObjByKey(item)
          })
        } else {
          this.in_data.push({
            PERNR: item['0000-PERNR'],
            ICNUM: '',
            ZDATA: this.sortObjByKey(item)
          })
        }
      })
      return this.in_data
    },

    /**
     * @Copyright DELOITTE
     * @Description: 排序json对象
     * @date 2020年07月20日
     * @param obj
     * @returns {*}
     */
    sortObjByKey(obj) {
      let keys = Object.keys(obj).sort()
      let newObj = {}
      keys.forEach((k) => {
        let newKey = k.split('-')[0] //判断是不是同一个信息类型

        if (!newObj[newKey]) newObj[newKey] = {}
        let field = k.split('-')[1]
        newObj[newKey][field] = obj[k]
      })
      return newObj
    },

    /**
     * @Copyright DELOITTE
     * @Description: 设置错误数据表头
     * @date 2020年07月20日
     */
    settingErrorHeader() {
      this.errorTableHeaderList = []
      this.errorTableHeaderList.push({
        field: 'PERNR',
        fieldName: I18N.$fanyi('员工编号')
      })

      if (
        this.parentData.pageCode === this.pageCode.PAXXCJ ||
        this.parentData.pageCode === this.pageCode.PARZGL
      ) {
        this.errorTableHeaderList.push({
          field: 'ICNUM',
          fieldName: I18N.$fanyi('证件号码')
        })
        this.errorTableHeaderList.push({
          field: 'ENAME',
          fieldName: I18N.$fanyi('姓名')
        })
      }

      this.errorTableHeaderList.push({
        field: 'MSGTY',
        fieldName: I18N.$fanyi('数据状态')
      })
      this.errorTableHeaderList.push({
        field: 'MSGTX',
        fieldName: I18N.$fanyi('错误原因')
      })
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
     * @Description: 当前页change
     * @update  07/04/2022
     * @param val currentPage
     * @returns {*}
     */
    handleCurrentChange(val) {
      this.currentPage = val
    },

    /**
     * @Copyright DELOITTE
     * @Description: 比如关闭弹窗是否需要进行查询
     * @date 2020年07月20日
     * @param state 关闭窗口标识
     */
    closeDialog(state) {
      this.$emit('closeDialog', state || '')
    },

    /**
     * @Copyright DELOITTE
     * @Description: 确认导入
     * @date 2020年07月20日
     */
    entryImport() {
      if (this.verifImportData()) return //校验导入数据

      let parentData = this.parentData
      this.errorTableDataList = []
      let reqParams = {
        sapInterface: 'PE059',
        IV_USER: '',
        IV_KSRZ:
          this.parentData.displayFlag === 'IDcard' ||
          parentData.pageCode === this.pageCode.PADPGLJT
            ? 'X'
            : '',
        IT_DATA: JSON.stringify(this.assembInterfaceData(this.excelData)),
        IV_SUBKEY: parentData.SUBKEY,
        IV_IPAGE:
          parentData.pageCode === this.pageCode.PAXXCJ
            ? this.pageCode.PARZGL
            : parentData.pageCode
      }
      this.$httpServer.sap.baseMethod(reqParams).then((response) => {
        let message = response.ES_MESSAGE
        let et_output = response.ET_OUTPUT
        if (message.MSGTY === 'E')
          return this.handleResponse(message, et_output)
        this.$message.success(message.MSGTX)

        if (parentData.pageCode === this.pageCode.PAXXCJ) {
          this.$router.push({
            path: '/pa/event/',
            query: {
              MENUII: 'PARZGL'
            }
          })
        } else {
          this.closeDialog('Q')
        }
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 处理返回数据
     * @update  11/04/2022
     * @param message
     * @param et_output
     * @returns {*}
     */
    handleResponse(message, et_output) {
      this.isShowErrorTable = true
      this.errorTableDataList = []
      let dataList = []
      et_output.forEach((op) => {
        let isError = false
        let valueList = [] //通过表头组装value值

        this.errorTableHeaderList.forEach((data) => {
          for (let key in op) {
            if (op['MSGTY'] === 'E') isError = true
            data['field'] === key &&
              valueList.push({
                value: op[key],
                key: key
              })
          }
        })
        dataList.push({
          tr: valueList,
          isErrorLine: isError
        })
      })
      dataList.forEach((data) => {
        let itemjson = {}
        data.tr.forEach((item) => (itemjson[item.key] = item.value))
        this.errorTableDataList.push(itemjson)
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 设置行样式
     * @date 2020年07月20日
     * @param row
     * @param rowIndex
     * @returns {{}}
     */
    rowStyle({ row, rowIndex }) {
      let styleObj = {}
      if (row.MSGTY === 'E') styleObj.background = '#FFA3A3'
      styleObj.cursor = 'pointer'
      return styleObj
    },

    /**
     * @Copyright DELOITTE
     * @Description: 校验导入数据
     * @Date: 2020-11-17 19:54:29
     * @returns {boolean}
     */
    verifImportData() {
      let flag = false
      let data = this.$deepClone(this.tableHeaderList)
      let previewList = this.$deepClone(this.previewList)

      for (let k in data) {
        // 校验日期类型数据
        if (data[k].fieldType === 'Date') {
          for (let i in previewList) {
            if (
              previewList[i][data[k].field] &&
              !/^\d{8}$/.test(previewList[i][data[k].field])
            ) {
              this.$message.error(
                data[k].fieldName + I18N.$fanyi('字段格式错误，应为8为数字')
              )
              flag = true
            }
          }
        }
      }

      return flag
    }
  },

  created() {
    this.settingErrorHeader()
  }
}
</script>

<style scoped>
.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 10px 25px 30px;
}
</style>
