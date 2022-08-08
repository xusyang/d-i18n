<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item :label="I18N.$fanyi('旧密码')" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        :placeholder="I18N.$fanyi('请输入旧密码')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item :label="I18N.$fanyi('新密码')" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        :placeholder="I18N.$fanyi('请输入新密码')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item :label="I18N.$fanyi('确认密码')" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        :placeholder="I18N.$fanyi('请确认密码')"
        type="password"
        show-password
      />
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
import { updateUserPwd } from '@/api/system/user'
const { proxy } = getCurrentInstance()
const user = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
})

const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error(I18N.$fanyi('两次输入的密码不一致')))
  } else {
    callback()
  }
}

const rules = ref({
  oldPassword: [
    {
      required: true,
      message: I18N.$fanyi('旧密码不能为空'),
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      message: I18N.$fanyi('新密码不能为空'),
      trigger: 'blur'
    },
    {
      min: 6,
      max: 20,
      message: I18N.$fanyi('长度在 6 到 20 个字符'),
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: I18N.$fanyi('确认密码不能为空'),
      trigger: 'blur'
    },
    {
      required: true,
      validator: equalToPassword,
      trigger: 'blur'
    }
  ]
})
/** 提交按钮 */

function submit() {
  proxy.$refs.pwdRef.validate((valid) => {
    if (valid) {
      updateUserPwd(user.oldPassword, user.newPassword).then((response) => {
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
