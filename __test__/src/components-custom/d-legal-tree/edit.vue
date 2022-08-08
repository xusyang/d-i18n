<template>
  <div>
    <el-dialog :title="title" v-model="show" width="400px" append-to-body>
      <el-form ref="refMenu" :model="formData" :rules="formRules" label-position="top">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属集团" prop="groupId">
              <el-input v-if="formData.groupId=='0'" v-model="not" disabled></el-input>
              <DSelectGroup v-else v-model:groupId="formData.groupId" v-model:groupName="formData.groupName" class="full" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="法人名称" prop="legalName">
              <el-input class="full" v-model="formData.legalName" placeholder="请输入法人名称(不超过50个字符)" maxlength="50"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="法人编码" prop="legalCode">
              <el-input class="full" v-model="formData.legalCode" placeholder="请输入法人编码"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs, inject, getCurrentInstance, ref, nextTick } from 'vue'
import { pick } from 'lodash'

import * as ApiLegal from '@/api/system/legal'

import { SYSTEM_LEGAL, INotice } from '@/constants/inject-keys'
import { MODEL_OPERATOR_TYPE } from '@/utils/dict'
import DSelectGroup from '@/components-custom/d-group-select/index.vue'

const { proxy } = getCurrentInstance()
const refMenu = ref(null)
const not = ref('无')
const store = useStore()

const refresh = inject<INotice>(SYSTEM_LEGAL.REFRESH_LEGAL)
const rawFormData = {
  groupId: '',
  groupName: '',
  id: '',
  legalId: '',
  legalName: '',
  legalCode: '',
}

const checkGroup = (rule: any, value: any, callback: any) => {
  if ((formData.value.groupId === '' || formData.value.groupId === null) && !formData.value.groupName) callback(new Error('请选择您的集团'))
  callback()
}

const data = reactive({
  show: false,
  type: -1, // 新增还是编辑
  formData: {
    ...rawFormData,
  },
  formRules: {
    groupId: [{ validator: checkGroup, trigger: 'blur', required: true }],
    legalName: [{ required: true, message: '请输入法人名称', trigger: 'blur' }],
    legalCode: [{ required: true, message: '请输入法人编码', trigger: 'blur' }],
  },
})

const { formData, type, show, formRules } = toRefs(data)

/**
 * 标题
 */
const title = computed(() => {
  if (type.value === MODEL_OPERATOR_TYPE.新增) {
    return '新增法人'
  } else {
    return '编辑法人'
  }
})

/**
 * 打开对话框
 */
const open = (id) => {
  type.value = !id ? MODEL_OPERATOR_TYPE.新增 : MODEL_OPERATOR_TYPE.编辑
  show.value = true
  initForm(id)
}

/**
 * 初始化表单
 */
const initForm = async (id) => {
  if (id) {
    const res = await ApiLegal.get(id)
    formData.value = pick(res.data, Object.keys(rawFormData))
    formData.value.legalId = res.data.id
  } else {
    resetForm()
  }
}

/**
 * 提交表单
 */
const submitForm = () => {
  proxy.$refs['refMenu'].validate(async (valid) => {
    if (valid) {
      
      if (formData.value.legalId) {
        await ApiLegal.update(formData.value)
        proxy.$modal.msgSuccess('修改成功')
      } else {
        await ApiLegal.add(formData.value)
        proxy.$modal.msgSuccess('新增成功')
      }
      show.value = false

      refresh.notice()
    }
  })
}

/**
 * 重置表单
 */
const resetForm = () => {
  nextTick(() => {
    refMenu.value.resetFields()
    formData.value.groupName = ''
  })
}

/**
 * 取消
 */
const cancel = () => {
  show.value = false
}

defineExpose({
  open,
})
</script>
