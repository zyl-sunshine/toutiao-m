<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <template #left>
        <van-icon name="cross" @click="$emit('click-close')" />
      </template>
    </van-nav-bar>
    <div class="scroll-wrap">
      <comment-item :comment="comment"></comment-item>
      <van-cell value="全部回复" />
      <article-comment
        :articleId="comment.com_id"
        type="c"
        :list="commentList"
      ></article-comment>
    </div>
    <div class="comment-btn">
      <van-button round class="post-btn" size="small" @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 写评论的弹出框 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-popup
        :articleId="comment.com_id"
        @post-success="onPostSuccess"
      ></comment-popup>
    </van-popup>
  </div>
</template>

<script>
import commentItem from '@/components/comment-item'
import articleComment from './article-comment'
import commentPopup from './comment-popup'
export default {
  name: 'commentReply',
  components: {
    commentItem,
    articleComment,
    commentPopup
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    onPostSuccess(data) {
      // 更新回复数量
      this.comment.reply_count++
      // 关闭弹窗
      this.isPostShow = false
      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.reply-comment {
  .comment-btn {
    border: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    .post-btn {
      width: 60%;
      background-color: #ccc;
    }
  }

  /deep/.scroll-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
}
</style>
