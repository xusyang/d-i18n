<template>
  <DTable
    :tableDatas="tableDatas"
    :tableColumns="tableColumns"
    :setting="false"
    row-key="id"
    :height="850"
  >
    <template #pagination>
      <Pagination
        :total="total"
        :page="pageParams.page"
        :limit="pageParams.limit"
        @pagination="handlePagenation"
      />
    </template>
  </DTable>
</template>

<script setup lang="ts">
import DTable from '@/components-custom/d-table/index.vue'
import { getViewDefineById, selectObjectDataPage, treeLazy } from '@/api/task'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CPS_VIEW_ID, CPS_VIEW_QUERY_CODE } from '@/constants/enum'
import { flattenTree } from '@/utils/ruoyi'
const route = useRoute()
const defineKey = route.query.processDefinitionKey as string

// 获取搜素条件

const businessNo = route.query.businessNo as string

const getConditions = () => {
  try {
    const businessNoObj = JSON.parse(businessNo)
    return Object.keys(businessNoObj).map((key) => {
      return {
        fieldCode: key,
        op: 'eq',
        values: [businessNoObj[key]]
      }
    })
  } catch (error) {
    // 兼容之前的写法
    const businessNoArr = businessNo.split('-')
    const tableCode = businessNoArr[0]
    const period = businessNoArr[1]
    return [
      {
        fieldCode: CPS_VIEW_QUERY_CODE[defineKey],
        op: 'eq',
        values: [tableCode]
      },
      {
        fieldCode: 'period',
        op: 'eq',
        values: [period]
      }
    ]
  }
}

const tableColumns = ref([])
const tableDatas = ref([])
const total = ref(0)
const pageParams = reactive({
  page: 1,
  limit: 10
})
const objectCode = ref('')

const handlePagenation = ({ page, limit }) => {
  pageParams.page = page
  pageParams.limit = limit
  fetchTableData()
}

const fetchViewDefine = () => {
  getViewDefineById(CPS_VIEW_ID[defineKey]).then((res) => {
    const viewJson = JSON.parse(res.data.view_json)
    tableColumns.value = viewJson.showFields.map((item) => {
      return {
        prop: item.fieldCode,
        label: item.fieldName,
        formatter: (row) => {
          return item.template_type === 'raw'
            ? row[item.fieldCode]
            : fieldFormate(row, item.fieldCode)
        }
      }
    })
    objectCode.value = res.data.object_code
    fetchTableData()
  })
}

// const departKey = defineKey === 'FYDJ' ? 'center_code' : 'dept_code'

const departKey = 'center_code'

// 对象字段(tree)

let objectField = {
  // 部门档案
  [departKey]: 'depart',

  // dept_code: 'depart',

  // 科目档案
  subject_code: 'subject',

  // 产品档案
  prod_cate_code: 'prod',

  // 资产档案
  asset_cate_code: 'asset',

  // 渠道档案
  channel_code: 'channel',

  // 客户档案
  customer_code: 'customer'
}

// 自定义档案(list)

const customArchives = {
  // 费用来源
  cost_source: 'DOC001',

  // 成本项分类
  cost_item_code: 'DOC004',

  // 数据来源
  data_source_code: 'DOC009'
}
const allCustomData = ref([])
const allTreeData = ref([])
const allCustomAjax = Object.keys(customArchives).map((item) =>
  selectObjectDataPage('ca_doc_item', {
    pageNo: 1,
    pageSize: 1000,
    conditions: [
      {
        fieldCode: 'doc_code',
        op: 'eq',
        values: [customArchives[item]]
      }
    ]
  })
)
const allTreeAjax = Object.keys(objectField).map((item) =>
  treeLazy(objectField[item], {
    conditions: []
  })
)
Promise.all(allCustomAjax).then((res) => {
  allCustomData.value = res.reduce((pre, cur) => {
    if (cur.data && cur.data.rows) {
      pre = pre.concat(cur.data.rows)
    }

    return pre
  }, [])
})
Promise.all(allTreeAjax).then((res) => {
  allTreeData.value = res.reduce((pre, cur) => {
    if (cur.data && cur.data.rows) {
      pre = pre.concat(cur.data.rows)
    }

    return pre
  }, [])
  allTreeData.value = flattenTree(allTreeData.value)
})

const fetchTableData = async () => {
  const params = {
    conditions: getConditions(),
    pageSize: pageParams.limit,
    pageNo: pageParams.page
  }
  const res = await selectObjectDataPage(objectCode.value, params)
  tableDatas.value = res.data.rows
  total.value = res.data.total
}

// api/v1/object/ca_depart/query

const fieldFormate = (row, prop) => {
  const originalVal = row[prop]

  if (customArchives[prop] && allCustomData.value.length) {
    const ret = allCustomData.value.find(
      (item) => item.item_code === originalVal
    )
    return ret ? ret.item_name : '-'
  } else if (objectField[prop] && allTreeData.value.length) {
    let code =
      prop.indexOf('cate') > -1
        ? objectField[prop] + '_cate_code'
        : objectField[prop] + '_code'
    let name =
      prop.indexOf('cate') > -1
        ? objectField[prop] + '_cate_name'
        : objectField[prop] + '_name'

    if (objectField[prop] === 'depart') {
      code = 'center_code'
      name = 'center_name'
    }

    const ret = allTreeData.value.find((item) => item[code] === originalVal)
    return ret ? ret[name] : '-'
  } else {
    return originalVal
  }
}

fetchViewDefine()
</script>
