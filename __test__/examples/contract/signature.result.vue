<template>
  <div>
    <breadcrumb :key="$route.fullPath"></breadcrumb>
    <div class="ibox ibox-content" style="padding-top: 20px">
      <el-form ref="form" size="mini" :model="form" label-width="120px" inline>
        <el-form-item :label="I18N.$fanyi('选择签署合同')">
          <el-select
            v-model="form.mould"
            :placeholder="I18N.$fanyi('选择签署合同')"
          >
            <el-option
              :label="I18N.$fanyi('德勤DHR测试1')"
              value="德勤DHR测试1"
            ></el-option>
            <el-option
              :label="I18N.$fanyi('德勤DHR测试2')"
              value="德勤DHR测试2"
            ></el-option>
            <el-option
              :label="I18N.$fanyi('德勤DHR测试3')"
              value="德勤DHR测试3"
            ></el-option>
            <el-option
              :label="I18N.$fanyi('劳动合同模板')"
              value="劳动合同模板"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!form.mould" @click="onSubmit">
            {{ I18N.$fanyi('发起签约') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signature',

  data() {
    return {
      form: {
        mould: ''
      }
    }
  },

  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 发起签约
     * @update  08/04/2022
     * @returns {*}
     */
    onSubmit() {
      if (!this.form.mould) return
      this.$httpServer.base.getTignUrl(this.form).then((response) => {
        response.data && window.open(response.data.signUrl)
      })
    }
  }
}
</script>
