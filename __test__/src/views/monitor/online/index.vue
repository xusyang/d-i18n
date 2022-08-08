<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="I18N.$fanyi('登录地址')" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          :placeholder="I18N.$fanyi('请输入登录地址')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="I18N.$fanyi('用户名称')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="I18N.$fanyi('请输入用户名称')"
          clearable
          @keyup.enter="handleQuery"
        />
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
    <LayoutTableH #content="{ height }">
      <el-table
        v-loading="loading"
        :max-height="height"
        :data="onlineList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        style="width: 100%"
      >
        <el-table-column
          :label="I18N.$fanyi('序号')"
          width="50"
          type="index"
          align="center"
        >
          <template #default="scope">
            <span>
              {{ ;(pageNum - 1) * pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="I18N.$fanyi('会话编号')"
          align="center"
          prop="tokenId"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('用户名称')"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('登录地址')"
          align="center"
          prop="ipaddr"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :label="I18N.$fanyi('登录时间')"
          align="center"
          prop="loginTime"
          width="180"
        >
          <template #default="scope">
            <span>
              {{ parseTime(scope.row.loginTime) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="I18N.$fanyi('操作')"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              type="text"
              icon="Delete"
              @click="handleForceLogout(scope.row)"
              v-hasPermi="['monitor:online:forceLogout']"
            >
              {{ I18N.$fanyi('强退') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </LayoutTableH>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="pageNum"
      v-model:limit="pageSize"
    />
  </div>
</template>

<script setup name="Online">
import LayoutTableH from '@/layout/layout-table-h/index.vue'
import { forceLogout, list as initData } from '@/api/monitor/online'
const { proxy } = getCurrentInstance()
const onlineList = ref([])
const loading = ref(true)
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const queryParams = ref({
  ipaddr: undefined,
  userName: undefined
})
/** 查询登录日志列表 */

function getList() {
  loading.value = true
  initData(queryParams.value).then((response) => {
    onlineList.value = response.rows
    total.value = response.total
    loading.value = false
  })
}
/** 搜索按钮操作 */

function handleQuery() {
  pageNum.value = 1
  getList()
}
/** 重置按钮操作 */

function resetQuery() {
  proxy.resetForm('queryRef')
  // handleQuery()
}
/** 强退按钮操作 */

function handleForceLogout(row) {
  proxy.$modal
    .confirm('是否确认强退名称为"' + row.userName + '"的用户?')
    .then(function () {
      return forceLogout(row.tokenId)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

getList()
</script>
