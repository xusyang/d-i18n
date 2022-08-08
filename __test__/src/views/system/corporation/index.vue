<template>
  <DLayoutContentH>
    <template #left>
      <div class="container-tools">
        <el-button size="small" type="primary" @click="handleAddLegal">
          {{ I18N.$fanyi('新增') }}
        </el-button>
      </div>

      <div class="container-content">
        <DLegalTree v-model="legalId" :canEdit="true" @level="getLevel" />
      </div>
    </template>
    <template #right>
      <UserList :legalId="legalId" v-if="legalId > 0" :level="level" />
      <div v-else>
        {{ I18N.$fanyi('暂无数据，请选择查看的集团') }}
      </div>
    </template>
  </DLayoutContentH>

  <DLegalEdit ref="editRef"></DLegalEdit>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { INotice, SYSTEM_LEGAL } from '@/constants/inject-keys'
import DLayoutContentH from '@/layout/layout-content-h/index.vue'
import DLegalTree from '@/components-custom/d-legal-tree/index.vue'
import DLegalEdit from '@/components-custom/d-legal-tree/edit.vue'
import UserList from './user/list.vue'
provide<INotice>(SYSTEM_LEGAL.REFRESH_LEGAL, {
  tag: ref(0),
  notice: function () {
    this.tag.value++
  }
})
provide<INotice>(SYSTEM_LEGAL.REFRESH_LEGALUSER, {
  tag: ref(0),
  notice: function () {
    this.tag.value++
  }
})
const legalId = ref(-1)
const editRef = ref(null)
const level = ref(1)

const handleAddLegal = () => {
  editRef.value.open()
}

const getLevel = (l) => {
  level.value = l
}
</script>

<style scoped lang="scss">
.container-tools {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  background: #fff;
}

.container-content {
  :deep(.el-input__inner) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0;
  }
}
</style>
