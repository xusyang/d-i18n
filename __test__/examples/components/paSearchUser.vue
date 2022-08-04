<template>
  <div>
    <el-select
      size="mini"
      :style="{ width: width ? width : '100%' }"
      ref="headerSearchSelect"
      v-model="myValue"
      :remote-method="searchUsering"
      filterable
      remote
      placeholder="请输入员工姓名或工号进行查找"
      popper-class="pa-header-search-user-select"
      :disabled="disabled"
      :loading="loading"
      :loading-text="'加载中......'"
      :no-data-text="noDataText"
      @keyup.enter.native="searchUser"
      value-key="employeeNum"
      :clearable="true"
      @change="() => $emit('changed', myValue)"
    >
      <el-option
        v-for="item in personnelDataList"
        :key="item.employeeNum"
        :value="item"
        :label="item.employeeName"
        style="overflow: visible; margin: 5px"
      >
        <el-row>
          <el-col class="el-col-md-2" style="height: 32px; margin-right: 25px; margin-top: -2px; width: 10px">
            <img
              src="../../../assets/image/user_male_l.png"
              alt=""
              v-if="item.photo === ''"
              class="search-image img-circle"
            />
            <img :src="'data:image/png;base64,' + item.photo" class="search-image img-circle" alt="" v-else />
          </el-col>
          <el-col class="el-col-md-20">
            {{ item.employeeName }} | {{ item.employeeNum }} | {{ item.email }} | {{ item.company }}
          </el-col>
        </el-row>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "paSearchUser",
  props: {
    defaultValue: {
      type: String,
      default: () => {
        return ""
      },
    },
    ipage: "",
    cheAuth: "", //Z 是不检查权限
    all: "",
    disabled: { type: Boolean },
    width: { type: String },
    resign: { type: String }, //X 是排除离职人员
  },
  data() {
    return {
      loading: false,
      myValue: "",
      personnelDataList: [],
      operationWidth: 0,
      noDataText: "",
      searchKey: "",
    }
  },
  mounted() {
    setTimeout(() => {
      this.myValue = this.defaultValue
    }, 500)
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 输入后按回车查找员工
     * @update  08/04/2022
     * @returns {*}
     */
    searchUsering() {
      this.noDataText = "输入后按回车查找员工"
    },
    /**
     * @Copyright  DELOITTE
     * @description el-autocomplete 组件用
     * @Date 2020年08月03日
     *
     * @param searchKey key
     * @param cb callBack
     */
    handleSearchUser(searchKey, cb) {
      let reg = /[\u4E00-\u9FFF]+/g
      if (!reg.test(searchKey)) {
        if (searchKey.length < 5) {
          this.noDataText = "请输入精准查询条件"
          return []
        }
      } else if (searchKey.length < 2) {
        this.noDataText = "请输入精准查询条件"
        return []
      }
      let params = {
        searchKey: searchKey,
        ipage: this.ipage,
        cheAuth: this.cheAuth,
        all: this.all,
        pageno: "",
        lines: "",
        resign: this.resign,
      }
      this.$httpServer.base
        .userSearch(params)
        .then((response) => {
          let resultData = response.data
          if (resultData && resultData.length > 0) {
            let personnelDataList = []
            resultData.forEach(item => {
              personnelDataList.push({
                photo: item.photo,
                employeeName: item.employeeName,
                employeeNum: item.employeeNum,
                email: item.email,
                company: item.company,
              })
            })
            cb(personnelDataList)
          } else {
            this.noDataText = "暂无数据"
            cb([])
          }
        })
        .catch(() => (this.noDataText = "暂无数据"))
    },
    /**
     * @Copyright  DELOITTE
     * @description el-select 组件用
     * @Date 2020年08月03日
     *
     * @param e key
     */
    searchUser(e) {
      this.searchKey = e.target.value
      let reg = /[\u4E00-\u9FFF]+/g
      if (!reg.test(this.searchKey)) {
        if (this.searchKey.length < 5) {
          this.noDataText = "请输入精准查询条件"
          return []
        }
      } else if (this.searchKey.length < 2) {
        this.noDataText = "请输入精准查询条件"
        return []
      }
      let params = {
        searchKey: this.searchKey,
        ipage: this.ipage,
        cheAuth: this.cheAuth,
        all: this.all,
        pageno: "",
        lines: "",
        resign: this.resign,
      }
      this.$httpServer.base
        .userSearch(params)
        .then(res => {
          const response = res.data
          if (response && response.length > 0) {
            this.personnelDataList = []
            response.forEach(item => {
              this.personnelDataList.push({
                photo: item.photo,
                employeeName: item.employeeName,
                employeeNum: item.employeeNum,
                email: item.email,
                company: item.company,
              })
            })
          } else {
            this.noDataText = "暂无数据"
            this.personnelDataList = []
          }
        })
    },
    /**
     * @Copyright DELOITTE
     * @Description: 选中
     * @update  08/04/2022
     * @param value key
     */
    handleSelect(value) {
      this.myValue = value.employeeName
      this.$emit("getEmployeeData", value)
    },
    /**
     * @Copyright DELOITTE
     * @Description: 提供给父组件调用，比如重置form表单的时候
     * @update  08/04/2022
     * @returns {*}
     */
    emptMyValue() {
      this.myValue = ""
    },
  },
  watch: {
    /**
     * @Copyright DELOITTE
     * @Description: 清空父组件的value
     * @update  08/04/2022
     * @returns {*}
     */
    myValue() {
      if (this.$isEmpty(this.myValue)) {
        this.$emit("emptValue")
      } else if (typeof this.myValue === "object") {
        //赋值给父组件
        this.$emit("getEmployeeData", this.myValue)
      }
    },
    /**
     * @Copyright DELOITTE
     * @Description: 初始化默认值
     * @update  08/04/2022
     * @returns {*}
     */
    defaultValue() {
      this.myValue = this.defaultValue
    },
  },
}
</script>

<style scoped>
.pa-header-search-user-select .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #009fdf;
  color: #ffffff;
  border-radius: 4px;
}

.pa-header-search-user-select .el-select-dropdown__item.selected {
  background-color: #009fdf !important;
  color: #ffffff !important;
  font-weight: 700;
}

.el-select-dropdown__item {
  padding: 5px 5px;
  line-height: 27px;
  border-radius: 4px;
}

.search-image {
  width: 28px;
  height: 28px;
  line-height: 28px;
}
</style>
