<template>
  <el-dialog title="维度权限" v-model="show" width="600px" append-to-body>
    <el-form
      ref="roleRef"
      :model="form"
      label-width="110px"
      v-loading="loading"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
      </el-form-item>
      <div class="dimension-wrapper">
        <div class="dimension">
          <p
            v-for="item in lists"
            @click="handleType(item.code)"
            :class="{ active: typeActive === item.code }"
          >
            {{ item.name }}
          </p>
        </div>
        <div class="content-wrapper">
          <template v-for="item in lists">
            <el-form-item
              label="所有表数据权限"
              v-show="typeActive === item.code"
            >
              <el-radio-group v-model="form.allData[currentIndex]">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
          <el-form-item
            label="权限范围"
            label-width="70px"
            v-show="!form.allData[currentIndex]"
          >
            <el-input
              v-model="form.query"
              placeholder="请输入关键字搜索"
              @input="onQueryChanged"
            />
          </el-form-item>
          <el-form-item label-width="0" v-show="!form.allData[currentIndex]">
            <el-checkbox v-model="treeExpand" @change="handleCheckedTreeExpand"
              >展开/折叠</el-checkbox
            >
            <el-checkbox
              v-model="treeNodeAll"
              @change="handleCheckedTreeNodeAll"
              >全选/全不选</el-checkbox
            >
            <!-- <el-checkbox v-model="form.checkStrictly">父子联动</el-checkbox> -->
          </el-form-item>
          <template v-for="(item, index) in lists">
            <tree-v2
              v-show="!form.allData[currentIndex] && typeActive === item.code"
              :ref="setTreeRef"
              :data="allTreeData[index]"
              :props="{
                label: item.field + '_name',
                value: item.field + '_code',
                children: 'children'
              }"
              show-checkbox
              node-key="id"
              :check-strictly="!form.checkStrictly"
              :filter-method="filterMethod"
              :height="300"
              @check-change="handleTreeCheck"
            />
          </template>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, computed, getCurrentInstance, nextTick } from 'vue'
import {
  flattenTree,
  deepTreeHasChild,
  findParent,
  findChild
} from '@/utils/ruoyi'
import { treeLazy } from '@/api/task'
import { checkedKeys, setCheckedKeys } from '@/api/system/role'

const { proxy } = getCurrentInstance()
const show = ref(false)
const loading = ref(true)
const form = reactive({
  roleId: '',
  roleName: '',
  roleKey: '',
  allData: [],
  checkStrictly: false,
  query: ''
})
const fieldMap = {
  corp: 'org',
  bl: 'bl',
  depart: 'center'
}
const lists = ref([
  { name: '机构', code: 'corp', field: 'org' },
  { name: '条线', code: 'bl', field: 'bl' },
  { name: '成本中心', code: 'depart', field: 'center' }
])
const allTreeData = ref([])
const typeActive = ref('corp')
const treeExpand = ref(false)
const treeNodeAll = ref(false)

const currentIndex = computed(() => {
  return lists.value.findIndex(item => item.code === typeActive.value)
})
const currentField = computed(() => {
  const findOne = lists.value.find(item => item.code === typeActive.value)
  return findOne ? findOne.field : ''
})

let refItems = []
const setTreeRef = el => {
  if (el) {
    refItems.push(el)
  }
}
const handleType = active => {
  typeActive.value = active
}

const fetchTreeData = () => {
  const allTreeAjax = lists.value.map(item =>
    treeLazy(item.code, {
      conditions: [],
      extra: {
        nonRoleDimPrivilege: true
      }
    })
  )
  Promise.all(allTreeAjax).then(res => {
    allTreeData.value = res.map(item => item.data.rows)
    fetchCheckedKey()
  })
}

const fetchCheckedKey = () => {
  const allKeyAjax = lists.value.map(item =>
    checkedKeys(form.roleId, item.code, fieldMap[item.code])
  )
  Promise.all(allKeyAjax).then(res => {
    form.allData = res.map(item => item.data.allData)
    res.forEach((item, index) => {
      if (!item.data.allData) {
        nextTick(() => {
          refItems[index].setCheckedKeys(item.data.dimDatas || [])
        })
      }
    })
    loading.value = false
  })
}

const onQueryChanged = (query: string) => {
  refItems[currentIndex.value]!.filter(query)
}

const filterMethod = (query: string, node) => {
  return node[currentField.value + '_name']!.includes(query)
}
// 展开/折叠
const handleCheckedTreeExpand = () => {
  const treeRef = refItems[currentIndex.value]
  const keys = deepTreeHasChild(
    allTreeData.value[currentIndex.value],
    currentField.value + '_code'
  )
  treeExpand.value ? treeRef.expandByKeys(keys) : treeRef.collapseByKeys(keys)
}
// 全选/全不选
const handleCheckedTreeNodeAll = () => {
  const treeData = flattenTree(
    allTreeData.value[currentIndex.value],
    currentField.value + '_code'
  )
  refItems[currentIndex.value].setCheckedKeys(treeNodeAll.value ? treeData : [])
}

// 叶子选中，父级节点必须选中
const handleTreeCheck = (data, node) => {
  // const checkedKeys = refItems[currentIndex.value].getCheckedKeys()
  // const fieldCode = currentField.value + '_code'
  // if (node) {
  //   const parentNodes = findParent(allTreeData.value[currentIndex.value], data[fieldCode], fieldCode)
  //   refItems[currentIndex.value].setCheckedKeys(checkedKeys.concat(parentNodes))
  // } else {
  //   const childNodes = findChild(allTreeData.value[currentIndex.value], data[fieldCode], fieldCode)
  //   const shouldChecked = checkedKeys.filter(item => !childNodes.includes(item))
  //   refItems[currentIndex.value].setCheckedKeys(shouldChecked)
  // }
}

const submitForm = () => {
  const params = form.allData.map((item, index) => ({
    roleId: form.roleId,
    allData: item,
    dimTableField: `ca_${lists.value[index]['code']}.${lists.value[index]['field']}_code`,
    dimDatas: refItems[index].getCheckedKeys()
  }))
  setCheckedKeys(params).then(res => {
    if (res.code === 200) {
      proxy.$modal.msgSuccess('操作成功')
      cancel()
    }
  })
}

const open = data => {
  loading.value = true
  allTreeData.value.length = 0
  form.roleId = data.id
  form.roleName = data.roleName
  form.roleKey = data.roleKey
  show.value = true
  typeActive.value = 'corp'
  fetchTreeData()
}
const cancel = () => {
  show.value = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.dimension-wrapper {
  display: flex;
  .dimension {
    width: 88px;
    margin-right: 12px;
    text-align: center;
    p {
      margin: 0;
      padding-right: 5px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      font-weight: bold;
      &.active {
        background: var(--el-color-primary);
        color: #fff;
        border-radius: 4px;
      }
    }
  }
  .content-wrapper {
    flex: 1;
  }
}
</style>
