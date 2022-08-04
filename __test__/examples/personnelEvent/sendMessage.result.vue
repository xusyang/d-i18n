<template>
  <div
    v-loading.fullscreen="loading"
    :element-loading-text="I18N.$fanyi('加载中.....')"
  >
    <div>
      <el-form size="mini" :model="pageForm">
        <div class="h4-ibox-content">
          <h4>
            <span class="li-bg-blue"></span> {{ I18N.$fanyi('邮件内容') }}
          </h4>
          <hr />
        </div>
        <el-row>
          <el-col :md="24">
            <label>
              <span class="red"> * </span> {{ I18N.$fanyi('标题') }}
              <span style="color: #999">
                {{ I18N.$fanyi('（仅限40字）') }}
              </span>
            </label>
            <el-form-item prop="title" :show-message="false">
              <el-input v-model="pageForm.title" maxlength="40"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <label>
              <span class="red"> * </span> {{ I18N.$fanyi('正文') }}
            </label>
            <el-form-item class="table-mail-editor">
              <div
                :style="{
                  border:
                    (!pageForm.content || pageForm.content === '<p><br></p>') &&
                    isActive
                      ? '1px solid red'
                      : ''
                }"
              >
                <wang-editor
                  :default-value="pageForm.content"
                  @getEditorContent="getEditorContent"
                ></wang-editor>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <div class="pd20 text-center">
        <el-col>
          <el-button
            size="mini"
            type="warning"
            :loading="loading"
            @click="submitConfirm('F')"
          >
            {{ I18N.$fanyi('发送') }}
          </el-button>
          <el-button size="mini" @click="closeDialog">
            {{ I18N.$fanyi('关闭') }}
          </el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import WangEditor from '../../../components/textEditor'
export default {
  name: 'sendMessage',
  props: {
    parentData: {
      type: Object
    }
  },
  components: {
    WangEditor
  },

  data() {
    return {
      pageForm: {},
      loading: false,
      isActive: false,
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO)
    }
  },

  watch: {},
  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description:  获取富文本内容
     * @date 2020年07月20日
     * @param  value
     */
    getEditorContent(value) {
      this.pageForm.content = value
    },

    /**
     * @Copyright DELOITTE
     * @Description: 初始化函数
     * @update  08/04/2022
     * @returns {*}
     */
    initFunction() {
      this.settingContent()
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  提交确认操作
     * @date 2020年07月20日
     */
    submitConfirm() {
      this.isActive = true

      if (
        this.$isEmpty(this.pageForm.content) ||
        this.$isEmpty(this.pageForm.title)
      ) {
        return this.$message.warning(I18N.$fanyi('请完成必填项'))
      }

      this.$confirm('是否确认发送', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirmButtonClass',
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        center: true
      }).then(() => this.sendMessage())
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  设置消息内容
     * @date 2020年07月20日
     */
    settingContent() {
      this.pageForm.title = I18N.$fanyi(
        '简历审核失败，您仍需要完善部分关键信息【德勤】'
      )
      this.pageForm.content =
        '<div>' +
        '<p>' +
        I18N.$fanyi('尊敬的') +
        "<strong><span style='text-decoration-line: underline;'>&nbsp;" +
        this.parentData.personnnName +
        '&nbsp;</span></strong>' +
        I18N.$fanyi(
          '先生/小姐，抱歉的通知您，您提交的个人简历部分信息不完整/或存在错误，请根据以下内容，重新填报，谢谢。'
        ) +
        '</p>' +
        '<p>1:</p>' +
        '<p>2:</p>' +
        '<p>3:</p>' +
        "<p><a href='" +
        this.parentData.link +
        "' target='_blank' >" +
        I18N.$fanyi('请点击此链接补充完善个人信息') +
        '</a></p>' +
        '</div>'
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  发送消息
     * @date 2020年07月20日
     */
    sendMessage() {
      let params = {
        addressee: this.parentData.emailAddress,

        // "13149920325@163.com",
        // 暂时写死
        copyTo: '',
        bcc: '',
        title: this.pageForm.title,
        content: this.pageForm.content,
        imgPath: '',
        attachmentPath: '',
        fileList: ''
      }

      // 发送邮件

      this.$httpServer.base.sendEmail(params).then(() => {
        this.$message.success(I18N.$fanyi('发送成功'))
        this.closeDialog()
        this.updateDataStatusByGuid('SEN')
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  更改数据状态
     * @date 2020年07月20日
     * @param operaType 操作类型
     */
    updateDataStatusByGuid(operaType) {
      let params = {
        sapInterface: 'PE014',
        IV_USER: '',
        IV_GUID: this.parentData.guid,
        IV_OPERA: operaType
      }

      // 板块操作

      this.$httpServer.sap.baseMethod(params).then(() => {
        this.$router.push({
          path: '/rc/event/',
          query: {
            MENUII: this.parentData.pageCode
          }
        })
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  关闭窗口
     * @date 2020年07月20日
     */
    closeDialog() {
      this.$emit('closeDialog')
    }
  },

  created() {
    this.initFunction()
  }
}
</script>

<style scoped>
.h4-ibox-content hr {
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 9px;
  border: 0;
  border-top: 1px solid #eee;
  box-sizing: content-box;
  height: 0;
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
}
</style>
