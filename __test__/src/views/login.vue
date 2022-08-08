<template>
  <div class="login">
    <div class="mask"></div>
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">
        {{ I18N.$fanyi('登录') }}
      </h3>
      <h3 class="title en">Cost PerSpective</h3>
      <h4>
        {{ I18N.$fanyi('成本透视') }}
      </h4>
      <el-form-item prop="username">
        <el-input
          name="username"
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="I18N.$fanyi('用户名/密码')"
        >
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="I18N.$fanyi('密码')"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          name="code"
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          :placeholder="I18N.$fanyi('验证码')"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
      >
        {{ I18N.$fanyi('记住密码') }}
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">
            {{ I18N.$fanyi('登 录') }}
          </span>
          <span v-else>
            {{ I18N.$fanyi('登 录 中...') }}
          </span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" to="/register">
            {{ I18N.$fanyi('立即注册') }}
          </router-link>
        </div>
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span> Copyright © 2018-2022 All Rights Reserved. </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { getCodeImg } from '@/api/login'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance, ref } from 'vue'
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})
const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: I18N.$fanyi('请输入您的账号')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: I18N.$fanyi('请输入您的密码')
    }
  ]

  // code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
}
const codeUrl = ref('')
const loading = ref(false)

// 验证码开关

const captchaOnOff = ref(true)

// 注册开关

const register = ref(false)
const redirect = ref(undefined)

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true

      // 勾选了需要记住密码设置在cookie中设置记住用户明和名命

      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, {
          expires: 30
        })
        Cookies.set('password', encrypt(loginForm.value.password), {
          expires: 30
        })
        Cookies.set('rememberMe', loginForm.value.rememberMe, {
          expires: 30
        })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }

      // 调用action的登录方法

      store
        .dispatch('Login', loginForm.value)
        .then(() => {
          redirectHome()
        })
        .catch((e) => {
          loading.value = false

          // 重新获取验证码

          if (captchaOnOff.value) {
            getCode()
          }
        })
    }
  })
}

function redirectHome() {
  router.push({
    path: redirect.value || '/'
  })
}

function getCode() {
  getCodeImg().then((res) => {
    captchaOnOff.value =
      res.captchaOnOff === undefined ? true : res.captchaOnOff

    if (captchaOnOff.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img
      loginForm.value.uuid = res.uuid
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password:
      password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

getCode()
getCookie()
</script>

<style lang="scss">
.login {
  display: flex;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: 100%;
  position: relative;
}

.login-form {
  border-radius: var(--border-radius);
  background: #ffffff;
  padding-left: 10%;

  .title {
    margin: 0px auto 40px auto;
    text-align: left;
    font-weight: 800;
    font-size: 22px;
    color: #000;
    &.en {
      margin-bottom: 10px;
    }
  }

  h4 {
    margin: 0 0 30px;
    font-weight: bold;
    font-size: 18px;
  }

  .el-form-item {
    margin-bottom: 20px;
    .el-form-item__content {
      display: flex;
      flex-wrap: nowrap;
      .login-code {
        margin-left: auto;
        img {
          height: 40px;
          cursor: pointer;
          vertical-align: middle;
        }
      }
    }
  }

  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  margin: auto;
  z-index: -1;
  &.top {
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.container-select-legal {
  width: 300px;
  padding: 0 30px 30px 30px;
  background: #fff;
  border-radius: var(--base-radius);
}
</style>
