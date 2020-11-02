<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route ref="tabbarH">
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarHeight: 0
    }
  },
  mounted() {
    this.getHeight()
  },
  methods: {
    getHeight() {
      this.tabbarHeight = this.$refs.tabbarH.$el.offsetHeight
      this.$store.commit('getTabbarHeight', this.tabbarHeight)
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  i.iconfont {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>
