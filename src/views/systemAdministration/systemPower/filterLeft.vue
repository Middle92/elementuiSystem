<template>
  <div>
    <el-button @click="toggleTree">tree</el-button>
    <!-- <el-button type="primary">主要按钮</el-button> -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    toggleTree() {
      window.vm.$emit('toggleTree')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
