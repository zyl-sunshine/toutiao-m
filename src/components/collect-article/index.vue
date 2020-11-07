<template>
  <van-icon
    :color="collected ? '#ffa500' : ''"
    :name="collected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="collectLoading"
  />
</template>

<script>
import { addCollectArticle, deleteCollectArticle } from '@/api/article'
export default {
  name: 'collectArticle',
  components: {},
  model: {
    prop: 'collected',
    event: 'updata-collected'
  },
  props: {
    collected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      collectLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onCollect() {
      this.collectLoading = true
      //   console.log(this.articleId)
      try {
        if (this.collected) {
          //   console.log('123')
          //   已收藏,取消收藏文章
          //   if (Math.random() > 0.2) {
          //     JSON.parse('jskjdksjad')
          //   }
          await deleteCollectArticle(this.articleId)
        } else {
          //   未收藏文章状态,点击收藏
          //   console.log('else123')
          await addCollectArticle(this.articleId)
        }
        this.$emit('updata-collected', !this.collected)
      } catch {
        this.$toast('操作失败,请重试')
      }
      this.collectLoading = false
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
