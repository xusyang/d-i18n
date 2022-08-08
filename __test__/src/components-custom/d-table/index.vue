<template>
  <div class="container-d-table" ref="refTableContainer">
    <!-- BUG: v-if props.height can fix table height is zero problem -->
    <el-table
      v-if="props.height"
      border
      v-loading="loading"
      :data="filterData"
      @row-click="rowClick"
      @cell-click="cellClick"
      @select-all="selectAll"
      ref="refTable"
      :row-key="rowKey"
      :max-height="props.height"
      :default-expand-all="true"
      v-bind="attrs"
    >
      <!-- Column的处理 -->
      <el-table-column
        v-for="item in filterTableColumns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : ''"
        :fixed="item.fixed"
        :align="item.align"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template #default="scope">
          <!-- TODO: 自定义组件形式 -->
          <component v-if="item.component" :is="item.component" :scope="scope" :row="scope.row"></component>
          <template v-else>
            {{
              item.formatter
                ? item.formatter(scope.row, scope.index, get(scope.row, item.prop))
                : get(scope.row, item.prop)
            }}
          </template>
        </template>
      </el-table-column>

      <!-- Operator的处理 -->
      <el-table-column label="操作" v-if="tableOperators?.length > 0" :width="operatorWidth">
        <!-- TODO: 权限处理 -->
        <template #default="scope">
          <div class="operators">
            <template v-for="(item, index) in tableOperators" :key="index">
              <template v-if="item.isConfirm">
                <el-popconfirm :title="item.confirmTitle" @confirm="emitMethods(item, scope)">
                  <template #reference>
                    <div class="operator">{{ item.name }}</div>
                  </template>
                </el-popconfirm>
              </template>
              <template v-else>
                <div class="operator" @click.native.stop.prevent="emitMethods(item, scope)">
                  {{ item.name }}
                </div>
              </template>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column :width="settingWidth" v-if="setting">
        <template #header>
          <el-icon class="setting"><setting /></el-icon>
        </template>
      </el-table-column>
    </el-table>

    <slot name="pagination"></slot>
  </div>

  <!-- 表单字段选择器选择器 -->
  <div></div>
</template>

<script lang="ts" setup>
import { useAttrs, computed, defineProps, onMounted, PropType, ref } from 'vue'
import { get } from 'lodash'
import { IDTableColumn, IDTableOperator } from './interface'

const attrs = useAttrs()

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  height: {
    type: Number,
    default: 400,
  },

  rowKey: {
    type: String,
    default: '',
  },

  tableDatas: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  tableColumns: {
    type: Array as PropType<IDTableColumn[]>,
    default: () => [],
  },

  tableOperators: {
    type: Array as PropType<IDTableOperator[]>,
    default: () => [],
  },

  setting: {
    type: Boolean,
    default: true,
  }
})

const refTable = ref(null)

const rowClick = () => {}

const cellClick = () => {}

const selectAll = () => {}

const filterTableColumns = computed(() => {
  return props.tableColumns
})

const filterData = computed(() => {
  return props.tableDatas
})

const operatorWidth = computed(() => {
  const padding = 0
  const chatWidth = 25
  const chatCount = props.tableOperators.map((x) => x.name).join().length
  return Math.max(80, chatCount * chatWidth + padding)
})

const settingWidth = computed(() => {
  return 40
})

const emitMethods = async (operator, scope) => {
  const { func } = operator
  const { row } = scope
  await func(row)
}
</script>

<style lang="scss" scoped>
.setting {
  cursor: pointer;
}

.operators {
  display: flex;
  .operator {
    margin: 0 2px;
    padding: 0 5px;
    position: relative;
    cursor: pointer;
    user-select: none;
    opacity: 0.75;

    &::after {
      content: '';
      position: absolute;
      right: -2px;
      top: 30%;
      bottom: 30%;
      width: 2px;
      background: #000;
      transform: scaleX(0.2);
    }

    &:hover {
      opacity: 1;
      color: #000;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type::after {
      display: none;
    }
  }
}
</style>
