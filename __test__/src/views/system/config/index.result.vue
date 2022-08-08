<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item :label="I18N.$fanyi('参数名称')" prop="configName">
        <el-input
          v-model="queryParams.configName"
          :placeholder="I18N.$fanyi('请输入参数名称')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('参数键名')" prop="configKey">
        <el-input
          v-model="queryParams.configKey"
          :placeholder="I18N.$fanyi('请输入参数键名')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('系统内置')" prop="configType">
        <el-select
          v-model="queryParams.configType"
          :placeholder="I18N.$fanyi('系统内置')"
          clearable
        >
          <el-option
            v-for="dict in sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('创建时间')" style="width: 308px">
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          @click="handleAdd"
          v-hasPermi="['system:config:add']"
        >
          {{ I18N.$fanyi('新增') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:config:edit']"
        >
          {{ I18N.$fanyi('修改') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:config:remove']"
        >
          {{ I18N.$fanyi('删除') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          plain
          @click="handleExport"
          v-hasPermi="['system:config:export']"
        >
          {{ I18N.$fanyi('导出') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          plain
          @click="handleRefreshCache"
          v-hasPermi="['system:config:remove']"
        >
          {{ I18N.$fanyi('刷新缓存') }}
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <LayoutTableH #content="{ height }">
      <el-table
        v-loading="loading"
        :data="configList"
        @selection-change="handleSelectionChange"
        :max-height="height"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          :label="I18N.$fanyi('参数主键')"
          align="center"
          prop="id"
        />
        <el-table-column
          :label="I18N.$fanyi('参数名称')"
          align="center"
          prop="configName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('参数键名')"
          align="center"
          prop="configKey"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('参数键值')"
          align="center"
          prop="configValue"
        />
        <el-table-column
          :label="I18N.$fanyi('系统内置')"
          align="center"
          prop="configType"
        >
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
          </template>
        </el-table-column>
        <el-table-column
          :label="I18N.$fanyi('备注')"
          align="center"
          prop="remark"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('创建时间')"
          align="center"
          prop="createTime"
          width="180"
        >
          <template #default="scope">
            <span>
              {{ parseTime(scope.row.createTime) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="I18N.$fanyi('操作')"
          align="center"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              type="text"
              icon="Edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:config:edit']"
            >
              {{ I18N.$fanyi('修改') }}
            </el-button>
            <el-button
              type="text"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:config:remove']"
            >
              {{ I18N.$fanyi('删除') }}
            </el-button>
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

    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form ref="configRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="I18N.$fanyi('参数名称')" prop="configName">
          <el-input
            v-model="form.configName"
            :placeholder="I18N.$fanyi('请输入参数名称')"
          />
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('参数键名')" prop="configKey">
          <el-input
            v-model="form.configKey"
            :placeholder="I18N.$fanyi('请输入参数键名')"
          />
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('参数键值')" prop="configValue">
          <el-input
            v-model="form.configValue"
            :placeholder="I18N.$fanyi('请输入参数键值')"
          />
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('系统内置')" prop="configType">
          <el-radio-group v-model="form.configType">
            <el-radio
              v-for="dict in sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="I18N.$fanyi('备注')" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :placeholder="I18N.$fanyi('请输入内容')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">
            {{ I18N.$fanyi('确 定') }}
          </el-button>
          <el-button @click="cancel">
            {{ I18N.$fanyi('取 消') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Config">
import LayoutTableH from '@/layout/layout-table-h/index.vue'
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
  refreshCache
} from '@/api/system/config'
const { proxy } = getCurrentInstance()
const { sys_yes_no } = proxy.useDict('sys_yes_no')
const configList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const dateRange = ref([])
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    configName: undefined,
    configKey: undefined,
    configType: undefined
  },
  rules: {
    configName: [
      {
        required: true,
        message: I18N.$fanyi('参数名称不能为空'),
        trigger: 'blur'
      }
    ],
    configKey: [
      {
        required: true,
        message: I18N.$fanyi('参数键名不能为空'),
        trigger: 'blur'
      }
    ],
    configValue: [
      {
        required: true,
        message: I18N.$fanyi('参数键值不能为空'),
        trigger: 'blur'
      }
    ]
  }
})
const { queryParams, form, rules } = toRefs(data)
/** 查询参数列表 */

function getList() {
  loading.value = true
  listConfig(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      configList.value = response.rows
      total.value = response.total
      loading.value = false
    }
  )
}
/** 取消按钮 */

function cancel() {
  open.value = false
  reset()
}
/** 表单重置 */

function reset() {
  form.value = {
    configId: undefined,
    configName: undefined,
    configKey: undefined,
    configValue: undefined,
    configType: 'Y',
    remark: undefined
  }
  proxy.resetForm('configRef')
}
/** 搜索按钮操作 */

function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */

function resetQuery() {
  dateRange.value = []
  proxy.resetForm('queryRef') // handleQuery()
}
/** 多选框选中数据 */

function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 新增按钮操作 */

function handleAdd() {
  reset()
  open.value = true
  title.value = I18N.$fanyi('添加参数')
}
/** 修改按钮操作 */

function handleUpdate(row) {
  reset()
  const configId = row.id || ids.value
  getConfig(configId).then((response) => {
    form.value = response.data
    open.value = true
    title.value = I18N.$fanyi('修改参数')
  })
}
/** 提交按钮 */

function submitForm() {
  proxy.$refs['configRef'].validate((valid) => {
    if (valid) {
      if (form.value.id != undefined) {
        updateConfig(form.value).then((response) => {
          proxy.$modal.msgSuccess(I18N.$fanyi('修改成功'))
          open.value = false
          getList()
        })
      } else {
        addConfig(form.value).then((response) => {
          proxy.$modal.msgSuccess(I18N.$fanyi('新增成功'))
          open.value = false
          getList()
        })
      }
    }
  })
}
/** 删除按钮操作 */

function handleDelete(row) {
  const configIds = row.id || ids.value
  proxy.$modal
    .confirm('是否确认删除参数编号为"' + configIds + '"的数据项？')
    .then(function () {
      return delConfig(configIds)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}
/** 导出按钮操作 */

function handleExport() {
  proxy.download(
    'system/config/export',
    { ...queryParams.value },
    'config_' + new Date().getTime() + '.xlsx'
  )
}
/** 刷新缓存按钮操作 */

function handleRefreshCache() {
  refreshCache().then(() => {
    proxy.$modal.msgSuccess(I18N.$fanyi('刷新缓存成功'))
  })
}

getList()
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
