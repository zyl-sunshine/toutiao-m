<template>
  <div class="article-list" :style="{ height: articleListHeight + 'px' }">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="isRefreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(item, idx) in articles"
          :key="idx"
          :item="item"
        ></article-item>
        <!-- <van-cell v-for="item in articles" :key="item.id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import articleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    //   接收home父组件传过来的数据
    channel: {
      type: Object,
      //   必须的
      required: true
    }
  },
  data() {
    return {
      // 存储列表数据的数组
      articles: [],
      //   控制加载中loading的状态
      loading: false,
      //   控制数据加结束的状态
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      isRefreshSuccessText: '刷新成功',
      articleListHeight: 0
      // queryInfo: {
      //   channel_id: this.channel.id,
      //   timestamp: Date.now(),
      //   with_top: 0
      // }
    }
  },
  components: {
    articleItem
  },
  created() {
    // 当设备的高度发生变化的时候,固定的视窗高度无法满足设备变化的需求
    // 所以我们通过动态计算的方式来设置articelList元素的高度
    // articleList高度=屏幕的高度-navBar导航栏的高度-tab栏的高度-底部tabbar的高度
    // this.articleListHeight = this.$store.state.screenHeight - 46 - 51 - 40
    this.articleListHeight =
      this.$store.state.screenHeight -
      this.$store.state.tabHeight -
      this.$store.state.navTabHeight -
      this.$store.state.tabbarHeight
  },
  mounted() {},
  methods: {
    onLoad() {
      // 1.请求获取数据
      getArticleList({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
        .then(({ data: res }) => {
          // console.log(res)
          // console.log(this.$store.state.screenHeight)
          // console.log(this.articleListHeight)
          // 2.把请求结果数据放到list数组中
          this.articles.push(...res.data.results)
          // 3.本次数据加载结束之后要把加载状态设置为结束
          this.loading = false
          // 4.判断数据是否全部加载完成
          if (res.data.results.length) {
            // 获取下一页数据的时间戳
            this.timestamp = res.data.pre_timestamp
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })

      // const { data } = await getArticleList({
      //   channel_id: this.channel.id,
      //   timestamp: this.timestamp || Date.now(),
      //   with_top: 1
      // })
      // const { results } = data.data
      // this.articles.push(...results)
      // 3.本次数据加载结束之后要把加载状态设置为结束
      // this.loading = false
      // // 4.判断数据是否全部加载完成
      // if (results.length) {
      //   this.timestamp = data.data.pre_timestamp
      // } else {
      //   this.finished = true
      // }
    },
    onRefresh() {
      getArticleList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
        .then(({ data: res }) => {
          console.log(res)
          // 2.把请求结果数据放到list数组中
          this.articles.unshift(...res.data.results)
          // 关闭下拉刷新的状态
          this.isLoading = false
          // 刷新成功显示的文字
          this.isRefreshSuccessText = '刷新成功'
        })
        .catch(() => {
          this.isLoading = false
          this.isRefreshSuccessText = '刷新失败'
        })
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;
  // 视口(在移动端的布局视口) 单位:vw 和 vh,不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh= 视口高度的百分之一
  // height: 80vh;
  overflow-y: auto;
}
</style>
