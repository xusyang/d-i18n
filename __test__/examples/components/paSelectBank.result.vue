<template>
  <div class="search-bank-wrap">
    <el-input
      :placeholder="placeholder"
      :value="iptValue"
      class="input-with-select"
      :disabled="disabled"
      :clearable="clearable"
      :readonly="!clearable"
      @clear="handleClear"
      @click.native="handleInputFocus"
    >
      <el-button
        class="btn"
        slot="append"
        icon="el-icon-search"
        :disabled="disabled"
        @click="dialogVisible = true"
      />
    </el-input>

    <el-dialog
      :title="I18N.$fanyi('银行搜索')"
      :visible="dialogVisible"
      width="740px"
      :append-to-body="true"
    >
      <div class="schbank-header">
        <span class="search-label">
          {{ I18N.$fanyi('银行名称') }}
        </span>
        <el-input
          :placeholder="I18N.$fanyi('银行名称 例如：建设银行*大沙头')"
          v-model="search"
          @keyup.enter.native="onSearch"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          class="search-btn"
          @click="onSearch"
        />
      </div>
      <div class="schbank-main">
        <el-table
          :data="searchData"
          style="width: 100%"
          size="mini"
          @row-click="rowSelect"
          :row-class-name="tableRowClassName"
          highlight-current-row
          v-loading="loading"
        >
          <el-table-column
            prop="BANKS"
            :label="I18N.$fanyi('国家代码')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="BANKL"
            :label="I18N.$fanyi('银行编号')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="BANKA"
            :label="I18N.$fanyi('银行名称')"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Object],
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    inattrs: Object
  },

  data() {
    return {
      dialogVisible: false,
      searchData: [],
      search: '',
      loading: false,
      clearing: false // apiInterface: this.$httpServer.sap.baseMethod,
    }
  },

  computed: {
    iptValue() {
      return typeof this.value === 'string'
        ? this.value
        : (this.value || {}).VALUE || ''
    }
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 获取银行信息
     * @update  22/04/2022
     * @returns {*}
     */
    async onSearch() {
      if (!this.search) {
        this.$alert(I18N.$fanyi('请输入银行名称'), I18N.$fanyi('提示'), {
          confirmButtonText: I18N.$fanyi('确定')
        })
        return
      }

      try {
        if (this.loading) return
        this.loading = true // 节流

        this.searchData = []
        const res = await this.$httpServer.sap.baseMethod(
          {
            sapInterface: 'PA904',
            I_MAXNUM: 50,
            I_BNKA: this.search
          },
          null,
          true
        )
        let result = res.T_DATA

        if (result && result.length > 0) {
          this.searchData = result
        }
      } catch (error) {
        this.$notify.error({
          title: I18N.$fanyi('错误'),
          message: error.message || I18N.$fanyi('银行信息获取失败！')
        })
      } finally {
        this.loading = false
      }
    },

    /**
     * @Copyright DELOITTE
     * @Description: 输入框聚焦
     * @update  22/04/2022
     * @returns {*}
     */
    handleInputFocus() {
      if (this.clearing) {
        this.clearing = false
        return
      }

      this.dialogVisible = true
    },

    /**
     * @Copyright DELOITTE
     * @Description: 清楚
     * @update  22/04/2022
     * @returns {*}
     */
    handleClear() {
      let val

      if (typeof this.value === 'string') {
        val = ''
      } else {
        if (this.inattrs && Object.keys(this.inattrs).length > 0) {
          val = {}
          Object.keys(this.inattrs).forEach((i) => (val[this.inattrs[i]] = ''))
        } else {
          val = null
        }
      }

      this.$emit('input', val)
      this.clearing = true
    },

    /**
     * @Copyright DELOITTE
     * @Description: 选中当前行操作
     * @update  22/04/2022
     * @param row 行
     * @returns {*}
     */
    rowSelect(row) {
      let val

      if (typeof this.value === 'string' && this.value !== '') {
        val = row.BANKL
      } else {
        if (this.inattrs && Object.keys(this.inattrs).length > 0) {
          val = {}
          Object.keys(this.inattrs).forEach(
            (i) => (val[this.inattrs[i]] = row[i])
          )
        } else {
          val = row
        }
      }

      this.$emit('input', val)
      this.dialogVisible = false
    },

    /**
     * @Copyright DELOITTE
     * @Description: 选中当前行高亮
     * @update  22/04/2022
     *
     * @param row 行
     * @returns {*}
     */
    tableRowClassName({ row }) {
      let activeCode =
        typeof this.value === 'string'
          ? this.value
          : (this.value || {}).BANKL || ''

      if (row.BANKL === activeCode) {
        return 'current-row'
      }

      return ''
    }
  }
}
</script>
