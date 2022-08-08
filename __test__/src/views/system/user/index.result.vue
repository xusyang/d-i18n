<template>
  <div class="app-container">
    <el-row :gutter="20" class="h100">
      <el-col :span="4" :xs="24" class="h100">
        <div class="head-container">
          <el-input
            v-model="deptName"
            :placeholder="I18N.$fanyi('请输入部门名称')"
            clearable
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>

        <div class="tree-container">
          <el-scrollbar>
            <el-tree
              :data="deptOptions"
              :props="{
                label: 'label',
                children: 'children'
              }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              node-key="id"
              ref="deptTreeRef"
              default-expand-all
              @node-click="handleNodeClick"
            />
          </el-scrollbar>
        </div>
      </el-col>

      <el-col :span="20" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryRef"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item :label="I18N.$fanyi('用户名称')" prop="userName">
            <el-input
              v-model="queryParams.userName"
              :placeholder="I18N.$fanyi('请输入用户名称')"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item :label="I18N.$fanyi('手机号码')" prop="phoneNumber">
            <el-input
              v-model="queryParams.phoneNumber"
              :placeholder="I18N.$fanyi('请输入手机号码')"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item :label="I18N.$fanyi('状态')" prop="status">
            <el-select
              v-model="queryParams.status"
              :placeholder="I18N.$fanyi('用户状态')"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in sys_normal_disable"
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
              v-hasPermi="['system:user:add']"
            >
              {{ I18N.$fanyi('新增') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
            >
              {{ I18N.$fanyi('修改') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
            >
              {{ I18N.$fanyi('删除') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              @click="handleImport"
              v-hasPermi="['system:user:import']"
            >
              {{ I18N.$fanyi('导入') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              @click="handleExport"
              v-hasPermi="['system:user:export']"
            >
              {{ I18N.$fanyi('导出') }}
            </el-button>
          </el-col>
          <right-toolbar
            v-model:showSearch="showSearch"
            @queryTable="getList"
            :columns="columns"
          ></right-toolbar>
        </el-row>

        <LayoutTableH #content="{ height }">
          <el-table
            v-loading="loading"
            :data="userList"
            @selection-change="handleSelectionChange"
            :max-height="height"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column
              :label="I18N.$fanyi('用户编号')"
              align="center"
              key="id"
              prop="id"
              v-if="columns[0].visible"
            />
            <el-table-column
              :label="I18N.$fanyi('用户名称')"
              align="center"
              key="userName"
              prop="userName"
              v-if="columns[1].visible"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              :label="I18N.$fanyi('用户昵称')"
              align="center"
              key="nickName"
              prop="nickName"
              v-if="columns[2].visible"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              :label="I18N.$fanyi('部门')"
              align="center"
              key="deptName"
              prop="dept.deptName"
              v-if="columns[3].visible"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              :label="I18N.$fanyi('手机号码')"
              align="center"
              key="phoneNumber"
              prop="phoneNumber"
              v-if="columns[4].visible"
              width="120"
            />
            <el-table-column
              :label="I18N.$fanyi('状态')"
              align="center"
              key="status"
              v-if="columns[5].visible"
            >
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              :label="I18N.$fanyi('创建时间')"
              align="center"
              prop="createTime"
              v-if="columns[6].visible"
              width="160"
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
                <el-tooltip :content="I18N.$fanyi('修改')" placement="top">
                  <el-button
                    v-if="scope.row.id !== 1"
                    type="text"
                    icon="Edit"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:user:edit']"
                  ></el-button>
                </el-tooltip>
                <el-tooltip :content="I18N.$fanyi('删除')" placement="top">
                  <el-button
                    v-if="scope.row.id !== 1"
                    type="text"
                    icon="Delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:user:remove']"
                  ></el-button>
                </el-tooltip>
                <el-tooltip :content="I18N.$fanyi('重置密码')" placement="top">
                  <el-button
                    v-if="scope.row.id !== 1"
                    type="text"
                    icon="Key"
                    @click="handleResetPwd(scope.row)"
                    v-hasPermi="['system:user:resetPwd']"
                  ></el-button>
                </el-tooltip>
                <el-tooltip :content="I18N.$fanyi('分配角色')" placement="top">
                  <el-button
                    v-if="scope.row.id !== 1"
                    type="text"
                    icon="CircleCheck"
                    @click="handleAuthRole(scope.row)"
                    v-hasPermi="['system:user:edit']"
                  ></el-button>
                </el-tooltip>
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
      </el-col>
    </el-row>

    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('用户昵称')" prop="nickName">
              <el-input
                v-model="form.nickName"
                :placeholder="I18N.$fanyi('请输入用户昵称')"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('归属部门')" prop="deptId">
              <tree-select
                v-model:value="form.deptId"
                :options="deptOptions.filter((item) => item.id !== -1)"
                :placeholder="I18N.$fanyi('请选择归属部门')"
                :objMap="{
                  value: 'id',
                  label: 'label',
                  children: 'children'
                }"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('手机号码')" prop="phoneNumber">
              <el-input
                v-model="form.phoneNumber"
                :placeholder="I18N.$fanyi('请输入手机号码')"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('邮箱')" prop="email">
              <el-input
                v-model="form.email"
                :placeholder="I18N.$fanyi('请输入邮箱')"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.id == undefined"
              :label="I18N.$fanyi('用户名称')"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                :placeholder="I18N.$fanyi('请输入用户名称')"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.id == undefined"
              :label="I18N.$fanyi('用户密码')"
              prop="password"
            >
              <el-input
                v-model="form.password"
                :placeholder="I18N.$fanyi('请输入用户密码')"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('用户性别')">
              <el-select
                v-model="form.sex"
                :placeholder="I18N.$fanyi('请选择')"
              >
                <el-option
                  v-for="dict in sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('状态')">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                >
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('岗位')">
              <el-select
                v-model="form.postIds"
                multiple
                :placeholder="I18N.$fanyi('请选择')"
              >
                <el-option
                  v-for="item in postOptions"
                  :key="item.id"
                  :label="item.postName"
                  :value="item.id"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="I18N.$fanyi('角色')">
              <el-select
                v-model="form.roleIds"
                multiple
                :placeholder="I18N.$fanyi('请选择')"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="I18N.$fanyi('备注')">
              <el-input
                v-model="form.remark"
                type="textarea"
                :placeholder="I18N.$fanyi('请输入内容')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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

    <el-dialog
      :title="upload.title"
      v-model="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="uploadRef"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          {{ I18N.$fanyi('将文件拖到此处，或') }}
          <em>
            {{ I18N.$fanyi('点击上传') }}
          </em>
        </div>
        <template #tip>
          <div class="el-upload__tip text-center">
            <div class="el-upload__tip">
              <el-checkbox v-model="upload.updateSupport" />
              {{ I18N.$fanyi('是否更新已经存在的用户数据') }}
            </div>
            <span>
              {{ I18N.$fanyi('仅允许导入xls、xlsx格式文件。') }}
            </span>
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 12px; vertical-align: baseline"
              @click="importTemplate"
            >
              {{ I18N.$fanyi('下载模板') }}
            </el-link>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">
            {{ I18N.$fanyi('确 定') }}
          </el-button>
          <el-button @click="upload.open = false">
            {{ I18N.$fanyi('取 消') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import LayoutTableH from '@/layout/layout-table-h/index.vue'
import { getToken } from '@/utils/auth'
import { treeselect } from '@/api/system/dept'
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser
} from '@/api/system/user'
const router = useRouter()
const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_user_sex } = proxy.useDict(
  'sys_normal_disable',
  'sys_user_sex'
)
import { useStore } from 'vuex'
const store = useStore()
const userList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const dateRange = ref([])
const deptName = ref('')
const deptOptions = ref(undefined)
const initPassword = ref(undefined)
const postOptions = ref([])
const roleOptions = ref([])
/*** 用户导入参数 */

const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,

  // 弹出层标题（用户导入）
  title: '',

  // 是否禁用上传
  isUploading: false,

  // 是否更新已经存在的用户数据
  updateSupport: 0,

  // 设置上传的请求头部
  headers: {
    Authorization: 'Bearer ' + getToken()
  },

  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + 'system/user/importData'
}) // 列显隐信息

const columns = ref([
  {
    key: 0,
    label: I18N.$fanyi('用户编号'),
    visible: true
  },
  {
    key: 1,
    label: I18N.$fanyi('用户名称'),
    visible: true
  },
  {
    key: 2,
    label: I18N.$fanyi('用户昵称'),
    visible: true
  },
  {
    key: 3,
    label: I18N.$fanyi('部门'),
    visible: true
  },
  {
    key: 4,
    label: I18N.$fanyi('手机号码'),
    visible: true
  },
  {
    key: 5,
    label: I18N.$fanyi('状态'),
    visible: true
  },
  {
    key: 6,
    label: I18N.$fanyi('创建时间'),
    visible: true
  }
])
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phoneNumber: undefined,
    status: undefined,
    deptId: undefined
  },
  rules: {
    userName: [
      {
        required: true,
        message: I18N.$fanyi('用户名称不能为空'),
        trigger: 'blur'
      },
      {
        min: 2,
        max: 20,
        message: I18N.$fanyi('用户名称长度必须介于 2 和 20 之间'),
        trigger: 'blur'
      }
    ],
    nickName: [
      {
        required: true,
        message: I18N.$fanyi('用户昵称不能为空'),
        trigger: 'blur'
      }
    ],
    deptId: [
      {
        required: true,
        message: I18N.$fanyi('归属部门不能为空'),
        trigger: 'change'
      }
    ],
    password: [
      {
        required: true,
        message: I18N.$fanyi('用户密码不能为空'),
        trigger: 'blur'
      },
      {
        min: 5,
        max: 20,
        message: I18N.$fanyi('用户密码长度必须介于 5 和 20 之间'),
        trigger: 'blur'
      }
    ],
    email: [
      {
        type: 'email',
        message: I18N.$fanyi('请输入正确的邮箱地址'),
        trigger: ['blur', 'change']
      }
    ],
    phoneNumber: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: I18N.$fanyi('请输入正确的手机号码'),
        trigger: 'blur'
      }
    ]
  }
})
const { queryParams, form, rules } = toRefs(data)
/** 通过条件过滤节点  */

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}
/** 根据名称筛选部门树 */

watch(deptName, (val) => {
  proxy.$refs['deptTreeRef'].filter(val)
})
/** 顶部法人下拉change */

watch(
  () => store.getters.legalId,
  (val) => {
    getTreeselect()
    getList()
  }
)
/** 查询部门下拉树结构 */

function getTreeselect() {
  treeselect({
    legalId: store.getters.legalId
  }).then((response) => {
    deptOptions.value = response.data
    deptOptions.value.unshift({
      id: -1,
      label: I18N.$fanyi('全部')
    })
    setTimeout(() => {
      proxy.$refs['deptTreeRef'].setCurrentKey(-1)
    })
  })
}
/** 查询用户列表 */

function getList() {
  loading.value = true // 筛选全部

  if (queryParams.value.deptId === -1) {
    queryParams.value.deptId = null
  }

  listUser(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (res) => {
      loading.value = false
      userList.value = res.rows
      total.value = res.total
    }
  )
}
/** 节点单击事件 */

function handleNodeClick(data) {
  queryParams.value.deptId = data.id
  handleQuery()
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
/** 删除按钮操作 */

function handleDelete(row) {
  const userIds = row.id || ids.value
  proxy.$modal
    .confirm('是否确认删除用户编号为"' + userIds + '"的数据项？')
    .then(function () {
      return delUser(userIds)
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
    'system/user/export',
    { ...queryParams.value },
    'user_' + new Date().getTime() + '.xlsx'
  )
}
/** 用户状态修改  */

function handleStatusChange(row) {
  let text = row.status === '0' ? I18N.$fanyi('启用') : I18N.$fanyi('停用')
  proxy.$modal
    .confirm('确认要"' + text + '""' + row.userName + '"用户吗?')
    .then(function () {
      return changeUserStatus(row.id, row.status)
    })
    .then(() => {
      proxy.$modal.msgSuccess(text + '成功')
    })
    .catch(function () {
      row.status = row.status === '0' ? '1' : '0'
    })
}
/** 更多操作 */

function handleCommand(command, row) {
  switch (command) {
    case 'handleResetPwd':
      handleResetPwd(row)
      break

    case 'handleAuthRole':
      handleAuthRole(row)
      break

    default:
      break
  }
}
/** 跳转角色分配 */

function handleAuthRole(row) {
  const id = row.id
  router.push('/system/user-auth/role/' + id)
}
/** 重置密码按钮操作 */

function handleResetPwd(row) {
  proxy
    .$prompt('请输入"' + row.userName + '"的新密码', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
      inputPattern: /^.{5,20}$/,
      inputErrorMessage: '用户密码长度必须介于 5 和 20 之间'
    })
    .then(({ value }) => {
      resetUserPwd(row.id, value).then((response) => {
        proxy.$modal.msgSuccess('修改成功，新密码是：' + value)
      })
    })
    .catch(() => {})
}
/** 选择条数  */

function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 导入按钮操作 */

function handleImport() {
  upload.title = I18N.$fanyi('用户导入')
  upload.open = true
}
/** 下载模板操作 */

function importTemplate() {
  proxy.download(
    'system/user/importTemplate',
    {},
    'user_template_' + new Date().getTime() + '.xlsx'
  )
}
/**文件上传中处理 */

const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true
}
/** 文件上传成功处理 */

const handleFileSuccess = (response, file, fileList) => {
  upload.open = false
  upload.isUploading = false
  proxy.$refs['uploadRef'].clearFiles()
  proxy.$alert(
    "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
      response.msg +
      '</div>',
    I18N.$fanyi('导入结果'),
    {
      dangerouslyUseHTMLString: true
    }
  )
  getList()
}
/** 提交上传文件 */

function submitFileForm() {
  proxy.$refs['uploadRef'].submit()
}
/** 初始化部门数据 */

function initTreeData() {
  // 判断部门的数据是否存在，存在不获取，不存在则获取
  if (deptOptions.value === undefined) {
    treeselect().then((response) => {
      deptOptions.value = response.data
    })
  }
}
/** 重置操作表单 */

function reset() {
  form.value = {
    id: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phoneNumber: undefined,
    email: undefined,
    sex: undefined,
    status: '0',
    remark: undefined,
    postIds: [],
    roleIds: []
  }
  proxy.resetForm('userRef')
}
/** 取消按钮 */

function cancel() {
  open.value = false
  reset()
}
/** 新增按钮操作 */

function handleAdd() {
  reset()
  initTreeData()
  getUser().then((response) => {
    postOptions.value = response.posts
    roleOptions.value = response.roles
    open.value = true
    title.value = I18N.$fanyi('添加用户')
    form.password.value = initPassword.value
  })
}
/** 修改按钮操作 */

function handleUpdate(row) {
  reset()
  initTreeData()
  const id = row.id || ids.value
  getUser(id).then((response) => {
    form.value = response.data
    postOptions.value = response.posts
    roleOptions.value = response.roles
    form.value.postIds = response.postIds
    form.value.roleIds = response.roleIds
    open.value = true
    title.value = I18N.$fanyi('修改用户')
    form.password = ''
  })
}
/** 提交按钮 */

function submitForm() {
  proxy.$refs['userRef'].validate((valid) => {
    if (valid) {
      if (form.value.id != undefined) {
        updateUser(form.value).then((response) => {
          proxy.$modal.msgSuccess(I18N.$fanyi('修改成功'))
          open.value = false
          getList()
        })
      } else {
        addUser(form.value).then((response) => {
          proxy.$modal.msgSuccess(I18N.$fanyi('新增成功'))
          open.value = false
          getList()
        })
      }
    }
  })
}

getTreeselect()
getList()
</script>

<style lang="scss" scoped>
.app-container,
.h100 {
  height: 100%;
}
.tree-container {
  height: calc(100% - 52px);
  overflow: hidden;
}
</style>
