<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item :label="I18N.$fanyi('登录地址')" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          :placeholder="I18N.$fanyi('请输入登录地址')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('用户名称')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="I18N.$fanyi('请输入用户名称')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('状态')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="I18N.$fanyi('状态')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in sys_common_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('访问时间')" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          :start-placeholder="I18N.$fanyi('开始日期')"
          :end-placeholder="I18N.$fanyi('结束日期')"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetQuery">
          {{ I18N.$fanyi('重置') }}
        </el-button>
        <el-button type="primary" @click="handleQuery">
          {{ I18N.$fanyi('查询') }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" style="min-height: 35px">
      <el-col :span="1.5">
        <el-button
          type="primary"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['monitor:logininfor:remove']"
        >
          {{ I18N.$fanyi('删除') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          plain
          @click="handleClean"
          v-hasPermi="['monitor:logininfor:remove']"
        >
          {{ I18N.$fanyi('清空') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          plain
          @click="handleExport"
          v-hasPermi="['monitor:logininfor:export']"
        >
          {{ I18N.$fanyi('导出') }}
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <LayoutTableH #content="{ height }">
      <el-table
        ref="logininforRef"
        :max-height="height"
        v-loading="loading"
        :data="logininforList"
        @selection-change="handleSelectionChange"
        :default-sort="defaultSort"
        @sort-change="handleSortChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          :label="I18N.$fanyi('访问编号')"
          align="center"
          prop="id"
        />
        <el-table-column
          :label="I18N.$fanyi('登录地址')"
          align="center"
          prop="ipaddr"
        />
        <el-table-column
          :label="I18N.$fanyi('用户名称')"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
          sortable="custom"
          :sort-orders=";['descending', 'ascending']
"
        />
        <el-table-column
          :label="I18N.$fanyi('状态')"
          align="center"
          prop="status"
        >
          <template #default="scope">
            <dict-tag :options="sys_common_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column
          :label="I18N.$fanyi('描述')"
          align="center"
          prop="msg"
        />
        <el-table-column
          :label="I18N.$fanyi('访问时间')"
          align="center"
          prop="accessTime"
          sortable="custom"
          :sort-orders=";['descending', 'ascending']
"
          width="180"
        >
          <template #default="scope">
            <span>
              {{ parseTime(scope.row.accessTime) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </LayoutTableH>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="Logininfor">
import LayoutTableH from '@/layout/layout-table-h/index.vue'
import { list, delLogininfor, cleanLogininfor } from '@/api/system/logininfor'
const { proxy } = getCurrentInstance()
const { sys_common_status } = proxy.useDict('sys_common_status')
const logininforList = ref([])
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const multiple = ref(true)
const total = ref(0)
const dateRange = ref([])
const defaultSort = ref({
  prop: 'loginTime',
  order: 'descending'
}) // 查询参数

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  ipaddr: undefined,
  userName: undefined,
  status: undefined,
  orderByColumn: undefined,
  isAsc: undefined
})
/** 查询登录日志列表 */

function getList() {
  loading.value = true
  list(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      logininforList.value = response.rows
      total.value = response.total
      loading.value = false
    }
  )
}
/** 搜索按钮操作 */

function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */

function resetQuery() {
  dateRange.value = []
  proxy.resetForm('queryRef')
  proxy.$refs['logininforRef'].sort(
    defaultSort.value.prop,
    defaultSort.value.order
  ) // handleQuery()
}
/** 多选框选中数据 */

function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id)
  multiple.value = !selection.length
}
/** 排序触发事件 */

function handleSortChange(column, prop, order) {
  queryParams.value.orderByColumn = column.prop
  queryParams.value.isAsc = column.order
  getList()
}
/** 删除按钮操作 */

function handleDelete(row) {
  const infoIds = row.id || ids.value
  proxy.$modal
    .confirm('是否确认删除访问编号为"' + infoIds + '"的数据项?')
    .then(function () {
      return delLogininfor(infoIds)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}
/** 清空按钮操作 */

function handleClean() {
  proxy.$modal
    .confirm('是否确认清空所有登录日志数据项?')
    .then(function () {
      return cleanLogininfor()
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('清空成功')
    })
    .catch(() => {})
}
/** 导出按钮操作 */

function handleExport() {
  proxy.download(
    'system/logininfor/export',
    { ...queryParams.value },
    'config_' + new Date().getTime() + '.xlsx'
  )
}

getList()
</script>
