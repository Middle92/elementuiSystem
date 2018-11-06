<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <span v-permission="['admin']" class="permission-alert">
        仅
        <el-tag class="permission-tag" size="small">admin</el-tag> 可见
      </span>
      <span v-permission="['editor']" class="permission-alert">
        仅
        <el-tag class="permission-tag" size="small">editor</el-tag> 可见
      </span>
      <span v-permission="['admin','editor']" class="permission-alert">
        <el-tag class="permission-tag" size="small">admin</el-tag> 及
        <el-tag class="permission-tag" size="small">editor</el-tag> 可见
      </span>
    </div>

    <div style="margin-top:30px;" :key="'checkPermission'+key">
      <code>有些情况无法使用v-permission指令,如el-tabs。可以使用v-if代替
      </code>
      <el-tabs type="border-card" style="width:500px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">Admin可见</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">Editor可见</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">admin及editor可见</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles'

export default{
  name: 'directivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data () {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange () {
      this.key++
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag{
    background-color: #ecf5ff;
  }
}
</style>
