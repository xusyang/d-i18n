<template>
  <div class="height100">
    <div ref="seedEmailID">
      <div style="font-size: 18px; line-height: 2">
        {{ I18N.$fanyi('尊敬的[') }} {{ paContractList.ENAME }}
        {{
          paContractList.GESCH === I18N.$fanyi('女')
            ? I18N.$fanyi('女士')
            : I18N.$fanyi('先生')
        }}
        ]：
      </div>
      <div
        style="
          font-size: 18px;
          margin-bottom: 30px;
          text-indent: 2em;
          line-height: 2;
        "
      >
        {{ ZSPRQ }}
        {{
          I18N.$fanyi(
            '，德勤湾中公司人力资源部，向您发送了劳动合同签字请求，请通过移动设备扫描二维码登陆电子合同系统签字，以下是您的劳动合同概要信息，若以疑问请联系：'
          )
        }}
      </div>
      <div style="font-size: 18px; float: left; width: 60%">
        <div style="text-indent: 2em; line-height: 2">
          {{ I18N.$fanyi('联系人：') }} {{ pageForm.ZLXR_NAME }}
        </div>
        <div style="text-indent: 2em; line-height: 2">
          {{ I18N.$fanyi('工作岗位：') }} {{ pageForm.ZPLANS }}
        </div>
        <div style="text-indent: 2em; line-height: 2">
          {{ I18N.$fanyi('联系电话：') }} {{ pageForm.ZPHONE_DW }}
        </div>
        <div style="text-indent: 2em; line-height: 2">
          {{ I18N.$fanyi('电子邮箱：') }} {{ pageForm.ZEMAIL_LXR }}
        </div>
      </div>
      <div style="font-size: 18px; float: left">
        <div id="qrcode" ref="qrCodeUrl"></div>
        <div style="color: #eb3222; font-size: 16px">
          {{ I18N.$fanyi('扫一扫，签订合同') }}
        </div>
      </div>

      <div style="clear: both"></div>
      <div style="margin-top: 15px">
        <table border="0" style="width: 100%">
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('序号') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('合同类型') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('合同期限类型') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('合同签订主体') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('合同开始日期') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('合同结束日期') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('试用期') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('试用期结束日期') }}
            </div>
          </th>
          <th>
            <div
              style="
                padding: 0px 10px;
                background: #00b0f0;
                min-height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
              "
            >
              {{ I18N.$fanyi('状态') }}
            </div>
          </th>
          <tr>
            <td>
              <div>1</div>
            </td>
            <td>
              <div>
                {{ I18N.$fanyi('劳动合同') }}
              </div>
            </td>
            <td>
              <div>
                {{ pageForm.ZZHTQXLX_T }}
              </div>
            </td>
            <td>
              <div>
                {{ pageForm.ZZHTQDDW }}
              </div>
            </td>
            <td>
              <div>
                {{ pageForm.BEGDA }}
              </div>
            </td>
            <td>
              <div>
                {{ pageForm.CTEDT }}
              </div>
            </td>
            <td>
              <div>{{ pageForm.SYQ }} {{ I18N.$fanyi('个月') }}</div>
            </td>
            <td>
              <div>
                {{ pageForm.ZZHTZZRQ }}
              </div>
            </td>
            <td>
              <div>
                {{ paContractList.TSTAT }}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sendEmail',
  props: ['paContractList', 'pageForm'],

  data() {
    return {
      baseParams: {},
      ZSPRQ: ''
    }
  },

  methods: {
    /**
     * @Copyright: DELOITTE
     * @Description: 生成二维码
     * @Date: 2020-11-13 11:53:03
     */
    creatCode() {
      this.$refs['qrCodeUrl'].innerHTML = ''
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 获取要发送的邮件内容
     * @Date: 2020-11-13 11:52:52
     */
    jionHTML() {
      return this.$refs['seedEmailID'].innerHTML
    },

    /**
     * @Copyright DELOITTE
     * @Description: 发送邮件
     * @update  08/04/2022
     * @returns {*}
     */
    sendEmail() {
      this.creatCode()
      setTimeout(() => {
        const contentHTML = this.jionHTML()
        this.emailSend(
          this.paContractList.ZRZDW,
          this.paContractList.EMAIL,
          this.paContractList.ZRZDW +
            I18N.$fanyi('向您发送了一封劳动合同签字的工作待办.'),
          contentHTML
        )
      }, 500)
    },

    /**
     * @Copyright: DELOITTE
     * @Description: 邮件发送
     * @Date: 2020-11-14 16:14:34
     * @param {*} senderNick 发件人昵称
     * @param {*} addressee 收件人邮箱 邮件多人用英文逗号隔开
     * @param {*} title 主题
     * @param {*} content 内容支持html
     * @param {*} copyTo 抄送
     * @param {*} bcc 密送
     * @param {*} callback
     */
    emailSend(senderNick, addressee, title, content, copyTo, bcc, callback) {
      let data = {
        nick: senderNick,
        addressee: addressee,
        copyTo: copyTo,
        bcc: bcc,
        title: title,
        content: content
      }
      this.$httpServer.base.dcemailSend(data).then(() => {
        this.$message.success(I18N.$fanyi('邮件发送成功!'))
      })
    },

    /**
     * @Copyright DELOITTE
     * @Description: 页面初始化函数入口
     * @update  08/04/2022
     * @returns {*}
     */
    initFunction() {
      this.ZSPRQ = this.paContractList.ZCZRQ
        ? this.paContractList.ZCZRQ.replace(
            /(\d{4})(\d{2})(\d{2})/g,
            I18N.$fanyi('$1年$2月$3日')
          )
        : ''
    }
  },

  created() {
    // 页面初始化函数入口
    this.initFunction()
  }
}
</script>
