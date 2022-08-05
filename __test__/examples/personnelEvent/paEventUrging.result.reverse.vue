<template>
  <div>
    <div class="ibox-title-style">
      请选择以下工具生成工作待办，提醒员工完成合同签字
    </div>
    <el-checkbox v-model="checked1"> 悦工作门户 </el-checkbox>
    <br />
    <div class="text-center pd20">
      <el-col>
        <el-button size="mini" type="warning" @click="confirmUrging">
          确认
        </el-button>
        <el-button size="mini" type="danger" @click="closeDialog">
          取消
        </el-button>
      </el-col>
    </div>
    <send-email
      v-show="false"
      ref="emailID"
      :paContractList="parentData"
      :pageForm="contractList"
    ></send-email>
  </div>
</template>

<script>
import SendEmail from '../contract/sendEmail.vue'
export default {
  name: 'paEventUrging',
  components: {
    SendEmail
  },
  props: {
    parentData: {
      type: Object
    }
  },

  data() {
    return {
      checked1: false,
      checked2: false,
      contractList: []
    }
  },

  watch: {},
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 关闭弹框
     * @update  07/04/2022
     * @param {*} state 状态
     * @returns {*}
     */
    closeDialog(state) {
      this.$emit('closeDialog', state || '')
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 返回两个日期相差的月数
     * @Date: 2020-11-16 16:43:23
     * @param {*} date1 日期
     * @param {*} date2 日期
     */
    MonthsBetw(date1, date2) {
      // 用-分成数组
      date1 = date1.split('-')
      date2 = date2.split('-')

      // 获取年,月数

      const year1 = parseInt(date1[0]),
        month1 = parseInt(date1[1]),
        year2 = parseInt(date2[0]),
        month2 = parseInt(date2[1])

      // 通过年,月差计算月份差

      return (year2 - year1) * 12 + (month2 - month1) + 1
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 催办功能
     * @Date: 2020-11-26 11:07:00
     */
    confirmUrging() {
      if (this.checked1) {
        // IF001 给oa发送待办
        let params = {
          sapInterface: 'IF001',
          IV_GUID: this.parentData.GUID,
          IV_PERNR: this.parentData.PERNR
        }
        this.$httpServer.sap.baseMethod(params).then((response) => {
          let es_message = response.ES_MESSAGE
          if (!es_message) return

          if (es_message.MSGTY === 'S') {
            this.$message.success('悦工作门户催办成功!')
          }
        })
      }

      // 邮件多人用英文逗号隔开

      if (this.checked2) {
        let params = {
          sapInterface: 'PE057',
          IV_GUID: this.parentData.GUID,
          IV_PERNR: this.parentData.PERNR
        }
        this.$httpServer.sap.baseMethod(params).then((response) => {
          let es_message = response.ES_MESSAGE
          if (!es_message) return

          if (es_message.MSGTY === 'S') {
            this.contractList = response.ES_OUTPUT

            if (this.contractList.ZZSYKSRQ && this.contractList.ZZHTZZRQ) {
              this.contractList.SYQ = this.MonthsBetw(
                this.contractList.ZZSYKSRQ.replace(
                  /(\d{4})(\d{2})(\d{2})/g,
                  '$1-$2-$3'
                ),
                this.contractList.ZZHTZZRQ.replace(
                  /(\d{4})(\d{2})(\d{2})/g,
                  '$1-$2-$3'
                )
              )
            }

            if (this.parentData.EMAIL) {
              this.$refs['emailID'].sendEmail()
              setTimeout(() => this.closeDialog(), 500)
            } else {
              this.closeDialog()
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.ibox-title-style {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.el-checkbox {
  font-size: 20px;
}
</style>
