<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="I18N.$fanyi('表名称')" prop="tableName">
          <el-input
            :placeholder="I18N.$fanyi('请输入仓库名称')"
            v-model="info.tableName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="I18N.$fanyi('表描述')" prop="tableComment">
          <el-input
            :placeholder="I18N.$fanyi('请输入')"
            v-model="info.tableComment"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="I18N.$fanyi('实体类名称')" prop="className">
          <el-input
            :placeholder="I18N.$fanyi('请输入')"
            v-model="info.className"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="I18N.$fanyi('作者')" prop="functionAuthor">
          <el-input
            :placeholder="I18N.$fanyi('请输入')"
            v-model="info.functionAuthor"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="I18N.$fanyi('备注')" prop="remark">
          <el-input type="textarea" :rows="3" v-model="info.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
defineProps({
  info: {
    type: Object,
    default: null
  }
}) // 表单校验

const rules = ref({
  tableName: [
    {
      required: true,
      message: I18N.$fanyi('请输入表名称'),
      trigger: 'blur'
    }
  ],
  tableComment: [
    {
      required: true,
      message: I18N.$fanyi('请输入表描述'),
      trigger: 'blur'
    }
  ],
  className: [
    {
      required: true,
      message: I18N.$fanyi('请输入实体类名称'),
      trigger: 'blur'
    }
  ],
  functionAuthor: [
    {
      required: true,
      message: I18N.$fanyi('请输入作者'),
      trigger: 'blur'
    }
  ]
})
</script>
