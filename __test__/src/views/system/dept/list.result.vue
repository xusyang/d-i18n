<template>
  <LayoutContentV>
    <template #query>
      <el-form
        label-position="top"
        :model="queryData"
        ref="refQueryForm"
        :inline="true"
      >
        <el-form-item :label="I18N.$fanyi('部门名称')" prop="deptName">
          <el-input
            v-model="queryData.deptName"
            :placeholder="I18N.$fanyi('请输入部门名称')"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('部门类型')" prop="deptType">
          <el-select
            v-model="queryData.deptType"
            :placeholder="I18N.$fanyi('请选择部门类型')"
            clearable
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('部门状态')" prop="status">
          <el-select
            v-model="queryData.status"
            :placeholder="I18N.$fanyi('部门状态')"
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Operator" class="opacity">
          <el-button @click="handleResetQuery">
            {{ I18N.$fanyi('重置') }}
          </el-button>
          <el-button type="primary" @click="handleQuery">
            {{ I18N.$fanyi('查询') }}
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #tool>
      <div>
        <el-button type="primary" @click="handleAdd()">
          {{ I18N.$fanyi('新增') }}
        </el-button>
      </div>
    </template>

    <template #content="{ height }">
      <DTable
        :tree-props="{
          children: 'children'
        }"
        :tableDatas="tableDatas"
        :tableColumns="tableColumns"
        :tableOperators="tableOperators"
        :height="height"
        row-key="deptId"
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
  <DeleteDialog ref="deleteRef" @delete="deleteCb" />
</template>

<script setup lang="tsx">
import {
  watch,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  inject
} from 'vue'
import { useStore } from 'vuex'
import { delDept, listDept } from '@/api/system/dept'
import { ElButton } from 'element-plus'
import LayoutContentV from '@/layout/layout-content-v/index.vue'
import DTable from '@/components-custom/d-table/index.vue'
import DeleteDialog from '@/components-custom/d-delete-dialog/index.vue'
import Edit from './edit.vue'
import {
  IDTableColumn,
  IDTableOperator
} from '@/components-custom/d-table/interface'
import DCacaderDept from './d-cascader-dept/index.vue'
import { INotice, SYSTEM_DEPT, watchINotice } from '@/constants/inject-keys'
import {
  convertEnumToOptions,
  convertEnumValueToLabel,
  ENUM_DEPT_TYPE,
  ENUM_STATUE_TYPE
} from '@/constants/enum'
const refresh = inject<INotice>(SYSTEM_DEPT.REFRESH_DEPT)
watchINotice(refresh, () => getData())
const store = useStore()
const { legalId } = toRefs(store.getters)
const { proxy } = getCurrentInstance()
const statusOptions = convertEnumToOptions(ENUM_STATUE_TYPE)
const deptOptions = convertEnumToOptions(ENUM_DEPT_TYPE)
const loading = ref(true)
const editRef = ref(null)
const deleteRef = ref(null)
const queryData = reactive({
  legalId: legalId,
  deptName: '',
  deptType: '',
  status: ''
})
const tableDatas = ref([])
const total = ref(0)
const pageParams = reactive({
  page: 1,
  limit: 10
})

const handlePagenation = ({ page, limit }) => {
  pageParams.page = page
  pageParams.limit = limit
  getData()
}

const getData = async () => {
  loading.value = true
  const res = await listDept({
    ...queryData,
    pageSize: pageParams.limit,
    pageNum: pageParams.page
  })
  total.value = res.total // tableDatas.value = proxy.handleTree(res.data, 'deptId')

  tableDatas.value = res.rows
  loading.value = false
}

watch(() => queryData.legalId, getData)

const handleQuery = () => {
  getData()
}

const handleResetQuery = () => {
  proxy.resetForm('refQueryForm')
}

onMounted(() => {
  getData()
})

const handleAdd = (row?: any) => {
  if (row) {
    editRef.value.open(legalId.value, null, row.id)
  } else {
    editRef.value.open(legalId.value)
  }
}

const handleModify = (row) => {
  editRef.value.open(row.legalId, row.id, row.parentId)
}

const handleDelete = async (row) => {
  deleteRef.value.open(
    I18N.$fanyi(
      '确定要删除当前菜单？如果当前菜单包含子集，则子集的内容也将被一并删除，是否确认删除？'
    ),
    {
      deptId: row.id
    }
  )
}

const deleteCb = async (query) => {
  await delDept(query.deptId)
  proxy.$modal.msgSuccess(I18N.$fanyi('删除成功'))
  getData()
}

const tableOperators = reactive<IDTableOperator[]>([
  // { name: '', func: handleAdd, type: 'danger' },
  {
    name: I18N.$fanyi('修改'),
    func: handleModify,
    type: 'primary'
  },
  {
    name: I18N.$fanyi('删除'),
    func: handleDelete,
    type: 'danger'
  }
])
const tableColumns = reactive<IDTableColumn[]>([
  {
    prop: 'legalName',
    label: I18N.$fanyi('所属法人'),
    width: 200,
    align: 'center'
  },
  {
    prop: 'legalName',
    label: I18N.$fanyi('所属部门'),
    width: 200,
    align: 'center',
    formatter: (row) => {
      const findOne = tableDatas.value.find((item) => item.id === row.parentId)
      return findOne ? findOne.deptName : '-'
    }
  },
  {
    prop: 'deptCode',
    label: I18N.$fanyi('部门编码'),
    width: 160,
    align: 'left'
  },
  {
    prop: 'deptName',
    label: I18N.$fanyi('部门名称'),
    align: 'center'
  },
  {
    prop: 'deptType',
    label: I18N.$fanyi('部门类型'),
    width: 120,
    align: 'center',
    formatter: (row) => {
      return convertEnumValueToLabel(ENUM_DEPT_TYPE, row.deptType)
    }
  },
  {
    prop: 'orderNum',
    label: I18N.$fanyi('排序序号'),
    width: 80,
    align: 'center'
  },
  {
    prop: 'status',
    label: I18N.$fanyi('状态'),
    width: 80,
    align: 'center',
    component: ({ row }) => {
      return convertEnumValueToLabel(ENUM_STATUE_TYPE, row.status)
    }
  },
  {
    prop: 'createTime',
    label: I18N.$fanyi('创建时间'),
    width: 160,
    align: 'center'
  }
])
</script>
