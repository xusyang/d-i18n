<template>
  <el-button v-if="scope.row.ZSTAT == '未签字'"> </el-button>
</template>

<script>
export default {
  methods: {
    opreationProveData(item, state) {
      this.$confirm(
        state === '1' ? '请选择下载完成的证明进行打印' : '是否确认操作',
        '提示',
        {
          confirmButtonText: '确认'
        }
      )
    }
  }
}
</script>
