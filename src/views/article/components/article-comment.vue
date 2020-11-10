<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :immediate-check="false"
    @load="onLoad"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <comment-item
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      ></comment-item>
    </van-cell>
  </van-list>
</template>

<script>
import { getAllComments } from '@/api/comment'
import commentItem from '@/components/comment-item'
export default {
  name: 'articleComment',
  components: {
    commentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      //   1、请求获取数据
      getAllComments({
        type: this.type,
        source: this.articleId.toString(),
        offset: this.offset,
        limit: this.limit
      })
        .then(({ data: res }) => {
          console.log(res)
          // 2.把请求的结果数据放到list数组中
          this.list.push(...res.data.results)
          this.$emit('onload-success', res.data)
          // 3.本次数据加载结束之后要把加载状态设置为关闭
          this.loading = false
          // 4.判断数据是否全部加载完成
          if (res.data.results.length) {
            // 获取下一页数据
            this.offset = res.data.last_id
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
