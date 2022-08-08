<template>
  <div class="cascader-wrapper">
    <el-cascader
      v-model="first_legal"
      :options="getters.operate_legal"
      :show-all-levels="false" 
      :props="treeProps"
      @change="change"
    >
    </el-cascader>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { legalTree } from '@/api/login'
import cache from '@/plugins/cache'
import { deepTree } from '@/utils/ruoyi'

const store = useStore()
const emit = defineEmits(['submit'])

const getters = computed(() => store.getters)

const first_legal = computed({
  get() {
    return getters.value.operate_legal_first
  },
  set() {},
})

const treeProps = reactive(
  { 
    value: 'id', 
    label: 'legalName',
  }
)

function change(val) {
  emit('submit')
  store.dispatch('app/legalChange', val[val.length - 1])
  store.dispatch('RefreshLegalFirst', val)
}

legalTree().then(res => {
  const first_legal = cache.local.getJSON('operate_legal_first') || []
  if (!res.data.find(item => item.id === first_legal[0])) {
    const operate_legal_first = deepTree([res.data[0]])
    store.dispatch('RefreshLegalFirst', operate_legal_first)
  }
  store.dispatch('RefreshLegalTree', res.data)
  store.dispatch('app/legalChange', first_legal[0])
})
</script>

<style lang="scss" scoped>
.cascader-wrapper:deep(.el-cascader) {
  width: 220px;
  height: 35px;
  .el-input__inner {
    height: 35px;
    background: var(--base-menu-background);
    border: none;
    color: var(--base-menu-text);
  }
}
</style>