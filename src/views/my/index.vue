<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header ok-login" v-if="user">
      <div class="base">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round type="default" size="mini" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 宫格 -->
    <van-grid class="nav-grid" :column-num="2">
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      center
      @click="outLogin"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  data() {
    return {
      // 用户的数据
      userInfo: {}
    }
  },
  methods: {
    // 获取用户自己的信息
    loadUserInfo() {
      getUserInfo()
        .then(({ data: res }) => {
          console.log(res)
          this.userInfo = res.data
        })
        .catch(() => {
          this.$toast('获取失败,请稍后再试')
        })
    },

    // 退出登录
    outLogin() {
      this.$dialog
        .confirm({
          message: '确认退出吗?'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          this.$toast('操作失败,请稍后再试')
        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 如果用户登陆了 则加载用户的信息
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  .ok-login {
    .base {
      height: 231px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 22px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 133px;
          height: 133px;
          border: 1px solid #fff;
          margin-right: 20px;
        }
        .text {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        span:nth-child(1) {
          font-size: 36px;
          color: #fff;
          margin-bottom: 10px;
        }
        span:nth-child(2) {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .nav-grid {
    margin-bottom: 10px;
    .iconfont {
      font-size: 45px;
    }
    .iconshoucang {
      color: #eb5253;
    }
    .iconlishi {
      color: #ff9d1d;
    }
    .text {
      margin-top: 10px;
      font-size: 28px;
    }
  }
  .logout-cell {
    color: #d86262;
    font-size: 30px;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
