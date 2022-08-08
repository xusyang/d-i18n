<template>
  <LayoutContentV>
    <template #query>
      <el-form label-position="top" :model="queryData" ref="refQueryForm" :inline="true">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryData.menuName" placeholder="请输入菜单名称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-select v-model="queryData.status" placeholder="菜单状态" clearable>
            <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Operator" class="opacity">
          <el-button @click="handleResetQuery">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #tool>
      <div>
        <el-button type="primary" @click="handleAdd" v-hasPermi="['system:menu:add']">新增</el-button>
        <!-- <el-button type="primary" @click="toggleExpandAll">展开/折叠</el-button> -->
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
        :height="height"
        rowKey="id"
        :setting="false"
      ></DTable>
    </template>
  </LayoutContentV>

  <InnerEdit ref="refEdit" @refresh="getList" />
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, ref, watchEffect } from 'vue'
import { delMenu, listMenu } from '@/api/system/menu'

import LayoutContentV from '@/layout/layout-content-v/index.vue'
import DTable from '@/components-custom/d-table/index.vue'

import InnerEdit from './edit.vue'
import { IDTableColumn, IDTableOperator } from '@/components-custom/d-table/interface'
import { normalizeTree } from '@/utils/common'
import { convertEnumValueToLabel, ENUM_MENU_DIRECT_TYPE, ENUM_MENU_TYPE } from '@/constants/enum'

const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict('sys_normal_disable')

const loading = ref(true)
const refEdit = ref(null)

const queryData = reactive({
  menuName: '',
  status: '',
  isFrame: '',
})

let menuList = ref([])
const tableDatas = computed(() => {
  console.time('filter')

  function filter(menus) {
    return menus.filter((item) => {
      let q1 = true
      let q2 = true
      let q3 = true

      if (queryData.menuName) {
        q1 = item.menuName.includes(queryData.menuName)
      }

      if (queryData.status !== '') {
        q2 = item.status === queryData.status
      }

      if (queryData.isFrame !== '') {
        q3 = item.isFrame === queryData.isFrame
      }

      return q1 && q2 && q3
    })
  }

  function findParent(children) {
    let parents = []

    children.forEach((item) => {
      // parentId !== 0 并且 children 中不存在， 并且 parents 中不存在
      if (
        !!item.parentId &&
        !children.find((x) => x.id === item.parentId) &&
        !parents.find((x) => x.id === item.parentId)
      ) {
        const t = menuList.value.find((x) => x.id === item.parentId)
        parents.push(t)
      }
    })

    if (parents.length > 0) {
      parents.push(...findParent(parents))
    }

    return parents
  }

  let menuListFilter = filter(menuList.value)
  const parents = findParent(menuListFilter)
  const menus = [...JSON.parse(JSON.stringify(menuListFilter)), ...parents]

  const res = normalizeTree(0, menus)
  return res
})

/**
 * 新增菜单，权限，目录
 * @param row
 */
function handleAdd(row) {
  let parentId = 0
  if (row != null && row.id) {
    parentId = row.id
  }

  refEdit.value.open(null, parentId)
}

/**
 * 编辑菜单、权限、目录
 */
function handleModify(row) {
  refEdit.value.open(row.id)
}

/**
 * 删除菜单、权限、目录
 */
async function handleDelete(row) {
  await delMenu(row.id)
  proxy.$modal.msgSuccess('删除成功')
  getList()
}

const tableOperators = reactive<IDTableOperator[]>([
  { name: '新增', func: handleAdd, type: 'danger' },
  { name: '修改', func: handleModify, type: 'primary' },
  { name: '删除', func: handleDelete, type: 'danger', isConfirm: true, confirmTitle: '确定删除' },
])

const tableColumns = reactive<IDTableColumn[]>([
  { prop: 'menuName', label: '菜单名称', width: 200, align: 'left' },
  { prop: 'icon', label: '图标', width: 120, align: 'center' },
  { prop: 'perms', label: '权限标识', align: 'center', showOverflowTooltip: true },
  { prop: 'component', label: '组件路径', align: 'center', showOverflowTooltip: true },
  { prop: 'path', label: '路由地址', align: 'center', showOverflowTooltip: true },
  { prop: 'orderNum', label: '排序', width: 60, align: 'center' },
  {
    prop: 'menuType',
    label: '类型',
    width: 80,
    align: 'center',
    formatter: (row) => {
      return convertEnumValueToLabel(ENUM_MENU_TYPE, row.menuType)
    },
  },
  {
    prop: 'isFrame',
    label: '跳转类型',
    width: 120,
    align: 'center',
    formatter: (row) => {
      return convertEnumValueToLabel(ENUM_MENU_DIRECT_TYPE, row.isFrame)
    },
  },
  { prop: 'createTime', label: '创建时间', width: 160, align: 'center' },
])

async function getList() {
  loading.value = true

  const res = await listMenu(queryData)
  menuList.value = res.data

  loading.value = false
}

function handleQuery() {
  getList()
}

function handleResetQuery() {
  proxy.resetForm('refQueryForm')
}

onMounted(() => {
  getList()
})

const isExpandAll = ref(false)
const showChooseIcon = ref(false)
const iconSelectRef = ref(null)

/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset()
  showChooseIcon.value = true
}
/** 选择图标 */
function selected(name) {
  form.value.icon = name
  showChooseIcon.value = false
}
/** 关闭弹窗隐藏图标选择 */
function handleClose() {
  showChooseIcon.value = false
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  isExpandAll.value = !isExpandAll.value
}
</script>
