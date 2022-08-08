<template>
  <el-form ref="userRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item :label="I18N.$fanyi('用户昵称')" prop="nickName">
      <el-input v-model="user.nickName" maxlength="30" />
    </el-form-item>
    <el-form-item :label="I18N.$fanyi('手机号码')" prop="phoneNumber">
      <el-input v-model="user.phoneNumber" maxlength="11" />
    </el-form-item>
    <el-form-item :label="I18N.$fanyi('邮箱')" prop="email">
      <el-input v-model="user.email" maxlength="50" />
    </el-form-item>
    <el-form-item :label="I18N.$fanyi('性别')">
      <el-radio-group v-model="user.sex">
        <el-radio label="0">
          {{ I18N.$fanyi('男') }}
        </el-radio>
        <el-radio label="1">
          {{ I18N.$fanyi('女') }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        {{ I18N.$fanyi('保存') }}
      </el-button>
      <el-button @click="close">
        {{ I18N.$fanyi('关闭') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { updateUserProfile } from '@/api/system/user'
const props = defineProps({
  user: {
    type: Object
  }
})
const { proxy } = getCurrentInstance()
const rules = ref({
  nickName: [
    {
      required: true,
      message: I18N.$fanyi('用户昵称不能为空'),
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: I18N.$fanyi('邮箱地址不能为空'),
      trigger: 'blur'
    },
    {
      type: 'email',
      message: I18N.$fanyi('请输入正确的邮箱地址'),
      trigger: ['blur', 'change']
    }
  ],
  phoneNumber: [
    {
      required: true,
      message: I18N.$fanyi('手机号码不能为空'),
      trigger: 'blur'
    },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: I18N.$fanyi('请输入正确的手机号码'),
      trigger: 'blur'
    }
  ]
})
/** 提交按钮 */

function submit() {
  proxy.$refs.userRef.validate((valid) => {
    if (valid) {
      updateUserProfile(props.user).then((response) => {
        proxy.$modal.msgSuccess(I18N.$fanyi('修改成功'))
      })
    }
  })
}
/** 关闭按钮 */

function close() {
  proxy.$tab.closePage()
}
</script>
