<template>
  <el-scrollbar>
    <div class="home-wrapper">
      <div class="home-left">
        <div class="user-info panel">
          <h4>
            {{ I18N.$fanyi('个人信息') }}
          </h4>
          <img :src="getters.avatar" alt="" class="avatar" />
          <div class="name">
            {{ getters.name }}
          </div>
          <div class="role">
            {{ getters.user_roles.join(',') }}
          </div>
        </div>
        <div class="notice panel">
          <h4>
            {{ I18N.$fanyi('我的消息提醒') }}
            <span>
              {{ I18N.$fanyi('共') }}
              <strong>
                {{ noticeTotal }}
              </strong>
              {{ I18N.$fanyi('条') }}
            </span>
            <span @click="handleClear">
              {{ I18N.$fanyi('清空') }}
            </span>
          </h4>
          <ul>
            <li
              v-for="(item, index) in noticeData"
              :key="index"
              @click="handleNotice(item)"
            >
              <svg-icon icon-class="shenhe" />
              <div>
                <h5>
                  {{ nameMap[item.msg_type].name }}
                </h5>
                <p>
                  {{ item.msg_name }}
                </p>
              </div>
              <span>
                {{ item.msg_time }}
              </span>
            </li>
          </ul>
          <div class="pagination">
            <el-icon
              @click="handlePage('reduce')"
              :class="{ disable: noticeCurrentPage === 1 }"
            >
              <arrow-left />
            </el-icon>
            <el-icon
              @click="handlePage('add')"
              :class="{ disable: noticeCurrentPage === totalPage }"
            >
              <arrow-right />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="alloc-execute-result">
          <div class="alloc-execute panel">
            <h4>
              {{ I18N.$fanyi('分摊方案执行情况') }}
            </h4>
            <div class="alloc-panel-content">
              <template v-for="(item, index) in allocExecuteData" :key="index">
                <dl>
                  <svg-icon :icon-class="item.icon" />
                  <dd>
                    {{ item.name }}
                    <p @click="handleQuickAccess(406)" style="cursor: pointer">
                      {{ item.value }}
                    </p>
                  </dd>
                </dl>
                <el-divider
                  direction="vertical"
                  v-if="index < allocExecuteData.length - 1"
                />
              </template>
            </div>
          </div>
          <div class="alloc-result panel">
            <h4>
              {{ I18N.$fanyi('分摊结果异常情况（本月）') }}
            </h4>
            <div class="alloc-panel-content">
              <template v-for="(item, index) in allocResultData">
                <dl>
                  <svg-icon :icon-class="item.icon" />
                  <dd>
                    {{ item.name }}
                    <p
                      @click="handleQuickAccess(item.route)"
                      style="cursor: pointer"
                    >
                      {{ item.value }}
                    </p>
                  </dd>
                </dl>
                <el-divider
                  direction="vertical"
                  v-if="index < allocResultData.length - 1"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="quick-access panel">
          <h4>
            {{ I18N.$fanyi('快速访问') }}
          </h4>
          <div class="quick-access-content">
            <div
              class="item"
              v-for="(item, index) in quickAccessData"
              :key="index"
              @click="handleQuickAccess(item.value)"
            >
              <div>
                <svg-icon :icon-class="item.icon" />
              </div>
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="alloc-time panel">
          <h4>
            {{ I18N.$fanyi('分摊执行时长统计') }}
            <span>
              <el-date-picker
                v-model="dateRange"
                value-format="YYYYMM"
                type="monthrange"
                range-separator="-"
                :start-placeholder="I18N.$fanyi('开始日期')"
                :end-placeholder="I18N.$fanyi('结束日期')"
                :disabled-date="pickerOptions"
                @change="fetchAvgExecTimeLineChart"
              ></el-date-picker>
            </span>
          </h4>
          <div class="alloc-time-content">
            <div class="left">
              {{ I18N.$fanyi('本月分摊执行平均时长') }}
              <h3>
                {{ avgExecTimeFmt }}
              </h3>
              <p v-if="tbByMonth !== 'Nan'">
                {{ I18N.$fanyi('同比上月') }}
                <el-icon>
                  <caret-bottom v-if="tbByMonth.indexOf('-') > -1" />
                  <caret-top v-else />
                </el-icon>
                <span>
                  {{ tbByMonth.replace('-', '') }}
                </span>
              </p>
              <p v-else>
                {{ I18N.$fanyi('同比上月 --') }}
              </p>
            </div>
            <el-divider direction="vertical" />
            <div class="right">
              <p>
                {{ I18N.$fanyi('近一年分摊执行平均时长统计') }}
              </p>
              <div class="chart">
                <Line :datas="allocTimeData" id="allocTime" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref, computed, getCurrentInstance, watch } from 'vue'
import { useStore } from 'vuex'
import Line from '@/components-custom/d-echart/Line.vue'
import {
  allocatePerform,
  allocateException,
  avgExecTime,
  avgExecTimeLineChart,
  noticeList,
  noticeReadUnread,
  noticeClear
} from '@/api/home'
import router from '@/router'
import Cookies from 'js-cookie'
const store = useStore()
const getters = computed(() => store.getters)
const sys_user = JSON.parse(Cookies.get('sys_user'))
const noticePageSize = 6
const noticeCurrentPage = ref(1)
const noticeTotal = ref(0)
const totalPage = ref(0)
const noticeData = ref([])
const { proxy } = getCurrentInstance()
const allocExecuteData = reactive([
  {
    name: I18N.$fanyi('执行中'),
    value: 0,
    icon: 'zhihangzhong'
  },
  {
    name: I18N.$fanyi('已完成'),
    value: 0,
    icon: 'yiwancheng'
  },
  {
    name: I18N.$fanyi('未开始'),
    value: 0,
    icon: 'weikaishi'
  }
])
const allocResultData = reactive([
  {
    name: I18N.$fanyi('分摊差额异常'),
    value: 0,
    icon: 'yichang',
    route: '442'
  },
  {
    name: I18N.$fanyi('被承接差额异常'),
    value: 0,
    icon: 'yichang',
    route: '442'
  }
])
const quickAccessData = reactive([
  {
    name: I18N.$fanyi('基础维度管理'),
    value: '320',
    icon: 'jcwd'
  },
  {
    name: I18N.$fanyi('费用单据'),
    value: '426',
    icon: 'feiyongdanju'
  },
  {
    name: I18N.$fanyi('动因定义'),
    value: '360',
    icon: 'dongyindingyi'
  },
  {
    name: I18N.$fanyi('分摊动因'),
    value: '344',
    icon: 'fentandongyin'
  },
  {
    name: I18N.$fanyi('影响因素'),
    value: '368',
    icon: 'yingxiangyinsu'
  },
  {
    name: I18N.$fanyi('分摊方案'),
    value: '352',
    icon: 'fentanfangan'
  },
  {
    name: I18N.$fanyi('分摊执行'),
    value: '406',
    icon: 'ftzx'
  },
  {
    name: I18N.$fanyi('预制报表'),
    value: '430',
    icon: 'yuzhibaobiao'
  }
])
const dateRange = ref([])
const allocTimeData = ref([])
const avgExecTimeFmt = ref('')
const tbByMonth = ref('')

const pickerOptions = (time) => {
  return time.getTime() > Date.now()
}

const handleQuickAccess = (viewId) => {
  router.push('/lowcode/lcview/' + viewId)
}

const handlePage = (type) => {
  if (type === 'add' && noticeCurrentPage.value !== totalPage.value) {
    noticeCurrentPage.value++
    fetchNoticeList()
  }

  if (type === 'reduce' && noticeCurrentPage.value !== 1) {
    noticeCurrentPage.value--
    fetchNoticeList()
  }
}

const nameMap = {
  APPLY_TODO: {
    name: I18N.$fanyi('提交给我的审核')
  },
  APPLY_FINISHED: {
    name: I18N.$fanyi('我的申请审批完成')
  },
  ALLOCATE_EXEC_DONE: {
    name: I18N.$fanyi('分摊执行已完成'),
    viewId: '406'
  },
  ALLOCATE_RESULT_EXCEPTION: {
    name: I18N.$fanyi('分摊结果异常'),
    viewId: '442'
  }
}

const handleNotice = (item) => {
  const { id, ref_data, msg_type } = item
  const query = JSON.parse(ref_data)

  if (msg_type === 'APPLY_TODO') {
    router.push({
      path: '/task/audit/todoDetail',
      query: {
        ...query,
        sourceId: query.nodeId,
        pernr: sys_user.userId,
        taskId: query.id,
        type: 'todo'
      }
    })
  } else if (msg_type === 'APPLY_FINISHED') {
    const viewIdMap = {
      DYDY: '344',
      FYDJ: '426'
    }
    handleQuickAccess(viewIdMap[query.processDefinitionKey])
  } else {
    handleQuickAccess(nameMap[msg_type].viewId)
  }

  setTimeout(() => {
    noticeReadUnread(id, {
      read_flag: 1
    }).then((res) => {
      console.log(res)
    })
  }, 100)
}

const handleClear = () => {
  proxy.$modal
    .confirm('是否确认清空消息提醒？')
    .then(function () {
      return noticeClear()
    })
    .then(() => {
      proxy.$modal.msgSuccess('操作成功')
      fetchNoticeList()
    })
    .catch(() => {})
}

const fetchAllocatePerform = () => {
  allocatePerform().then((res) => {
    allocExecuteData[0].value = res.data ? res.data.runningNum : 0
    allocExecuteData[1].value = res.data ? res.data.doneNum : 0
    allocExecuteData[2].value = res.data ? res.data.notStartedNum : 0
  })
}

const fetchAllocateException = () => {
  allocateException().then((res) => {
    allocResultData[0].value = res.data ? res.data.allocatedDiffCount : 0
    allocResultData[1].value = res.data ? res.data.extendDiffCount : 0
  })
}

const fetchAvgExecTime = () => {
  avgExecTime().then((res) => {
    if (res.data && res.data.length) {
      avgExecTimeFmt.value = res.data[0].avgExecTimeFmt
      tbByMonth.value = res.data[0].tbByMonth
    }
  })
}

const fetchAvgExecTimeLineChart = () => {
  const params = {
    startYm: dateRange.value[0],
    endYm: dateRange.value[1]
  }
  avgExecTimeLineChart(params).then((res) => {
    allocTimeData.value = res.data.map((item) => ({
      name: item.ym,
      value: item.avgExecHours
    }))
  })
}

const fetchNoticeList = () => {
  const params = {
    conditions: [
      {
        fieldCode: 'read_flag',
        op: 'eq',
        values: [0]
      } // {

      // 'fieldCode': 'create_by',

      // 'op': 'eq',

      // 'values': [sys_user.userId]

      // }
    ],
    sorts: [
      {
        field: 'create_time',
        direction: 'desc'
      }
    ],
    pageNo: noticeCurrentPage.value,
    pageSize: noticePageSize
  }
  noticeList(params).then((res) => {
    noticeTotal.value = res.data.total
    totalPage.value = Math.floor(
      (noticeTotal.value + noticePageSize - 1) / noticePageSize
    )
    noticeData.value = res.data.rows
  })
}

fetchAllocatePerform()
fetchAllocateException()
fetchAvgExecTime()
fetchAvgExecTimeLineChart()
fetchNoticeList()
watch(
  () => store.getters.legalId,
  (val) => {
    fetchAllocatePerform()
    fetchAllocateException()
    fetchAvgExecTime()
    fetchAvgExecTimeLineChart()
    fetchNoticeList()
  }
)
</script>

<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  height: calc(100vh - 160px);
  .svg-icon {
    margin-bottom: 20px;
    font-size: 32px;
  }
  .home-left {
    width: 350px;
    .user-info {
      // min-height: 30%;
      height: 330px;
      text-align: center;
      .avatar {
        margin: 30px auto;
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }
      .name {
        margin-bottom: 10px;
        font-size: 30px;
        color: #333;
      }
      .role {
        font-size: 14px;
        color: #666;
      }
    }
    .notice {
      // min-height: calc(70% - 14px);
      height: 558px;
      padding: 20px 10px;
      .pagination {
        text-align: right;
        :deep(.el-icon) {
          width: 28px;
          height: 28px;
          margin-left: 10px;
          background: #ffffff;
          border: 1px solid rgba(198, 198, 198, 1);
          border-radius: 6px;
          cursor: pointer;
          &.disable {
            color: #c0c4cc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  .home-right {
    flex: 1;
    margin-left: 14px;
    .alloc-execute-result {
      // min-height: 30%;
      height: 255px;
      display: flex;
      .alloc-execute {
        width: 60%;
        margin-right: 7px;
      }
      .alloc-result {
        width: 40%;
        margin-left: 7px;
        .alloc-panel-content dl {
          width: 50%;
        }
      }
      .svg-icon {
        margin: 20px 0;
      }
    }
    .alloc-panel-content {
      display: flex;
      margin-top: 20px;
      :deep(.el-divider) {
        height: 125px;
        margin-top: 32px;
      }
      dl {
        width: 33%;
        text-align: center;
      }
      dd {
        margin: 0;
        color: #333;
        font-size: 13px;
        p {
          margin-top: 15px;
          font-weight: 600;
          font-size: 32px;
        }
      }
    }
    .quick-access {
      // min-height: 25%;
      height: 235px;
    }
    .quick-access-content {
      display: flex;
      margin-top: 50px;
      justify-content: space-between;
      .item {
        padding: 10px 20px;
        cursor: pointer;
        text-align: center;
        &:hover {
          background: rgba(2, 124, 176, 0.05);
          border-radius: 6px;
        }
      }
      em {
        display: block;
        margin: 0 auto 20px;
        width: 32px;
        height: 32px;
      }
    }
    .alloc-time {
      // min-height: calc(45% - 28px);
      height: 385px;
    }

    .alloc-time-content {
      display: flex;
      margin-top: 20px;
      color: #333;
      font-size: 14px;
      :deep(.el-divider) {
        height: 280px;
      }
      .left {
        width: 150px;
        h3 {
          margin: 30px 0 15px;
          font-size: 30px;
        }
        p {
          color: #999;
          .el-icon {
            margin-right: 4px;
            color: #00b401;
          }
          span {
            color: #00b401;
          }
        }
      }
      .right {
        flex: 1;
        padding-left: 10px;
        .chart {
          height: 290px;
        }
      }
    }
  }
  .panel {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 0.44);
    border-radius: 6px;

    h4 {
      display: flex;
      margin: 0;
      font-size: 16px;
      color: #333;
      font-weight: 700;
      text-align: left;
      line-height: 20px;
      span {
        padding-right: 10px;
        font-size: 14px;
        color: #666;
        &:first-child {
          margin-left: auto;
        }
        &:last-child {
          color: #027cb0;
          cursor: pointer;
        }
      }
      strong {
        color: #027cb0;
      }
    }
  }

  .user-info,
  .alloc-execute-result,
  .quick-access {
    margin-bottom: 14px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    li {
      display: flex;
      padding: 18px 10px;
      margin-bottom: 10px;
      width: 330px;
      height: 65px;
      background: #f8fafb;
      border-radius: 6px;
      cursor: pointer;
      .svg-icon {
        margin-right: 10px;
      }
    }
    h5 {
      margin-bottom: 2px;
      font-size: 14px;
    }
    p {
      font-size: 13px;
      color: #027cb0;
    }
    span {
      margin-left: auto;
      font-size: 12px;
      color: #666;
    }
  }

  h5,
  p {
    margin: 0;
  }
}
</style>
