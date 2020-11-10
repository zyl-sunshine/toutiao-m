<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="addCommentClick"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '@/api/comment'
export default {
  name: 'commentPopup',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    addCommentClick() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 2000
      })
      addComments({
        target: this.articleId.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
        .then(({ data: res }) => {
          // console.log(res)
          this.message = ''
          this.$emit('post-success', res.data)
          this.$toast.success('发布成功')
        })
        .catch(() => {
          this.$toast.fail('发布失败')
        })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.post-comment {
  display: flex;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
