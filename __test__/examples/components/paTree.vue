<template>
  <div>
    <el-input
      size="mini"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      v-if="fieldItem.ZKJLX === 'SER'"
    ></el-input>
    <el-tree
      :data="newTreeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="id"
      ref="tree"
      :render-content="renderContent"
      :filter-node-method="filterNode"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "paTree",
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      },
    },
    width: {
      type: String,
      default: () => {
        return ""
      },
    },
    fieldItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      defaultProps: {
        id: "id",
        children: "children",
        label: "text",
      },
      newTreeData: [],
      filterText: "",
    }
  },
  methods: {
    /**
     * @Copyright DELOITTE
     * @Description: 节点选择
     * @update  08/04/2022
     * @returns {*}
     */
    handleNodeClick(node, b, c) {
      let nodeObject = {
        id: node.id.split("-")[0],
        text: node.text,
        parent: node.parent,
        type: node.type,
        disabled: node.disabled,
      }
      this.$emit("selectNodeCallback", nodeObject)
    },
    /**
     * @Copyright DELOITTE
     * @Description: 树格式转换
     * @update  08/04/2022
     * @returns {*}
     */
    objectTransfortoTree() {
      let data = this.treeData
      let result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach((item) => {
        delete item.children
      })
      let map = {}
      data.forEach((item) => map[item.id] = item)
      data.forEach((item) => {
        let parent = map[item.parent]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    /**
     * @Copyright DELOITTE
     * @Description: 是否显示树
     * @update  08/04/2022
     * @returns {*}
     */
    isShowTree(e) {
      if (e.target.tagName !== "INPUT") {
        this.fieldItem.isShow = false
      }
    },
    /**
     * @Copyright DELOITTE
     * @Description: 节点渲染
     *
     * @param h
     * @param node
     * @param data
     * @param store
     */
    renderContent(h, { node, data }) {
      if (data.disabled) {
        return h(
          "span",
          {
            class: "tree-disable",
            style: { "font-size": "12px" },
          },
          node.label,
        )
      } else {
        return h(
          "span",
          {
            style: { "font-size": "12px" },
          },
          node.label,
        )
      }
    },
    /**
     * @Copyright DELOITTE
     * @Description: 节点过滤
     * @update  08/04/2022
     * @returns {*}
     */
    filterNode(value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  mounted() {
    document.addEventListener("click", this.isShowTree, false)
  },
  created() {
    this.newTreeData = this.objectTransfortoTree()
  },
}
</script>

<style scoped></style>
