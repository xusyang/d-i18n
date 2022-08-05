<template>
  <div v-if="a === '女' ? '中国' : '重庆'"></div>
  <el-button
    @click.native="openDialog(scope.row, 'X')"
    type="text"
    size="mini"
    v-if="
      scope.row.ZZHRJZLY !== 'X' &&
      scope.row.ZSFZZ === '否' &&
      scope.row.ZSFCRZ === '否'
    "
  >
    {{ I18N.$fanyi('重入职') }}
  </el-button>

  <el-button
    class="text-info"
    size="mini"
    type="text"
    v-if="scope.row.ZSTAT == '未签字'"
    @click="openQRCode()"
  >
    {{ I18N.$fanyi('签字') }}
  </el-button>

  <el-select v-model="form.mould" :placeholder="I18N.$fanyi('选择签署合同')">
    <el-option
      :label="I18N.$fanyi('德勤DHR测试1')"
      value="德勤DHR测试1"
    ></el-option>
  </el-select>

  <el-form-item>
    <paSelectBank
      :inattrs="{
        BANKL: 'KEY',
        BANKA: 'VALUE'
      }"
    ></paSelectBank>
  </el-form-item>

  <el-form-item label="I'am chinese."></el-form-item>
</template>

<script>
export default {
  methods: {
    opreationProveData(item, state) {
      // 1. 下载链接不需要翻译

      /*@d-i18n-disable*/
      const url = 'staticFile/员工简历下载模板.xlsx'

      // 2. console 里面的内容不需要翻译

      console.error(I18N.$fanyi('解析'))

      // 3. 含有特殊符号的处理

      const a = I18N.$fanyi('中的【') + str + I18N.$fanyi('】字段')

      if (state === '1' || state === '2' || state === '7') {
        this.$confirm(
          state === '1' ? '请选择下载完成的证明进行打印' : '是否确认操作',
          '提示',
          {
            type: 'info',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmButtonClass',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            center: true
          }
        ).then(() => {
          this.handleOpreationProveData(item, state)
        })
      }
    }
  }
}
</script>
