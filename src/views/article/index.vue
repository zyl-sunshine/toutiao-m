<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <!-- <div class="loading-wrap" v-if="loading"> -->
      <div class="loading-wrap" v-if="flag === '0'">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <!-- <div class="article-detail" v-else-if="article.title"> -->
      <div class="article-detail" v-if="flag === '1'">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注作者 -->
          <follow-user
            class="follow-btn"
            :isFollowed="article.is_followed"
            @updata-is_followed="article.is_followed = $event"
            :autId="article.aut_id"
          ></follow-user>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="onFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <article-comment
          :articleId="article.art_id"
          @onload-success="totalCount = $event.total_count"
          :list="commentList"
          @reply-click="onReplyClick"
        ></article-comment>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopupshow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏文章 -->
          <!-- 模板中的$event 是事件参数
          当我们传递给子组件的数据既要使用还要修改
          传递:props
             :is_collected="article.is_collected"
          修改:自定义事件
          @updata-collected="article.is_collected=$event"
          简写方式:在组件上使用v-model
          value ="article.is_collected"
          @input="article.is_collected=$event"
          如果需要修改 v-model的规则名称,可以通过子组件的model修改
           -->
          <collect-article
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></collect-article>
          <!-- 点赞文章 -->
          <!-- @updata-attitude="article.attitude = $event" -->
          <like-article
            v-model="article.attitude"
            :articleId="article.art_id"
          ></like-article>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <!-- <div class="error-wrap" v-else-if="errStatus === 404"> -->
      <div class="error-wrap" v-if="flag === '2'">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- <div class="error-wrap" v-else> -->
      <div class="error-wrap" v-if="flag === '3'">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 添加评论 -->
    <van-popup class="popupup" v-model="isPopupshow" position="bottom" round>
      <comment-popup
        :target="article.art_id"
        @post-success="onPostSuccess"
      ></comment-popup>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyshow"
        @click-close="isReplyshow = false"
        :comment="currentComment"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticle } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import articleComment from './components/article-comment'
import commentPopup from './components/comment-popup'
import commentReply from './components/comment-reply'
// 图片预览

export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    articleComment,
    commentPopup,
    commentReply
  },
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      // 文章详情
      article: {},
      // loading: true,
      // errStatus: 0
      // 0 :加载中
      // 1 :文章详情
      // 2 ：加载失败 404
      // 3 ：其他原因加载失败
      flag: '0',
      // 评论总数量
      totalCount: 0,
      // 发表评论弹出层的显示与隐藏
      isPopupshow: false,
      commentList: [],
      // 评论回复弹出层
      isReplyshow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    // 获取文章详情
    loadArticle() {
      // this.loading = true
      this.flag = '0'
      getArticle(this.articleId)
        .then(({ data: res }) => {
          // console.log(res.data)
          this.article = res.data
          // this.$nextTick(() => {
          //   this.getImagePreview()
          // })
          setTimeout(() => {
            this.getImagePreview()
          }, 0)
          // console.log(this.article)
          // 文章加载成功,关闭加载中
          // this.loading = false
          this.flag = '1'
        })
        .catch(err => {
          this.$toast('获取文章失败')
          console.log(err)
          if (err.response && err.response.status === 404) {
            // this.errStatus = 404
            this.flag = '2'
          } else {
            this.flag = '3'
          }
          // 文章加载失败关闭加载中,显示别的
          // this.loading = false
        })
      // 不论成功或者失败都要关闭加载中
      // this.loading = false
    },
    getImagePreview() {
      // console.log(this.$refs.articleContent)
      // console.log(this.$refs.articleContent.querySelectorAll('img'))
      const imgAll = this.$refs.articleContent.querySelectorAll('img')
      const images = []
      imgAll.forEach(img => {
        images.push(img.src)
        // console.log(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 指定图片的起始值(索引)
            startPosition: 0
          })
        }
      })
    },
    onPostSuccess(res) {
      this.isPopupshow = false
      // console.log(res)
      this.commentList.unshift(res.new_obj)
    },
    onReplyClick(comment) {
      this.currentComment = comment
      this.isReplyshow = true
    }

    // onFollow(id) {
    //   // console.log(id)
    //   // console.log(this.article.is_followed)
    //   if (this.article.is_followed) {
    //     // 已关注,取消关注
    //     getUnFollowings(id).then(() => {
    //       this.article.is_followed = false
    //     })
    //   } else {
    //     // 未关注,添加关注
    //     getFollowings(id).then(() => {
    //       // console.log(res)
    //       this.article.is_followed = true
    //     })
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .popupup {
    padding-top: 80px;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
