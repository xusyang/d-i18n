<template>
  <div class="container-legal-tree">
    <el-input
      class="search-box"
      v-model="filterText"
      :placeholder="I18N.$fanyi('搜索法人')"
      :suffix-icon="Search"
    />
    <el-scrollbar style="height: calc(100% - 50px)">
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="data"
        :props="treeProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        node-key="id"
        @node-click="selectNode"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <div>
              <i class="iconfont icon-select" v-if="data.select"></i>
              <el-tooltip
                :disabled="!node.label || node.label.length < 15"
                placement="top"
                effect="light"
              >
                <template #content>
                  {{ node.label }}
                </template>
                <span>
                  {{ $emphasisText(node.label) }}
                </span>
              </el-tooltip>
            </div>
            <div class="tools" v-if="canEdit && data.select">
              <el-popconfirm
                :title="
                  I18N.$fanyi('确认要删除【') +
                  data.label +
                  I18N.$fanyi('】吗？')
                "
                @confirm="handleDel(data)"
              >
                <template #reference>
                  <i class="iconfont icon-del"></i>
                </template>
              </el-popconfirm>
              <i class="iconfont icon-edit" @click="handleEdit(data)"></i>
            </div>
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>

  <Edit ref="editRef" />
</template>

<script lang="ts" setup>
import { ref, watch, computed, inject, nextTick } from 'vue'
import type { ElTree } from 'element-plus'
import * as ApiLegal from '@/api/system/legal'
import { Search } from '@element-plus/icons-vue'
import { INotice, SYSTEM_LEGAL } from '@/constants/inject-keys'
import Edit from './edit.vue'
const refresh = inject<INotice>(SYSTEM_LEGAL.REFRESH_LEGAL)

if (refresh && refresh.tag) {
  watch(refresh.tag, () => {
    getData()
  })
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const { modelValue, canEdit = true } = defineProps<{
  modelValue: Number
  canEdit: Boolean
}>()
const emit = defineEmits(['update:modelValue', 'level'])
const editRef = ref(null)
const value = computed({
  get() {
    return modelValue
  },

  set(value) {
    emit('update:modelValue', value)
  }
})
const treeRef = ref<InstanceType<typeof ElTree>>()
const treeProps = {
  children: 'children',
  label: 'label'
}
const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const data = ref<Tree[]>([])

const getData = async () => {
  const res = await ApiLegal.tree()

  const normalize = (data) => {
    const res = data.map((x) => {
      const { children } = x

      if (children && children.length > 0) {
        return {
          id: x.id,
          label: x.legalName,
          children: normalize(children)
        }
      } else {
        return {
          id: x.id,
          label: x.legalName
        }
      }
    })
    return res
  }

  data.value = normalize(res.data) // 默认选中第一个集团

  if (data.value && data.value.length) {
    const firstId = data.value[0].id
    value.value = firstId
    nextTick(() => {
      treeRef.value.setCurrentKey(firstId)
    })
  }
}

getData()
let preNode = null

const selectNode = (node, treeNode) => {
  if (preNode === node) return
  node.select = true

  if (preNode) {
    preNode.select = false
  }

  preNode = node
  value.value = node.id
  emit('level', treeNode.level)
}

const handleEdit = (data) => {
  editRef.value.open(data.id)
}

const handleDel = async (data) => {
  await ApiLegal.del(data.id)
  getData()
}
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 20px;
}

.container-legal-tree {
  height: 100%;
  background: var(--base-background-component);
  .el-tree {
    padding: 0 10px 10px 0;
    background: transparent;
  }
}

:deep(.custom-tree-node) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .icon-select {
    margin-right: 5px;
    font-size: 18px;
  }

  .tools {
    display: flex;
    margin-right: 20px;
    .iconfont {
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
</style>
