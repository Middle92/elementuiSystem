<template>
  <div class="app-container">
    <el-input v-model="inputData" placeholder="Please input" style='width:400px;'></el-input>
    <el-button type="primary" icon="document" v-clipboard:copy='inputData' v-clipboard:success='clipboardSuccess'>复制到剪切板</el-button>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'clipboardDemo',
  directives: {
    clipboard
  },
  data () {
    return {
      inputData: '点一下带走我'
    }
  },
  methods: {
    handleCopy (text, event) {
      clip(text, event)
    },
    clipboardSuccess () {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>
