<template>
  <van-icon
    :color="attitude === 1 ? 'red' : ''"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onLikeArticle"
  />
</template>

<script>
import { addLikeArticle, deleteLikeArticle } from '@/api/article'
export default {
  name: 'likeArticle',
  components: {},
  model: {
    prop: 'attitude',
    event: 'updata-attitude'
  },
  props: {
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    async onLikeArticle() {
      //   console.log(this.value)
      try {
        if (this.attitude === 1) {
          // 已点赞, 取消点赞
          //   console.log('123')
          if (Math.random() > 0.2) {
            JSON.parse('hjdhskfhlfkd')
          }
          await deleteLikeArticle(this.articleId)
          // this.attitude = 0
          this.$emit('updata-attitude', 0)
        } else {
          // 未点赞
          //   console.log('456')
          await addLikeArticle(this.articleId)
          // this.attitude = 1
          this.$emit('updata-attitude', 1)
        }
      } catch {
        this.$toast('操作失败,请稍后重试')
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
