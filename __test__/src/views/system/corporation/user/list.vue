<template>
  <LayoutContentV>
    <template #query>
      <el-form label-position="top" :model="queryData" ref="refQueryForm" :inline="true">
        <el-form-item label="用户名称" prop="nickName">
          <el-input v-model="queryData.nickName" placeholder="请输入用户昵称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="queryData.phoneNumber" placeholder="请输入手机号" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="queryData.email" placeholder="请输入邮箱" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="queryData.roleId" placeholder="角色" clearable>
            <el-option v-for="role in roles" :key="role.id" :label="role.roleName" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Operator" class="opacity">
          <el-button @click="handleResetQuery">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #tool>
      <div v-if="level !== 1">
        <el-button type="primary" @click="handleAdd">新增法人管理员</el-button>
      </div>
    </template>

    <template #content="{ height }">
      <!-- v-hasPermi="['system:menu:edit']"
      v-hasPermi="['system:menu:add']"
      v-hasPermi="['system:menu:remove']" -->
      <DTable
        :tree-props="{ children: 'children' }"
        :tableDatas="tableDatas"
        :tableColumns="tableColumns"
        :tableOperators="tableOperators"
        :height="500"
        row-key="id"
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
    </template>
  </LayoutContentV>

  <Edit ref="editRef" />
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, reactive, ref, toRefs, watch } from 'vue'
import * as ApiLegal from '@/api/system/legal'

import LayoutContentV from '@/layout/layout-content-v/index.vue'
import DTable from '@/components-custom/d-table/index.vue'
import Edit from './edit.vue'
import { INotice, SYSTEM_LEGAL } from '@/constants/inject-keys'

import { listRole } from '@/api/system/role'

const refresh = inject<INotice>(SYSTEM_LEGAL.REFRESH_LEGALUSER)
watch(refresh.tag, () => getData())

const props = defineProps<{ legalId: Number, level: Number }>()
const { legalId, level } = toRefs(props)

const { proxy } = getCurrentInstance()

const loading = ref(true)
const editRef = ref(null)

const queryData = reactive({
  legalId: legalId,
  email: '',
  nickName: '',
  phoneNumber: '',
  roleId: ''
})

watch(
  () => queryData.legalId,
  () => {
    getData()
  },
)

const tableDatas = ref([])
const roles = ref([])
const total = ref(0)
const pageParams = reactive({
  page: 1,
  limit: 5,
})

const handlePagenation = ({ page, limit }) => {
  pageParams.page = page
  pageParams.limit = limit
  getData()
}

const handleAdd = () => {
  editRef.value.open(queryData.legalId)
}

const handleDelete = async (row) => {
  const data = {
    userId: row.userId,
    legalId: row.legalId,
  }

  await ApiLegal.delUser(data)
  proxy.$modal.msgSuccess('删除成功')
  getData()
}

const tableOperators = reactive([
  { name: '删除', func: handleDelete, type: 'danger', isConfirm: true, confirmTitle: '确定删除' },
])

const tableColumns = reactive([
  { prop: 'userId', label: '用户编码', width: 80, align: 'center' },
  { prop: 'nickName', label: '用户名称', width: 120, align: 'center' },
  { prop: 'legalName', label: '法人名称', align: 'center' },
  { prop: 'phoneNumber', label: '手机号码', width: 120, align: 'center' },
  { prop: 'email', label: '邮箱', align: 'center' },
  { prop: 'roleNameMerge', label: '角色', align: 'center' }
])

// 根据userId以及legalName合并
const mergeData = (data) => {
  let preObj = {
    userId: null,
    legalName: null,
    roleName: null,
    roleNameMerge: null,
  }
  const ret = data.reduce((pre, cur) => {
    if (preObj.userId === cur.userId && preObj.legalName === cur.legalName) {
      let preLast = pre[pre.length - 1]
      preLast.roleNameMerge = preLast.roleName + ',' + preObj.roleName + ',' + cur.roleName
      preObj = cur
      return pre
    } else {
      preObj = cur
      pre.push(cur)
      return pre
    }
  }, [])
  return ret
}

const getData = async () => {
  loading.value = true
  const params = {
    ...queryData,
    groupId: level.value === 1 ? queryData.legalId : null,
    legalId: level.value !== 1 ? queryData.legalId : null,
    pageSize: pageParams.limit,
    pageNum: pageParams.page,
  }
  const res = await ApiLegal.listUser(params)
  total.value = res.total
  tableDatas.value = mergeData(res.rows.map(item => ({...item, roleNameMerge: item.roleName})))
  loading.value = false
}
getData()

const handleQuery = () => {
  getData()
}

const handleResetQuery = () => {
  proxy.resetForm('refQueryForm')
}

const getRoles = () => {
  listRole().then(res => {
    roles.value = res.rows || []
  })
}

getRoles()
</script>
