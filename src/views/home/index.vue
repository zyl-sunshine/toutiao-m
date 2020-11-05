<template>
  <div class="home-container">
    <!-- 顶部搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed ref="tabH">
      <template #title>
        <van-button
          size="small"
          round
          class="search-btn"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      ref="navTab"
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channelsData"
        :key="channel.id"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 占位 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icongengduo" @click="isEditChannelShow = true"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isEditChannelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      round
      :style="{ height: '95%' }"
    >
      <!-- 弹出层组件 -->
      <channel-edit
        :my-channel="channelsData"
        :active="active"
        @updata-active="onUpdataactive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  data() {
    return {
      active: 0,
      // 用户频道列表数据
      channelsData: [],
      // 导航栏高度
      tabHeight: 0,
      navTabHeight: 0,
      // 弹出层的显示与隐藏
      isEditChannelShow: false
    }
  },
  components: {
    articleList,
    channelEdit
  },
  created() {
    this.loadChannel()
  },
  mounted() {
    // 调用方法
    this.$nextTick(() => {
      this.getHeight()
    })
  },
  methods: {
    // 获取用户频道列表数据
    loadChannel() {
      // getUserChannels()
      //   .then(({ data: res }) => {
      //     console.log(res)
      //     this.channelsData = res.data.channels
      //   })
      //   .catch(() => {
      //     this.$toast('获取频道数据失败')
      //   })

      let channels = []
      if (this.user) {
        // 已登录,请求获取用户频道列表
        getUserChannels()
          .then(({ data }) => {
            channels = data.data.channels
            this.channelsData = channels
            // console.log(channels)
          })
          .catch(() => {
            this.$toast('获取频道列表失败')
          })
      } else {
        // 未登录,判断是否有本地的频道列表数据
        const localChannels = getItem('CHANNEL_TOKEN')
        // 有,拿来使用
        if (localChannels) {
          channels = localChannels
          this.channelsData = channels
        } else {
          // 没有,请求获取默认频道列表
          getUserChannels().then(({ data }) => {
            channels = data.data.channels
            this.channelsData = channels
          })
        }
      }
      // try {
      //   let channels = []
      //   if (this.user) {
      //     // 已登录,请求获取用户频道列表
      //     getUserChannels().then(({ data }) => {
      //       channels = data.data.channels
      //     })
      //   } else {
      //     // 未登录,判断是否有本地的频道列表数据
      //     const localChannels = getItem('CHANNEL_TOKEN')
      //     // 有,拿来使用
      //     if (localChannels) {
      //       channels = localChannels
      //     } else {
      //       // 没有,请求获取默认频道列表
      //       getUserChannels().then(({ data }) => {
      //         channels = data.data.channels
      //       })
      //     }
      //   }
      //   this.channelsData = channels
      // } catch {
      //   this.$toast('获取频道数据失败')
      // }
    },
    // 获取高度
    getHeight() {
      // console.log(this.$refs.tabH.$el.clientHeight)
      this.tabHeight = this.$refs.tabH.$el.offsetHeight
      this.navTabHeight = this.$refs.navTab.$el.offsetHeight
      this.$store.commit('getNavHeight', {
        tabHeight: this.tabHeight,
        navTabHeight: this.navTabHeight
      })
    },
    // 接收子组件发送过来的通知修改子组件传过来的active值
    onUpdataactive(index, isEditChannelShow = true) {
      this.active = index
      this.isEditChannelShow = isEditChannelShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 173px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 65px;
    background-color: #5babfb;
    border: none;
    color: #fff;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 28px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 70%;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>
