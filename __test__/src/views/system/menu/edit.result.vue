<template>
  <el-dialog
    :title="title"
    v-model="show"
    width="680px"
    :before-close="cancel"
    append-to-body
  >
    <el-form
      ref="refMenu"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item :label="I18N.$fanyi('上级菜单')">
            <DCascaderMenu v-model="formData.parentId" ref="refDCascaderMenu" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="I18N.$fanyi('菜单类型')" prop="menuType">
            <el-radio-group v-model="formData.menuType">
              <el-radio label="M">
                {{ I18N.$fanyi('目录') }}
              </el-radio>
              <el-radio label="C">
                {{ I18N.$fanyi('菜单') }}
              </el-radio>
              <el-radio label="F">
                {{ I18N.$fanyi('按钮') }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="formData.menuType != 'F'">
          <el-form-item :label="I18N.$fanyi('菜单图标')" prop="icon">
            <el-popover
              placement="bottom-start"
              :width="540"
              v-model:visible="showChooseIcon"
              trigger="click"
              @show="showSelectIcon"
            >
              <template #reference>
                <el-input
                  v-model="formData.icon"
                  :placeholder="I18N.$fanyi('点击选择图标')"
                  @click="showSelectIcon"
                  readonly
                >
                  <template #prefix>
                    <svg-icon
                      v-if="formData.icon"
                      :icon-class="formData.icon"
                      class="el-input__icon"
                      style="height: 32px; width: 16px"
                    />
                    <el-icon v-else style="height: 32px; width: 16px">
                      <search />
                    </el-icon>
                  </template>
                </el-input>
              </template>
              <icon-select ref="iconSelectRef" @selected="selected" />
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="I18N.$fanyi('菜单名称')" prop="menuName">
            <el-input
              v-model="formData.menuName"
              :placeholder="I18N.$fanyi('请输入菜单名称')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="I18N.$fanyi('显示排序')" prop="orderNum">
            <el-input-number
              v-model="formData.orderNum"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType != 'F'">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi('选择是外链则路由地址需要以`http(s)://`开头')
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('是否外链') }}
              </span>
            </template>
            <el-radio-group v-model="formData.isFrame">
              <el-radio label="0">
                {{ I18N.$fanyi('外部链接') }}
              </el-radio>
              <el-radio label="1">
                {{ I18N.$fanyi('内部链接') }}
              </el-radio>
              <el-radio label="2">
                {{ I18N.$fanyi('低代码') }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType != 'F'">
          <el-form-item prop="path">
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('路由地址') }}
              </span>
            </template>
            <el-input
              v-model="formData.path"
              :placeholder="I18N.$fanyi('请输入路由地址')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType == 'C'">
          <el-form-item prop="component">
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '访问的组件路径，如：`system/user/index`，默认在`views`目录下'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('组件路径') }}
              </span>
            </template>
            <el-input
              v-model="formData.component"
              :placeholder="I18N.$fanyi('请输入组件路径')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType === 'F'">
          <el-form-item>
            <el-input
              v-model="formData.perms"
              :placeholder="I18N.$fanyi('请输入权限标识')"
              maxlength="100"
            />
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi(system:user:list)`)'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('权限字符') }}
              </span>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType == 'C'">
          <el-form-item>
            <el-input
              v-model="formData.query"
              :placeholder="I18N.$fanyi('请输入路由参数')"
              maxlength="255"
            />
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '访问路由的默认传递参数，如：`{id: 1, name: ry}`'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('路由参数') }}
              </span>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType == 'C'">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('是否缓存') }}
              </span>
            </template>
            <el-radio-group v-model="formData.isCache">
              <el-radio label="0">
                {{ I18N.$fanyi('缓存') }}
              </el-radio>
              <el-radio label="1">
                {{ I18N.$fanyi('不缓存') }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType != 'F'">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '选择隐藏则路由将不会出现在侧边栏，但仍然可以访问'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('显示状态') }}
              </span>
            </template>
            <el-radio-group v-model="formData.visible">
              <el-radio
                v-for="dict in sys_show_hide"
                :key="dict.value"
                :label="dict.value"
              >
                {{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.menuType != 'F'">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  :content="
                    I18N.$fanyi(
                      '选择停用则路由将不会出现在侧边栏，也不能被访问'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ I18N.$fanyi('菜单状态') }}
              </span>
            </template>
            <el-radio-group v-model="formData.status">
              <el-radio
                v-for="dict in sys_normal_disable"
                :key="dict.value"
                :label="dict.value"
              >
                {{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          {{ I18N.$fanyi('确 定') }}
        </el-button>
        <el-button @click="cancel">
          {{ I18N.$fanyi('取 消') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  reactive,
  computed,
  defineExpose,
  ref,
  toRefs,
  toRaw
} from 'vue'
import { addMenu, getMenu, updateMenu } from '@/api/system/menu'
import { MODEL_OPERATOR_TYPE } from '@/utils/dict'
import SvgIcon from '@/components/SvgIcon'
import IconSelect from '@/components/IconSelect'
import DCascaderMenu from '@/components-custom/d-cascader-menu/index.vue'
const { proxy } = getCurrentInstance()
const { sys_show_hide, sys_normal_disable } = proxy.useDict(
  'sys_show_hide',
  'sys_normal_disable'
)
const rawFormData = {
  id: undefined,
  parentId: 0,
  menuType: 'M',

  // M:目录 C:菜单 F:按钮
  menuName: undefined,
  icon: undefined,
  path: '',
  perms: '',
  orderNum: 0,
  isFrame: '1',
  isCache: '0',
  visible: '0',
  status: '0'
}
const data = reactive({
  type: -1,
  show: false,
  formData: { ...rawFormData },
  formRules: {
    menuName: [
      {
        required: true,
        message: I18N.$fanyi('菜单名称不能为空'),
        trigger: 'blur'
      }
    ],
    orderNum: [
      {
        required: true,
        message: I18N.$fanyi('菜单顺序不能为空'),
        trigger: 'blur'
      }
    ],
    path: [
      {
        required: true,
        message: I18N.$fanyi('路由地址不能为空'),
        trigger: 'blur'
      }
    ]
  }
})
const { formData, formRules, type, show } = toRefs(data)
/**
 * 标题
 */

const title = computed(() => {
  if (type.value === MODEL_OPERATOR_TYPE.新增) {
    return I18N.$fanyi('新增菜单')
  } else {
    return I18N.$fanyi('编辑菜单')
  }
})
/**
 *
 * @param id 编辑当前菜单的ID
 * @param parentId 新增菜单
 */

function open(id, parentId) {
  type.value = !id ? MODEL_OPERATOR_TYPE.新增 : MODEL_OPERATOR_TYPE.编辑
  show.value = true
  initForm(id, parentId)
}
/**
 * 初始化表单
 */

async function initForm(id, parentId = 0) {
  if (id && !parentId) {
    const res = await getMenu(id)
    console.log(res.data)
    formData.value = res.data
  } else {
    resetForm()
    formData.value.parentId = parentId
  }
}

function selected(name) {
  formData.value.icon = name
}
/**
 * 提交表单
 */

const refDCascaderMenu = ref(null)

function submitForm() {
  proxy.$refs['refMenu'].validate(async (valid) => {
    if (valid) {
      if (!formData.value.parentId) {
        formData.value.parentId = 0
      }

      const data = toRaw(formData.value)

      if (data.id != undefined) {
        await updateMenu(data)
        proxy.$modal.msgSuccess(I18N.$fanyi('修改成功'))
      } else {
        await addMenu(data)
        proxy.$modal.msgSuccess(I18N.$fanyi('新增成功'))
      }
    }

    refDCascaderMenu.value.refreshData()
    show.value = false
    proxy.$emit('refresh')
  })
}
/**
 * 重置表单
 */

function resetForm() {
  formData.value = rawFormData
}
/**
 * 取消
 */

function cancel() {
  show.value = false
}

defineExpose({
  open
})
</script>
