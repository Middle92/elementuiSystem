<template>
  <section class="app-main">
    <el-scrollbar style="height:100%">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  position: absolute;
  top: 84px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
<style lang="scss">
.app-main {
  .el-scrollbar__wrap {
    overflow: auto;
  }
}
</style>
