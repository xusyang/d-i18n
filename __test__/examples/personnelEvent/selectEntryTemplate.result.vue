<template>
  <div class="text-center">
    <el-button
      size="mini"
      :type="item.COLOR"
      v-for="(item, index) in buttonList"
      :key="index"
      @click="buttonEvent(item)"
      v-if="item.FUNCT"
    >
      {{ item.FUNCT }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'selectEntryTemplate',
  props: {
    parentData: {
      type: Object
    }
  },

  data() {
    return {
      pageCode: this.pageCode.PARZGL,
      buttonList: [],
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO)
    }
  },

  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description: 获取操作按钮
     * @date 2020年07月20日
     */
    getButton() {
      let params = {
        sapInterface: 'PE051',
        IV_USER: '',
        IV_MENUID: this.pageCode,
        IV_RHIRE: 'X'
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let et_funcs = response.ET_FUNCS
        this.buttonList = et_funcs

        if (!this.$isEmpty(et_funcs)) {
          this.buttonList = et_funcs
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: button 事件
     * @date 2020年07月20日
     * @param param button参数
     */
    buttonEvent(param) {
      if (param.FUNC === 'FC10') {
        return this.$message.error(I18N.$fanyi('等待对接招聘系统!'))
      } else {
        // isRhire 是否重入职，X表示为重入职
        if (this.parentData.isRhire === 'X') {
          param.PERNR = this.parentData.PERNR
          param.REHIRE = 'X'
        } else {
          param.PERNR = ''
        }

        param.MENUII = this.pageCode
        param.STAT = ''
        param.ICTYP = this.parentData.credentialsType
        param.ICNUM = this.parentData.credentialsNum
        this.$router.push({
          path: '/pa/getFileds',
          query: param
        })
      }
    }
  },

  created() {
    this.getButton()
  }
}
</script>
