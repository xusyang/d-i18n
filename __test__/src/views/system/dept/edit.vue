<template>
  <el-dialog :title="title" v-model="show" width="600px" append-to-body>
    <el-form ref="refForm" :model="formData" :rules="formRules" label-width="80px" :label-position="formLabelPosition">
      <el-form-item label="所属部门" prop="deptId">
        <DCacaderDept class="full" v-model="formData.parentId" ref="deptCascaderRef"></DCacaderDept>
      </el-form-item>

      <el-form-item label="部门名称" prop="deptName">
        <el-input class="full" v-model="formData.deptName" placeholder="请输入部门名称" maxlength="30"/>
      </el-form-item>

      <el-form-item label="部门编码" prop="deptCode">
        <el-input class="full" v-model="formData.deptCode" placeholder="请输入部门编号" maxlength="30"/>
      </el-form-item>

      <el-form-item label="部门类型">
        <el-radio-group v-model="formData.deptType">
          <el-radio v-for="item in deptTypeOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="部门状态">
        <el-radio-group v-model="formData.status">
          <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="显示排序" prop="orderNum">
        <el-input-number v-model="formData.orderNum" controls-position="right" :min="1" />
      </el-form-item>
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
import { ref, reactive, computed, toRefs, inject, getCurrentInstance, nextTick } from 'vue'
import { pick } from 'lodash'

import * as ApiDept from '@/api/system/dept'

import { ENUM_STATUE_TYPE, ENUM_DEPT_TYPE, convertEnumToOptions } from '@/constants/enum'
import { SYSTEM_DEPT, INotice } from '@/constants/inject-keys'
import { MODEL_OPERATOR_TYPE } from '@/utils/dict'
import DCacaderDept from './d-cascader-dept/index.vue'
import { useStore } from 'vuex'

const store = useStore()
const { proxy } = getCurrentInstance()

const deptTypeOptions = convertEnumToOptions(ENUM_DEPT_TYPE)
const statusOptions = convertEnumToOptions(ENUM_STATUE_TYPE)
const formLabelPosition = ref(store.state.settings.formLabelPosition)

const deptCascaderRef = ref(null)

const refresh = inject<INotice>(SYSTEM_DEPT.REFRESH_DEPT)

const rawFormData = {
  parentId: 0,
  legalId: '',
  id: '',
  deptId: '',
  deptType: ENUM_DEPT_TYPE.前台,
  deptName: '',
  deptCode: '',
  orderNum: 0,
  status: ENUM_STATUE_TYPE.启用,
}

const data = reactive({
  show: false,
  type: -1, // 新增还是编辑
  formData: {
    ...rawFormData,
    id: null,
  },
  formRules: {
    deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
    deptCode: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
  },
})

const { formData, type, show, formRules } = toRefs(data)

const title = computed(() => {
  if (type.value === MODEL_OPERATOR_TYPE.新增) {
    return '新增部门'
  } else {
    return '编辑部门'
  }
})

/**
 * 打开部门编辑
 * @param legalId
 * @param id
 * @param parentId
 */
const open = async (legalId, id, parentId) => {
  // formData.value.parentId = parentId
  formData.value.legalId = legalId
  formData.value.id = id
  type.value = !id ? MODEL_OPERATOR_TYPE.新增 : MODEL_OPERATOR_TYPE.编辑
  show.value = true

  initForm(id, parentId)
  nextTick(() => {
    deptCascaderRef.value.refreshData(legalId)
  })
}

/**
 * 初始化表单
 * @param id
 * @param parentId
 */
const initForm = async (id, parentId) => {
  if (id) {
    const res = await ApiDept.getDept(id)
    formData.value = pick(res.data, Object.keys(rawFormData))
  } else {
    reset(parentId)
  }
}

/**
 * 提交表单
 */
const submitForm = () => {
  proxy.$refs['refForm'].validate(async (valid) => {
    if (valid) {
      if (formData.value.id) {
        await ApiDept.updateDept(formData.value)
        proxy.$modal.msgSuccess('修改成功')
      } else {
        await ApiDept.addDept(formData.value)
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
const reset = (parentId = 0) => {
  Reflect.deleteProperty(rawFormData, 'legalId')
  formData.value = Object.assign(formData.value, rawFormData)
  formData.value.parentId = parentId
  proxy.resetForm('refForm')
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
