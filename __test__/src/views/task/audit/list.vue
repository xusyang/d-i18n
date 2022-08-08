<template>
  <LayoutContentV>
    <template #query>
      <el-form label-width="90px" :model="queryData" ref="refQueryForm" :inline="true">
        <el-form-item label="待审核内容" prop="name">
          <el-select v-model="queryData.guid" placeholder="请选择" clearable>
            <el-option v-for="item in checkType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="processTitle">
          <el-input v-model="queryData.processTitle" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="申请人" prop="applyUserName">
          <el-input v-model="queryData.applyUserName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="审核状态" prop="agree" v-if="currentTab === 'did'">
          <el-select v-model="queryData.agree" placeholder="请选择" clearable>
            <el-option v-for="item in agreeStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="createTime" style="width: 308px">
          <el-date-picker
            v-model="queryData.createTime"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Operator" class="opacity">
          <el-button @click="handleResetQuery">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #content="{ height }">
      <el-tabs class="white-tabs" v-model="currentTab" @tab-click="changeTab">
        <el-tab-pane :label="tab.name" :name="tab.key" v-for="tab in tabs" :key="tab.key">
          <DTable
            :tableDatas="tableDatas"
            :tableColumns="tableColumns"
            :tableOperators="tableOperators"
            row-key="id"
            :height="height - 120"
            :loading="loading"
            :setting="false"
          >
            <template #pagination>
              <Pagination
                :total="total"
                :page="pageParams.page"
                :limit="pageParams.limit"
                @pagination="handlePagenation"
              />
            </template>
          </DTable>
        </el-tab-pane>
      </el-tabs>
    </template>
  </LayoutContentV>
  <el-dialog title="审核" v-model="show" width="700px" :before-close="handleClose" append-to-body>
    <Audit v-bind="dialogQuery" @success="handleSuccess" @cancel="handleClose" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { taskTodoList, taskDidList } from '@/api/task'
import Cookies from 'js-cookie'

import LayoutContentV from '@/layout/layout-content-v/index.vue'
import DTable from '@/components-custom/d-table/index.vue'
import Audit from './Audit.vue'
import { AGREE_STATUS, convertEnumValueToLabel, convertEnumToOptions, CPS_AUDIT_TYPE } from '@/constants/enum'

const sys_user = JSON.parse(Cookies.get('sys_user'))
const { proxy } = getCurrentInstance()
const show = ref(false)
const router = useRouter()

const loading = ref(true)

const queryData = reactive({
  guid: '',
  processTitle: '',
  applyUserName: '',
  createTime: [],
  agree: '',
  pernr: sys_user.userId,
})

const dialogQuery = reactive({
  processDefinitionKey: '',
  menuCode: '',
  sourceId: '',
  taskId: '',
})

const agreeStatus = convertEnumToOptions(AGREE_STATUS)
const checkType = convertEnumToOptions(CPS_AUDIT_TYPE)

const total = ref(0)
const pageParams = reactive({
  page: 1,
  limit: 10,
})

const tabs = ref([
  { name: '待审核', key: 'todo' },
  { name: '已审核', key: 'did' },
])
const currentTab = ref('todo')
const tableDatas = ref([])

const changeTab = () => {
  handleResetQuery()
  handleQuery()
}

const handleCheck = async (row) => {
  dialogQuery.processDefinitionKey = row.processDefinitionKey
  dialogQuery.menuCode = row.menuCode
  dialogQuery.sourceId = row.nodeId
  dialogQuery.taskId = row.id
  show.value = true
}

const handleDetail = (row) => {
  router.push({
    path: '/task/audit/todoDetail',
    query: {
      taskId: row.id,
      businessNo: row.businessNo,
      processDefinitionKey: row.processDefinitionKey,
      pernr: sys_user.userId,
      processInstanceId: row.processInstanceId,
      menuCode: row.menuCode,
      sourceId: row.nodeId,
      type: currentTab.value,
    },
  })
}

const todoColumns = [
  {
    prop: 'name',
    label: '待审核内容',
    formatter: (row) => {
      return convertEnumValueToLabel(CPS_AUDIT_TYPE, row.processDefinitionKey, true) || row.businessNo
    },
  },
  {
    prop: 'processTitle',
    label: '名称',
    formatter: (row) => {
      return row.businessName
    },
  },
  { prop: 'applyUserName', label: '申请人' },
  { prop: 'createTime', label: '申请时间' },
]

const didColumns = [
  {
    prop: 'name',
    label: '审核内容',
    formatter: (row) => {
      return convertEnumValueToLabel(CPS_AUDIT_TYPE, row.processDefinitionKey, true) || row.businessNo
    },
  },
  {
    prop: 'processTitle',
    label: '名称',
    formatter: (row) => {
      return row.businessName
    },
  },
  { prop: 'applyUserName', label: '申请人' },
  { prop: 'createTime', label: '申请时间' },
  { prop: 'endTime', label: '审核时间' },
  {
    prop: 'agree',
    label: '审核状态',
    formatter: (row) => {
      return convertEnumValueToLabel(AGREE_STATUS, row.agree)
    },
  },
]

const totoOperator = [
  { name: ' 审核', func: handleCheck, type: 'primary' },
  { name: '查看', func: handleDetail, type: 'primary' },
]

const didOperator = [{ name: '查看', func: handleDetail, type: 'primary' }]

const tableColumns = computed(() => {
  return currentTab.value === 'todo' ? todoColumns : didColumns
})

const tableOperators = computed(() => {
  return currentTab.value === 'todo' ? totoOperator : didOperator
})

const getData = async () => {
  loading.value = true
  const method = currentTab.value === 'todo' ? taskTodoList : taskDidList
  const params = {
    ...queryData,
    ...pageParams,
    begin: queryData.createTime[0],
    end: queryData.createTime[1],
  }
  const res = await method(params)
  if (res.data) {
    total.value = res.data.total
    tableDatas.value = res.data.list || []
  } else {
    total.value = 0
    tableDatas.value = []
  }
  loading.value = false
}
getData()

const handleQuery = () => {
  pageParams.page = 1
  getData()
}

const handleResetQuery = () => {
  proxy.resetForm('refQueryForm')
  handleQuery()
}

const handlePagenation = ({ page, limit }) => {
  pageParams.page = page
  pageParams.limit = limit
  getData()
}

const handleSuccess = () => {
  handleClose()
  handleQuery()
}
const handleClose = () => {
  show.value = false
}
</script>
