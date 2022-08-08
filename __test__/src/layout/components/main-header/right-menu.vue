<template>
  <div class="right-menu">
    <div class="task">
      <el-switch
        v-model="lightOrDark"
        inline-prompt
        active-value="darkTheme"
        inactive-value="lightTheme"
        active-text="深"
        inactive-text="浅"
        @change="switchTheme"
      />
    </div>
    <div class="task" @click="handleTask">
      <svg-icon icon-class="xiaoxi" />
    </div>
    <div class="avatar-container">
      <span class="user-name">{{ getters.name }}</span>
      <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="getters.avatar" class="user-avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu style="position: relative; padding: 0; margin: 0">
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided command="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import themes from '@/utils/theme'

const store = useStore()
const getters = computed(() => store.getters)
const router = useRouter()

const lightOrDark = ref('darkTheme')

const handleTask = () => {
  router.push('/task/audit/list')
}

function handleCommand(command) {
  switch (command) {
    case 'setLayout':
      setLayout()
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

const emits = defineEmits(['setLayout'])
function setLayout() {
  emits('setLayout')
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.dispatch('LogOut').then(() => {
        // location.href = '/index'
        location.reload()
      })
    })
    .catch(() => {})
}

const switchTheme = () => {
  const currentTheme = themes[lightOrDark.value]
  Object.keys(currentTheme).map((item) => {
    document.documentElement.style.setProperty(item, currentTheme[item])
  })
}
switchTheme()
</script>

<style lang="scss" scoped>
.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
  display: flex;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
    .user-name {
      padding-right: 5px;
      font-size: 16px;
      font-weight: 700;
    }
    .avatar-wrapper {
      margin-top: 10px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 999px;
      }

      i {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .task {
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
