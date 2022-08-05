<template>
  <div>
    <breadcrumb :key="$route.fullPath" v-if="!approveBaseParams"></breadcrumb>
    <div class="ibox-content mt10 text-center" v-if="isShowSearch">
      <pa-search-user
        :width="'30%'"
        :ipage="baseParams.MENUII"
        @getEmployeeData="getEmployeeData"
        @emptValue="emptValue"
        :cheAuth="
          baseParams.MENUII === pageCode.PADPGL ||
          baseParams.MENUII === pageCode.PAJDGL ||
          baseParams.MENUII === pageCode.PAJRGL
            ? 'Z'
            : ''
        "
      ></pa-search-user>
    </div>

    <div
      class="ibox-content mt10"
      v-if="headerDataList.length > 0 && baseParams.MENUII !== pageCode.SPHTBG"
    >
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div class="leave-avter">
            <img
              src="../../../assets/image/user_male_l.png"
              alt=""
              v-if="!photo"
              class="img-lg img-circle"
            />
            <img :src="photo" class="img-lg img-circle" alt="" v-else />
          </div>
        </el-col>
        <el-col :span="19">
          <el-form label-width="115px" size="mini">
            <el-row>
              <el-col
                class="el-col-sm-12"
                v-for="(headitem, index) in headerDataList"
                :key="index"
                style="height: 35px"
              >
                <el-form-item :label="headitem.FIELN + '：'">
                  <div class="pa-headField" v-if="headitem.FIELV.length > 15">
                    <el-tooltip
                      effect="dark"
                      :content="headitem.FIELV"
                      placement="top"
                      popper-class="zdy-popper-top-class"
                    >
                      <strong>
                        {{ headitem.FIELV }}
                      </strong>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    <strong>
                      {{ headitem.FIELV }}
                    </strong>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form size="mini" class="pa-form-tabs">
        <div
          class="ibox-content mt10"
          style="padding-top: 10px"
          v-if="groupList.length > 0"
        >
          <el-row
            style="text-align: right; margin-bottom: -27px; z-index: 1000"
            v-if="!approveBaseParams"
          >
            <el-button
              :type="butItem.COLOR"
              size="mini"
              v-for="(butItem, butItemIndex) in buttonDataList"
              :key="butItemIndex"
              @click="doButtonAction(butItem)"
            >
              {{ butItem.FNAME }}
            </el-button>
            <el-button size="mini" @click="backing()"> 返回 </el-button>
          </el-row>
          <el-tabs v-model="activeCode" :onload="displayFile()">
            <el-tab-pane
              v-for="(group, groupIndex) in groupList.filter(
                (x) => x.ZZHID !== 'X'
              )"
              :key="groupIndex"
              :label="group.ACGRN"
              :name="group.ACGRP"
            >
              <div
                class="tipsExplain"
                v-if="ZPTYPE_SP === '02' && baseParams.MENUII === pageCode.WYLZ"
              >
                <p>离职申请说明：</p>
                <p>
                  1）正式员工需提前30天提交离职申请，试用期员工提前3天，并上传本人签字版的《员工离职申请表》；
                </p>
                <p>
                  2）员工操作不便的，可由人行经理代为发起，发起后由HR线下提醒拟离职员工检查报销、财务欠款等款项的结算情况，上传员工本人签字的员工离职申请表；
                </p>
                <p>3）请注意检查并处理未报销账款、财务欠款等事宜。</p>
              </div>
              <div
                v-for="(sonGroup, sonGroupIndex) in group.ACBLK"
                :key="sonGroupIndex"
              >
                <div
                  class="main-content-box"
                  v-for="(
                    infoTypeItem, infoTypeItemIndex
                  ) in sonGroup.INFTY.filter((x) => x.ZZHID !== 'X')"
                  :key="infoTypeItemIndex"
                >
                  <h4 class="clearfix m-t-md">
                    <span class="li-bg-blue"></span>
                    {{ infoTypeItem.INFTX }}
                  </h4>
                  <hr />
                  <div class="infoType-content-box">
                    <el-row>
                      <div>
                        <el-col
                          v-for="(
                            fieldItem, fieldItemIndex
                          ) in infoTypeItem.FIELD"
                          v-if="
                            infoTypeItem.ZZTAB !== 'X' &&
                            fieldItem.ZZHID !== 'X'
                          "
                          :key="fieldItemIndex"
                          :md="
                            $caleMdCount(infoTypeItem.XXCOL, fieldItem.ZZCOL)
                          "
                          :sm="
                            $caleMdCount(infoTypeItem.XXCOL, fieldItem.ZZCOL)
                          "
                          :class="[
                            fieldItem.ZKJLX !== 'TXT' ? 'field-height' : ''
                          ]"
                        >
                          <div style="padding-bottom: 2px">
                            <label
                              v-show="
                                fieldItem.ZKJLX !== 'BUT' &&
                                fieldItem.ZKJLX !== 'DEL'
                              "
                              style="font-size: 13px"
                            >
                              <span
                                style="color: red"
                                v-show="fieldItem.ZZREQ === 'X'"
                              >
                                *
                              </span>
                              <span
                                :style="{
                                  color: fieldItem.COLOR
                                    ? fieldItem.COLOR
                                    : '#606266'
                                }"
                              >
                                {{ fieldItem.FIELN }}
                              </span>
                            </label>
                          </div>
                          <multiField
                            :baseParams="baseParams"
                            :fieldItem="fieldItem"
                            :infoTypeItem="infoTypeItem"
                            :group="group"
                            :sonGroup="sonGroup"
                            :groupList="groupList"
                            :getData="getData"
                            :verificationList="verificationList"
                          ></multiField>
                        </el-col>
                      </div>

                      <template v-if="infoTypeItem.ZZTAB === 'X'">
                        <div
                          v-for="(
                            modelItem, modelItemIndex
                          ) in infoTypeItem.models"
                          :key="modelItemIndex"
                        >
                          <el-col
                            v-for="(
                              fieldItem, fieldItemIndex
                            ) in modelItem.filter((x) => x.ZZHID !== 'X')"
                            :key="fieldItemIndex"
                            :md="
                              $caleMdCount(infoTypeItem.XXCOL, fieldItem.ZZCOL)
                            "
                            :sm="
                              $caleMdCount(infoTypeItem.XXCOL, fieldItem.ZZCOL)
                            "
                            :class="[
                              [(24 / infoTypeItem.XXCOL) * fieldItem.ZZCOL],
                              fieldItem.ZKJLX !== 'TXT' ? 'field-height' : ''
                            ]"
                          >
                            <div style="padding-bottom: 2px">
                              <label
                                v-show="
                                  fieldItem.ZKJLX !== 'BUT' &&
                                  fieldItem.ZKJLX !== 'DEL'
                                "
                                style="font-size: 13px"
                              >
                                <span
                                  style="color: red"
                                  v-show="fieldItem.ZZREQ === 'X'"
                                >
                                  *
                                </span>
                                <span
                                  :style="{
                                    color: fieldItem.COLOR
                                      ? fieldItem.COLOR
                                      : '#606266'
                                  }"
                                >
                                  {{ fieldItem.FIELN }}
                                </span>
                              </label>
                            </div>
                            <multiField
                              :baseParams="baseParams"
                              :fieldItem="fieldItem"
                              :infoTypeItem="infoTypeItem"
                              :group="group"
                              :sonGroup="sonGroup"
                              :groupList="groupList"
                              :getData="getData"
                              :verificationList="verificationList"
                            ></multiField>
                          </el-col>

                          <el-col
                            class="add-button-event-box"
                            v-if="
                              infoTypeItem.ACTIO !== 'DIS' &&
                              infoTypeItem.ACTIO !== 'MOD' &&
                              baseParams.EV_DISP !== 'X'
                            "
                          >
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="
                                addModel(infoTypeItem, modelItemIndex)
                              "
                            >
                              <i class="fa fa-plus"></i>
                            </el-button>
                            <el-button
                              type="danger"
                              size="mini"
                              @click.native="
                                deleteModel(infoTypeItem, modelItemIndex)
                              "
                            >
                              <i class="fa fa-minus"></i>
                            </el-button>
                          </el-col>
                          <hr
                            style="width: 85%"
                            v-show="
                              infoTypeItem.models.length - 1 > modelItemIndex
                            "
                          />
                        </div>
                      </template>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="附件" name="fileTabSheet" v-if="isShowFile">
              <div
                v-for="(allFileObject, allFileObjectIndex) in allFileList"
                :key="allFileObjectIndex"
              >
                <div v-if="allFileObject.length > 0">
                  <h4 class="clearfix m-t-md">
                    <span class="li-bg-blue"></span>
                    <span>
                      {{ allFileObjectIndex === 0 ? '必传资料' : '自定义资料' }}
                    </span>
                  </h4>
                  <hr />
                  <div
                    v-if="
                      allFileObjectIndex === 0 &&
                      ZPTYPE_SP === '02' &&
                      baseParams.MENUII === pageCode.PAZZGLJT
                    "
                  >
                    <p>转正申请所需附件说明：</p>
                    <p>
                      1）请下载员工提交转正自评表及转正报告模板，按填写说明完成后进行上传。
                    </p>
                    <p>
                      2）
                      入职时确认有经商或兼职情况9级以上干部，在入职时未处理完成的，同时附上经商办企业自查表和干部兼职及薪资情况自查表。
                    </p>
                    <div
                      class="husBox"
                      @click="
                        upHusFile(
                          item.FILE_GUID,
                          item.FILE_NAME,
                          item.FILE_TYPE
                        )
                      "
                      v-for="(item, index) in husFileList"
                      :key="index"
                      :class="[
                        item.FILE_TYPE === '.doc' ? 'husWord' : '',
                        item.FILE_TYPE === '.xlsx' ? 'husExcel' : '',
                        item.FILE_TYPE === '.pptx' ? 'husPPT' : ''
                      ]"
                    >
                      <span></span>
                      <p>
                        {{ item.FILE_NAME }}
                      </p>
                    </div>
                  </div>

                  <el-row>
                    <div
                      class="file-item-border-box"
                      v-for="(fileObject, fileObjectIndex) in allFileList[
                        allFileObjectIndex
                      ].filter((x) => x.ZXXCJ !== 'X')"
                      :key="fileObjectIndex"
                    >
                      <div class="font-bold">
                        <span
                          style="color: #009fdf"
                          @click="fileObject.isShowInput = true"
                          v-show="
                            allFileObjectIndex === 1 &&
                            !fileObject.isShowInput &&
                            fileObject.ZATTN === ''
                          "
                        >
                          点击添加标题
                        </span>
                        <el-tooltip
                          effect="dark"
                          :content="fileObject.ZATTN"
                          placement="top"
                          popper-class="zdy-popper-top-class"
                        >
                          <p
                            @click="
                              allFileObjectIndex === 1
                                ? (fileObject.isShowInput = true)
                                : ''
                            "
                            class="pa-file-text"
                          >
                            {{ fileObject.ZATTN }}
                          </p>
                        </el-tooltip>
                        <el-input
                          type="text"
                          size="mini"
                          v-show="
                            allFileObjectIndex === 1 &&
                            fileObject.isShowInput &&
                            baseParams.EV_DISP !== 'X'
                          "
                          v-model="fileObject.ZATTN"
                          @blur="fileObject.isShowInput = false"
                        ></el-input>
                      </div>

                      <div
                        v-for="(fileItem, fileItemIndex) in fileObject.ZACFILE"
                        :key="fileItemIndex"
                      >
                        <el-col :span="16">
                          <div
                            class="file-down-box pa-file-text"
                            @click="
                              $previewFile(fileItem.ATTDL, fileItem.ATTNN)
                            "
                          >
                            <el-tooltip
                              effect="dark"
                              :content="fileItem.ATTNN"
                              placement="top"
                              popper-class="zdy-popper-top-class"
                            >
                              <span>
                                {{ fileItem.ATTNN }}
                              </span>
                            </el-tooltip>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="file-down-operation-box">
                            <span
                              class="el-icon-download"
                              title="下载"
                              @click="
                                $downloadFile(fileItem.ATTDL, fileItem.ATTNN)
                              "
                            ></span>
                            <span
                              class="el-icon-delete"
                              title="删除"
                              v-if="
                                fileItem.ATTNN && baseParams.EV_DISP !== 'X'
                              "
                              @click="deleteFile(fileObject, fileItemIndex)"
                            ></span>
                          </div>
                        </el-col>
                      </div>

                      <div
                        class="upload-file-img-box el-col-sm-24"
                        v-if="
                          fileObject.ZTYPE === 'U' && baseParams.EV_DISP !== 'X'
                        "
                      >
                        <el-upload
                          :disabled="false"
                          :action="
                            $VUE_BASE +
                            'dhrDownloadService/utility/file/dfs/upload'
                          "
                          class="avatar-uploader"
                          :on-success=";(response, file, fileList) =>
  handleSuccess(response, file, fileObject, fileList)
"
                          :before-upload=";(file) => handleBefore(file, fileObject)
"
                          :on-error="handleError"
                          :on-exceed="handleFileExceed"
                          :file-list="fileObject.ZACFILE"
                          :show-file-list="false"
                          multiple
                          :with-credentials="true"
                          name="file"
                          :limit="5"
                        >
                          <img
                            src="../../../assets/image/emp_info/upload-file-new.jpg"
                            alt=""
                          />
                        </el-upload>
                      </div>
                    </div>

                    <div
                      class="file-item-border-box add-file-box"
                      v-if="
                        allFileObjectIndex === 1 && baseParams.EV_DISP !== 'X'
                      "
                    >
                      <div class="upload-file-img-box">
                        <img
                          src="../../../assets/image/emp_info/upload-file-new.jpg"
                          alt=""
                          @click="addFile"
                        />
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
    </div>
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible="dialogVisible"
        :close-on-click-modal="false"
        :center="true"
        width="1000px"
        :before-close="handleClose"
      >
        <send-offer
          :parentData="parentData"
          v-if="showDialog === 'offer'"
          @closeDialog="() => handleClose()"
        ></send-offer>
        <send-message
          :parentData="parentData"
          v-if="showDialog === 'message'"
          @closeDialog="() => handleClose()"
        ></send-message>
      </el-dialog>
    </div>
    <el-dialog
      title="支付宝扫描二维码，签署合同"
      :visible="signVisible"
      class="sign-dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :append-to-body="true"
      :before-close=";() => signClose()
"
    >
      <div v-if="signVisible" id="qrcode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signClose"> 取 消 </el-button>
        <el-button type="primary" @click="signFile"> 签署完成 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import paSearchUser from '../components/paSearchUser'
import multiField from './multiField'
import SendOffer from '../../rc/offer/sendOffer'
import SendMessage from '@/views/pa/personnelEvent/sendMessage'
export default {
  name: 'personnelEvent',
  components: {
    SendMessage,
    SendOffer,
    paSearchUser,
    multiField
  },

  data() {
    return {
      signUrl: null,
      signVisible: false,
      activeCode: '',
      photo: '',
      baseParams: {},
      currentUserInfo: this.$isEmpty(localStorage.CURRENT_USER_INFO)
        ? {}
        : JSON.parse(localStorage.CURRENT_USER_INFO),
      isShowSearch: false,
      isShowFile: false,
      headerDataList: [],
      groupList: [],
      fileList: [],
      fileListDefinition: [],
      allFileList: [[], []],

      // allFileList的第一个元素代表必填资料，第二个元素代表非必填资料
      customFileIndex: 0,
      photoBase64: '',
      buttonDataList: [],
      verificationList: [],
      dialogTitle: '',
      dialogVisible: false,
      showDialog: '',
      parentData: {},
      ZPTYPE_SP: '',

      // 权限
      husFileList: '',
      SPDialogVisiblequery: {},
      ET_DZQZINFO: []
    }
  },

  props: {
    /**
     * 当有这个参数的时候，就认为是流程审批表单引用的此组件
     * approveBaseParams对象必传属性：
     * MENUII 菜单项（操作类型等）
     * PERNR sap分配号（员工编号）
     * employeeNum sap分配号（员工编号）
     */
    approveBaseParams: {
      type: Object,
      default: () => null
    },

    /**
     * 判断是否是从我的发起点进来的，如果是的话，则表单不可编辑
     */
    sponsorFrom: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    /**
     * @Copyright  DELOITTE
     * @Description: 监听路由变化，初始化页面
     * @update  07/04/2022
     * @returns {*}
     */
    $route(oldVal, newVal) {
      if (newVal.fullPath === oldVal.fullPath) return

      // 重置是否显示搜索框

      this.isShowSearch = false
      this.groupList = []
      this.fileList = []
      this.fileListDefinition = []
      this.allFileList[0] = []
      this.allFileList[1] = []
      this.verificationList = []

      // 初始化是否显示附件

      this.isShowFile = false
      this.initFunction()
    }
  },
  methods: {
    /**
     * @Copyright  DELOITTE
     * @Description: 删除发起失败的流程
     * @update  07/04/2022
     * @returns {*}
     */
    delData() {
      let params = {
        sapInterface: 'PE014',
        IV_USER: '',
        IV_GUID: this.baseParams.GUID,
        IV_OPERA: 'DEL'
      }
      this.$httpServer.sap.baseMethod(params).finally(() => this.backing())
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 返回 通过pageCode 判断返回到哪里
     * @update  07/04/2022
     * @returns {*}
     */
    backing() {
      let pageCode = this.baseParams.MENUII
      let params = {
        MENUII: pageCode
      }
      if (this.baseParams.backingQueryParams)
        params.backingQueryParams = this.baseParams.backingQueryParams

      if (
        pageCode === this.pageCode.PAZZGLJT ||
        pageCode === this.pageCode.YGZZ ||
        (pageCode === this.pageCode.LYGL &&
          this.$isEmpty(this.baseParams.backingQueryParams)) ||
        (pageCode === this.pageCode.YRZGL &&
          this.$isEmpty(this.baseParams.backingQueryParams)) ||
        (pageCode === this.pageCode.PAZZGL &&
          this.$isEmpty(this.baseParams.backingQueryParams)) ||
        (pageCode === this.pageCode.PARZGL &&
          this.$isEmpty(this.baseParams.backingQueryParams))
      ) {
        window.history.back()
      } else if (pageCode === this.pageCode.WYLZ) {
        this.$router.push({
          path: '/blocHome'
        })
      } else if (
        pageCode === this.pageCode.OFGL ||
        pageCode === this.pageCode.RCKGL
      ) {
        this.$router.push({
          path: '/rc/event/',
          query: params
        })
      } else if (pageCode === this.pageCode.PAHTGL) {
        this.$router.push({
          path: '/ht/event/',
          query: params
        })
      } else if (pageCode === this.pageCode.PAZZGLJT) {
        this.$router.push({
          path: '/py/personnelInfoList/',
          query: params
        })
      } else {
        this.$router.push({
          path: '/pa/event/',
          query: params
        })
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 员工查询 (抬头数据)
     * @date 2020年07月20日
     * @param obj
     */
    getEmployeeData(obj) {
      this.photo = ''
      this.photoBase64 = ''
      this.baseParams.employeeName = obj.employeeName
      this.baseParams.employeeNum = obj.employeeNum
      this.getPersonnelBaseData()
      this.initFunction(obj.employeeNum)
    },

    /**
     * @Copyright  DELOITTE
     * @Description:  清空历史选中的人员 （抬头数据）
     * @update  07/04/2022
     * @returns {*}
     */
    emptValue() {
      this.baseParams.employeeName = ''
      this.baseParams.employeeNum = ''
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 去除空格
     * @update  07/04/2022
     * @param str
     * @returns {*}
     */
    replaceSpace(str) {
      if (typeof str === 'string') str = str.replace(/\s/g, '')
      return str
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取抬头信息 ZFM_DHR_GET_HEAD_DATA
     * @update  `07/04/2022`
     * @returns {*}
     */
    getPersonnelBaseData() {
      let param = {
        sapInterface: 'PA007',
        IV_USER: '',
        IV_PERNR: this.baseParams.employeeNum,
        IV_IPAGE: this.baseParams.MENUII,
        IV_DATUM: new Date().Format('yyyyMMdd')
      }

      // 合同续签

      if (this.baseParams.MENUII === this.pageCode.SPHTXQ)
        param.sapInterface = 'PA057'
      this.$httpServer.sap.baseMethod(param).then((response) => {
        this.headerDataList = response.ET_DATA
        this.photo = response.EV_PHOTO
        if (this.photo) this.photo = 'data:image/png;base64,' + this.photo
        this.baseParams.MENUII === this.pageCode.PAZZGLJT && this.getHusbandry()
        this.baseParams.MENUII === this.pageCode.WYLZ && this.getHusbandry()
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: IV_ZXXCJ 信息采集参数
     * @date 2020年07月20日
     * @returns {string}
     */
    getZXXCJParams() {
      return ''
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取模板信息
     * @update  07/04/2022
     * @returns {*}
     */
    getAcData() {
      let sapInterface =
        this.baseParams.MENUII === this.pageCode.YRZGL ? 'PE068' : 'PE004'
      let isNotEdit = this.sponsorFrom
      let param = {
        sapInterface: sapInterface,
        IV_GUID: this.baseParams.GUID,
        IV_ZXXCJ: this.getZXXCJParams(),
        IV_WB: '',
        IV_EVEN: '',
        IV_ZZBIP: '',
        IV_K2: '',
        IV_USER: '',
        IV_IPAGE: this.baseParams.MENUII
      }
      this.$httpServer.sap.baseMethod(param).then((response) => {
        this.groupList = []

        // 附件，信息分组，字段数据

        let files = [],
          group = [],
          fieldData = []
        let ES_MESSAGE = response.ES_MESSAGE
        if (ES_MESSAGE.MSGTY === 'E') return

        // 信息分组

        group = response.ET_GRP

        // 获取分组对应的数据VALUE

        fieldData = response.EV_DATA

        // 事件编码

        this.baseParams.zaction = response.EV_ZACTI

        // 人员编号

        this.baseParams.employeeNum = response.EV_PERNR

        // 获取抬头信息

        this.baseParams.employeeNum &&
          this.getPersonnelBaseData(this.baseParams.employeeNum)

        // 附件

        files = response.ET_FILE

        // 状态

        this.baseParams.STAT = response.EV_STAT
        this.baseParams.EV_DISP = response.EV_DISP
        this.baseParams.EV_FUNC = response.EV_FUNC

        // 再入职

        this.baseParams.REHIRE = response.EV_REHIRE
        this.getButton()

        // 头像

        this.photoBase64 = response.EV_PHOTO

        if (this.photoBase64) {
          this.photo = 'data:image/png;base64,' + this.photoBase64
        }

        if (this.$isEmpty(fieldData)) return

        // 多模版数据

        for (let i in group) {
          for (let j in group[i].ACBLK) {
            let sonGroup = group[i].ACBLK[j].INFTY

            for (let k in sonGroup) {
              for (let s in fieldData) {
                if (
                  sonGroup[k].INFTY === fieldData[s].INFTY &&
                  sonGroup[k].SUBTY === fieldData[s].SUBTY
                ) {
                  try {
                    JSON.parse(fieldData[s].VALUE)
                    sonGroup[k].VALUE = fieldData[s].VALUE
                  } catch (e) {
                    console.error(
                      new Date().Format('yyyy-MM-dd hh:mm:ss'),
                      '解析',
                      sonGroup[k].INFTY,
                      sonGroup[k].SUBTY,
                      fieldData[s].VALUE,
                      e
                    )
                    return
                  }
                }
              }

              if (isNotEdit) {
                for (let p of sonGroup[k].FIELD) {
                  if (p.ZZDIS !== 'X') {
                    p.ZZDIS = 'X'
                  }
                }
              }
            }
          }
        }

        this.groupList = this.processDataGrp(group)

        if (this.groupList.length > 0 && !this.activeCode) {
          let index = 0

          // 找出非隐藏的第一个附件下标

          for (let i in this.groupList) {
            if (this.groupList[i].ZZHID === 'X') {
              index++
            } else {
              break
            }
          }

          // 没有分组时默认显示附件

          if (+index === this.groupList.length) {
            this.activeCode = 'fileTabSheet'
          } else {
            // 默认加载第一个sheet
            this.activeCode = this.groupList[index].ACGRP
          }
        }
        /**
         * 区分附件 必填和非必填
         * @type {Array}
         */

        this.fileList = []

        // 必填附件

        this.fileListDefinition = []

        // 非必填附件

        for (let i in files) {
          if (!files[i].isShowInput) {
            files[i].isShowInput = false
          }

          if (files[i].ZZREQ === 'X') {
            this.fileList.push(files[i])
          } else {
            if (
              this.baseParams.MENUII === this.pageCode.PALGGLSP &&
              this.baseParams.STAT === 'G'
            ) {
              this.baseParams.EV_DISP = ''
            }

            this.fileListDefinition.push(files[i])
          }
        }

        this.allFileList[0] = this.fileList
        this.allFileList[1] = this.fileListDefinition
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 初始化是否显示附件
     * @date 2020年07月20日
     *
     */
    displayFile() {
      if (this.fileList.length > 0 || this.fileListDefinition.length > 0) {
        this.isShowFile = true
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 模板赋值
     * @update  07/04/2022
     * @param SPHTdata:数据 group：模板
     * @returns group模板
     */
    assignmentSP(SPHTdata, group) {
      // 遍历分组拿到默认值
      for (const i in group) {
        group[i].ACBLK = this.$sortInfoList(group[i].ACBLK, 'SORTD', 'asc')

        for (const j in group[i].ACBLK) {
          const sonGroup = this.$sortInfoList(
            group[i].ACBLK[j].INFTY,
            'SORTD',
            'asc'
          )

          for (const k in sonGroup) {
            let valueList

            if (+i === 0) {
              valueList = SPHTdata.ES_HTDATA || {}
            } else {
              valueList = SPHTdata.ET_LSDATA || []
            }

            if (sonGroup[k].ZZTAB === 'X') {
              let models = sonGroup[k].models

              if (models.length < valueList.length) {
                console.error('数量不匹配,手动进行数据调整！')
                let smodels = JSON.parse(JSON.stringify(models[0]))
                models = []
                valueList.forEach(() =>
                  models.push(JSON.parse(JSON.stringify(smodels)))
                )
                sonGroup[k].models = models
              }

              for (const o in valueList) {
                const values = valueList[o]

                // 存在models[o] undefined情况

                models[o] = this.$sortInfoList(models[o], 'SORTD', 'asc')

                for (const l in models[o]) {
                  if (+i !== 0) {
                    models[o][l].value = values[models[o][l].RFIED] || ''
                  } else {
                    models[o][l].value = values[models[o][l].FIELD] || ''
                  }

                  if (models[o][l].FTYPE === 'D') {
                    // 日期类型转换格式
                    models[o][l].value =
                      models[o][l].value && models[o][l].value !== '00000000'
                        ? models[o][l].value
                        : ''
                  } else if (models[o][l].ZZSHM === 'D') {
                    // 下拉列表转换格式
                    try {
                      if (models[o][l].value) {
                        models[o][l].value = JSON.parse(
                          values[models[o][l].FIELD]
                        )
                        models[o][l].valueList = []
                        models[o][l].valueList.push(models[o][l].value)
                      } else {
                        if (models[o][l].ZZDEF) {
                          models[o][l].value = JSON.parse(models[o][l].ZZDEF)
                          models[o][l].valueList = []
                          models[o][l].valueList.push(
                            JSON.parse(models[o][l].ZZDEF)
                          )
                        } else {
                          models[o][l].value = ''
                          models[o][l].valueList = []
                        }
                      }
                    } catch (e) {
                      console.error(
                        new Date().Format('yyyy-MM-dd hh:mm:ss'),
                        '解析',
                        sonGroup[k].INFTY,
                        models[o][l].FIELD,
                        e
                      )
                      return
                    }
                  } else if (models[o][l].ZZSHM === 'T') {
                    // 树转换格式
                    models[o][l].isShow = false
                    models[o][l].treeData = []

                    try {
                      if (models[o][l].value) {
                        let value = JSON.parse(values[models[o][l].FIELD])
                        models[o][l].value = value.KEY
                          ? value.KEY + '-' + value.VALUE
                          : ''
                      } else {
                        if (models[o][l].ZZDEF) {
                          let value = JSON.parse(models[o][l].ZZDEF)
                          models[o][l].value = value.KEY
                            ? value.KEY + '-' + value.VALUE
                            : ''
                        } else {
                          models[o][l].value = ''
                        }
                      }
                    } catch (e) {
                      console.error(
                        new Date().Format('yyyy-MM-dd hh:mm:ss'),
                        '解析',
                        sonGroup[k].INFTY,
                        models[o][l].FIELD,
                        e
                      )
                      return
                    }
                  } else {
                    if (models[o][l].value) {
                      if (+i !== 0) {
                        models[o][l].ZZBDS = this.regularReplace(
                          models[o][l].ZZBDS
                        )
                        // 处理正则表达式
                      } else {
                        models[o][l].value = values[models[o][l].FIELD]
                          ? values[models[o][l].FIELD]
                              .toString()
                              .replace(/<br\/>/g, '\n')
                          : ''
                        models[o][l].ZZBDS = this.regularReplace(
                          models[o][l].ZZBDS
                        )
                        // 处理正则表达式
                      }
                    } else {
                      if (models[o][l].ZZDEF) {
                        models[o][l].value = models[o][l].ZZDEF
                        models[o][l].ZZBDS = this.regularReplace(
                          models[o][l].ZZBDS
                        )
                        // 处理正则表达式
                      } else {
                        models[o][l].value = ''
                        models[o][l].ZZBDS = this.regularReplace(
                          models[o][l].ZZBDS
                        )
                        // 处理正则表达式
                      }
                    }
                  }
                }
              }
            } else {
              let fields = this.$sortInfoList(sonGroup[k].FIELD, 'SORTD', 'asc')

              for (const o in fields) {
                const values = valueList[fields[o].RFIED]
                fields[o].value = values || ''

                if (fields[o].FTYPE === 'D') {
                  // 日期类型转换格式
                  fields[o].value =
                    fields[o].value && fields[o].value !== '00000000'
                      ? fields[o].value
                      : ''
                } else if (fields[o].ZZSHM === 'D') {
                  // 下拉列表转换格式
                  try {
                    if (fields[o].value) {
                      fields[o].value = JSON.parse(values)
                      fields[o].valueList = []
                      fields[o].valueList.push(fields[o].value)
                    }
                  } catch (e) {
                    console.error(
                      new Date().Format('yyyy-MM-dd hh:mm:ss'),
                      '解析',
                      sonGroup[k].INFTY,
                      fields[o].FIELD,
                      e
                    )
                    return
                  }
                } else if (fields[o].ZZSHM === 'T') {
                  // 树转换格式
                  fields[o].isShow = false
                  fields[o].treeData = []

                  try {
                    if (fields[o].value) {
                      let value = JSON.parse(fields[o].value)
                      fields[o].value = value.KEY
                        ? value.KEY + '-' + value.VALUE
                        : ''
                    }
                  } catch (e) {
                    console.error(
                      new Date().Format('yyyy-MM-dd hh:mm:ss'),
                      '解析',
                      sonGroup[k].INFTY,
                      fields[o].FIELD,
                      e
                    )
                    return
                  }
                } else if (
                  fields[o].ZZSHM === 'B' ||
                  fields[o].ZZSHM === 'S' ||
                  fields[o].ZZSHM === 'Z'
                ) {
                  try {
                    if (fields[o].value) {
                      fields[o].value = JSON.parse(values)
                    } else {
                      fields[o].value = ''
                    }
                  } catch (e) {
                    console.error(
                      new Date().Format('yyyy-MM-dd hh:mm:ss'),
                      '解析',
                      sonGroup[k].INFTY,
                      fields[o].FIELD,
                      e
                    )
                    return
                  }
                } else {
                  if (fields[o].value) {
                    fields[o].value = values.toString().replace(/<br\/>/g, '\n')
                    fields[o].ZZBDS = this.regularReplace(fields[o].ZZBDS)
                    // 处理正则表达式
                  } else {
                    if (fields[o].ZZDEF) {
                      fields[o].value = fields[o].ZZDEF
                      fields[o].ZZBDS = this.regularReplace(fields[o].ZZBDS)
                      // 处理正则表达式
                    } else {
                      fields[o].value = ''
                      fields[o].ZZBDS = this.regularReplace(fields[o].ZZBDS)
                      // 处理正则表达式
                    }
                  }
                }
              }
            }
          }
        }
      }

      return group
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取模板数据
     * @update  07/04/2022
     * @returns  {*}
     */
    async getSPHTdate() {
      let params = {
        sapInterface: 'PA058',
        IV_GUID: this.baseParams.GUID,
        IV_PERNR: this.baseParams.PERNR || this.baseParams.employeeNum,
        IV_IPAGE: this.baseParams.MENUII,
        IV_DATUM: new Date().Format('yyyyMMdd'),
        IV_ZACTI: this.baseParams.zaction,

        // 事件编号
        IV_USER: '',

        // 查询员工编号
        IV_STATS: this.baseParams.STAT,
        IV_SUBKEY: this.baseParams.EV_FUNC,
        IV_PARAM: JSON.stringify({
          MENUII: this.baseParams.MENUII,
          SUBKEY: this.baseParams.SUBKEY
        })

        // 决策树
      }
      let res = await this.$httpServer.sap.baseMethod(params)
      let ES_HTDATA = res.ES_HTDATA
      let ET_LSDATA = res.ET_LSDATA
      let ET_FILE = res.ET_FILE
      let ES_MESSAGE = res.ES_MESSAGE

      if (ES_MESSAGE.MSGTY === 'E') {
        this.groupList = []
        return {}
      }

      return {
        ES_HTDATA,
        ET_LSDATA,
        ET_FILE
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 格式化模板变量的初始值
     * @update  07/04/2022
     * @param etgrp
     * @returns {*}
     */
    processDataGrp(etgrp) {
      const assignValue = (fd) => {
        let val

        if (fd.FTYPE === 'D') {
          // 日期类型转换格式
          if (fd.value) {
            fd.value = fd.value !== '00000000' ? fd.value : ''
          } else if (fd.ZZDEF) {
            fd.value = fd.ZZDEF !== '00000000' ? fd.ZZDEF : ''
          } else {
            fd.value = ''
          }
        } else if (fd.ZZSHM === 'D') {
          // 下拉列表转换格式
          if (fd.value) {
            fd.value = JSON.parse(fd.value)
            fd.valueList = [fd.value]
          } else if (fd.ZZDEF) {
            fd.value = JSON.parse(fd.ZZDEF)
            fd.valueList = [fd.value]
          } else {
            fd.value = ''
            fd.valueList = []
          }
        } else if (fd.ZZSHM === 'T') {
          // 树转换格式
          fd.isShow = false
          fd.treeData = []

          try {
            if (fd.value) {
              val = JSON.parse(fd.value)
              fd.value = val.KEY ? val.KEY + '-' + val.VALUE : ''
            } else if (fd.ZZDEF) {
              val = JSON.parse(fd.ZZDEF)
              fd.value = val.KEY ? val.KEY + '-' + val.VALUE : ''
            } else {
              fd.value = ''
            }
          } catch (e) {
            console.error(
              new Date().Format('yyyy-MM-dd hh:mm:ss'),
              '解析',
              fd.INFTY,
              fd.FIELD,
              e
            )
          }
        } else if (fd.ZZSHM === 'B' || fd.ZZSHM === 'S' || fd.ZZSHM === 'Z') {
          try {
            if (fd.value) {
              fd.value = JSON.parse(fd.value)
            } else if (fd.ZZDEF) {
              fd.value = JSON.parse(fd.ZZDEF)
            } else {
              fd.value = ''
            }
          } catch (e) {
            console.error(
              new Date().Format('yyyy-MM-dd hh:mm:ss'),
              '解析',
              fd.INFTY,
              fd.FIELD,
              e
            )
          }
        } else {
          if (fd.value) {
            fd.value = fd.value.toString().replace(/<br\/>/g, '\n')
          } else {
            fd.value = fd.ZZDEF || ''
          }

          if (fd.ZZBDS) {
            fd.ZZBDS = this.regularReplace(fd.ZZBDS)
            // 处理正则表达式
          } else {
            fd.ZZBDS = ''
          }
        }

        return fd
      }

      let group = etgrp
      let valueList
      let models
      /**
       * @Copyright  DELOITTE
       * @description 为多条展示的数据深拷贝FIELD放进models数组，如果有初始值，并把值赋给value字段
       * @Date 2022年04月13日
       * @update  [序号][日期YYYY-MM-DD][更改人姓名][变更描述]
       */

      group = this.$sortInfoList(group, 'SORTD', 'asc')
      group.forEach((i) => {
        i.ACBLK.forEach((j) => {
          j.INFTY.forEach((k) => {
            let modelCount, fieldCount

            try {
              valueList = k.VALUE ? JSON.parse(k.VALUE) : []
            } catch (e) {
              console.error(
                new Date().Format('yyyy-MM-dd hh:mm:ss'),
                '解析',
                k.INFTY,
                k.SUBTY,
                k.VALUE,
                e
              )
              return
            }

            if (k.ZZTAB === 'X') {
              // 显示的多数据 && k.ACTIO != "DIS"
              k.models = []

              if (valueList.length > 0) {
                valueList.forEach(() => k.models.push(this.$deepClone(k.FIELD)))
              } else {
                k.models.push(this.$deepClone(k.FIELD))
              }

              if (valueList.length > 0) {
                for (
                  modelCount = 0;
                  modelCount < k.models.length;
                  modelCount++
                ) {
                  for (
                    fieldCount = 0;
                    fieldCount < k.models[modelCount].length;
                    fieldCount++
                  ) {
                    k.models[modelCount][fieldCount].value =
                      valueList[modelCount][
                        k.models[modelCount][fieldCount].FIELD
                      ] || ''
                  }
                }
              }
            } else if (valueList.length > 0) {
              for (fieldCount = 0; fieldCount < k.FIELD.length; fieldCount++) {
                k.FIELD[fieldCount].value =
                  valueList[0][k.FIELD[fieldCount].FIELD] || ''
              }
            }
          })
        })
      })

      // 遍历分组拿到默认值

      group.forEach((gp) => {
        gp.ACBLK = this.$sortInfoList(gp.ACBLK, 'SORTD', 'asc')
        gp.ACBLK.forEach((j) => {
          j.INFTY = this.$sortInfoList(j.INFTY, 'SORTD', 'asc')
          j.INFTY.forEach((k) => {
            if (
              k.ZZTAB === 'X' &&
              k.ACTIO !== 'DIS' &&
              k.ACTIO !== 'MOD' &&
              k.ACTIO !== 'DEL'
            ) {
              // 显示的多数据
              k.models.forEach((md) => {
                const fields = this.$sortInfoList(md, 'SORTD', 'asc')
                fields.forEach((fd) => {
                  assignValue(fd)
                })
              })
            } else if (
              k.ZZTAB === 'X' &&
              (k.ACTIO === 'DIS' || k.ACTIO === 'MOD' || k.ACTIO === 'DEL')
            ) {
              // 显示的多数据 不需要加 添加删除按钮按钮
              valueList = k.VALUE ? JSON.parse(k.VALUE) : []
              models = k.models
              valueList.forEach((v, o) => {
                models[o] = this.$sortInfoList(models[o], 'SORTD', 'asc')

                for (let l in models[o]) {
                  models[o][l].value = v[models[o][l].FIELD] || ''
                  assignValue(models[o][l])
                }
              })
            } else {
              k.FIELD = this.$sortInfoList(k.FIELD, 'SORTD', 'asc')
              k.FIELD.forEach((n) => {
                assignValue(n)
              })
            }
          })
        })
      })
      return group
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 初始化屏幕字段
     * @update  07/04/2022
     * @returns {*}
     */
    initFileds() {
      let pageCode = this.baseParams.MENUII
      let params = {
        sapInterface: 'PE001',
        IV_ZACTI: '',
        IV_PARAM: JSON.stringify({
          MENUII: pageCode,
          SUBKEY: this.baseParams.SUBKEY
        }),

        // 决策树
        IV_PERNR: this.baseParams.employeeNum,
        IV_USER: '',
        IV_ICTYP: this.baseParams.ICTYP,
        IV_ICNUM: this.baseParams.ICNUM,
        IV_ZXXCJ: this.getZXXCJParams()
      }

      // 合同变更、合同续签 只查询模板不查询值

      if (
        this.baseParams.MENUII === this.pageCode.SPHTBG &&
        this.baseParams.MENUII === this.pageCode.SPHTXQ
      ) {
        params.IV_PERNR = ''
      }

      this.$httpServer.sap.baseMethod(params).then(async (response) => {
        // HACK 1.转正：获取用户的基础信息，判断是否可以转正

        // 如果不可以，弹窗提示

        // 如果可以，渲染表单 并 显示提交按键
        this.groupList = []
        let group = [],
          files = []

        // 附件

        let ES_MESSAGE = response.ES_MESSAGE
        if (ES_MESSAGE.MSGTY === 'E') return
        files = response.ET_FILE
        group = response.ET_GRP
        this.baseParams.zaction = response.EV_ZACTI

        // 获取button

        this.getButton()

        // 多模板数据 比如多个教育信息

        group = this.$sortInfoList(group, 'SORTD', 'asc')

        // 合同变更、合同续签 只查询模板不查询值

        if (
          this.baseParams.MENUII === this.pageCode.SPHTBG ||
          this.baseParams.MENUII === this.pageCode.SPHTXQ
        ) {
          group.forEach((i) => {
            i.ACBLK.forEach((j) => {
              j.INFTY.forEach((k) => {
                if (k.ZZTAB === 'X') {
                  // 显示的多数据 && k.ACTIO != "DIS"
                  const valueList = k.VALUE ? JSON.parse(k.VALUE) : []
                  k.models = []

                  if (valueList.length > 0) {
                    // 多value 多模板
                    valueList.forEach(() =>
                      k.models.push(this.$deepClone(k.FIELD))
                    )
                  } else {
                    k.models.push(this.$deepClone(k.FIELD))
                  }
                }
              })
            })
          })
          let SPHTdata = await this.getSPHTdate()

          // 模板赋值

          group = this.assignmentSP(SPHTdata, group)
          files = SPHTdata.ET_FILE
        } else {
          group = this.processDataGrp(group)
        }

        this.groupList = group

        if (this.groupList.length > 0) {
          let index = 0

          // 找出非隐藏的第一个附件下标

          for (let i in this.groupList) {
            if (this.groupList[i].ZZHID === 'X') {
              index++
            } else {
              break
            }
          }

          // 定位附件

          if (index === this.groupList.length) {
            this.activeCode = 'fileTabSheet'
          } else {
            // 默认加载第一个sheet
            this.activeCode = this.groupList[index].ACGRP
          }
        }
        /**
         * 区分附件 必填和非必填
         * @type {Array}
         */

        this.fileList = []

        // 清空附件

        this.fileListDefinition = []

        // 清空附件自定义

        for (let i in files) {
          if (!files[i].isShowInput) {
            files[i].isShowInput = false
          }

          if (files[i].ZZREQ === 'X') {
            this.fileList.push(files[i])
          } else {
            this.fileListDefinition.push(files[i])
          }
        }

        this.allFileList[0] = this.fileList
        this.allFileList[1] = this.fileListDefinition
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 添加模版
     * @update  07/04/2022
     * @param item
     * @param index
     * @returns {*}
     */
    addModel(item, index) {
      let obj = item
      let models = obj.models

      // 模板多教育经历

      let model = this.$sortInfoList(this.$deepClone(obj.FIELD), 'SORTD', 'asc')

      for (let i in model) {
        if (model[i].ZZBDS) {
          model[i].ZZBDS = new RegExp(this.replaceSpace(model[i].ZZBDS))
          // 处理正则表达式
        }

        // 新增表格数据如果有默认值，设置原本的默认值

        if (model[i].ZZSHM === 'D') {
          // 下拉框
          if (!this.$isEmpty(model[i].ZZDEF)) {
            model[i].value = JSON.parse(model[i].ZZDEF)
            model[i].valueList = []
            model[i].valueList.push(model[i].value)
          } else {
            model[i].value = ''
            model[i].valueList = []
          }
        }
      }

      models.splice(index + 1, 0, model)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 删除模板
     * @update  07/04/2022
     * @param item
     * @param index
     * @returns {*}
     */
    deleteModel(item, index) {
      let models = item.models
      if (models.length <= 1) return this.$message.warning('已经是最后一个')
      models.splice(index, 1)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取页面数据
     * @date 2020年07月20日
     * @returns @returns {[]}
     */
    getData() {
      const group = this.groupList
      const iv_data = []

      for (const i in group) {
        const sonGroup = group[i].ACBLK

        for (const j in sonGroup) {
          const inftyList = sonGroup[j].INFTY

          for (const k in inftyList) {
            const models =
              inftyList[k].ZZTAB === 'X'
                ? inftyList[k].models
                : [inftyList[k].FIELD]
            const objectData = {
              INFTY: inftyList[k].INFTY,
              SUBTY: inftyList[k].SUBTY,
              VALUE: []
            }

            for (let o in models) {
              const obj = {}
              const fields = models[o]

              for (const n in fields) {
                if (fields[n].FTYPE === 'D') {
                  // 日期类型转换格式
                  const df = !isNaN(new Date(fields[n].value).getTime())
                    ? new Date(fields[n].value).Format('yyyyMMdd')
                    : fields[n].value
                  obj[fields[n].FIELD] = this.$isEmpty(fields[n].value)
                    ? ''
                    : df
                } else if (
                  fields[n].ZZSHM === 'D' ||
                  fields[n].ZZSHM === 'Z' ||
                  fields[n].ZZSHM === 'B' ||
                  fields[n].ZZSHM === 'S'
                ) {
                  // 下拉列表转换格式
                  const val = fields[n].value
                    ? JSON.stringify(fields[n].value)
                    : ''
                  obj[fields[n].FIELD] = fields[n].value ? val : ''
                } else if (fields[n].ZZSHM === 'T') {
                  // 树转换格式
                  const value = fields[n].value

                  if (value) {
                    const values = value.split('-')
                    obj[fields[n].FIELD] = JSON.stringify({
                      KEY: value.split('-')[0],
                      VALUE: value.split('-')[values.length - 1]
                    })
                  } else {
                    obj[fields[n].FIELD] = JSON.stringify({
                      KEY: '',
                      VALUE: ''
                    })
                  }
                } else {
                  obj[fields[n].FIELD] = fields[n].value
                    ? fields[n].value.toString().replace(/\n/g, '<br/>')
                    : ''
                }
              }

              objectData.VALUE.push(obj)
            }

            objectData.VALUE = JSON.stringify(objectData.VALUE)
            iv_data.push(objectData)
          }
        }
      }

      return iv_data
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 组装IS_HTDATA
     * @update  `07/04/2022`
     * @returns {*}
     */
    getSPData() {
      const group = this.groupList
      const iv_data = []

      for (const i in group) {
        const sonGroup = group[i].ACBLK

        for (const j in sonGroup) {
          const inftyList = sonGroup[j].INFTY

          for (const k in inftyList) {
            if (inftyList[k].ZZTAB === 'X') {
              const models = inftyList[k].models
              const objectData = {
                INFTY: inftyList[k].INFTY,
                SUBTY: inftyList[k].SUBTY,
                VALUE: []
              }

              for (let o in models) {
                const obj = {}
                const fields = models[o]

                for (const n in fields) {
                  if (fields[n].FTYPE === 'D') {
                    // 日期类型转换格式
                    const df = !isNan(new Date(fields[n].value).getTime())
                      ? new Date(fields[n].value).Format('yyyyMMdd')
                      : fields[n].value
                    obj[fields[n].RFIED] = this.$isEmpty(fields[n].value)
                      ? ''
                      : df
                  } else if (
                    fields[n].ZZSHM === 'D' ||
                    fields[n].ZZSHM === 'Z' ||
                    fields[n].ZZSHM === 'B' ||
                    fields[n].ZZSHM === 'S'
                  ) {
                    // 下拉列表转换格式
                    obj[fields[n].RFIED] = (fields[n].value || {}).KEY || ''
                  } else if (fields[n].ZZSHM === 'T') {
                    // 树转换格式
                    const value = fields[n].value

                    if (value) {
                      obj[fields[n].RFIED] = value.split('-')[0]
                    } else {
                      obj[fields[n].RFIED] = ''
                    }
                  } else {
                    obj[fields[n].RFIED] = fields[n].value
                      ? fields[n].value.toString().replace(/\n/g, '<br/>')
                      : ''
                  }
                }

                objectData.VALUE.push(obj)
              }

              objectData.VALUE = JSON.stringify(objectData.VALUE)

              // 装换数据

              iv_data.push(objectData)
            } else {
              const objectData = {
                INFTY: inftyList[k].INFTY,
                SUBTY: inftyList[k].SUBTY,
                VALUE: []
              }
              const obj = {}
              const fields = inftyList[k].FIELD

              for (const n in fields) {
                if (fields[n].FTYPE === 'D') {
                  // 日期类型转换格式
                  const df = !isNaN(new Date(fields[n].value).getTime())
                    ? new Date(fields[n].value).Format('yyyyMMdd')
                    : fields[n].value
                  obj[fields[n].RFIED] = this.$isEmpty(fields[n].value)
                    ? ''
                    : df
                } else if (
                  fields[n].ZZSHM === 'D' ||
                  fields[n].ZZSHM === 'Z' ||
                  fields[n].ZZSHM === 'B' ||
                  fields[n].ZZSHM === 'S'
                ) {
                  // 下拉列表转换格式
                  obj[fields[n].RFIED] = (fields[n].value || {}).KEY || ''
                } else if (fields[n].ZZSHM === 'T') {
                  // 树转换格式
                  const value = fields[n].value

                  if (value) {
                    obj[fields[n].RFIED] = value.split('-')[0]
                  } else {
                    obj[fields[n].RFIED] = ''
                  }
                } else {
                  obj[fields[n].RFIED] = fields[n].value
                    ? fields[n].value.replace(/\n/g, '<br/>')
                    : ''
                }
              }

              objectData.VALUE.push(obj)
              objectData.VALUE = JSON.stringify(objectData.VALUE)

              // 装换数据

              iv_data.push(objectData)
            }
          }
        }
      }

      let objs = {}
      let data = iv_data

      for (let i in data) {
        let v1 = data[i]

        if (v1 && v1.VALUE) {
          let v1_v = JSON.parse(v1.VALUE)

          for (let ii in v1_v) {
            for (let iii in v1_v[ii]) {
              if (objs[iii]) {
                // 有重复数据
                console.error('重复的字段' + iii + JSON.stringify(v1))
              } else {
                objs[iii] = v1_v[ii][iii]
              }
            }
          }
        }
      }

      return objs
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传成功钩子函数
     * @date 2020年07月20日
     * @returns {[]}
     */
    handleSuccess(res, file, fileItem, fileList) {
      if (fileList.length > 1) {
        if (!fileList.every((el) => el.status === 'success')) {
          return
        }
      }

      fileList.forEach((response) => {
        if ('ATTNN' in response) {
          return
        }

        if (response.status === 'success') {
          let result = response.response
          let fileobject = {
            // FILEID: result.id,

            // 文件ID,20210518:id超出sap表字段长，改为空，由sap自增长
            ATTNN: result.name,

            // 文件名称
            ATTDL: result.id,

            // 文件下载地址
            ATTUP: result.previewUrl,

            // 文件预览地址
            FILEEXT: result.type,

            // 附件类型
            FILESIZE: result.size

            // 文件大小
          }
          fileItem.DEL_FLG = ''

          // 删除标记设置为空

          /**
           * ZATTT 140 为一寸照片  一寸照片只能上传一张
           */

          if (fileItem.ZATTT === '140') {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file.raw)

            fileReader.onload = function (e) {
              fileItem.BASE64 = e.target.result
            }

            fileItem.ZACFILE = [fileobject]
          } else {
            fileItem.ZACFILE.push(fileobject)
          }
        } else {
          this.$message.error('上传文件错误，请重新上传')
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传前的钩子函数
     * @date 2020年07月20日
     * @param file
     * @param fileObject
     * @returns {ElMessageComponent}
     */
    handleBefore(file, fileObject) {
      let fileType = [
        'xlsx',
        'docx',
        'txt',
        'pdf',
        'zip',
        'rar',
        'jpg',
        'jpeg',
        'gif',
        'bmp',
        'png',
        'xls',
        'doc',
        'pptx',
        'ppt'
      ]
      let postf = file.name
        .substring(file.name.lastIndexOf('.') + 1)
        .toLowerCase()

      if (fileType.indexOf(postf) === -1) {
        this.$message.warning(
          '请选择正确的文件类型，如：' +
            'xlsx, docx, txt, pdf, zip, rar, jpg, jpeg, gif, bmp, png, xls, doc, pptx, ppt'
        )
        return false
      }

      if (fileObject.ZACFILE.length >= 5) {
        this.$message.warning('最多只能上传五个附件')
        return false
      }

      if (
        fileObject.ZATTT === '140' &&
        postf !== 'png' &&
        postf !== 'jpg' &&
        postf !== 'jpeg'
      ) {
        this.$message.warning('寸彩色免冠照片格式应为' + ' .png,.jpg,.jpeg')
        return false
      }

      if (fileObject.ZATTT === '140' && file.size > 5242880) {
        this.$message.warning('寸彩色免冠照片不能大于5M')
        return false
      }

      // 不能大于5M

      if (file.size > 5242880) {
        this.$message.warning('单个附件不能大于5M')
        return false
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件上传失败的钩子函数
     * @date 2020年07月20日
     * @param error
     * @param file
     */
    handleError(error, file) {
      this.$message.error('上传' + file.name + '出现错误，请重新上传')
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 文件超出提示
     * @update  07/04/2022
     */
    handleFileExceed(file, fileList) {
      this.$message.warning('最多支持5个文件')
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 新增附件
     * @update  07/04/2022
     * @returns {*}
     */
    addFile() {
      let file = {
        isShowInput: false,
        ZACTI: this.baseParams.zaction,
        ZATTT: 'K' + (this.fileListDefinition.length + 1),
        ZATTN: '',
        ZZREQ: '',
        ZTYPE: 'U',
        SORTID: '1000',
        ATTNN: '',
        ATTUP: '',
        ATTDL: '',
        ZACFILE: []
      }
      this.fileListDefinition.push(file)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 删除附件
     * @update  07/04/2022
     * @param file
     * @param index
     * @returns {*}
     */
    deleteFile(file, index) {
      file.ZACFILE.splice(index, 1)
      if (file.ZATTT === '140') this.photoBase64 = ''
      // 清空头像
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 删除自定义附件
     * @update  07/04/2022
     * @param fileList
     * @param index
     * @returns {*}
     */
    deleteFileModel(fileList, index) {
      fileList.splice(index, 1)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取操作按钮
     * @date 2020年07月20日
     */
    getButton() {
      this.buttonDataList = []
      let param = {
        sapInterface: 'PE053',
        IV_MENUID: this.baseParams.MENUII,
        IV_SUBKEY: this.baseParams.EV_FUNC,
        IV_STATS: this.baseParams.STAT,
        IV_GUID: this.baseParams.GUID,
        IV_USER: ''
      }
      this.$httpServer.sap.baseMethod(param).then((response) => {
        // HACK 2.转正：获取BUTTONS
        let et_funcodes = response.ET_FUNCODES

        if (et_funcodes && et_funcodes.length > 0) {
          et_funcodes = this.$sortInfoList(et_funcodes, 'SORTID', 'asc')
          this.buttonDataList = et_funcodes
        } else {
          if (
            this.baseParams.MENUII === this.pageCode.PALGGLSP &&
            this.baseParams.STAT === 'G'
          ) {
            this.buttonDataList = [
              {
                ACTIO: '',
                COLOR: 'success',
                FCODE: 'SAV',
                FNAME: '提交',
                FTATS: '7',
                FUNC: 'LG1',
                SORTID: '10',
                STATS: '7',
                ZTYPE: 'ZLGGLSP',
                ZWFNO: ''
              }
            ]
          } else {
            this.buttonDataList = []
          }
        }

        this.$emit('setButtons', this.buttonDataList)
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 按钮操作
     * @date 2020年07月20日
     * @param params button 参数
     */
    async doButtonAction(params) {
      // HACK 3.转正：提交转正
      if (this.verificationList.length > 0) {
        let errorData = this.verificationList[0]
        let message =
          '请正确填写' +
          errorData['groupText'] +
          '-' +
          errorData['infoTypeText'] +
          '中的' +
          '【' +
          errorData['fieldText'] +
          '】字段'
        this.$message.error(message)
        return
      }

      if (params.FCODE === 'SEE') {
        // 审批
        this.seeProcess(params)
      } else {
        let CURRENT_USER_INFO = JSON.parse(
          localStorage.getItem('CURRENT_USER_INFO')
        )
        let WERKS = CURRENT_USER_INFO.WERKS

        if (WERKS) {
          // 以EF开头的 确认离职 按钮需要调用电子签章接口
          let startStr = WERKS.substr(0, 2)

          if (
            'EF' === startStr &&
            '5' === params.STATS &&
            'ZLZGL' === params.ZTYPE &&
            'SUB' === params.FCODE &&
            '20' === params.SORTID
          ) {
            await this.leftToProveEsignServer(params)
          } else {
            // HACK 4.转正：提交保存数据
            await this.saveData(params)
          }
        } else {
          await this.saveData(params)
        }
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 保存数据
     * @date 2020年07月20日
     * @param params button 参数
     */
    async saveData(params) {
      // HACK 5.转正：提交保存数据
      let pageCode = this.baseParams.MENUII
      let files = this.fileList.concat(this.fileListDefinition)
      let photoBase64 = this.getPhotoBase64(files) || this.photoBase64
      let sapInterface = ''

      if (this.baseParams.MENUII === this.pageCode.YRZGL) {
        sapInterface = params.FCODE === 'SED' ? 'PE111' : 'PE065'
      } else if (
        this.baseParams.MENUII === this.pageCode.PAFGGL ||
        this.baseParams.MENUII === this.pageCode.PALGGL ||
        this.baseParams.MENUII === this.pageCode.PAJDDGL
      ) {
        // 降档管理 离岗，返岗
        sapInterface = 'PA045'
      } else {
        sapInterface = 'PE002'
      }

      let saveParams = {
        sapInterface: sapInterface,
        IV_USER: '',

        // 查询员工编号
        IV_PERNR: this.baseParams.employeeNum,

        // 查询员工编号
        IV_ZACTI: this.baseParams.zaction,

        // 事件编号
        IV_GUID: this.baseParams.GUID,
        IV_STATS: params.FTATS,
        IV_IPAGE: pageCode,
        IV_DATA: JSON.stringify(this.getData()),

        // 页面数据
        IV_URL: '',
        IV_SUBKEY: this.baseParams.SUBKEY,
        IV_PHOTO: photoBase64,
        IV_FUNC: params.FUNC,
        IV_FCODE: params.FCODE,
        IT_FILE: JSON.stringify(files),
        IV_ZXXCJ: '',
        IV_REHIRE: this.baseParams.REHIRE,
        IV_IGNORE_ERROR: params.IV_IGNORE_ERROR
      }

      if (this.pageCode.PALGGLSP === this.$route.query.MENUII) {
        // 轮岗保存接口
        saveParams.sapInterface = 'PE098'
      }

      await this.$httpServer.sap
        .baseMethod(saveParams)
        .then(async (response) => {
          let es_message = response.ES_MESSAGE

          // 保存操作日志

          let role = localStorage.getItem('role')
          this.$commitLog({
            parentModuleCode: role === 'HR' ? 'HOME_HR' : 'HOME_INDEX',
            moduleName: localStorage.getItem('currentPageText'),
            moduleCode: this.baseParams.MENUII,
            subModule: params.FCODE,
            subModuleName: params.FNAME,
            describe:
              params.FNAME +
              '了' +
              localStorage.getItem('currentPageText') +
              this.baseParams.employeeNum +
              '的数据',
            viewPernr: this.baseParams.employeeNum
          })

          if (es_message.MSGTY === 'S') {
            if (this.approveBaseParams) {
              return true
            }

            if (pageCode === this.pageCode.OFGL && params.FCODE === 'SEND') {
              // 获取offer模版的数据
              this.getOfferTemplateData()
            } else if (
              (pageCode === this.pageCode.RCKGL && params.FCODE === 'NOT') ||
              (pageCode === this.pageCode.PARZGL && params.FCODE === 'RETN')
            ) {
              // 信息审核不通过
              this.sendMessage(response)
            } else if (
              pageCode === this.pageCode.PAHTGLJT &&
              params.FCODE === 'PRIN'
            ) {
              this.getTemplateDataDownloadWord('10')
              this.backing()
            } else if (
              pageCode === this.pageCode.PAHTGLJT &&
              params.FCODE === 'DZQZ'
            ) {
              this.startSign('10')
            } else {
              this.$message.success(es_message.MSGTX || '操作成功！')
              let workflowId = response.E_ZWFNO

              // 获取流程编码

              let workflowSubject = response.EV_TITLE

              // 获取流程主题

              let applyName = response.EV_ENAME
              this.baseParams.GUID = response.EV_GUID

              // GUID

              if (params.ACTIO === 'K' && !this.$isEmpty(workflowId)) {
                // HACK 6.转正： 发起流程
                this.$startWorkFlow({
                  guid: this.baseParams.GUID,
                  processType: workflowId,
                  workflowSubject: workflowSubject,
                  pernr: this.baseParams.employeeNum,
                  ename:
                    applyName ||
                    this.baseParams.ENAME ||
                    this.baseParams.employeeNum
                }).then(() => this.backing())
              } else if (params.ACTIO === 'K' && this.$isEmpty(workflowId)) {
                this.backing()
              } else if (params.ACTIO === 'E') {
                this.backing()
              } else {
                // 合同变更、合同续签
                if (
                  this.baseParams.MENUII === this.pageCode.SPHTXQ ||
                  this.baseParams.MENUII === this.pageCode.SPHTBG
                ) {
                  this.backing()
                } else {
                  this.getAcData()
                  // 保存之后读取数据
                }
              }
            }
          } else if (es_message.MSGTY === 'C') {
            this.$confirm(es_message.MSGTX, '提示', {
              type: 'warning',
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              confirmButtonClass: 'confirmButtonClass',
              dangerouslyUseHTMLString: true,
              closeOnClickModal: false,
              center: true
            }).then(() => {
              params.IV_IGNORE_ERROR = 'X'
              this.saveData(params)
            })
          }
        })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 查看流程
     * @date 2020年07月20日
     * @param params
     * @returns {string | ArrayBuffer}
     */
    seeProcess(params) {
      let processCode = params.ZWFNO

      // 流程processCode

      this.$openWorkflowPage(this.baseParams.GUID, processCode, 'ViewUrl')
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取offer模版数据
     * @date 2020年07月20日
     */
    getOfferTemplateData() {
      let params = {
        I_GUID: this.baseParams.GUID,
        I_USER: '',
        I_FLAG: 'Y',
        sapInterface: 'RC037'
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let message = response.E_MESSAGE

        if (message.MSGTY === 'S') {
          let e_output = response.E_OUTPUT
          this.createOffer(e_output)
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 获取头像base64
     * @date 2020年07月20日
     * @param fileList 附件集合
     * @returns {string | ArrayBuffer}
     */
    getPhotoBase64(fileList) {
      for (let i in fileList) {
        if (fileList[i].ZATTT === '140') {
          let base64 = fileList[i].BASE64
          fileList[i].BASE64 = ''
          this.photoBase64 = base64 ? base64 : this.photoBase64
          return base64
        }
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 关闭 dialog
     * @update  07/04/2022
     * @param done
     * @returns {*}
     */
    handleClose(done) {
      this.dialogVisible = false
      this.showDialog = ''
      done && done()
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 创建offer
     * @date 2020年07月20日
     * @param offerData offer数据
     */
    async createOffer(offerData) {
      if (offerData) {
        let params = {}

        // 组装offer 模版参数 start

        let bdrq =
          offerData.ZZHR_BDRQ && offerData.ZZHR_BDRQ !== '00000000'
            ? new Date(
                offerData.ZZHR_BDRQ.replace(
                  /^(\d{4})(\d{2})(\d{2})$/,
                  '$1-$2-$3'
                )
              ).Format('yyyy年MM月dd日')
            : ''
        params.ENAME = offerData.ENAME

        // 姓名

        params.pdfDate = new Date().Format('yyyy年MM月dd日')
        params.pdfdate = new Date().Format('yyyy年MM月dd日')

        // 保留 BK === 'SP'

        params.docxname = offerData.ZOFTYPE + '.docx'
        params.xmlname = offerData.ZOFTYPE + '.xml'
        params.outputDocxFileName =
          '录用通知函' + '(' + offerData.ENAME + ').doc'
        params.BRANCH = offerData.ZYPDW

        // 子公司名称

        params.BM = offerData.ZPBM

        // 部门

        params.GW = offerData.ZPGW

        // 岗位

        params.MBQX = offerData.ZZMBQX

        // 目标全薪

        params.BDRQ = bdrq

        // 报到日期

        params.BDSJ = ''

        // 报到时间-

        params.GDXC = offerData.ZZMBQX

        // (年) 固定薪酬-

        params.YGDXC = offerData.ZZJBYX

        // 月固定薪酬 月度基本工资

        params.JXJJ = offerData.ZZSPJXJJ

        // 绩效奖金

        params.NCBJXJJ = offerData.ZZHRSPNCB

        // 年储备绩效奖金

        params.YCBJXJJ = offerData.ZZHRSPYCB

        // 月储备绩效奖金

        params.ZZHR_LXR = offerData.ZZHR_LXR

        // 联系人

        params.ZZHR_LXDH = offerData.ZZHR_LXDH

        // 联系电话

        params.ZZHR_BDDZ = offerData.ZZHR_BDDZ

        // 报道地址

        params.ZZHR_LXYX = offerData.ZHREMAIL

        // 联系邮箱

        params.ZPGS = offerData.ZPGS

        // 招聘公司

        params.BDRQ_N = this.$formatDate(offerData.ZZHR_BDRQ, 'Y')

        // 报到日期年

        params.BDRQ_Y = this.$formatDate(offerData.ZZHR_BDRQ, 'M')

        // 报到日期月

        params.BDRQ_R = this.$formatDate(offerData.ZZHR_BDRQ, 'D')

        // 报到日期日

        params.ZZZD = offerData.ZZZDT
        // 员工职等文本

        // 组装offer 模版参数 end

        this.$httpServer.base.convertOfferDocx(params).then((res) => {
          this.openOfferPage(res.data, offerData)
        })
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 打开offer页面
     * @date 2020年07月20日
     * @param offerFile offer文件
     * @param param
     */
    openOfferPage(offerFile, param) {
      this.dialogVisible = true
      this.dialogTitle = '发送Offer'
      this.showDialog = 'offer'
      this.parentData.offerData = param
      this.parentData.offerData.SUBKEY = this.baseParams.SUBKEY
      this.parentData.offerData.STAT = this.baseParams.STAT
      this.parentData.offerData = param
      this.parentData.offerData.pageCode = this.baseParams.MENUII
      this.parentData.offerFile = offerFile
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 初始化函数
     * @date 2020年07月20日
     * @returns {*}
     * @param employeeNum 员工编号
     */
    initFunction(employeeNum) {
      // start==========清空上一个表单的主要信息
      this.baseParams.STAT = ''
      this.baseParams.GUID = ''

      // end============清空上一个表单的主要信息

      let baseParams = this.approveBaseParams || this.$route.query

      if (baseParams) {
        // base64解密

        // 新建获取按钮的时候用到
        baseParams.EV_FUNC = baseParams.FUNC
        baseParams.ICNUM = baseParams.ICNUM
          ? Base64.decode(baseParams.ICNUM)
          : ''
        this.baseParams = baseParams
        employeeNum = baseParams.PERNR ? baseParams.PERNR : employeeNum

        // 重入职的时候需要传人员编号

        if (!this.$isEmpty(baseParams.GUID)) {
          // 修改

          // 合同变更、合同续签 只查询模板不查询值
          if (
            this.baseParams.MENUII === this.pageCode.SPHTBG ||
            this.baseParams.MENUII === this.pageCode.SPHTXQ
          ) {
            this.initFileds()
          } else {
            this.getAcData()
          }
        } else if (!this.$isEmpty(employeeNum)) {
          // 赋值新的员工编号
          this.baseParams.employeeNum = employeeNum

          // 新建

          this.initFileds()
        } else if (this.baseParams.MENUII === this.pageCode.WDGZ) {
          this.getPersonnelBaseData()
          this.initFileds()
        } else if (baseParams.MENUII === this.pageCode.WYLZ) {
          this.baseParams.employeeNum = this.currentUserInfo.PERNR

          // 获取当前员工是否有未完成的的事件记录 GUID

          let param = {
            IV_PERNR: this.baseParams.employeeNum,
            sapInterface: 'PE008'
          }
          this.$httpServer.sap.baseMethod(param).then((response) => {
            this.baseParams.GUID = response.EV_GUID
            this.baseParams.STAT = response.EV_STAT

            if (this.$isEmpty(this.baseParams.GUID)) {
              this.getPersonnelBaseData()
              this.initFileds()
            } else {
              this.getAcData()
            }
          })
        } else if (
          baseParams.MENUII === this.pageCode.PARZGL ||
          baseParams.MENUII === this.pageCode.PASXRZ ||
          baseParams.MENUII === this.pageCode.LYGL ||
          baseParams.MENUII === this.pageCode.YRZGL ||
          baseParams.MENUII === this.pageCode.OFGL ||
          baseParams.MENUII === this.pageCode.RCKGL
        ) {
          // 入职前的事件不需要人员搜索
          this.initFileds()
        } else {
          this.isShowSearch = true
        }
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 权限
     * @date 2021年05月24日
     */
    getHusbandry() {
      let params = {
        sapInterface: '00046',
        IV_PERNR: this.baseParams.employeeNum,
        IV_DATUM: new Date().Format('yyyyMMdd'),
        IV_LANGU: 'ZH'
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let et_data = response.ES_BASICINFO
        this.ZPTYPE_SP = et_data.ZPTYPE_SP
        this.ZPTYPE_SP === '02' && this.enclosure()
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 附件查询
     * @date 2021年05月25日
     */
    enclosure() {
      let params = {
        sapInterface: 'PE089',
        IV_USER: this.headerDataList[0].FIELV,
        IV_PAGEID: this.baseParams.MENUII
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        this.husFileList = response.ET_FILELIST
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 附件下载
     * @date 2021年05月25日
     * @param guid
     * @param name
     * @param type 模版类型
     */
    async upHusFile(guid, name, type) {
      window.location.href = 'dhrCoreService/positive/downfile?fileGuId=' + guid
      return false
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 开始签约
     * @update  07/04/2022
     * @param type 类型
     * @returns {*}
     */
    startSign(type) {
      let params = {
        sapInterface: 'PE000',
        IV_GUID: this.baseParams.GUID,
        IV_TYPE: type,
        IV_USER: ''
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let et_data = response.ES_DATA
        let es_message = response.ES_MESSAGE

        if (es_message['MSGTY'] === 'S') {
          this.startTignFlow(this.assemblyWordTemplateParams(et_data))
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 发起签约流程
     * @update  07/04/2022
     * @param params
     * @returns {*}
     */
    startTignFlow(params) {
      this.$httpServer.file
        .startTignFlow({ ...params, guId: this.baseParams.GUID })
        .then((response) => {
          this.signUrl = response.data.signUrl
          this.signVisible = true
          this.$nextTick(() => {
            new QRCode('qrcode').makeCode(this.signUrl)
          })
        })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 关闭签约窗口
     * @update  07/04/2022
     * @returns {*}
     */
    signClose() {
      this.signVisible = false
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 签署完成
     * @update  07/04/2022
     * @returns {*}
     */
    async signFile() {
      try {
        let params = {}
        params.IV_GUID = this.baseParams.GUID
        params.IV_STATUS = 'H'
        params.sapInterface = 'DZ002'
        const res = await this.$httpServer.sap.baseMethod(params)
        let ES_MESSAGE = res.ES_MESSAGE

        if (ES_MESSAGE.MSGTY === 'S') {
          // 成功
          this.$message.success(ES_MESSAGE.MSGTX)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.signVisible = false
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 下载word 获取模版数据
     * @date 2020年07月20日
     * @param type 模版类型
     */
    getTemplateDataDownloadWord(type) {
      let params = {
        sapInterface: 'PE000',
        IV_GUID: this.baseParams.GUID,
        IV_TYPE: type,
        IV_USER: ''
      }
      this.$httpServer.sap.baseMethod(params).then((response) => {
        let et_data = response.ES_DATA
        let es_message = response.ES_MESSAGE

        if (es_message['MSGTY'] === 'S') {
          this.downloadWord(this.assemblyWordTemplateParams(et_data))
        }
      })
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 下载word
     * @date 2020年07月20日
     * @param params 模版参数
     */
    downloadWord(params) {
      this.$httpServer.file.downloadCommonTemplate(params)
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 组装word模版参数
     * @date 2020年07月20日
     * @param data 模版参数
     */
    assemblyWordTemplateParams(data) {
      let params = {}
      data.YRDWLXR = '孙丽娜'

      // 联系人

      data.ZJSGZ = '200000'

      // 计时工资

      data.YFSYQGZ = '600000'

      // 试用期工资

      params.templateName = 'ldhtmb_group.ftl'
      params.fileName =
        '劳动合同模版' + new Date().Format('yyyy-MM-dd') + '.doc'
      params.wordParams = data
      return params
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 发送消息
     * @date 2020年07月20日
     * @param params
     */
    sendMessage(params) {
      if (params) {
        this.showDialog = 'message'
        this.dialogVisible = true
        this.dialogTitle = '发送邮件'
        this.parentData = {
          link: params.EV_APPLICATION_URL,
          emailAddress: params.EV_EMAIL,
          personnnName: params.EV_ENAME,
          guid: this.baseParams.GUID,
          pageCode: this.baseParams.MENUII
        }
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 正则表达式替换
     * @date 2020年07月20日
     * @param regular
     */
    regularReplace(regular) {
      if (regular) {
        return new RegExp(
          (typeof regular == 'object' ? regular.source : regular).replace(
            /\s/g,
            ''
          )
        )
      } else {
        return ''
      }
    },

    /**
     * @Copyright  DELOITTE
     * @Description: 离职证明申请 - 确认离职
     * @update  07/04/2022
     * @param params
     * @returns {*}
     */
    async leftToProveEsignServer(params) {
      try {
        let iputParams = {
          guId: this.baseParams.GUID,
          pernr: this.baseParams.employeeNum
        }
        await this.$httpServer.base.leftToProveEsignServer(iputParams)
        this.saveData(params)
      } catch (error) {
        console.log(error)
      }
    }
  },

  mounted() {
    this.initFunction()
  }
}
</script>

<style lang="less" scoped>
#qrcode {
  /deep/ img {
    margin: auto;
  }
}

h4 {
  font-size: larger;
}

.infoType-content-box {
  padding: 5px 10px 5px 10px;

  ::v-deep .width90 {
    width: 90%;
    min-width: 90%;
    max-width: 90%;
  }

  ::v-deep .width95 {
    width: 95%;
    min-width: 95%;
    max-width: 95%;
  }

  ::v-deep .width97-5 {
    width: 97.5%;
    min-width: 97.5%;
    max-width: 97.5%;
  }

  ::v-deep .width97 {
    width: 97%;
    min-width: 97%;
    max-width: 97%;
  }

  ::v-deep .width98-5 {
    width: 98.5%;
    min-width: 98.5%;
    max-width: 98.5%;
  }

  ::v-deep .pa-model-tree {
    width: 90%;
    top: 29px;
    left: 0px;
    z-index: 1000;
    border-radius: 4px;
    border: 1px solid #ececec;
    background-color: #fff;
    position: absolute;
    overflow: auto;
    max-height: 300px;
  }
}

.add-button-event-box {
  padding-bottom: 5px;
  text-align: right;
  width: 97.5%;
}

.add-button-event-box .el-button--mini,
.el-button--mini.is-round {
  padding: 5px 10px;
}

.file-item-border-box {
  float: left;
  background-color: #fbfdff;
  border: 1px dashed #9e9e9efc;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 180px;
  vertical-align: top;
  margin: 10px;
  padding: 5px;
  width: calc(20% - 22px);
  overflow-y: auto;
}

.upload-file-img-box {
  text-align: center;
  padding-top: 12px;
}

.upload-file-img-box img {
  height: 30px;
}

.file-down-box {
  color: #009fdf;
  padding: 2px;
  cursor: pointer;
}

.pa-file-text {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-down-operation-box {
  font-size: 14px;
  color: #009fdf;
  cursor: pointer;
  text-align: right;
}

.file-down-operation-box .el-icon-delete {
  color: #ff0000;
  margin-left: 10px;
  margin-right: 5px;
}

.file-item-border-box.add-file-box {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-item-border-box.add-file-box .upload-file-img-box {
  padding: 0;
  cursor: pointer;
}

.delete-span {
  text-align: right;
  margin-left: 202px;
  /*margin-top: -14px;*/
}

.infoType-content-box .field-height {
  height: 66px;
}

/deep/ .pa-form-tabs .el-tabs__content {
  overflow: visible !important;
}

.husBox {
  padding: 10px;
  display: inline-block;
  text-align: center;
}

.husWord {
  span {
    background-image: url('../../../assets/image/icon-word.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 122px 79px;
    width: 122px;
    height: 79px;
    display: inline-block;
  }
}

.husExcel {
  span {
    background-image: url('../../../assets/image/icon-excel.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 116px 73px;
    width: 116px;
    height: 73px;
    display: inline-block;
  }
}

.husPPT {
  span {
    background-image: url('../../../assets/image/icon-ppt.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 118px 72px;
    width: 118px;
    height: 72px;
    display: inline-block;
  }
}

.tipsExplain {
  p {
    line-height: 23px;
  }
}
</style>
