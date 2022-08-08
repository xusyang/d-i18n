<template>
  <layoutContentD>
    <template #content>
      <div class="panel">
        <el-steps class="steps" simple>
          <el-step v-for="(item, index) in steps" :key="index" :status="getStatus(item, index)">
            <template #icon>
              <span>{{ index + 1 }}</span>
            </template>
            <template #title>
              <div>{{ stepTitle(index) }}</div>
              <div>{{ getUserName(item) }} {{ parseTime(item.time) }}</div>
              <div v-if="item.desc">{{ item.desc }}</div>
            </template>
          </el-step>
        </el-steps>
      </div>

      <div class="panel">
        <LowCode />
      </div>

      <div class="panel" v-if="route.query.type === 'todo'">
        <Audit
          :processDefinitionKey="(route.query.processDefinitionKey as string)"
          :menuCode="(route.query.menuCode as string)"
          :sourceId="(route.query.sourceId as string)"
          :taskId="(route.query.taskId as string)"
          @success="handleSuccess"
          @cancel="handleCancel"
        />
      </div>
    </template>
  </layoutContentD>
</template>

<script setup lang="ts">
import LowCode from './LowCode.vue'
import layoutContentD from '@/layout/layout-content-devide/index.vue'
import Audit from './Audit.vue'
import { processStatus } from '@/api/task'
import { listUser } from '@/api/system/user'
import { ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseTime } from '@/utils/ruoyi'

const steps = ref([])
const listUsers = ref([])

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const stepTitle = (index) => {
  if (index === 0) {
    return '提交申请'
  } else if (index === steps.value.length - 1) {
    return '发布'
  } else {
    return '审核' + index
  }
}

// 流程状态
const fetchTaskDetail = () => {
  processStatus({
    processInstanceId: route.query.processInstanceId,
  }).then((res) => {
    res.data.forEach((item) => {
      if (Array.isArray(item.assigneeDtoList) && item.assigneeDtoList.length) {
        steps.value = steps.value.concat(item.assigneeDtoList)
      } else {
        steps.value.push(item)
      }
    })
  })
}

const fetchListUser = () => {
  listUser().then((res) => {
    listUsers.value = res.rows
  })
}

const getUserName = (item) => {
  const ret = listUsers.value.find((i) => i.id == item.assignee)
  return ret ? ret.userName : item.assignee
}

const getStatus = (item, index) => {
  const stepLen = steps.value.length
  const statusMap = {
    '1': 'finish',
    '2': 'error',
    '3': 'error',
  }
  if (index === 0) {
    return 'finish'
  }
  if (index === stepLen - 1 && steps.value[stepLen - 2].agree === '1') {
    return 'finish'
  }
  return statusMap[item.agree] || 'wait'
}

const handleSuccess = () => {
  setTimeout(() => {
    proxy.$tab.closePage(route).then(() => {
      router.push('/task/audit/list')
    })
  }, 1000)
}
const handleCancel = () => {
  router.push('/task/audit/list')
}
fetchListUser()
fetchTaskDetail()
</script>
