<template>
  <el-form ref="formRef" :model="formParams" :rules="formRules.rules" label-width="80px">
    <el-form-item label="审核" prop="agree">
      <el-radio-group v-model="formParams.agree">
        <el-radio label="1">通过</el-radio>
        <el-radio label="3">不通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="备注"
      prop="description"
      :rules="[{ required: formParams.agree === '3', message: '请输入备注' }]"
    >
      <el-input
        v-model="formParams.description"
        type="textarea"
        maxlength="200"
        placeholder="请输入内容，不超过200个字符"
      />
    </el-form-item>
    <el-form-item label="审批人" prop="next_assignee" v-if="nodeType === 'common'">
      <el-select v-model="formParams.next_assignee" :multiple="multiInstance" style="width: 100%">
        <el-option v-for="item in auditors" :key="item.id" :value="item.id" :label="item.userName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
      <el-button @click="handleCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { targetProcessNode, taskComplete } from '@/api/task'
import { listUser } from '@/api/system/user'
import Cookies from 'js-cookie'

const props = defineProps({
  processDefinitionKey: {
    type: String,
    default: '',
  },
  menuCode: {
    type: String,
    default: '',
  },
  sourceId: {
    type: String,
    default: '',
  },
  taskId: {
    type: String,
    default: '',
  },
})
watch(
  () => props.taskId,
  (val) => {
    fetchTargetProcessNode()
  },
)
const sys_user = JSON.parse(Cookies.get('sys_user'))
const formParams = reactive({
  agree: '',
  description: '',
  next_assignee: [],
})
const formRules = reactive({
  rules: {
    agree: [{ required: true, message: '请选择' }],
    next_assignee: [{ required: true, message: '请选择审核人' }],
  },
})
const nodeType = ref('')
const multiInstance = ref(false)
const auditors = ref([])
const { proxy } = getCurrentInstance()
const emit = defineEmits(['success', 'cancel'])

const fetchTargetProcessNode = () => {
  targetProcessNode({
    guid: props.processDefinitionKey,
    menuCode: props.menuCode,
    scopeCode: sys_user.deptCode,
    scopeType: '10',
    sourceId: props.sourceId,
    sourceSysCode: 'cps',
    status: '',
    subMenuCode: '',
    targetType: 'next',
  }).then((res) => {
    const dataJson = res.data && res.data.data ? JSON.parse(res.data.data) : {}
    nodeType.value = res.data.type
    // 还有下个审批节点，需要选择对应审批人
    if (nodeType.value === 'common') {
      multiInstance.value = res.data.multiInstance === 'multi'
      const roleIds = dataJson.approvers.map((item) => item.approverValue)
      fethListUsr(roleIds)
    }
  })
}

const fethListUsr = (ids) => {
  listUser({
    roleIds: ids + '',
  }).then((res) => {
    auditors.value = res.rows.map((item) => ({
      ...item,
      id: item.id + '',
    }))
  })
}

const handleSubmit = () => {
  proxy.$refs.formRef.validate((valid) => {
    if (valid) {
      let params = {
        pernr: sys_user.userId,
        taskId: props.taskId,
        variables: {
          next_assignee: formParams.next_assignee,
          agree: formParams.agree,
          description: formParams.description,
        },
      }
      taskComplete(params).then((res) => {
        proxy.$modal.msgSuccess('操作成功')
        emit('success')
      })
    }
  })
}

const handleCancel = () => {
  emit('cancel')
}

fetchTargetProcessNode()
</script>
